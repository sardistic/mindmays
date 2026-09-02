import { readFile } from "node:fs/promises";

const websiteId = "362a86f4-7b10-4455-a860-3164746e841f";
for (const file of ["index.html", "classic.html"]) {
  const html = await readFile(new URL(`../public/${file}`, import.meta.url), "utf8");
  const trackers = [...html.matchAll(/<script\b[^>]*analytics\.sardistic\.com\/script\.js[^>]*><\/script>/g)];
  if (trackers.length !== 1) throw new Error(`${file} must contain exactly one Umami tracker, found ${trackers.length}`);
  const tracker = trackers[0][0];
  if (!tracker.includes(`data-website-id="${websiteId}"`)) throw new Error(`${file} has the wrong Umami website ID`);
  if (!tracker.includes('data-domains="maze.sardistic.com"')) throw new Error(`${file} must reject non-production analytics traffic`);
  if (!tracker.includes('data-cfasync="false"') || !tracker.includes("defer")) throw new Error(`${file} must load Umami safely behind Cloudflare`);
}

console.log("analytics=ok pages=2 domain=maze.sardistic.com");
