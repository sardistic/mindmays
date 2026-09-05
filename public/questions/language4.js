// A last shelf of words: more phrases, more borrowings, and the names of things.
import { soft } from "./case.js";
const FRENCH_PHRASES = [
  ["Déjà vu", "Déjà vu", "Already seen"], ["Faux pas", "Faux pas", "A social blunder"],
  ["Coup d'état", "Coup d'état", "A sudden seizure of government"], ["Laissez-faire", "Laissez-faire", "Letting things take their own course"],
  ["Avant-garde", "Avant-garde", "Ahead of its time"], ["Cul-de-sac", "Dead end (street)", "A street closed at one end"],
  ["Bon voyage", "List of French expressions in English", "Have a good journey"], ["Carte blanche", "Carte blanche", "Full discretion to act"],
  ["Tête-à-tête", "List of French expressions in English", "A private conversation between two"],
  ["Raison d'être", "List of French expressions in English", "The reason for existing"],
  ["Nom de plume", "Pen name", "A writing name"], ["Femme fatale", "Femme fatale", "A dangerously alluring woman"],
  ["Joie de vivre", "Joie de vivre", "The joy of living"], ["Fait accompli", "Fait accompli", "A thing already done"],
];

const ITALIAN_AND_GERMAN = [
  ["A cappella", "A cappella", "Sung without instruments"], ["Al fresco", "Al fresco dining", "In the open air"],
  ["Paparazzi", "Paparazzi", "Photographers who pursue the famous"], ["Graffiti", "Graffiti", "Writing or drawing on walls"],
  ["Zeitgeist", "Zeitgeist", "The spirit of the age"], ["Schadenfreude", "Schadenfreude", "Pleasure at another's misfortune"],
  ["Wanderlust", "Wanderlust", "A strong desire to travel"], ["Doppelgänger", "Doppelgänger", "A look-alike of a living person"],
  ["Poltergeist", "Poltergeist", "A noisy, object-moving spirit"], ["Gestalt", "Gestalt psychology", "An organised whole greater than its parts"],
  ["Angst", "Angst", "A deep, undirected anxiety"], ["Kitsch", "Kitsch", "Art considered gaudy or sentimental"],
];

const PROVERBS = [
  ["A stitch in time", "List of proverbial phrases", "Saves nine"],
  ["Too many cooks", "List of proverbial phrases", "Spoil the broth"],
  ["When in Rome", "When in Rome, do as the Romans do", "Do as the Romans do"],
  ["The early bird", "List of proverbial phrases", "Catches the worm"],
  ["Don't count your chickens", "Don't count your chickens before they hatch", "Before they hatch"],
  ["People in glass houses", "List of proverbial phrases", "Should not throw stones"],
  ["Every cloud", "Every cloud has a silver lining", "Has a silver lining"],
  ["Actions speak", "Actions speak louder than words", "Louder than words"],
];

const WORD_MEANINGS = [
  ["A word with the same meaning as another", "Synonym", "A synonym"],
  ["A word with the opposite meaning", "Opposite (semantics)", "An antonym"],
  ["Words that sound alike but differ in meaning", "Homophone", "Homophones"],
  ["Words spelled alike but different in meaning", "Homograph", "Homographs"],
  ["A word formed from the initials of others", "Acronym", "An acronym"],
  ["A shortened form of a word or phrase", "Abbreviation", "An abbreviation"],
  ["A word borrowed from another language", "Loanword", "A loanword"],
  ["A newly coined word", "Neologism", "A neologism"],
  ["A word no longer in ordinary use", "Archaism", "An archaism"],
  ["The specialised vocabulary of a trade", "Jargon", "Jargon"],
  ["Informal language of a group", "Slang", "Slang"],
  ["A regional variety of a language", "Dialect", "A dialect"],
  ["A word or phrase used in a particular region", "Regionalism (politics)", "A regionalism"],
  ["A mixed language that becomes a mother tongue", "Creole language", "A creole"],
  ["A simplified language used between groups", "Pidgin", "A pidgin"],
];

