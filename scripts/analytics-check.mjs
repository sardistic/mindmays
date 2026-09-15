import { readFile } from "node:fs/promises";

const websiteId = "362a86f4-7b10-4455-a860-3164746e841f";
const files = [
  "index.html", "walk.html", "classic.html", "sudden.html",
  "how-to-play/index.html", "game-modes/index.html", "strategy/index.html",
  "faq/index.html", "about/index.html", "news/introducing-entries/index.html",
];
for (const file of files) {
  const html = await readFile(new URL(`../public/${file}`, import.meta.url), "utf8");
  const trackers = [...html.matchAll(/<script\b[^>]*analytics\.sardistic\.com\/script\.js[^>]*><\/script>/g)];
  if (trackers.length !== 1) throw new Error(`${file} must contain exactly one Umami tracker, found ${trackers.length}`);
  const tracker = trackers[0][0];
  if (!tracker.includes(`data-website-id="${websiteId}"`)) throw new Error(`${file} has the wrong Umami website ID`);
  if (!tracker.includes('data-domains="entries.page"')) throw new Error(`${file} must reject non-production analytics traffic`);
  if (!tracker.includes('data-cfasync="false"') || !tracker.includes("defer") || !tracker.includes("async")) throw new Error(`${file} must load Umami safely and without blocking gameplay behind Cloudflare`);
}

console.log(`analytics=ok pages=${files.length} domain=entries.page`);
