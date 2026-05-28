import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const deliverables = path.join(root, "deliverables");
const csvPath = path.join(deliverables, "bay-area-final-1000-websites_with_stripe_links.csv");
const dashboardSource = path.join(root, "sales-dashboard");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }
  if (field || row.length) row.push(field), rows.push(row);
  const [headers, ...data] = rows.filter((cells) => cells.some((cell) => cell.trim()));
  return data.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""])));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(value) {
  return String(value ?? "").trim();
}

function numeric(value) {
  const text = clean(value);
  if (!text) return null;
  const parsed = Number(text);
  if (!Number.isFinite(parsed)) return null;
  return Number.isInteger(parsed) ? parsed : parsed;
}

function phoneHref(phone) {
  let digits = clean(phone).replace(/\D+/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  return digits ? `tel:+${digits}` : "";
}

function labelize(value) {
  return clean(value)
    .replace(/[_-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function cityFromAddress(address) {
  const parts = clean(address)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 3) return parts.at(-2);
  if (parts.length === 2 && !/\b\d{5}(?:-\d{4})?\b/.test(parts.at(-1))) return parts.at(-1);
  return "";
}

function parsePalette(text) {
  const values = {};
  for (const match of clean(text).matchAll(/\b(primary|surface|accent|ink)\s+((?:#[0-9a-fA-F]{3,8})|[a-zA-Z]+)/g)) {
    values[match[1]] = match[2];
  }
  return values;
}

function buildDashboardData(rows) {
  const companies = rows.map((row, index) => {
    const routeStop = numeric(row["Route stop"]) || index + 1;
    const slug = row.slug;
    const category = clean(row.Category);
    const address = clean(row.Address);
    const localPreview = slug ? `/${slug}/` : "";
    const company = {
      id: `${String(routeStop).padStart(4, "0")}-${slug || index + 1}`,
      routeStop,
      name: clean(row.Business),
      address,
      city: cityFromAddress(address),
      phone: clean(row.Phone),
      phoneHref: phoneHref(row.Phone),
      category,
      categoryLabel: labelize(category),
      hours: clean(row.Hours),
      leadStatus: clean(row["Lead status"]),
      websiteStatus: clean(row["Website status"]),
      evidence: clean(row.Evidence),
      whyWebsiteHelps: clean(row["Why a dedicated website would help"]),
      profileLink: clean(row["Yelp or booking link"]),
      googleMapsLink: clean(row["Google Maps link"]),
      latitude: numeric(row.Latitude),
      longitude: numeric(row.Longitude),
      routeLegMiles: numeric(row["Route leg miles"]),
      routeCumulativeMiles: numeric(row["Route cumulative miles"]),
      generatedSitePath: clean(row["Generated site path"]),
      localPreview,
      localPreviewExists: Boolean(localPreview),
      livePreview: clean(row["Vercel link"]),
      defaultPreview: localPreview || clean(row["Vercel link"]),
      githubLink: clean(row["GitHub link"]),
      stripeMonthlyLink: clean(row["Stripe $20/mo link"] || row["Payment link"]),
      stripeSetupLink: clean(row["Stripe $100/mo for 6 months then $30/year link"]),
      heroImageUrl: clean(row["Hero image URL"]),
      heroImageSource: clean(row["Hero image source"]),
      profileImageUrl: clean(row["Profile image URL"]),
      profileImageSource: clean(row["Profile image source"]),
      photoProfileSource: clean(row["Photo/profile source"]),
      brandPalette: parsePalette(row["Brand palette"]),
      styleRationale: clean(row["Style rationale"]),
    };
    company.searchText = [
      company.name,
      company.address,
      company.city,
      company.phone,
      company.category,
      company.categoryLabel,
      company.websiteStatus,
      company.leadStatus,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return company;
  });

  return {
    sourceCsv: path.basename(csvPath),
    generatedAt: new Date().toISOString(),
    total: companies.length,
    localPreviewCount: companies.filter((company) => company.localPreviewExists).length,
    mappedCount: companies.filter((company) => company.latitude !== null && company.longitude !== null).length,
    companies,
  };
}

const rows = parseCsv(fs.readFileSync(csvPath, "utf8")).map((row) => ({
  ...row,
  slug: path.basename(String(row["Generated site path"] || "").replace(/\/$/, "")),
}));

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(deliverables, path.join(dist, "deliverables"), { recursive: true });
fs.writeFileSync(path.join(dist, "data.json"), JSON.stringify(rows));
fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nDisallow: /sales-dashboard/\nAllow: /\n");

for (const row of rows) {
  const source = path.join(root, row.slug);
  const target = path.join(dist, row.slug);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing generated page directory for ${row.Business}: ${source}`);
  }
  fs.cpSync(source, target, { recursive: true });
}

if (!fs.existsSync(dashboardSource)) {
  throw new Error(`Missing dashboard source directory: ${dashboardSource}`);
}

const dashboardTarget = path.join(dist, "sales-dashboard");
fs.cpSync(dashboardSource, dashboardTarget, { recursive: true });
fs.mkdirSync(path.join(dashboardTarget, "data"), { recursive: true });
fs.writeFileSync(
  path.join(dashboardTarget, "data", "companies.js"),
  `window.COMPANY_DASHBOARD_DATA = ${JSON.stringify(buildDashboardData(rows))};\n`,
);

const cards = rows
  .map(
    (row) =>
      `<li><a href="/${escapeHtml(row.slug)}/"><span class="business-name">${escapeHtml(row.Business)}</span><span>${escapeHtml(row.Category)} · Stop ${escapeHtml(row["Route stop"])}</span></a></li>`,
  )
  .join("\n");

fs.writeFileSync(
  path.join(dist, "index.html"),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bay Area Filtered Websites</title>
  <style>
    *{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f8fafc;color:#111827;line-height:1.5;font-weight:400}header{padding:48px clamp(20px,5vw,72px);background:#111827;color:white}h1{margin:0;font-size:clamp(36px,5vw,72px);line-height:.95;letter-spacing:0}header p{max-width:760px;font-size:18px;color:#d1d5db}main{padding:32px clamp(20px,5vw,72px)}ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}a{display:block;min-height:88px;padding:16px;background:white;border:1px solid #e5e7eb;color:#111827;text-decoration:none}a:hover{border-color:#111827}span{display:block}.business-name{font-size:16px;color:#111827}a span+span{margin-top:8px;color:#64748b;font-size:14px}
  </style>
</head>
<body>
  <header>
    <h1>Bay Area Filtered Websites</h1>
    <p>Static bundle of ${rows.length} generated local-business websites after removing Google-audited existing-website matches.</p>
  </header>
  <main><ul>${cards}</ul></main>
</body>
</html>
`,
);

console.log(`Built ${rows.length} pages into ${dist}`);
