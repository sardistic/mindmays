import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EXPANDED_QUESTIONS } from "../public/classic-question-bank.js";

const classicSource = await readFile(new URL("../public/classic.js", import.meta.url), "utf8");
const baseMatch = classicSource.match(/const BASE_QUESTIONS = (\[[\s\S]*?\n\]);\n\nconst QUESTIONS/);
if (!baseMatch) throw new Error("Could not locate BASE_QUESTIONS in classic.js");
const baseQuestions = Function(`"use strict"; return ${baseMatch[1]};`)();
const questions = [...baseQuestions, ...EXPANDED_QUESTIONS];
if (questions.length !== 400) throw new Error(`Expected 400 questions, found ${questions.length}`);

const cachePath = join(tmpdir(), "wikimaze-question-audit-cache.json");
let fullExtractCache = {};
try { fullExtractCache = JSON.parse(await readFile(cachePath, "utf8")); } catch { /* A cold audit has no cache. */ }

const batches = [];
const uniqueSources = [...new Set(questions.map((question) => question.source))];
for (let index = 0; index < uniqueSources.length; index += 20) batches.push(uniqueSources.slice(index, index + 20));

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
async function queryWikipedia(parameters, batchIndex) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch("https://en.wikipedia.org/w/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "WikiMazeQuestionAudit/1.0 (educational browser game)" },
      body: parameters,
      signal: AbortSignal.timeout(30000),
    });
    if (response.ok) return response.json();
    if (response.status !== 429 || attempt === 4) throw new Error(`Wikipedia batch ${batchIndex + 1} returned ${response.status}`);
    await delay(Math.max(1500, Number(response.headers.get("retry-after") || 0) * 1000));
  }
}

const pagesByRequestedTitle = new Map();
for (const [batchIndex, titles] of batches.entries()) {
  const parameters = new URLSearchParams({
    action: "query",
    format: "json",
    redirects: "1",
    prop: "extracts|info",
    exintro: "1",
    exlimit: "max",
    explaintext: "1",
    inprop: "url",
    titles: titles.join("|"),
  });
  const data = await queryWikipedia(parameters, batchIndex);
  const aliases = new Map(titles.map((title) => [title, title]));
  for (const item of data.query?.normalized || []) aliases.set(item.from, item.to);
  for (const item of data.query?.redirects || []) aliases.set(item.from, item.to);
  const pages = new Map(Object.values(data.query?.pages || {}).map((page) => [page.title, page]));
  for (const requested of titles) {
    let canonical = aliases.get(requested) || requested;
    const seen = new Set();
    while (aliases.has(canonical) && aliases.get(canonical) !== canonical && !seen.has(canonical)) { seen.add(canonical); canonical = aliases.get(canonical); }
    pagesByRequestedTitle.set(requested, pages.get(canonical) || pages.get(requested) || { title: canonical, missing: true });
  }
  await delay(500);
}

const normalize = (value) => String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const stopWords = new Set(["a", "an", "and", "at", "by", "for", "from", "in", "of", "on", "the", "to", "with"]);
const answerIsEvidenced = (answer, page) => {
  const evidence = normalize(`${page.title || ""} ${page.extract || ""}`), exact = normalize(answer);
  if (evidence.includes(exact)) return true;
  const tokens = exact.split(" ").filter((token) => token.length > 2 && !stopWords.has(token));
  return tokens.length > 0 && tokens.filter((token) => evidence.includes(token)).length / tokens.length >= .75;
};

const missingSources = uniqueSources.filter((source) => pagesByRequestedTitle.get(source)?.missing !== undefined);
let weakEvidence = questions.filter((question) => !answerIsEvidenced(question.answers[question.correct], pagesByRequestedTitle.get(question.source) || {}));

// Article leads are deliberately concise. Recheck only apparent misses against the
// complete article before treating them as unsupported.
const fullExtractSources = [...new Set(weakEvidence.map((question) => question.source))];
for (let index = 0; index < fullExtractSources.length; index += 1) {
  const titles = fullExtractSources.slice(index, index + 1);
  const currentPage = pagesByRequestedTitle.get(titles[0]);
  const cachedPage = fullExtractCache[titles[0]];
  if (cachedPage?.lastrevid === currentPage?.lastrevid && cachedPage.extract) {
    pagesByRequestedTitle.set(titles[0], { ...currentPage, extract: cachedPage.extract });
    continue;
  }
  const parameters = new URLSearchParams({
    action: "query",
    format: "json",
    redirects: "1",
    prop: "extracts|info",
    exlimit: "max",
    explaintext: "1",
    inprop: "url",
    titles: titles.join("|"),
  });
  const data = await queryWikipedia(parameters, batches.length + index);
  const aliases = new Map(titles.map((title) => [title, title]));
  for (const item of data.query?.normalized || []) aliases.set(item.from, item.to);
  for (const item of data.query?.redirects || []) aliases.set(item.from, item.to);
  const pages = new Map(Object.values(data.query?.pages || {}).map((page) => [page.title, page]));
  for (const requested of titles) {
    let canonical = aliases.get(requested) || requested;
    const seen = new Set();
    while (aliases.has(canonical) && aliases.get(canonical) !== canonical && !seen.has(canonical)) { seen.add(canonical); canonical = aliases.get(canonical); }
    const page = pages.get(canonical) || pages.get(requested) || { title: canonical, missing: true };
    pagesByRequestedTitle.set(requested, page);
    if (page.extract && page.lastrevid) fullExtractCache[requested] = { lastrevid: page.lastrevid, extract: page.extract };
  }
  await delay(500);
}
await writeFile(cachePath, JSON.stringify(fullExtractCache), "utf8");
weakEvidence = questions.filter((question) => !answerIsEvidenced(question.answers[question.correct], pagesByRequestedTitle.get(question.source) || {}));

console.log(`question-audit questions=${questions.length} sources=${uniqueSources.length} resolved=${uniqueSources.length - missingSources.length} missing=${missingSources.length} weak-evidence=${weakEvidence.length}`);
if (missingSources.length) console.log(`MISSING\n${missingSources.join("\n")}`);
if (weakEvidence.length) console.log(`WEAK EVIDENCE\n${weakEvidence.map((question) => `${question.source} :: ${question.answers[question.correct]} :: ${question.prompt}`).join("\n")}`);
if (missingSources.length || weakEvidence.length) process.exitCode = 1;
