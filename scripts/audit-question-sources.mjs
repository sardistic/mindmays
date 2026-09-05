import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EXPANDED_QUESTIONS } from "../public/classic-question-bank.js";
import { SUDDEN_QUESTIONS } from "../public/sudden-questions.js";

const classicSource = await readFile(new URL("../public/classic.js", import.meta.url), "utf8");
const baseMatch = classicSource.match(/const BASE_QUESTIONS = (\[[\s\S]*?\n\]);\n\nconst QUESTIONS/);
if (!baseMatch) throw new Error("Could not locate BASE_QUESTIONS in classic.js");
const baseQuestions = Function(`"use strict"; return ${baseMatch[1]};`)();
const questions = [...baseQuestions, ...EXPANDED_QUESTIONS, ...SUDDEN_QUESTIONS];
const MIN_AUDITED = Number(process.env.WIKIMAZE_MIN_QUESTIONS) || 10000;
if (questions.length < MIN_AUDITED) throw new Error(`Expected the full bank to be audited, found only ${questions.length} questions`);

// The bank is far larger than the article set behind it, so the audit works on the
// distinct source-and-answer pairs rather than re-checking the same claim once per
// phrasing.
const claims = new Map();
const authoredSources = new Set();
let authoredCount = 0;
for (const question of questions) {
  // An authored question answers in the project's own prose — either a mirror of a fact
  // already checked in its quotable direction, or a description written for the player.
  // Its article must still resolve; its wording is not the article's to quote.
  if (question.authored) { authoredSources.add(question.source); authoredCount += 1; continue; }
  const answer = question.answer || question.answers[question.correct];
  const key = `${question.source} :: ${answer}`;
  if (!claims.has(key)) claims.set(key, { source: question.source, answer, prompt: question.prompt });
}

// A short list of claims read by hand and found true, but whose wording the article does
// not carry — an authored description, or a datum the extracts API strips out of the
// infobox. It is checked in so the exemptions are reviewable, and it is verified in both
// directions so it cannot drift away from the bank.
const allowlist = JSON.parse(await readFile(new URL("./question-audit-allowlist.json", import.meta.url), "utf8"));
const allowed = new Set(allowlist.claims.map((claim) => `${claim.source} :: ${claim.answer}`));

const cachePath = join(tmpdir(), "wikimaze-question-audit-cache.json");
let fullExtractCache = {};
try { fullExtractCache = JSON.parse(await readFile(cachePath, "utf8")); } catch { /* A cold audit has no cache. */ }

const batches = [];
const uniqueSources = [...new Set([...[...claims.values()].map((claim) => claim.source), ...authoredSources])];
for (let index = 0; index < uniqueSources.length; index += 20) batches.push(uniqueSources.slice(index, index + 20));

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
async function queryWikipedia(parameters, batchIndex) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch("https://en.wikipedia.org/w/api.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "WikiMazeQuestionAudit/1.0 (educational browser game)" },
        body: parameters,
        signal: AbortSignal.timeout(30000),
      });
      if (response.ok) return response.json();
      if (response.status !== 429 || attempt === 4) throw new Error(`Wikipedia batch ${batchIndex + 1} returned ${response.status}`);
      await delay(Math.max(1500, Number(response.headers.get("retry-after") || 0) * 1000));
    } catch (error) {
      if (attempt === 4 || /^Wikipedia batch/.test(String(error?.message))) throw error;
      await delay(1200 * (attempt + 1));
    }
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

// The bank is written in British spelling and the encyclopedia largely is not. Folding
// the two keeps the check about the fact rather than about the dictionary.
const spellings = [
  [/isation/g, "ization"], [/ised\b/g, "ized"], [/ising\b/g, "izing"], [/ise\b/g, "ize"],
  [/yse\b/g, "yze"], [/aemia/g, "emia"], [/oe/g, "e"], [/ae/g, "e"],
  [/ogue\b/g, "og"], [/metre/g, "meter"], [/litre/g, "liter"], [/fibre/g, "fiber"], [/centre/g, "center"],
  [/theatre/g, "theater"], [/defence/g, "defense"], [/offence/g, "offense"], [/licence/g, "license"],
  [/practise/g, "practice"], [/grey/g, "gray"], [/mould/g, "mold"], [/colour/g, "color"], [/behaviour/g, "behavior"],
  [/favour/g, "favor"], [/honour/g, "honor"], [/labour/g, "labor"], [/neighbour/g, "neighbor"], [/tyre/g, "tire"],
  [/plough/g, "plow"], [/storey/g, "story"], [/jewellery/g, "jewelry"], [/goitre/g, "goiter"],
];
// Wikipedia writes some ordinals as words and some as digits, often within one article
// ("the second president", "the 16th president"). Fold them to one form so the check is
// about the number rather than about the house style of the page.
const ordinals = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth",
  "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth"];
