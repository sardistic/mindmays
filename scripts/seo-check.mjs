import { readFile } from "node:fs/promises";

const pages = new Map([
  ["index.html", "https://entries.page/"],
  ["classic.html", "https://entries.page/classic.html"],
  ["walk.html", "https://entries.page/walk.html"],
  ["sudden.html", "https://entries.page/sudden.html"],
  ["how-to-play/index.html", "https://entries.page/how-to-play/"],
  ["game-modes/index.html", "https://entries.page/game-modes/"],
  ["strategy/index.html", "https://entries.page/strategy/"],
  ["faq/index.html", "https://entries.page/faq/"],
  ["about/index.html", "https://entries.page/about/"],
  ["news/introducing-entries/index.html", "https://entries.page/news/introducing-entries/"],
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
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"',
  ]) {
    if (!html.includes(required)) throw new Error(`${file} is missing SEO marker: ${required}`);
  }
  if (html.includes("maze.sardistic.com")) throw new Error(`${file} still references the legacy hostname`);
}

const home = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
for (const link of ["/how-to-play/", "/game-modes/", "/about/"]) {
  if (!home.includes(`href="${link}"`)) throw new Error(`Homepage is missing crawlable internal link: ${link}`);
}
if (!home.toLowerCase().includes("wikipedia-powered knowledge game")) throw new Error("Homepage must visibly explain the game in search language");

const socialImage = await readFile(new URL("../public/assets/entries-social.jpg", import.meta.url));
if (socialImage.length > 400_000) throw new Error(`Social image is too large: ${socialImage.length} bytes`);

const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
if (!robots.includes("https://entries.page/sitemap.xml")) throw new Error("robots.txt does not advertise the canonical sitemap");
const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
for (const canonical of pages.values()) if (!sitemap.includes(`<loc>${canonical}</loc>`)) throw new Error(`sitemap.xml is missing ${canonical}`);

const server = await readFile(new URL("../server.js", import.meta.url), "utf8");
if (!server.includes('"maze.sardistic.com"') || !server.includes("response.writeHead(301")) throw new Error("The legacy host must permanently redirect");

console.log(`seo=ok pages=${pages.size} canonical=https://entries.page/ legacy_redirect=301`);
