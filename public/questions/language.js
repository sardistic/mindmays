// Language: families, scripts, borrowed words, and the alphabets used to spell things out.
import { soft } from "./case.js";
const LANGUAGE_FAMILIES_DATA = [
  ["French", "French language", "Romance"], ["Spanish", "Spanish language", "Romance"], ["Italian", "Italian language", "Romance"], ["Portuguese", "Portuguese language", "Romance"],
  ["Romanian", "Romanian language", "Romance"], ["Catalan", "Catalan language", "Romance"], ["German", "German language", "Germanic"], ["Dutch", "Dutch language", "Germanic"],
  ["Swedish", "Swedish language", "Germanic"], ["Danish", "Danish language", "Germanic"], ["Norwegian", "Norwegian language", "Germanic"], ["Icelandic", "Icelandic language", "Germanic"],
  ["English", "English language", "Germanic"], ["Afrikaans", "Afrikaans", "Germanic"], ["Russian", "Russian language", "Slavic"], ["Polish", "Polish language", "Slavic"],
  ["Czech", "Czech language", "Slavic"], ["Ukrainian", "Ukrainian language", "Slavic"], ["Bulgarian", "Bulgarian language", "Slavic"], ["Serbian", "Serbian language", "Slavic"],
  ["Irish", "Irish language", "Celtic"], ["Welsh", "Welsh language", "Celtic"], ["Scottish Gaelic", "Scottish Gaelic", "Celtic"], ["Breton", "Breton language", "Celtic"],
  ["Hindi", "Hindi", "Indo-Aryan"], ["Bengali", "Bengali language", "Indo-Aryan"], ["Punjabi", "Punjabi language", "Indo-Aryan"], ["Urdu", "Urdu", "Indo-Aryan"],
  ["Persian", "Persian language", "Iranian"], ["Pashto", "Pashto", "Iranian"], ["Kurdish", "Kurdish languages", "Iranian"], ["Greek", "Greek language", "Hellenic"],
  ["Armenian", "Armenian language", "Indo-European"], ["Albanian", "Albanian language", "Indo-European"], ["Lithuanian", "Lithuanian language", "Baltic"], ["Latvian", "Latvian language", "Baltic"],
  ["Arabic", "Arabic", "Semitic"], ["Hebrew", "Hebrew language", "Semitic"], ["Amharic", "Amharic", "Semitic"], ["Maltese", "Maltese language", "Semitic"],
  ["Finnish", "Finnish language", "Uralic"], ["Hungarian", "Hungarian language", "Uralic"], ["Estonian", "Estonian language", "Uralic"], ["Turkish", "Turkish language", "Turkic"],
  ["Uzbek", "Uzbek language", "Turkic"], ["Kazakh", "Kazakh language", "Turkic"], ["Azerbaijani", "Azerbaijani language", "Turkic"], ["Mandarin", "Sino-Tibetan languages", "Sino-Tibetan"],
  ["Cantonese", "Sino-Tibetan languages", "Sino-Tibetan"], ["Tibetan", "Sino-Tibetan languages", "Sino-Tibetan"], ["Burmese", "Sino-Tibetan languages", "Sino-Tibetan"], ["Thai", "Kra–Dai languages", "Kra-Dai"],
  ["Vietnamese", "Vietnamese language", "Austroasiatic"], ["Khmer", "Khmer language", "Austroasiatic"], ["Tamil", "Tamil language", "Dravidian"], ["Telugu", "Telugu language", "Dravidian"],
  ["Kannada", "Kannada", "Dravidian"], ["Malayalam", "Malayalam", "Dravidian"], ["Swahili", "Swahili language", "Bantu"], ["Zulu", "Zulu language", "Bantu"],
  ["Xhosa", "Xhosa language", "Bantu"], ["Yoruba", "Niger–Congo languages", "Niger-Congo"], ["Igbo", "Niger–Congo languages", "Niger-Congo"], ["Indonesian", "Indonesian language", "Austronesian"],
  ["Tagalog", "Tagalog language", "Austronesian"], ["Malay", "Malay language", "Austronesian"], ["Maori", "Māori language", "Austronesian"], ["Hawaiian", "Hawaiian language", "Austronesian"],
  ["Basque", "Basque language", "A language isolate"], ["Korean", "Korean language", "Koreanic"], ["Japanese", "Japanese language", "Japonic"], ["Georgian", "Georgian language", "Kartvelian"],
];

