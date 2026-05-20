import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

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
      } else if (char === '"') inQuotes = false;
      else field += char;
    } else if (char === '"') inQuotes = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") field += char;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [headers, ...data] = rows.filter((cells) => cells.some((cell) => cell.trim()));
  return data.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""])));
}

const csv = fs.readFileSync(path.join(root, "deliverables", "bay-area-final-1000-websites.csv"), "utf8");
const rows = parseCsv(csv).map((row) => ({
  ...row,
  slug: path.basename(String(row["Generated site path"] || "").replace(/\/$/, "")),
}));
const appShell = path.join(root, "app-index.html");

fs.writeFileSync(path.join(dist, "data.json"), JSON.stringify(rows));
fs.copyFileSync(appShell, path.join(dist, "index.html"));
for (const row of rows) {
  if (!row.slug) continue;
  const dir = path.join(dist, row.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(appShell, path.join(dir, "index.html"));
}
fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\n");
