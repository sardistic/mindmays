// History: rulers, wars, treaties, explorers and the dates that pin them down.
import { soft } from "./case.js";
const PRESIDENT_ORDER = [
  ["George Washington", "George Washington", "1st"], ["John Adams", "John Adams", "2nd"], ["Thomas Jefferson", "Thomas Jefferson", "3rd"], ["James Madison", "James Madison", "4th"],
  ["James Monroe", "James Monroe", "5th"], ["John Quincy Adams", "John Quincy Adams", "6th"], ["Andrew Jackson", "Andrew Jackson", "7th"], ["Martin Van Buren", "Martin Van Buren", "8th"],
  ["Abraham Lincoln", "Abraham Lincoln", "16th"], ["Andrew Johnson", "Andrew Johnson", "17th"], ["Ulysses S. Grant", "Ulysses S. Grant", "18th"], ["Theodore Roosevelt", "Theodore Roosevelt", "26th"],
  ["William Howard Taft", "William Howard Taft", "27th"], ["Woodrow Wilson", "Woodrow Wilson", "28th"], ["Herbert Hoover", "Herbert Hoover", "31st"], ["Franklin D. Roosevelt", "Franklin D. Roosevelt", "32nd"],
  ["Harry S. Truman", "Harry S. Truman", "33rd"], ["Dwight D. Eisenhower", "Dwight D. Eisenhower", "34th"], ["John F. Kennedy", "John F. Kennedy", "35th"], ["Lyndon B. Johnson", "Lyndon B. Johnson", "36th"],
  ["Richard Nixon", "Richard Nixon", "37th"], ["Gerald Ford", "Gerald Ford", "38th"], ["Jimmy Carter", "Jimmy Carter", "39th"], ["Ronald Reagan", "Ronald Reagan", "40th"],
];

const BATTLE_YEARS = [
  ["The Battle of Hastings", "Battle of Hastings", "1066"], ["The Battle of Agincourt", "Battle of Agincourt", "1415"], ["The Battle of Bosworth Field", "Battle of Bosworth Field", "1485"],
  ["The Battle of Lepanto", "Battle of Lepanto", "1571"], ["The Battle of Trafalgar", "Battle of Trafalgar", "1805"], ["The Battle of Waterloo", "Battle of Waterloo", "1815"],
  ["The Battle of Gettysburg", "Battle of Gettysburg", "1863"], ["The Battle of Hattin", "Battle of Hattin", "1187"], ["The Battle of Bannockburn", "Battle of Bannockburn", "1314"],
  ["The Battle of Actium", "Battle of Actium", "31 BC"], ["The Battle of Marathon", "Battle of Marathon", "490 BC"], ["The Battle of Thermopylae", "Battle of Thermopylae", "480 BC"],
  ["The Battle of Cannae", "Battle of Cannae", "216 BC"], ["The Battle of Salamis", "Battle of Salamis", "480 BC"], ["The Battle of Poitiers", "Battle of Poitiers", "1356"],
  ["The Battle of Crécy", "Battle of Crécy", "1346"], ["The Battle of Culloden", "Battle of Culloden", "1746"], ["The Battle of Austerlitz", "Battle of Austerlitz", "1805"],
  ["The Battle of Borodino", "Battle of Borodino", "1812"], ["The Battle of Stalingrad", "Battle of Stalingrad", "1942"], ["The Battle of Midway", "Battle of Midway", "1942"],
  ["The Battle of the Somme", "Battle of the Somme", "1916"], ["The Battle of Verdun", "Battle of Verdun", "1916"], ["The Battle of Jutland", "Battle of Jutland", "1916"],
];

const TREATIES = [
  ["The Treaty of Versailles", "Treaty of Versailles", "1919"], ["The Treaty of Westphalia", "Peace of Westphalia", "1648"], ["The Treaty of Utrecht", "Peace of Utrecht", "1713"],
  ["The Treaty of Tordesillas", "Treaty of Tordesillas", "1494"], ["The Treaty of Ghent", "Treaty of Ghent", "1814"], ["The Treaty of Paris that ended the American Revolutionary War", "Treaty of Paris (1783)", "1783"],
  ["Magna Carta", "Magna Carta", "1215"], ["The Congress of Vienna", "Congress of Vienna", "1815"], ["The Treaty of Rome", "Treaty of Rome", "1957"],
  ["The Treaty of Nanking", "Treaty of Nanking", "1842"], ["The Treaty of Brest-Litovsk", "Treaty of Brest-Litovsk", "1918"], ["The Munich Agreement", "Munich Agreement", "1938"],
];