const SCRIPTS = [
  ["Russian", "Russian language", "Cyrillic"], ["Greek", "Greek language", "Greek alphabet"], ["Hebrew", "Hebrew language", "Hebrew alphabet"], ["Arabic", "Arabic", "Arabic script"],
  ["Hindi", "Hindi", "Devanagari"], ["Thai", "Thai language", "Thai script"], ["Korean", "Korean language", "Hangul"], ["Amharic", "Amharic", "Ge'ez script"],
  ["Georgian", "Georgian language", "Georgian scripts"], ["Armenian", "Armenian language", "Armenian alphabet"], ["Tamil", "Tamil language", "Tamil script"], ["Burmese", "Burmese language", "Burmese script"],
  ["Khmer", "Khmer language", "Khmer script"], ["Tibetan", "Tibetic languages", "Tibetan script"], ["Bengali", "Bengali language", "Bengali–Assamese script"], ["Sinhala", "Sinhala language", "Sinhala script"],
];

const GREEK_LETTERS = [
  ["Alpha", "Alpha", "A"], ["Beta", "Beta", "B"], ["Gamma", "Gamma", "G"], ["Delta", "Delta (letter)", "D"],
  ["Epsilon", "Epsilon", "E"], ["Zeta", "Zeta", "Z"], ["Eta", "Eta", "H"], ["Theta", "Theta", "Th"],
  ["Iota", "Iota", "I"], ["Kappa", "Kappa", "K"], ["Lambda", "Lambda", "L"], ["Mu", "Mu (letter)", "M"],
  ["Nu", "Nu (letter)", "N"], ["Xi", "Xi (letter)", "X"], ["Omicron", "Omicron", "O"], ["Pi", "Pi (letter)", "P"],
  ["Rho", "Rho", "R"], ["Sigma", "Sigma", "S"], ["Tau", "Tau", "T"], ["Upsilon", "Upsilon", "U"],
  ["Phi", "Phi", "Ph"], ["Chi", "Chi (letter)", "Ch"], ["Psi", "Psi (Greek)", "Ps"], ["Omega", "Omega", "O"],
];

const NATO_ALPHABET = [
  ["A", "NATO phonetic alphabet", "Alfa"], ["B", "NATO phonetic alphabet", "Bravo"], ["C", "NATO phonetic alphabet", "Charlie"], ["D", "NATO phonetic alphabet", "Delta"],
  ["E", "NATO phonetic alphabet", "Echo"], ["F", "NATO phonetic alphabet", "Foxtrot"], ["G", "NATO phonetic alphabet", "Golf"], ["H", "NATO phonetic alphabet", "Hotel"],
  ["I", "NATO phonetic alphabet", "India"], ["J", "NATO phonetic alphabet", "Juliett"], ["K", "NATO phonetic alphabet", "Kilo"], ["L", "NATO phonetic alphabet", "Lima"],
  ["M", "NATO phonetic alphabet", "Mike"], ["N", "NATO phonetic alphabet", "November"], ["O", "NATO phonetic alphabet", "Oscar"], ["P", "NATO phonetic alphabet", "Papa"],
  ["Q", "NATO phonetic alphabet", "Quebec"], ["R", "NATO phonetic alphabet", "Romeo"], ["S", "NATO phonetic alphabet", "Sierra"], ["T", "NATO phonetic alphabet", "Tango"],
  ["U", "NATO phonetic alphabet", "Uniform"], ["V", "NATO phonetic alphabet", "Victor"], ["W", "NATO phonetic alphabet", "Whiskey"], ["X", "NATO phonetic alphabet", "X-ray"],
  ["Y", "NATO phonetic alphabet", "Yankee"], ["Z", "NATO phonetic alphabet", "Zulu"],
];

