import { EXPANDED_QUESTIONS } from "../public/classic-question-bank.js";

if (EXPANDED_QUESTIONS.length !== 384) throw new Error(`Expected 384 expanded questions, found ${EXPANDED_QUESTIONS.length}`);
const prompts = new Set();
for (const [index, question] of EXPANDED_QUESTIONS.entries()) {
  if (!question.prompt || !question.source || !question.explanation) throw new Error(`Question ${index} is missing required text`);
  if (![1, 2, 3, 4].includes(question.difficulty)) throw new Error(`Question ${index} has invalid difficulty`);
  if (question.answers.length !== 4 || new Set(question.answers).size !== 4) throw new Error(`Question ${index} does not have four distinct answers`);
  if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) throw new Error(`Question ${index} has invalid correct index`);
  if (prompts.has(question.prompt)) throw new Error(`Duplicate expanded prompt: ${question.prompt}`);
  prompts.add(question.prompt);
}

const byLevel = [1, 2, 3, 4].map((difficulty) => EXPANDED_QUESTIONS.filter((question) => question.difficulty === difficulty).length);
if (byLevel.some((count) => count !== 96)) throw new Error(`Expanded bank is not balanced across levels: ${byLevel.join(",")}`);
console.log(`question-bank=ok expanded=${EXPANDED_QUESTIONS.length} levels=${byLevel.join("/")}`);
