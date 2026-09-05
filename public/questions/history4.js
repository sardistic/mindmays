// More of the record: dynasties, discoveries, and the awkward corners of the past.
import { soft } from "./case.js";
const DYNASTIES = [
  ["The Tang dynasty", "Tang dynasty", "China"], ["The Song dynasty", "Song dynasty", "China"], ["The Yuan dynasty", "Yuan dynasty", "China"],
  ["The Ming dynasty", "Ming dynasty", "China"], ["The Qing dynasty", "Qing dynasty", "China"], ["The Zhou dynasty", "Zhou dynasty", "China"],
  ["The Tokugawa shogunate", "Tokugawa shogunate", "Japan"], ["The Joseon dynasty", "Joseon", "Korea"],
  ["The Gupta Empire", "Gupta Empire", "India"], ["The Chola dynasty", "Chola dynasty", "India"],
  ["The Safavid dynasty", "Safavid Iran", "Persia"], ["The Abbasid Caliphate", "Abbasid Caliphate", "The Islamic world"],
  ["The Umayyad Caliphate", "Umayyad Caliphate", "The Islamic world"], ["The Fatimid Caliphate", "Fatimid Caliphate", "North Africa and Egypt"],
  ["The Habsburgs", "House of Habsburg", "Austria and Spain"], ["The Bourbons", "House of Bourbon", "France and Spain"],
  ["The Romanovs", "House of Romanov", "Russia"], ["The Hohenzollerns", "House of Hohenzollern", "Prussia and Germany"],
  ["The Plantagenets", "House of Plantagenet", "England"], ["The Medici", "House of Medici", "Florence"],
  ["The Ptolemies", "Ptolemaic dynasty", "Egypt"], ["The Seleucids", "Seleucid Empire", "The Near East"],
];

const ANCIENT_PEOPLES = [
  ["The Phoenicians", "Phoenicia", "Seafaring traders who spread the alphabet"],
  ["The Etruscans", "Etruscan civilization", "A civilisation of central Italy before Rome"],
  ["The Minoans", "Minoan civilization", "A Bronze Age civilisation centred on Crete"],
  ["The Mycenaeans", "Mycenaean Greece", "The late Bronze Age Greeks of Homer's world"],
  ["The Hittites", "Hittites", "An Anatolian power that rivalled Egypt"],
  ["The Sumerians", "Sumer", "The earliest known urban civilisation of Mesopotamia"],
  ["The Nabataeans", "Nabataeans", "The builders of Petra"],
  ["The Olmecs", "Olmecs", "The earliest major civilisation of Mesoamerica"],
  ["The Nazca", "Nazca culture", "The makers of vast desert line drawings in Peru"],
  ["The Picts", "Picts", "A people of early medieval northern Britain"],
  ["The Vikings", "Vikings", "Norse seafarers who raided and settled widely"],
  ["The Maori", "Māori people", "The Polynesian people of New Zealand"],
  ["The Inuit", "Inuit", "The peoples of the Arctic regions of North America"],
  ["The Aboriginal Australians", "Aboriginal Australians", "The first peoples of the Australian mainland"],
];

const WONDERS = [
  ["The Great Pyramid of Giza", "Great Pyramid of Giza", "The only ancient wonder still standing"],
  ["The Hanging Gardens", "Hanging Gardens of Babylon", "A terraced garden said to have stood at Babylon"],
  ["The Statue of Zeus at Olympia", "Statue of Zeus at Olympia", "A colossal seated figure of the king of the gods"],
  ["The Temple of Artemis", "Temple of Artemis", "A vast Greek temple at Ephesus"],
  ["The Mausoleum at Halicarnassus", "Mausoleum at Halicarnassus", "The tomb that gave us the word mausoleum"],
  ["The Colossus of Rhodes", "Colossus of Rhodes", "A giant statue at a harbour entrance"],
  ["The Lighthouse of Alexandria", "Lighthouse of Alexandria", "A great tower guiding ships into harbour"],
];

const EXPLORATION_ERA = [
  ["Bartolomeu Dias", "Bartolomeu Dias", "The first European to round the Cape of Good Hope"],
  ["Amerigo Vespucci", "Amerigo Vespucci", "The navigator whose name was given to the Americas"],
  ["Juan Sebastián Elcano", "Juan Sebastián Elcano", "Completed the first circumnavigation after Magellan's death"],
  ["Zheng He", "Zheng He", "Commanded vast Chinese treasure fleets across the Indian Ocean"],
  ["Abel Tasman", "Abel Tasman", "The first European to reach Tasmania and New Zealand"],
  ["Henry Hudson", "Henry Hudson", "Sought a northern passage and gave his name to a bay"],
  ["Robert Falcon Scott", "Robert Falcon Scott", "Reached the South Pole a month after Amundsen"],
  ["Mary Kingsley", "Mary Kingsley", "Travelled and wrote extensively in West Africa"],
  ["Gertrude Bell", "Gertrude Bell", "Traveller and archaeologist influential in shaping Iraq"],
  ["Fridtjof Nansen", "Fridtjof Nansen", "Arctic explorer who later led refugee relief work"],
];

