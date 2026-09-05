// The bank is stored as families of facts rather than as finished questions. Every
// fact is one row of [clue, Wikipedia article, answer]; every family declares one or
// more forms that turn a row into a question, so a single verified fact supplies
// several distinct prompts and the shipped data stays small enough to read.
import { soft } from "./questions/case.js";
import { GEOGRAPHY_FAMILIES } from "./questions/geography.js";
import { SCIENCE_FAMILIES } from "./questions/science.js";
import { LIFE_FAMILIES } from "./questions/life.js";
import { HISTORY_FAMILIES } from "./questions/history.js";
import { ARTS_FAMILIES } from "./questions/arts.js";
import { LANGUAGE_FAMILIES } from "./questions/language.js";
import { ASTRONOMY_FAMILIES } from "./questions/astronomy.js";
import { MATHEMATICS_FAMILIES } from "./questions/mathematics.js";
import { COMPUTING_FAMILIES } from "./questions/computing.js";
import { MUSIC_FAMILIES } from "./questions/music.js";
import { MYTHOLOGY_FAMILIES } from "./questions/mythology.js";
import { GEOGRAPHY2_FAMILIES } from "./questions/geography2.js";
import { SCIENCE2_FAMILIES } from "./questions/science2.js";
import { LIFE2_FAMILIES } from "./questions/life2.js";
import { GEOGRAPHY3_FAMILIES } from "./questions/geography3.js";
import { HISTORY2_FAMILIES } from "./questions/history2.js";
import { LITERATURE2_FAMILIES } from "./questions/literature2.js";
import { SPORTS_FAMILIES } from "./questions/sports.js";
import { ABBREVIATION_FAMILIES } from "./questions/abbreviations.js";
import { PEOPLE_FAMILIES } from "./questions/people.js";
import { WORLD_FAMILIES } from "./questions/world.js";
import { CULTURE2_FAMILIES } from "./questions/culture2.js";
import { ASTRONOMY2_FAMILIES } from "./questions/astronomy2.js";
import { SCIENCE3_FAMILIES } from "./questions/science3.js";
import { LANGUAGE3_FAMILIES } from "./questions/language3.js";
import { COMPUTING2_FAMILIES } from "./questions/computing2.js";
import { NATURE_FAMILIES } from "./questions/nature.js";
import { HISTORY3_FAMILIES } from "./questions/history3.js";
import { MUSIC2_FAMILIES } from "./questions/music2.js";
import { EVERYDAY_FAMILIES } from "./questions/everyday.js";
import { MEDICINE_FAMILIES } from "./questions/medicine.js";
import { GEOGRAPHY4_FAMILIES } from "./questions/geography4.js";
import { ARTS3_FAMILIES } from "./questions/arts3.js";
import { SCIENCE4_FAMILIES } from "./questions/science4.js";
import { BINOMIALS2_FAMILIES } from "./questions/binomials2.js";
import { ABBREVIATIONS2_FAMILIES } from "./questions/abbreviations2.js";
import { RECORDS_FAMILIES } from "./questions/records.js";
import { WORKS_FAMILIES } from "./questions/works.js";
import { PLACES_FAMILIES } from "./questions/places.js";
import { TERMS_FAMILIES } from "./questions/terms.js";
import { MYTHOLOGY2_FAMILIES } from "./questions/mythology2.js";
import { TERMS2_FAMILIES } from "./questions/terms2.js";
import { SCIENCE5_FAMILIES } from "./questions/science5.js";
import { CULTURE3_FAMILIES } from "./questions/culture3.js";
import { WORLD2_FAMILIES } from "./questions/world2.js";
import { TERMS3_FAMILIES } from "./questions/terms3.js";
import { HISTORY4_FAMILIES } from "./questions/history4.js";
import { LANGUAGE4_FAMILIES } from "./questions/language4.js";
import { TERMS4_FAMILIES } from "./questions/terms4.js";
import { TERMS5_FAMILIES } from "./questions/terms5.js";

