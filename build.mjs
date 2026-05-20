import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const deliverables = path.join(root, "deliverables");
const csvPath = path.join(deliverables, "bay-area-final-1000-websites.csv");

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

const rows = parseCsv(fs.readFileSync(csvPath, "utf8")).map((row) => ({
  ...row,
  slug: path.basename(String(row["Generated site path"] || "").replace(/\/$/, "")),
}));

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(deliverables, path.join(dist, "deliverables"), { recursive: true });
fs.writeFileSync(path.join(dist, "data.json"), JSON.stringify(rows));
fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\n");

for (const row of rows) {
  const source = path.join(root, row.slug);
  const target = path.join(dist, row.slug);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing generated page directory for ${row.Business}: ${source}`);
  }
  fs.cpSync(source, target, { recursive: true });
}

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
  <title>Bay Area Final 1000 Websites</title>
  <style>
    *{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f8fafc;color:#111827;line-height:1.5;font-weight:400}header{padding:48px clamp(20px,5vw,72px);background:#111827;color:white}h1{margin:0;font-size:clamp(36px,5vw,72px);line-height:.95;letter-spacing:0}header p{max-width:760px;font-size:18px;color:#d1d5db}main{padding:32px clamp(20px,5vw,72px)}ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}a{display:block;min-height:88px;padding:16px;background:white;border:1px solid #e5e7eb;color:#111827;text-decoration:none}a:hover{border-color:#111827}span{display:block}.business-name{font-size:16px;color:#111827}a span+span{margin-top:8px;color:#64748b;font-size:14px}
  </style>
</head>
<body>
  <header>
    <h1>Bay Area Final 1000 Websites</h1>
    <p>Static bundle of 1000 generated local-business websites from verified no-owned-website leads within the San Carlos driving region.</p>
  </header>
  <main><ul>${cards}</ul></main>
</body>
</html>
`,
);

console.log(`Built ${rows.length} pages into ${dist}`);
