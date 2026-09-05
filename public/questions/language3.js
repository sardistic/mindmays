// More language: roots, punctuation, place-name origins and words that travelled.
import { soft } from "./case.js";
const GREEK_ROOTS = [
  ["Bio-", "Biology", "Life"], ["Geo-", "Geo-", "Earth"], ["Chrono-", "Chrono-", "Time"], ["Photo-", "Light", "Light"],
  ["Thermo-", "Thermodynamics", "Heat"], ["Hydro-", "Hydro-", "Water"], ["Astro-", "Astronomy", "Star"], ["Micro-", "Micro-", "Small"],
  ["Macro-", "Macro-", "Large"], ["Poly-", "Poly-", "Many"], ["Mono-", "Monomer", "One"], ["Auto-", "Autonomy", "Self"],
  ["Tele-", "Telecommunication", "Far off"], ["Phono-", "Phonology", "Sound"], ["Psycho-", "Psychology", "Mind"], ["Cardio-", "Cardiology", "Heart"],
  ["Derma-", "Dermatology", "Skin"], ["Neuro-", "Neurology", "Nerve"], ["Path-", "Pathology", "Suffering or disease"], ["Anthropo-", "Anthropology", "Human"],
];

const LATIN_ROOTS = [
  ["Aqua-", "Aquarium", "Water"], ["Terra-", "Terrain", "Earth"], ["Luna-", "Lunar", "Moon"], ["Sol-", "Solar", "Sun"],
  ["Vita-", "Vitamin", "Life"], ["Multi-", "Multiplication", "Many"], ["Uni-", "Unicycle", "One"], ["Bi-", "Bicycle", "Two"],
  ["Tri-", "Tricycle", "Three"], ["Cent-", "Century", "Hundred"], ["Mille-", "Millennium", "Thousand"], ["Omni-", "Omnivore", "All"],
  ["Sub-", "Submarine", "Under"], ["Super-", "Supernova", "Above or beyond"], ["Trans-", "Translation", "Across"], ["Circum-", "Circumnavigation", "Around"],
  ["Ante-", "Antebellum", "Before"], ["Post-", "Postscript", "After"], ["Inter-", "International", "Between"], ["Intra-", "Intravenous", "Within"],
];

const PUNCTUATION = [
  ["A mark ending a statement", "Full stop", "The full stop"], ["A mark ending a question", "Question mark", "The question mark"],
  ["A mark showing strong feeling", "Exclamation mark", "The exclamation mark"], ["A mark joining independent clauses", "Semicolon", "The semicolon"],
  ["A mark introducing a list or explanation", "Colon (punctuation)", "The colon"], ["A mark showing omission or possession", "Apostrophe", "The apostrophe"],
  ["A mark joining compound words", "Hyphen", "The hyphen"], ["A longer mark setting off a phrase", "Dash", "The dash"],
  ["Three dots marking an omission", "Ellipsis", "The ellipsis"], ["Curved marks enclosing an aside", "Bracket", "Parentheses"],
  ["Marks showing reported speech", "Quotation mark", "Quotation marks"], ["A slanting mark used for alternatives", "Slash (punctuation)", "The slash"],
  ["A mark showing a footnote", "Dagger (mark)", "The dagger"], ["The symbol used in email addresses", "At sign", "The at sign"],
  ["The symbol for 'and'", "Ampersand", "The ampersand"], ["The upside-down mark opening a Spanish question", "Inverted question and exclamation marks", "The inverted question mark"],
];

const PLACE_NAME_ORIGINS = [
  ["New York", "New York City", "The Duke of York"], ["Philadelphia", "Philadelphia", "Brotherly love"],
  ["Buenos Aires", "Buenos Aires", "Good airs"], ["Rio de Janeiro", "Rio de Janeiro", "River of January"],
  ["Costa Rica", "Costa Rica", "Rich coast"], ["Puerto Rico", "Puerto Rico", "Rich port"],
  ["Sierra Leone", "Sierra Leone", "Lion mountains"], ["Casablanca", "Casablanca", "White house"],
  ["Montenegro", "Montenegro", "Black mountain"], ["Terra Nova", "Newfoundland (island)", "New land"],
  ["Singapore", "Singapore", "Lion city"], ["Copenhagen", "Copenhagen", "Merchants' harbour"],
  ["Lisbon's river name Tejo", "Tagus", "The Tagus"], ["Cairo", "Cairo", "The victorious"],
  ["Chicago", "Chicago", "A word from the Miami-Illinois language"], ["Los Angeles", "Los Angeles", "The angels"],
];