const EXPLORERS = [
  ["Ferdinand Magellan", "Ferdinand Magellan", "The first circumnavigation of the globe"], ["Christopher Columbus", "Christopher Columbus", "The Atlantic crossings of 1492"],
  ["Vasco da Gama", "Vasco da Gama", "The sea route from Europe to India"], ["James Cook", "James Cook", "The mapping of the Pacific"],
  ["Roald Amundsen", "Roald Amundsen", "The first expedition to the South Pole"], ["Marco Polo", "Marco Polo", "The overland journey to Yuan China"],
  ["Ibn Battuta", "Ibn Battuta", "Three decades of travel across Afro-Eurasia"], ["Hernán Cortés", "Hernán Cortés", "The fall of the Aztec Empire"],
  ["Francisco Pizarro", "Francisco Pizarro", "The conquest of the Inca Empire"], ["David Livingstone", "David Livingstone", "The exploration of central Africa"],
  ["Ernest Shackleton", "Ernest Shackleton", "The Endurance expedition"], ["Leif Erikson", "Leif Erikson", "A Norse landing in North America"],
];

const EMPIRE_CAPITALS = [
  ["The Byzantine Empire", "Constantinople", "Constantinople"], ["The Roman Empire", "Rome", "Rome"], ["The Inca Empire", "Cusco", "Cusco"],
  ["The Aztec Empire", "Tenochtitlan", "Tenochtitlan"], ["The Achaemenid Empire", "Persepolis", "Persepolis"], ["The Ottoman Empire", "Constantinople", "Constantinople"],
  ["The Mughal Empire", "Agra", "Agra"], ["Ancient Egypt of the New Kingdom", "Thebes, Egypt", "Thebes"], ["The Assyrian Empire", "Nineveh", "Nineveh"],
  ["The Babylonian Empire", "Babylon", "Babylon"], ["The Mali Empire", "Niani, Guinea", "Niani"], ["The Khmer Empire", "Angkor", "Angkor"],
];

const REVOLUTIONS = [
  ["The French Revolution", "French Revolution", "1789"], ["The American Revolution", "American Revolution", "1775"], ["The Russian Revolution", "Russian Revolution", "1917"],
  ["The Glorious Revolution", "Glorious Revolution", "1688"], ["The Haitian Revolution", "Haitian Revolution", "1791"], ["The Xinhai Revolution", "1911 Revolution", "1911"],
  ["The Industrial Revolution", "Industrial Revolution", "1760"], ["The Meiji Restoration", "Meiji Restoration", "1868"],
];

const ANCIENT_SITES = [
  ["The Great Pyramid of Giza", "Great Pyramid of Giza", "Egypt"], ["Machu Picchu", "Machu Picchu", "Peru"], ["Petra", "Petra", "Jordan"], ["Stonehenge", "Stonehenge", "England"],
  ["The Parthenon", "Parthenon", "Greece"], ["Angkor Wat", "Angkor Wat", "Cambodia"], ["Chichen Itza", "Chichen Itza", "Mexico"], ["The Terracotta Army", "Terracotta Army", "China"],
  ["Pompeii", "Pompeii", "Italy"], ["Persepolis", "Persepolis", "Iran"], ["Knossos", "Knossos", "Crete"], ["Skara Brae", "Skara Brae", "Orkney"],
  ["Göbekli Tepe", "Göbekli Tepe", "Turkey"], ["Mohenjo-daro", "Mohenjo-daro", "Pakistan"], ["Great Zimbabwe", "Great Zimbabwe", "Zimbabwe"], ["Teotihuacan", "Teotihuacan", "Mexico"],
];

const MONARCH_HOUSES = [
  ["Henry VIII", "Henry VIII", "Tudor"], ["Elizabeth I", "Elizabeth I", "Tudor"], ["Mary I", "Mary I of England", "Tudor"], ["Henry VII", "Henry VII of England", "Tudor"],
  ["Charles I", "Charles I of England", "Stuart"], ["James I", "James VI and I", "Stuart"], ["Charles II", "Charles II of England", "Stuart"], ["Anne", "Anne, Queen of Great Britain", "Stuart"],
  ["Victoria", "Queen Victoria", "Hanover"], ["George III", "George III", "Hanover"], ["George I", "George I of Great Britain", "Hanover"], ["Richard III", "Richard III of England", "York"],
  ["Edward IV", "Edward IV of England", "York"], ["Henry VI", "Henry VI of England", "Lancaster"], ["Henry V", "Henry V of England", "Lancaster"], ["William the Conqueror", "William the Conqueror", "Normandy"],
];