const LATIN_PHRASES = [
  ["Carpe diem", "Carpe diem", "Seize the day"], ["Cogito, ergo sum", "Cogito, ergo sum", "I think, therefore I am"], ["Veni, vidi, vici", "Veni, vidi, vici", "I came, I saw, I conquered"],
  ["E pluribus unum", "E pluribus unum", "Out of many, one"], ["Ad hoc", "Ad hoc", "For this purpose"], ["Ad infinitum", "Ad infinitum", "To infinity"],
  ["Alma mater", "Alma mater", "Nourishing mother"], ["Bona fide", "Good faith", "In good faith"], ["De facto", "De facto", "In fact"],
  ["De jure", "De jure", "By law"], ["Habeas corpus", "Habeas corpus", "You shall have the body"], ["In vino veritas", "In vino veritas", "In wine there is truth"],
  ["Magnum opus", "Masterpiece", "Great work"], ["Memento mori", "Memento mori", "Remember that you must die"], ["Modus operandi", "Modus operandi", "Method of operating"],
  ["Non sequitur", "Non sequitur (literary device)", "It does not follow"], ["Per se", "List of Latin phrases (P)", "By itself"], ["Quid pro quo", "Quid pro quo", "Something for something"],
  ["Status quo", "Status quo", "The existing state of affairs"], ["Tabula rasa", "Tabula rasa", "Blank slate"], ["Terra firma", "Terra firma", "Solid ground"],
  ["Vice versa", "List of Latin phrases (V)", "The other way round"], ["Caveat emptor", "Caveat emptor", "Let the buyer beware"], ["Deus ex machina", "Deus ex machina", "God from the machine"],
  ["Et cetera", "Et cetera", "And the rest"], ["Mea culpa", "Mea culpa", "Through my fault"], ["Persona non grata", "Persona non grata", "An unwelcome person"],
  ["Sine qua non", "Sine qua non", "Without which, nothing"], ["Sub rosa", "Sub rosa", "Under the rose"], ["Ex libris", "Bookplate", "From the books of"],
];

const WORD_ORIGINS = [
  ["Algebra", "Algebra", "Arabic"], ["Alcohol", "Alcohol (chemistry)", "Arabic"], ["Admiral", "Admiral", "Arabic"], ["Safari", "Safari", "Swahili"],
  ["Ketchup", "Ketchup", "Chinese"], ["Tycoon", "Tycoon", "Japanese"], ["Tsunami", "Tsunami", "Japanese"], ["Karaoke", "Karaoke", "Japanese"],
  ["Shampoo", "Shampoo", "Hindi"], ["Jungle", "Jungle", "Sanskrit"], ["Pyjamas", "Pajamas", "Persian"],
  ["Bazaar", "Bazaar", "Persian"], ["Kindergarten", "Kindergarten", "German"], ["Rucksack", "Backpack", "German"], ["Robot", "Robot", "Czech"],
  ["Kiosk", "Kiosk", "Turkish"], ["Yoghurt", "Yogurt", "Turkish"], ["Sauna", "Sauna", "Finnish"], ["Ski", "Skiing", "Old Norse"],
  ["Tattoo", "Tattoo", "Polynesian"], ["Taboo", "Taboo", "Tongan"], ["Boomerang", "Boomerang", "An Australian Aboriginal language"], ["Chocolate", "Chocolate", "Nahuatl"],
  ["Tomato", "Tomato", "Nahuatl"], ["Coyote", "Coyote", "Nahuatl"], ["Canoe", "Canoe", "Taíno"], ["Hurricane", "Tropical cyclone", "Taíno"],
];

const GRAMMAR_TERMS = [
  ["A word that names a person, place or thing", "Noun", "Noun"], ["A word that describes an action", "Verb", "Verb"], ["A word that modifies a noun", "Adjective", "Adjective"],
  ["A word that modifies a verb", "Adverb", "Adverb"], ["A word that stands in for a noun", "Pronoun", "Pronoun"], ["A word that links nouns to other words", "Preposition", "Preposition"],
  ["A word that joins clauses", "Conjunction (grammar)", "Conjunction"], ["A word class including 'the' and 'a'", "Article (grammar)", "Article"],
  ["The naming case of a noun", "Nominative case", "Nominative"], ["The case of a direct object", "Accusative case", "Accusative"],
  ["The case showing possession", "Genitive case", "Genitive"], ["The case of an indirect object", "Dative case", "Dative"],
  ["The form used to address someone directly", "Vocative case", "Vocative"], ["A verb form used as a noun ending in -ing", "Gerund", "Gerund"],
];