const IDIOM_ORIGINS = [
  ["Achilles' heel", "Achilles' heel", "A single fatal weakness"], ["Pandora's box", "Pandora's box", "A source of endless troubles once opened"],
  ["A Trojan horse", "Trojan Horse", "A deceptive gift concealing danger"], ["The Midas touch", "Midas", "The knack of making everything profitable"],
  ["A Herculean task", "Labours of Hercules", "A task of enormous difficulty"], ["Sisyphean labour", "Sisyphus", "Endless, futile effort"],
  ["A Gordian knot", "Gordian Knot", "An intractable problem solved by bold action"], ["To cross the Rubicon", "Rubicon", "To pass a point of no return"],
  ["A Pyrrhic victory", "Pyrrhic victory", "A win whose cost outweighs the gain"], ["The sword of Damocles", "Damocles", "An ever-present peril"],
  ["A red herring", "Red herring", "A misleading distraction"], ["To bury the hatchet", "Burying the hatchet", "To make peace"],
  ["The elephant in the room", "Elephant in the room", "An obvious problem nobody mentions"], ["A catch-22", "Catch-22", "A no-win situation created by contradictory rules"],
];

const WRITING_SYSTEMS = [
  ["An alphabet where each symbol is a consonant", "Abjad", "An abjad"], ["A system where each symbol is a syllable", "Syllabary", "A syllabary"],
  ["A system where symbols stand for words or ideas", "Logogram", "A logographic system"], ["Wedge-shaped marks pressed into clay", "Cuneiform", "Cuneiform"],
  ["The sacred picture writing of ancient Egypt", "Egyptian hieroglyphs", "Hieroglyphs"], ["The runic alphabet of the Germanic peoples", "Runes", "Runes"],
  ["The ogham script of early Ireland", "Ogham", "Ogham"], ["The raised-dot system for the blind", "Braille", "Braille"],
  ["The dot-and-dash telegraphic code", "Morse code", "Morse code"], ["The Japanese syllabary used for native words", "Hiragana", "Hiragana"],
  ["The Japanese syllabary used for loanwords", "Katakana", "Katakana"], ["Chinese characters used in Japanese", "Kanji", "Kanji"],
];

const LANGUAGE_FACTS = [
  ["The most widely spoken first language", "Mandarin Chinese", "Mandarin Chinese"], ["The language with the most native scripts in India", "Languages of India", "Hindi"],
  ["The official language of the Vatican's documents", "Latin", "Latin"], ["The constructed language created by L. L. Zamenhof", "Esperanto", "Esperanto"],
  ["The oldest continuously written literary language of Europe", "Greek language", "Greek"], ["The liturgical language of Hinduism", "Sanskrit", "Sanskrit"],
  ["The click-consonant languages of southern Africa", "Khoisan languages", "The Khoisan languages"], ["The language isolate spoken in the western Pyrenees", "Basque language", "Basque"],
  ["The tonal language of Vietnam", "Vietnamese language", "Vietnamese"], ["The language written in Hangul", "Korean language", "Korean"],
];

const COLLECTIVE_NOUNS = [
  ["Geese in flight", "Goose", "A skein"], ["Owls", "Owl", "A parliament"], ["Larks", "Lark", "An exaltation"],
  ["Ravens", "Raven", "An unkindness"], ["Rhinoceroses", "Rhinoceros", "A crash"], ["Jellyfish", "Jellyfish", "A smack"],
  ["Kangaroos", "Kangaroo", "A mob"], ["Ferrets", "Ferret", "A business"], ["Leopards", "Leopard", "A leap"], ["Hyenas", "Hyena", "A cackle"],
];

export const LANGUAGE3_FAMILIES = [
  {
    category: "Language", levels: [2, 3], facts: GREEK_ROOTS,
    forms: [
      { prompt: (root) => `What does the Greek root ${soft(root)} mean?`, explain: (root, meaning) => `${root} means ${soft(meaning)}.` },
    ],
  },
  {
    category: "Language", levels: [1, 3], facts: LATIN_ROOTS,
    forms: [
      { prompt: (root) => `What does the Latin root ${soft(root)} mean?`, explain: (root, meaning) => `${root} means ${soft(meaning)}.` },
    ],
  },
  {
    category: "Language", levels: [1, 2], facts: PUNCTUATION, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, mark) => `That is ${soft(mark)}.` },
    ],
  },
  {
    category: "Language", levels: [3, 4], facts: PLACE_NAME_ORIGINS,
    forms: [
      { prompt: (place) => `What does the name ${place} mean or refer to?`, explain: (place, meaning) => `${place}: ${soft(meaning)}.` },
    ],
  },
  {
    category: "Language", levels: [2, 4], facts: IDIOM_ORIGINS,
    forms: [
      { prompt: (idiom) => `What does the expression "${soft(idiom)}" mean?`, explain: (idiom, meaning) => `${idiom}: ${soft(meaning)}.` },
    ],
  },
  {
    category: "Language", levels: [2, 4], facts: WRITING_SYSTEMS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Language", levels: [2, 4], facts: LANGUAGE_FACTS, describe: true,
    forms: [
      { prompt: (description) => `Which language is ${soft(description)}?`, explain: (description, language) => `That is ${language}.` },
    ],
  },
  {
    category: "Language", levels: [3, 4], facts: COLLECTIVE_NOUNS,
    forms: [
      { prompt: (animal) => `What is the traditional collective noun for ${soft(animal)}?`, explain: (animal, term) => `${animal}: ${soft(term)}.` },
    ],
  },
];