const FOUNDERS = [
  ["The Mongol Empire", "Genghis Khan", "Genghis Khan"], ["The Macedonian Empire", "Alexander the Great", "Alexander the Great"], ["Buddhism", "Gautama Buddha", "Gautama Buddha"],
  ["The Ming dynasty", "Hongwu Emperor", "The Hongwu Emperor"], ["The Mughal Empire", "Babur", "Babur"], ["The Carolingian Empire", "Charlemagne", "Charlemagne"],
  ["The Zulu Kingdom", "Shaka", "Shaka"], ["The Qin dynasty", "Qin Shi Huang", "Qin Shi Huang"], ["The Maurya Empire", "Chandragupta Maurya", "Chandragupta Maurya"],
  ["The Soviet state", "Vladimir Lenin", "Vladimir Lenin"], ["The Republic of Turkey", "Mustafa Kemal Atatürk", "Mustafa Kemal Atatürk"], ["The Kingdom of Italy after unification", "Victor Emmanuel II of Italy", "Victor Emmanuel II"],
];

const WAR_YEARS = [
  ["The First World War", "World War I", "1914"], ["The Second World War", "World War II", "1939"], ["The Hundred Years' War", "Hundred Years' War", "1337"],
  ["The Thirty Years' War", "Thirty Years' War", "1618"], ["The American Civil War", "American Civil War", "1861"], ["The Spanish Civil War", "Spanish Civil War", "1936"],
  ["The Crimean War", "Crimean War", "1853"], ["The Korean War", "Korean War", "1950"], ["The Peloponnesian War", "Peloponnesian War", "431 BC"],
  ["The Seven Years' War", "Seven Years' War", "1756"], ["The Franco-Prussian War", "Franco-Prussian War", "1870"], ["The Boer War of 1899", "Second Boer War", "1899"],
];

export const HISTORY_FAMILIES = [
  {
    category: "History", levels: [2, 4], facts: PRESIDENT_ORDER,
    forms: [
      { prompt: (person) => `Which president of the United States was ${person}, counting from the first?`, explain: (person, order) => `${person} was the ${soft(order)} president of the United States.` },
      { reverse: true, prompt: (person, order) => `Who was the ${soft(order)} president of the United States?`, explain: (person, order) => `${person} was the ${soft(order)} president.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: BATTLE_YEARS,
    forms: [
      { prompt: (battle) => `In which year was ${battle.replace("The ", "the ")} fought?`, explain: (battle, year) => `${battle} was fought in ${year}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: TREATIES,
    forms: [
      { prompt: (treaty) => `In which year was ${treaty.replace("The ", "the ")} concluded?`, explain: (treaty, year) => `${treaty} dates from ${year}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: EXPLORERS, identify: true,
    forms: [
      { prompt: (person) => `${person} is remembered for what?`, explain: (person, deed) => `${person}: ${soft(deed)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: EMPIRE_CAPITALS,
    forms: [
      { prompt: (empire) => `Which city was the capital of ${empire.replace("The ", "the ")}?`, explain: (empire, city) => `${city} was the capital of ${empire.replace("The ", "the ")}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: REVOLUTIONS,
    forms: [
      { prompt: (event) => `In which year did ${event.replace("The ", "the ")} begin?`, explain: (event, year) => `${event} began in ${year}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: ANCIENT_SITES,
    forms: [
      { prompt: (site) => `In which country or region does ${site.replace("The ", "the ")} stand?`, explain: (site, place) => `${site} stands in ${place}.` },
      { reverse: true, prompt: (site, place) => `Which of these ancient sites stands in ${place}?`, explain: (site, place) => `${site} stands in ${place}.` },
    ],
  },
  {
    category: "History", levels: [3, 4], facts: MONARCH_HOUSES,
    forms: [
      { prompt: (monarch) => `${monarch} belonged to which royal house?`, explain: (monarch, house) => `${monarch} belonged to the House of ${house}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: FOUNDERS,
    forms: [
      { prompt: (thing) => `Who founded ${thing.replace("The ", "the ")}?`, explain: (thing, person) => `${person} founded ${thing.replace("The ", "the ")}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: WAR_YEARS,
    forms: [
      { prompt: (war) => `In which year did ${war.replace("The ", "the ")} begin?`, explain: (war, year) => `${war} began in ${year}.` },
    ],
  },
];