const INVENTIONS_ERA = [
  ["The printing press in Europe", "Printing press", "The fifteenth century"],
  ["The steam locomotive", "Steam locomotive", "The early nineteenth century"],
  ["The electric telegraph", "Electrical telegraph", "The nineteenth century"],
  ["The telephone", "Telephone", "The 1870s"],
  ["The motor car", "Car", "The late nineteenth century"],
  ["Powered flight", "Wright brothers", "1903"],
  ["Television", "Television", "The 1920s"],
  ["The transistor", "Transistor", "1947"],
  ["The integrated circuit", "Integrated circuit", "The late 1950s"],
  ["The World Wide Web", "World Wide Web", "1989"],
];

const HISTORICAL_TITLES = [
  ["A Roman official who presided over the state with a colleague", "Roman consul", "A consul"],
  ["A Roman magistrate protecting the interests of the plebeians", "Tribune of the plebs", "A tribune"],
  ["A Roman soldier commanding a company of about eighty men", "Centurion", "A centurion"],
  ["A Greek city-state", "Polis", "A polis"],
  ["The ruling council of ancient Sparta", "Gerousia", "The Gerousia"],
  ["A medieval landholder who owed service to a lord", "Vassal", "A vassal"],
  ["A peasant bound to the land in medieval Europe", "Serfdom", "A serf"],
  ["A medieval association of craftsmen", "Guild", "A guild"],
  ["The chief officer of a medieval English county", "Sheriff", "A sheriff"],
  ["A Japanese warrior of the feudal era", "Samurai", "A samurai"],
  ["The military governor who ruled Japan in the emperor's name", "Shogun", "The shogun"],
  ["A Japanese feudal lord", "Daimyo", "A daimyo"],
  ["A Mongol assembly that chose a new khan", "Kurultai", "A kurultai"],
  ["A Viking assembly of free men", "Thing (assembly)", "A thing"],
];

const CURRENCY_HISTORY = [
  ["The silver penny of Anglo-Saxon England", "Penny", "The penny"],
  ["The gold coin of the Byzantine Empire", "Solidus (coin)", "The solidus"],
  ["The Roman silver coin paid to soldiers", "Denarius", "The denarius"],
  ["The Greek silver coin of Athens", "Ancient drachma", "The drachma"],
  ["The Spanish silver coin cut into pieces of eight", "Spanish dollar", "The Spanish dollar"],
  ["The gold coin of Renaissance Florence", "Florin", "The florin"],
  ["The gold coin of Venice", "Venetian ducat", "The ducat"],
  ["The British gold coin worth twenty-one shillings", "Guinea (coin)", "The guinea"],
];

export const HISTORY4_FAMILIES = [
  {
    category: "History", levels: [2, 4], facts: DYNASTIES,
    forms: [
      { prompt: (dynasty) => `${dynasty.replace("The ", "The ")} ruled where?`, explain: (dynasty, place) => `${dynasty} ruled ${place}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: ANCIENT_PEOPLES, identify: true,
    forms: [
      { prompt: (people) => `Who were ${people.replace("The ", "the ")}?`, explain: (people, note) => `${people}: ${soft(note)}.` },
    ],
  },
  {
    category: "History", levels: [2, 3], facts: WONDERS, identify: true,
    forms: [
      { prompt: (wonder) => `What was ${wonder.replace("The ", "the ")}?`, explain: (wonder, note) => `${wonder}: ${soft(note)}.` },
    ],
  },
  {
    category: "History", levels: [3, 4], facts: EXPLORATION_ERA, identify: true,
    forms: [
      { prompt: (person) => `What is ${person} known for?`, explain: (person, deed) => `${person}: ${soft(deed)}.` },
    ],
  },
  {
    category: "Technology", levels: [1, 3], facts: INVENTIONS_ERA,
    forms: [
      { prompt: (invention) => `When did ${soft(invention)} arrive?`, explain: (invention, when) => `${invention}: ${soft(when)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: HISTORICAL_TITLES, describe: true,
    forms: [{ prompt: (definition) => `What was ${soft(definition)} called?`, explain: (definition, term) => `That was ${soft(term)}.` }],
  },
  {
    category: "History", levels: [3, 4], facts: CURRENCY_HISTORY, describe: true,
    forms: [{ prompt: (definition) => `What was ${soft(definition)} called?`, explain: (definition, coin) => `That was ${soft(coin)}.` }],
  },
];
