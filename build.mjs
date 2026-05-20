import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dist = path.join(root, "dist");
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.name === "dist" || entry.name === ".git" || entry.name === "node_modules") continue;
  const from = path.join(root, entry.name);
  const to = path.join(dist, entry.name);
  if (entry.isDirectory()) fs.cpSync(from, to, { recursive: true });
  else if (["index.html", "robots.txt", "sitemap.xml"].includes(entry.name)) fs.copyFileSync(from, to);
}
