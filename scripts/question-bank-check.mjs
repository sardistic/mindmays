import { EXPANDED_QUESTIONS, QUESTION_FAMILIES } from "../public/classic-question-bank.js";

const MINIMUM = 10000;
if (EXPANDED_QUESTIONS.length < MINIMUM) throw new Error(`Expected at least ${MINIMUM} expanded questions, found ${EXPANDED_QUESTIONS.length}`);

const prompts = new Set();
for (const [index, question] of EXPANDED_QUESTIONS.entries()) {
  if (!question.prompt || !question.source || !question.explanation) throw new Error(`Question ${index} is missing required text`);
  if (![1, 2, 3, 4].includes(question.difficulty)) throw new Error(`Question ${index} has invalid difficulty`);
  if (question.answers.length !== 4 || new Set(question.answers).size !== 4) throw new Error(`Question ${index} does not have four distinct answers`);
  if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) throw new Error(`Question ${index} has invalid correct index`);
  if (question.answers.some((answer) => answer === undefined || answer === null || String(answer).trim() === "")) throw new Error(`Question ${index} has an empty answer`);
  if (prompts.has(question.prompt)) throw new Error(`Duplicate expanded prompt: ${question.prompt}`);
  prompts.add(question.prompt);
}

// A reversed question must never offer two true answers, so no option other than the
// correct one may be a clue that shares the same answer in its own family.
for (const family of QUESTION_FAMILIES) {
  const answersByClue = new Map(family.facts.map(([clue, , answer]) => [clue, answer]));
  for (const form of family.forms) {
    if (!form.reverse) continue;
    for (const [clue, , answer] of family.facts) {
      const prompt = form.prompt(clue, answer);
      const question = EXPANDED_QUESTIONS.find((candidate) => candidate.prompt === prompt);
      if (!question) continue;
      const rivals = question.answers.filter((option, index) => index !== question.correct && answersByClue.get(option) === answer);
      if (rivals.length) throw new Error(`Reversed prompt offers more than one true answer: ${prompt} (${rivals.join(", ")})`);
    }
  }
}

const byLevel = [1, 2, 3, 4].map((difficulty) => EXPANDED_QUESTIONS.filter((question) => question.difficulty === difficulty).length);
const smallest = Math.min(...byLevel);
if (smallest < EXPANDED_QUESTIONS.length / 10) throw new Error(`One level is starved of questions: ${byLevel.join("/")}`);

const sources = new Set(EXPANDED_QUESTIONS.map((question) => question.source));
const categories = new Set(EXPANDED_QUESTIONS.map((question) => question.category));
console.log(`question-bank=ok expanded=${EXPANDED_QUESTIONS.length} levels=${byLevel.join("/")} families=${QUESTION_FAMILIES.length} sources=${sources.size} categories=${categories.size}`);
