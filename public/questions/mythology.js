// Mythology: the gods of five pantheons, their offices and their counterparts.
import { soft } from "./case.js";
const GREEK_GODS = [
  ["Zeus", "Zeus", "The sky and thunder"], ["Hera", "Hera", "Marriage and queenship"], ["Poseidon", "Poseidon", "The sea and earthquakes"],
  ["Demeter", "Demeter", "The harvest"], ["Athena", "Athena", "Wisdom and warcraft"], ["Apollo", "Apollo", "Prophecy, music and light"],
  ["Artemis", "Artemis", "The hunt and the moon"], ["Ares", "Ares", "War"], ["Aphrodite", "Aphrodite", "Love and beauty"],
  ["Hephaestus", "Hephaestus", "Fire and the forge"], ["Hermes", "Hermes", "Travellers, messages and thieves"], ["Dionysus", "Dionysus", "Wine and revelry"],
  ["Hades", "Hades", "The underworld"], ["Hestia", "Hestia", "The hearth"], ["Persephone", "Persephone", "Spring growth and the underworld"],
  ["Hypnos", "Hypnos", "Sleep"], ["Thanatos", "Thanatos", "Death"], ["Nike", "Nike (mythology)", "Victory"],
  ["Eros", "Eros", "Desire"], ["Nemesis", "Nemesis", "Retribution"], ["Iris", "Iris (mythology)", "The rainbow"],
  ["Pan", "Pan (god)", "The wild and shepherds"], ["Helios", "Helios", "The sun"], ["Selene", "Selene", "The moon"],
  ["Chronos", "Chronos", "Time"], ["Gaia", "Gaia", "The earth"], ["Asclepius", "Asclepius", "Medicine"], ["Hecate", "Hecate", "Witchcraft and crossroads"],
];

const ROMAN_EQUIVALENTS = [
  ["Zeus", "Jupiter (mythology)", "Jupiter"], ["Hera", "Juno (mythology)", "Juno"], ["Poseidon", "Neptune (mythology)", "Neptune"],
  ["Demeter", "Ceres (mythology)", "Ceres"], ["Athena", "Minerva", "Minerva"], ["Artemis", "Diana (mythology)", "Diana"],
  ["Ares", "Mars (mythology)", "Mars"], ["Aphrodite", "Venus (mythology)", "Venus"], ["Hephaestus", "Vulcan (mythology)", "Vulcan"],
  ["Hermes", "Mercury (mythology)", "Mercury"], ["Dionysus", "Bacchus", "Bacchus"], ["Hades", "Pluto (mythology)", "Pluto"],
  ["Hestia", "Vesta (mythology)", "Vesta"], ["Eros", "Cupid", "Cupid"], ["Persephone", "Proserpina", "Proserpina"],
  ["Cronus", "Saturn (mythology)", "Saturn"], ["Nike", "Victoria (mythology)", "Victoria"], ["Odysseus", "Ulysses", "Ulysses"],
];

const NORSE_GODS = [
  ["Odin", "Odin", "Wisdom, war and the dead"], ["Thor", "Thor", "Thunder"], ["Loki", "Loki", "Mischief and shape-changing"],
  ["Freyja", "Freyja", "Love, war and seiðr"], ["Freyr", "Freyr", "Peace, fertility and good harvest"], ["Baldr", "Baldr", "Light and purity"],
  ["Tyr", "Týr", "Law and heroic glory"], ["Heimdall", "Heimdall", "Watchfulness at the rainbow bridge"], ["Frigg", "Frigg", "Marriage and foreknowledge"],
  ["Hel", "Hel (being)", "The realm of the dead"], ["Njörðr", "Njörðr", "The sea and seafaring"], ["Bragi", "Bragi", "Poetry"],
  ["Idun", "Iðunn", "The apples of youth"], ["Skadi", "Skaði", "Winter, skiing and hunting"],
];

const NORSE_THINGS = [
  ["Mjölnir", "Mjölnir", "Thor's hammer"], ["Gungnir", "Gungnir", "Odin's spear"], ["Sleipnir", "Sleipnir", "Odin's eight-legged horse"],
  ["Yggdrasil", "Yggdrasil", "The world tree"], ["Valhalla", "Valhalla", "The hall of the slain"], ["Bifröst", "Bifröst", "The burning rainbow bridge"],
  ["Ragnarök", "Ragnarök", "The doom of the gods"], ["Fenrir", "Fenrir", "The monstrous wolf"], ["Jörmungandr", "Jörmungandr", "The serpent encircling the world"],
  ["The Valkyries", "Valkyrie", "The choosers of the slain"], ["Asgard", "Asgard", "The stronghold of the Æsir"], ["Midgard", "Midgard", "The world of humans"],
];

const EGYPTIAN_GODS = [
  ["Ra", "Ra", "The sun"], ["Osiris", "Osiris", "The afterlife and resurrection"], ["Isis", "Isis", "Magic and healing"],
  ["Horus", "Horus", "Kingship and the sky"], ["Set", "Set (deity)", "Storms, disorder and the desert"], ["Anubis", "Anubis", "Embalming and the dead"],
  ["Thoth", "Thoth", "Writing and wisdom"], ["Hathor", "Hathor", "Love, music and motherhood"], ["Bastet", "Bastet", "Cats and protection"],
  ["Sobek", "Sobek", "The Nile and crocodiles"], ["Ptah", "Ptah", "Craftsmen and creation"], ["Ma'at", "Maat", "Truth and cosmic order"],
  ["Nut", "Nut (goddess)", "The sky"], ["Geb", "Geb", "The earth"], ["Amun", "Amun", "The hidden creator"], ["Sekhmet", "Sekhmet", "War and healing"],
];