const FAMILIES = [
  ...GEOGRAPHY_FAMILIES, ...SCIENCE_FAMILIES, ...LIFE_FAMILIES, ...HISTORY_FAMILIES, ...ARTS_FAMILIES,
  ...LANGUAGE_FAMILIES, ...ASTRONOMY_FAMILIES, ...MATHEMATICS_FAMILIES, ...COMPUTING_FAMILIES, ...MUSIC_FAMILIES, ...MYTHOLOGY_FAMILIES, ...GEOGRAPHY2_FAMILIES, ...SCIENCE2_FAMILIES, ...LIFE2_FAMILIES, ...GEOGRAPHY3_FAMILIES, ...HISTORY2_FAMILIES, ...LITERATURE2_FAMILIES, ...SPORTS_FAMILIES, ...ABBREVIATION_FAMILIES, ...PEOPLE_FAMILIES, ...WORLD_FAMILIES, ...CULTURE2_FAMILIES, ...ASTRONOMY2_FAMILIES, ...SCIENCE3_FAMILIES, ...LANGUAGE3_FAMILIES, ...COMPUTING2_FAMILIES, ...NATURE_FAMILIES, ...HISTORY3_FAMILIES, ...MUSIC2_FAMILIES, ...EVERYDAY_FAMILIES, ...MEDICINE_FAMILIES, ...GEOGRAPHY4_FAMILIES, ...ARTS3_FAMILIES, ...SCIENCE4_FAMILIES, ...BINOMIALS2_FAMILIES, ...ABBREVIATIONS2_FAMILIES, ...RECORDS_FAMILIES, ...WORKS_FAMILIES, ...PLACES_FAMILIES, ...TERMS_FAMILIES, ...MYTHOLOGY2_FAMILIES, ...TERMS2_FAMILIES, ...SCIENCE5_FAMILIES, ...CULTURE3_FAMILIES, ...WORLD2_FAMILIES, ...TERMS3_FAMILIES, ...HISTORY4_FAMILIES, ...LANGUAGE4_FAMILIES, ...TERMS4_FAMILIES, ...TERMS5_FAMILIES,
];

function hashText(value) {
  let result = 2166136261;
  for (const character of String(value)) { result ^= character.charCodeAt(0); result = Math.imul(result, 16777619); }
  return result >>> 0;
}

// Distractors are drawn from the same family so every option is the same kind of
// thing, which is what makes a wrong answer plausible rather than obviously wrong.
function pickDistractors(pool, banned, seed) {
  const options = [];
  const size = pool.length;
  for (let step = 1; options.length < 3 && step < size + 3; step++) {
    const candidate = pool[(seed + step * 7 + step * step) % size];
    if (banned.has(candidate) || options.includes(candidate)) continue;
    options.push(candidate);
  }
  for (const candidate of pool) {
    if (options.length >= 3) break;
    if (!banned.has(candidate) && !options.includes(candidate)) options.push(candidate);
  }
  return options;
}

function expandFamily(family, familyIndex) {
  const [minLevel, maxLevel] = family.levels || [1, 4];
  const span = maxLevel - minLevel + 1;
  const clues = family.facts.map(([clue]) => clue);
  const answers = family.facts.map((fact) => fact[2]);
  const questions = [];
  // A family whose clue is a description earns a second, genuinely different question:
  // recognising the description from the term, rather than the term from the description.
  const forms = [...family.forms];
  if (family.describe) forms.push({ mirror: true, reverse: true, prompt: (definition, term) => `Which of these best describes ${soft(term)}?`, explain: (definition, term) => `${term}: ${soft(definition)}.` });
  // The mirror of `describe`: the clue is the thing and the answer describes it, so the
  // second question asks the reader to name the thing from its description.
  if (family.identify) forms.push({ mirror: true, reverse: true, prompt: (thing, description) => `Which of these is best described as ${soft(description)}?`, explain: (thing, description) => `${thing}: ${soft(description)}.` });
  for (const [formIndex, form] of forms.entries()) {
    const pool = [...new Set(form.reverse ? clues : answers)];
    if (pool.length < 4) continue;
    for (const [factIndex, [clue, source, answer]] of family.facts.entries()) {
      const correctValue = form.reverse ? clue : answer;
      // A reversed question must not offer a second true answer: every other clue
      // that shares this answer is barred from the options.
      const banned = form.reverse
        ? new Set(family.facts.filter((fact) => fact[2] === answer).map((fact) => fact[0]))
        : new Set(family.facts.filter((fact) => fact[0] === clue).map((fact) => fact[2]));
      const seed = hashText(`${family.category}|${formIndex}|${clue}|${answer}`);
      const distractors = pickDistractors(pool, banned, seed % pool.length);
      if (distractors.length < 3) continue;
      const correct = seed % 4;
      const options = [...distractors];
      options.splice(correct, 0, correctValue);
      questions.push({
        // A mirror question restates the family's fact from the other side, and a
        // family marked `paraphrase` answers in authored prose rather than in the
        // article's words. Neither can be evidenced by quotation, and the audit
        // reports them apart from the claims it does check.
        ...(form.mirror || family.paraphrase ? { authored: true } : {}),
        category: form.category || family.category,
        difficulty: minLevel + ((factIndex + formIndex + familyIndex) % span),
        source,
        prompt: form.prompt(clue, answer),
        answers: options,
        correct,
        explanation: form.explain(clue, answer),
      });
    }
  }
  return questions;
}

const expanded = FAMILIES.flatMap(expandFamily);

// A prompt must be unique across the whole bank: two families can legitimately reach
// the same wording, and a repeated prompt would defeat the recent-question memory.
const seenPrompts = new Set();
export const EXPANDED_QUESTIONS = expanded.filter((question) => {
  if (seenPrompts.has(question.prompt)) return false;
  seenPrompts.add(question.prompt);
  return true;
});

export const QUESTION_FAMILIES = FAMILIES;