const FIGURES_OF_SPEECH = [
  ["A comparison using 'like' or 'as'", "Simile", "Simile"], ["A comparison stated as identity", "Metaphor", "Metaphor"],
  ["Giving human qualities to a thing", "Personification", "Personification"], ["Deliberate exaggeration", "Hyperbole", "Hyperbole"],
  ["Deliberate understatement by denying the opposite", "Litotes", "Litotes"], ["Words that imitate sounds", "Onomatopoeia", "Onomatopoeia"],
  ["Repetition of initial consonant sounds", "Alliteration", "Alliteration"], ["Repetition of vowel sounds", "Assonance", "Assonance"],
  ["A contradiction in terms", "Oxymoron", "Oxymoron"], ["A part standing for the whole", "Synecdoche", "Synecdoche"],
  ["A mild word replacing a harsh one", "Euphemism", "Euphemism"], ["A reference to another work or event", "Allusion", "Allusion"],
  ["A phrase reading the same backwards", "Palindrome", "Palindrome"], ["A rearrangement of the letters of a word", "Anagram", "Anagram"],
];

export const LANGUAGE_FAMILIES = [
  {
    category: "Language", levels: [2, 4], facts: LANGUAGE_FAMILIES_DATA,
    forms: [
      { prompt: (language) => `${language} belongs to which branch or family of languages?`, explain: (language, family) => `${language} is ${/^[aeiou]/i.test(family) ? "an" : "a"} ${family} language.` },
    ],
  },
  {
    category: "Language", levels: [1, 3], facts: SCRIPTS,
    forms: [
      { prompt: (language) => `Which script is ${language} written in?`, explain: (language, script) => `${language} is written in ${script}.` },
      { reverse: true, prompt: (language, script) => `Which of these languages is written in ${script}?`, explain: (language, script) => `${language} uses ${script}.` },
    ],
  },
  {
    category: "Language", levels: [2, 3], facts: GREEK_LETTERS,
    forms: [
      { prompt: (letter) => `Which Roman letter does the Greek letter ${soft(letter)} correspond to?`, explain: (letter, roman) => `Greek ${soft(letter)} corresponds to ${roman}.` },
    ],
  },
  {
    category: "Language", levels: [1, 2], facts: NATO_ALPHABET,
    forms: [
      { prompt: (letter) => `In the NATO phonetic alphabet, which word stands for the letter ${letter}?`, explain: (letter, word) => `${word} stands for ${letter}.` },
      { reverse: true, prompt: (letter, word) => `In the NATO phonetic alphabet, ${word} stands for which letter?`, explain: (letter, word) => `${word} stands for ${letter}.` },
    ],
  },
  {
    category: "Language", levels: [2, 4], facts: LATIN_PHRASES,
    forms: [
      { prompt: (phrase) => `What does the Latin phrase "${soft(phrase)}" mean?`, explain: (phrase, meaning) => `"${phrase}" means "${soft(meaning)}".` },
    ],
  },
  {
    category: "Language", levels: [2, 4], facts: WORD_ORIGINS,
    forms: [
      { prompt: (word) => `From which language did English borrow the word "${soft(word)}"?`, explain: (word, origin) => `"${word}" reached English from ${origin}.` },
    ],
  },
  {
    category: "Language", levels: [1, 2], facts: GRAMMAR_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `What is the grammatical term for ${soft(definition)}?`, explain: (definition, term) => `That is ${/^[aeiou]/i.test(term) ? "an" : "a"} ${soft(term)}.` },
    ],
  },
  {
    category: "Language", levels: [2, 3], facts: FIGURES_OF_SPEECH, describe: true,
    forms: [
      { prompt: (definition) => `Which figure of speech is ${soft(definition)}?`, explain: (definition, term) => `That device is ${soft(term)}.` },
    ],
  },
];
