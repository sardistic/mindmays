// A third dictionary: the words of the workshop of ideas.
import { soft } from "./case.js";
const PHILOSOPHY_TERMS = [
  ["The study of the nature of being", "Metaphysics", "Metaphysics"],
  ["The study of knowledge and how it is justified", "Epistemology", "Epistemology"],
  ["The study of right and wrong conduct", "Ethics", "Ethics"],
  ["The study of beauty and taste", "Aesthetics", "Aesthetics"],
  ["The study of valid reasoning", "Logic", "Logic"],
  ["The view that knowledge comes from sensory experience", "Empiricism", "Empiricism"],
  ["The view that reason is the chief source of knowledge", "Rationalism", "Rationalism"],
  ["The view that an act is right if it maximises happiness", "Utilitarianism", "Utilitarianism"],
  ["The view that duty rather than outcome defines right action", "Deontology", "Deontology"],
  ["The view that existence precedes essence", "Existentialism", "Existentialism"],
  ["The view that nothing can be known with certainty", "Philosophical skepticism", "Scepticism"],
  ["The view that only physical things exist", "Materialism", "Materialism"],
  ["The doctrine that all events are determined by prior causes", "Determinism", "Determinism"],
  ["The doctrine that truth depends on practical consequences", "Pragmatism", "Pragmatism"],
];

const RELIGION_TERMS = [
  ["Belief in a single god", "Monotheism", "Monotheism"], ["Belief in many gods", "Polytheism", "Polytheism"],
  ["The belief that gods cannot be known to exist", "Agnosticism", "Agnosticism"], ["The absence of belief in gods", "Atheism", "Atheism"],
  ["The identification of god with the universe", "Pantheism", "Pantheism"], ["A journey made to a sacred place", "Pilgrimage", "A pilgrimage"],
  ["A person who withdraws from society for religious reasons", "Hermit", "A hermit"], ["A community of monks", "Monastery", "A monastery"],
  ["A formal religious ceremony", "Ritual", "A ritual"], ["A body of sacred writings", "Religious text", "Scripture"],
  ["Abstaining from food for religious reasons", "Fasting", "Fasting"], ["The cycle of rebirth in Indian religions", "Reincarnation", "Reincarnation"],
  ["The moral law of cause and effect in Indian religions", "Karma", "Karma"], ["Release from the cycle of rebirth", "Moksha", "Moksha"],
];

const SOCIETY_TERMS = [
  ["The movement of people to settle in a new country", "Immigration", "Immigration"],
  ["The movement of people leaving a country", "Emigration", "Emigration"],
  ["The growth of towns and cities", "Urbanization", "Urbanisation"],
  ["The scattering of a people from their homeland", "Diaspora", "A diaspora"],
  ["The mixing of cultures within one society", "Multiculturalism", "Multiculturalism"],
  ["A period when many children are born", "Baby boom", "A baby boom"],
  ["The average number of years a person is expected to live", "Life expectancy", "Life expectancy"],
  ["The study of populations and their statistics", "Demography", "Demography"],
  ["The passing of customs from one generation to the next", "Tradition", "Tradition"],
  ["A shared way of life, art and belief", "Culture", "Culture"],
  ["A settlement controlled by a distant power", "Colony", "A colony"],
  ["The process by which colonies gain independence", "Decolonization", "Decolonisation"],
];

const COMMUNICATION_TERMS = [
  ["The sending of messages by wire using code", "Telegraphy", "The telegraph"],
  ["Writing at speed in an abbreviated system", "Shorthand", "Shorthand"],
  ["A message written on a small card sent by post", "Postcard", "A postcard"],
  ["A book listing names, addresses and numbers", "Telephone directory", "A directory"],
  ["A machine that sends documents over a phone line", "Fax", "A fax machine"],
  ["A device recording and playing back sound magnetically", "Tape recorder", "A tape recorder"],
  ["The technique of sending pictures by radio wave", "Television", "Television"],
  ["A body of transmitted signals carrying one programme", "Broadcasting", "A broadcast"],
  ["A repeated brief message paid for by an advertiser", "Advertising", "An advertisement"],
  ["The freedom to publish without government control", "Freedom of the press", "Freedom of the press"],
];

const MILITARY_TERMS = [
  ["A surrounding of a fortified place to force surrender", "Siege", "A siege"],
  ["A surprise attack from a concealed position", "Ambush", "An ambush"],
  ["A temporary halt to fighting agreed by both sides", "Ceasefire", "A ceasefire"],
  ["The blocking of a place to prevent supplies entering", "Blockade", "A blockade"],
  ["A planned withdrawal from a position", "Withdrawal (military)", "A withdrawal"],
  ["A body of troops sent ahead to scout", "Reconnaissance", "Reconnaissance"],
  ["The design of large-scale campaigns", "Military strategy", "Strategy"],
  ["The handling of troops in a particular engagement", "Military tactics", "Tactics"],
  ["The supply and movement of forces", "Military logistics", "Logistics"],
  ["A soldier who fights for pay in a foreign army", "Mercenary", "A mercenary"],
  ["The compulsory enrolment of citizens into the armed forces", "Conscription", "Conscription"],
  ["A written agreement to stop fighting", "Armistice", "An armistice"],
];

const FARMING_TERMS = [
  ["Growing different crops in a field in successive seasons", "Crop rotation", "Crop rotation"],
  ["Leaving land unplanted for a season", "Fallow", "Fallow"],
  ["Supplying water to crops artificially", "Irrigation", "Irrigation"],
  ["Cutting and gathering a ripe crop", "Harvest", "Harvest"],
  ["Adding nutrients to soil", "Fertilizer", "Fertilising"],
  ["Farming without synthetic chemicals", "Organic farming", "Organic farming"],
  ["Growing plants in water without soil", "Hydroponics", "Hydroponics"],
  ["Growing trees among crops or pasture", "Agroforestry", "Agroforestry"],
  ["Keeping bees for honey", "Beekeeping", "Beekeeping"],
  ["The breeding of fish and shellfish for food", "Aquaculture", "Aquaculture"],
  ["Moving livestock seasonally between pastures", "Transhumance", "Transhumance"],
  ["A farm animal kept for its milk, meat or wool", "Livestock", "Livestock"],
];

export const TERMS3_FAMILIES = [
  {
    category: "Literature", levels: [3, 4], facts: PHILOSOPHY_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In philosophy, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [2, 4], facts: RELIGION_TERMS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [2, 4], facts: SOCIETY_TERMS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Technology", levels: [2, 4], facts: COMMUNICATION_TERMS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [2, 4], facts: MILITARY_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In warfare, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Life Science", levels: [1, 3], facts: FARMING_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In farming, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
];