const NAMES_OF_THINGS = [
  ["The dot over a lowercase i or j", "Tittle", "A tittle"],
  ["The plastic tip of a shoelace", "Aglet", "An aglet"],
  ["The groove between the nose and upper lip", "Philtrum", "The philtrum"],
  ["The small piece of skin at the base of a nail", "Cuticle", "The cuticle"],
  ["The metal band on a pencil holding the eraser", "Ferrule", "A ferrule"],
  ["The hole punched in a belt", "Belt (clothing)", "An eyelet"],
  ["The paper band around a cigar", "Cigar band", "A cigar band"],
  ["The wire cage over a champagne cork", "Muselet", "A muselet"],
  ["The raised seam on the back of a book", "Bookbinding", "A band"],
  ["The white crescent at the base of a fingernail", "Lunula (anatomy)", "The lunula"],
];

const SPEECH_SOUNDS = [
  ["A sound made without obstructing the airflow", "Vowel", "A vowel"],
  ["A sound made by obstructing the airflow", "Consonant", "A consonant"],
  ["Two vowels pronounced as one gliding sound", "Diphthong", "A diphthong"],
  ["The stress placed on a syllable", "Stress (linguistics)", "Stress"],
  ["The rise and fall of the voice in speech", "Intonation (linguistics)", "Intonation"],
  ["The smallest unit of sound that changes meaning", "Phoneme", "A phoneme"],
  ["The smallest unit of meaning in a word", "Morpheme", "A morpheme"],
  ["The study of the sounds of speech", "Phonetics", "Phonetics"],
  ["The study of sentence structure", "Syntax", "Syntax"],
  ["The study of meaning in language", "Semantics", "Semantics"],
];

const BOOK_PARTS = [
  ["The page bearing the book's title and author", "Title page", "The title page"],
  ["A short introduction written by someone other than the author", "Foreword", "The foreword"],
  ["The author's own introductory remarks", "Preface", "The preface"],
  ["A closing section after the main story", "Epilogue", "The epilogue"],
  ["An opening section before the main story", "Prologue", "The prologue"],
  ["Additional material at the back of a book", "Addendum", "An appendix"],
  ["A list of chapters at the front", "Table of contents", "The table of contents"],
  ["The protective paper cover of a hardback", "Dust jacket", "The dust jacket"],
  ["The vertical edge where the pages are bound", "Spine (bookbinding)", "The spine"],
  ["A dedication naming the person a book honours", "Dedication (publishing)", "The dedication"],
];

export const LANGUAGE4_FAMILIES = [
  {
    category: "Language", levels: [2, 4], facts: FRENCH_PHRASES,
    forms: [
      { prompt: (phrase) => `What does the French phrase "${soft(phrase)}" mean in English?`, explain: (phrase, meaning) => `"${phrase}" means ${soft(meaning)}.` },
    ],
  },
  {
    category: "Language", levels: [2, 4], facts: ITALIAN_AND_GERMAN,
    forms: [
      { prompt: (word) => `What does "${soft(word)}" mean?`, explain: (word, meaning) => `"${word}" means ${soft(meaning)}.` },
    ],
  },
  {
    category: "Language", levels: [1, 2], facts: PROVERBS,
    forms: [
      { prompt: (opening) => `How does the proverb continue: "${opening}…"?`, explain: (opening, ending) => `${opening} ${soft(ending)}.` },
    ],
  },
  {
    category: "Language", levels: [1, 3], facts: WORD_MEANINGS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Language", levels: [3, 4], facts: NAMES_OF_THINGS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Language", levels: [2, 4], facts: SPEECH_SOUNDS, describe: true,
    forms: [{ prompt: (definition) => `In linguistics, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Literature", levels: [1, 3], facts: BOOK_PARTS, describe: true,
    forms: [{ prompt: (definition) => `In a book, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
];
