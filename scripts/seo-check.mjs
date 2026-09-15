import { readFile } from "node:fs/promises";

const pages = new Map([
  ["index.html", "https://entries.page/"],
  ["classic.html", "https://entries.page/classic.html"],
  ["walk.html", "https://entries.page/walk.html"],
  ["sudden.html", "https://entries.page/sudden.html"],
]);

for (const [file, canonical] of pages) {
  const html = await readFile(new URL(`../public/${file}`, import.meta.url), "utf8");
  for (const required of [
    `<link rel="canonical" href="${canonical}"`,
    'meta name="description"',
    'meta name="robots"',
    'property="og:title"',
    'property="og:description"',
    `property="og:url" content="${canonical}"`,
    'property="og:image"',
    'name="twitter:card"',
  ]) {
    if (!html.includes(required)) throw new Error(`${file} is missing SEO marker: ${required}`);
  }
  if (html.includes("maze.sardistic.com")) throw new Error(`${file} still references the legacy hostname`);
}

const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
if (!robots.includes("https://entries.page/sitemap.xml")) throw new Error("robots.txt does not advertise the canonical sitemap");
const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
for (const canonical of pages.values()) if (!sitemap.includes(`<loc>${canonical}</loc>`)) throw new Error(`sitemap.xml is missing ${canonical}`);

const server = await readFile(new URL("../server.js", import.meta.url), "utf8");
if (!server.includes('"maze.sardistic.com"') || !server.includes("response.writeHead(301")) throw new Error("The legacy host must permanently redirect");

console.log(`seo=ok pages=${pages.size} canonical=https://entries.page/ legacy_redirect=301`);