const tens = { twenty: 20, thirty: 30, forty: 40, fifty: 50 };
const ordinalWords = new Map();
for (const [index, word] of ordinals.entries()) if (index) ordinalWords.set(word, index);
for (const [tensWord, tensValue] of Object.entries(tens)) {
  ordinalWords.set(`${tensWord.slice(0, -1)}ieth`, tensValue);
  for (let unit = 1; unit <= 9; unit++) ordinalWords.set(`${tensWord} ${ordinals[unit]}`, tensValue + unit);
}
const foldOrdinals = (text) => {
  let folded = text;
  for (const [word, value] of [...ordinalWords].sort((a, b) => b[0].length - a[0].length)) {
    folded = folded.replace(new RegExp(`\\b${word}\\b`, "g"), String(value));
  }
  return folded.replace(/\b(\d+)(st|nd|rd|th)\b/g, "$1");
};
const normalize = (value) => {
  let text = String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  for (const [pattern, replacement] of spellings) text = text.replace(pattern, replacement);
  return foldOrdinals(text);
};
const stopWords = new Set(["a", "an", "and", "at", "by", "for", "from", "in", "of", "on", "the", "to", "with"]);
const answerIsEvidenced = (answer, page) => {
  const evidence = normalize(`${page.title || ""} ${page.extract || ""}`), exact = normalize(answer);
  if (evidence.includes(exact)) return true;
  const tokens = exact.split(" ").filter((token) => token.length > 2 && !stopWords.has(token));
  return tokens.length > 0 && tokens.filter((token) => evidence.includes(token)).length / tokens.length >= .75;
};

const missingSources = uniqueSources.filter((source) => pagesByRequestedTitle.get(source)?.missing !== undefined);
let weakEvidence = [...claims.values()].filter((claim) => !answerIsEvidenced(claim.answer, pagesByRequestedTitle.get(claim.source) || {}));

// Article leads are deliberately concise. Recheck only apparent misses against the
// complete article before treating them as unsupported.
// Full extracts cannot be batched — the API caps exlimit at one without exintro — so
// this phase is one request per article. A small pool keeps a bank of several thousand
// sources auditable in minutes rather than the best part of an hour.
const CONCURRENCY = 4;
const fullExtractSources = [...new Set(weakEvidence.map((claim) => claim.source))];
let nextFullExtract = 0;
async function fetchFullExtract(requested, requestIndex) {
  const currentPage = pagesByRequestedTitle.get(requested);
  const cachedPage = fullExtractCache[requested];
  // A missing article has no revision id, and neither does an absent cache entry;
  // only treat the cache as fresh when a real revision id matches on both sides.
  if (cachedPage?.lastrevid && cachedPage.lastrevid === currentPage?.lastrevid && cachedPage.extract) {
    pagesByRequestedTitle.set(requested, { ...currentPage, extract: cachedPage.extract });
    return;
  }
  const parameters = new URLSearchParams({
    action: "query",
    format: "json",
    redirects: "1",
    prop: "extracts|info",
    exlimit: "max",
    explaintext: "1",
    inprop: "url",
    titles: requested,
  });
  const data = await queryWikipedia(parameters, batches.length + requestIndex);
  const aliases = new Map([[requested, requested]]);
  for (const item of data.query?.normalized || []) aliases.set(item.from, item.to);
  for (const item of data.query?.redirects || []) aliases.set(item.from, item.to);
  const pages = new Map(Object.values(data.query?.pages || {}).map((page) => [page.title, page]));
  let canonical = aliases.get(requested) || requested;
  const seen = new Set();
  while (aliases.has(canonical) && aliases.get(canonical) !== canonical && !seen.has(canonical)) { seen.add(canonical); canonical = aliases.get(canonical); }
  const page = pages.get(canonical) || pages.get(requested) || { title: canonical, missing: true };
  pagesByRequestedTitle.set(requested, page);
  if (page.extract && page.lastrevid) fullExtractCache[requested] = { lastrevid: page.lastrevid, extract: page.extract };
  await delay(250);
}
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, fullExtractSources.length) }, async () => {
  while (nextFullExtract < fullExtractSources.length) {
    const index = nextFullExtract++;
    await fetchFullExtract(fullExtractSources[index], index);
  }
}));
await writeFile(cachePath, JSON.stringify(fullExtractCache), "utf8");
weakEvidence = [...claims.values()].filter((claim) => !answerIsEvidenced(claim.answer, pagesByRequestedTitle.get(claim.source) || {}));

const staleAllowances = [...allowed].filter((key) => !claims.has(key));
const unexplained = weakEvidence.filter((claim) => !allowed.has(`${claim.source} :: ${claim.answer}`));
console.log(`question-audit questions=${questions.length} claims=${claims.size} authored=${authoredCount} sources=${uniqueSources.length} resolved=${uniqueSources.length - missingSources.length} missing=${missingSources.length} evidenced=${claims.size - weakEvidence.length} reviewed=${weakEvidence.length - unexplained.length} unexplained=${unexplained.length} stale-allowances=${staleAllowances.length}`);
if (missingSources.length) console.log(`MISSING\n${missingSources.join("\n")}`);
if (unexplained.length) console.log(`WEAK EVIDENCE\n${unexplained.map((claim) => `${claim.source} :: ${claim.answer} :: ${claim.prompt}`).join("\n")}`);
if (staleAllowances.length) console.log(`STALE ALLOWANCES\n${staleAllowances.join("\n")}`);
if (missingSources.length || unexplained.length || staleAllowances.length) process.exitCode = 1;