const HINDU_GODS = [
  ["Brahma", "Brahma", "Creation"], ["Vishnu", "Vishnu", "Preservation"], ["Shiva", "Shiva", "Destruction and transformation"],
  ["Lakshmi", "Lakshmi", "Wealth and fortune"], ["Saraswati", "Saraswati", "Knowledge, music and learning"], ["Parvati", "Parvati", "Power and devotion"],
  ["Ganesha", "Ganesha", "The remover of obstacles"], ["Hanuman", "Hanuman", "Strength and devotion"], ["Indra", "Indra", "Rain, storms and the heavens"],
  ["Agni", "Agni", "Fire"], ["Varuna", "Varuna", "Water and cosmic order"], ["Kali", "Kali", "Time, change and destruction"],
  ["Durga", "Durga", "Protection and the defeat of demons"], ["Krishna", "Krishna", "Compassion and divine play"],
];

const CREATURES = [
  ["The Minotaur", "Minotaur", "Greek"], ["The Sphinx", "Sphinx", "Greek and Egyptian"], ["The Hydra", "Lernaean Hydra", "Greek"],
  ["Cerberus", "Cerberus", "Greek"], ["The Chimera", "Chimera (mythology)", "Greek"], ["Medusa", "Medusa", "Greek"],
  ["The Kraken", "Kraken", "Scandinavian"], ["The Phoenix", "Phoenix (mythology)", "Greek and Egyptian"], ["The Griffin", "Griffin", "Ancient Near Eastern"],
  ["The Basilisk", "Basilisk", "European"], ["The Banshee", "Banshee", "Irish"], ["The Kelpie", "Kelpie", "Scottish"],
  ["The Golem", "Golem", "Jewish"], ["The Yeti", "Yeti", "Himalayan"], ["The Djinn", "Jinn", "Arabian"], ["The Kitsune", "Kitsune", "Japanese"],
  ["The Wendigo", "Wendigo", "Algonquian"], ["Quetzalcoatl", "Quetzalcōātl", "Aztec"], ["Anansi", "Anansi", "West African"], ["The Thunderbird", "Thunderbird (mythology)", "Indigenous North American"],
];

const LABOURS = [
  ["The Nemean lion", "Labours of Hercules", "Heracles"], ["The Golden Fleece", "Golden Fleece", "Jason"], ["The Minotaur in the labyrinth", "Theseus", "Theseus"],
  ["The Gorgon Medusa", "Perseus", "Perseus"], ["The long voyage home from Troy", "Odyssey", "Odysseus"], ["The descent to retrieve Eurydice", "Orpheus", "Orpheus"],
  ["The wings of wax", "Icarus", "Icarus"], ["The theft of fire from the gods", "Prometheus", "Prometheus"],
];

export const MYTHOLOGY_FAMILIES = [
  {
    category: "History", levels: [1, 3], facts: GREEK_GODS,
    forms: [
      { prompt: (god) => `In Greek myth, what was ${god} the god or goddess of?`, explain: (god, domain) => `${god} presided over ${soft(domain)}.` },
      { reverse: true, prompt: (god, domain) => `Which Greek deity presided over ${soft(domain)}?`, explain: (god, domain) => `That was ${god}.` },
    ],
  },
  {
    category: "History", levels: [2, 3], facts: ROMAN_EQUIVALENTS,
    forms: [
      { prompt: (greek) => `Which Roman god corresponds to the Greek ${greek}?`, explain: (greek, roman) => `${roman} is the Roman counterpart of ${greek}.` },
      { reverse: true, prompt: (greek, roman) => `The Roman god ${roman} corresponds to which Greek figure?`, explain: (greek, roman) => `${roman} corresponds to ${greek}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: NORSE_GODS,
    forms: [
      { prompt: (god) => `In Norse myth, what was ${god} associated with?`, explain: (god, domain) => `${god} was associated with ${soft(domain)}.` },
      { reverse: true, prompt: (god, domain) => `Which Norse figure was associated with ${soft(domain)}?`, explain: (god, domain) => `That was ${god}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: NORSE_THINGS,
    forms: [
      { prompt: (thing) => `In Norse myth, what is ${thing.replace("The ", "the ")}?`, explain: (thing, meaning) => `${thing} is ${soft(meaning)}.` },
      { reverse: true, prompt: (thing, meaning) => `In Norse myth, what is the name of ${soft(meaning)}?`, explain: (thing, meaning) => `That is ${thing}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: EGYPTIAN_GODS,
    forms: [
      { prompt: (god) => `In Egyptian religion, what was ${god} the god or goddess of?`, explain: (god, domain) => `${god} presided over ${soft(domain)}.` },
      { reverse: true, prompt: (god, domain) => `Which Egyptian deity presided over ${soft(domain)}?`, explain: (god, domain) => `That was ${god}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: HINDU_GODS,
    forms: [
      { prompt: (god) => `In Hindu tradition, what is ${god} associated with?`, explain: (god, domain) => `${god} is associated with ${soft(domain)}.` },
      { reverse: true, prompt: (god, domain) => `Which Hindu deity is associated with ${soft(domain)}?`, explain: (god, domain) => `That is ${god}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: CREATURES,
    forms: [
      { prompt: (creature) => `${creature} belongs to which mythological tradition?`, explain: (creature, tradition) => `${creature} belongs to ${tradition} myth.` },
    ],
  },
  {
    category: "History", levels: [2, 3], facts: LABOURS,
    forms: [
      { prompt: (deed) => `Which figure of Greek myth is associated with ${soft(deed)}?`, explain: (deed, hero) => `${hero} is associated with ${soft(deed)}.` },
      { reverse: true, prompt: (deed, hero) => `Which story is ${hero} associated with?`, explain: (deed, hero) => `${hero} is associated with ${soft(deed)}.` },
    ],
  },
];
