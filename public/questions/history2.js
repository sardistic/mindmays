// More history: rulers and dynasties, documents, movements and famous words.
import { soft } from "./case.js";
const RULERS = [
  ["Napoleon Bonaparte", "Napoleon", "France"], ["Catherine the Great", "Catherine the Great", "Russia"], ["Peter the Great", "Peter the Great", "Russia"],
  ["Ivan the Terrible", "Ivan the Terrible", "Russia"], ["Suleiman the Magnificent", "Suleiman the Magnificent", "The Ottoman Empire"],
  ["Akbar", "Akbar", "The Mughal Empire"], ["Shah Jahan", "Shah Jahan", "The Mughal Empire"], ["Kublai Khan", "Kublai Khan", "The Mongol Empire"],
  ["Cleopatra VII", "Cleopatra", "Egypt"], ["Ramesses II", "Ramesses II", "Egypt"], ["Tutankhamun", "Tutankhamun", "Egypt"],
  ["Hatshepsut", "Hatshepsut", "Egypt"], ["Julius Caesar", "Julius Caesar", "Rome"], ["Augustus", "Augustus", "Rome"],
  ["Nero", "Nero", "Rome"], ["Hadrian", "Hadrian", "Rome"], ["Marcus Aurelius", "Marcus Aurelius", "Rome"], ["Constantine the Great", "Constantine the Great", "Rome"],
  ["Justinian I", "Justinian I", "The Byzantine Empire"], ["Charlemagne", "Charlemagne", "The Frankish Empire"],
  ["Louis XIV", "Louis XIV", "France"], ["Philip II", "Philip II of Spain", "Spain"], ["Isabella I", "Isabella I of Castile", "Castile"],
  ["Frederick the Great", "Frederick the Great", "Prussia"], ["Maria Theresa", "Maria Theresa", "Austria"], ["Gustavus Adolphus", "Gustavus Adolphus", "Sweden"],
  ["Haile Selassie", "Haile Selassie", "Ethiopia"], ["Mansa Musa", "Mansa Musa", "The Mali Empire"], ["Montezuma II", "Moctezuma II", "The Aztec Empire"],
  ["Atahualpa", "Atahualpa", "The Inca Empire"], ["Ashoka", "Ashoka", "The Maurya Empire"], ["Hammurabi", "Hammurabi", "Babylon"],
  ["Nebuchadnezzar II", "Nebuchadnezzar II", "Babylon"], ["Cyrus the Great", "Cyrus the Great", "Persia"], ["Darius I", "Darius the Great", "Persia"],
  ["Xerxes I", "Xerxes I", "Persia"], ["Pericles", "Pericles", "Athens"], ["Leonidas I", "Leonidas I", "Sparta"],
];

const DOCUMENTS = [
  ["The Declaration of Independence", "United States Declaration of Independence", "1776"], ["The Bill of Rights", "United States Bill of Rights", "1791"],
  ["The Emancipation Proclamation", "Emancipation Proclamation", "1863"], ["The Universal Declaration of Human Rights", "Universal Declaration of Human Rights", "1948"],
  ["The Code of Hammurabi", "Code of Hammurabi", "Babylon"], ["The Rosetta Stone", "Rosetta Stone", "Egypt"],
  ["The Domesday Book", "Domesday Book", "1086"], ["The Ninety-five Theses", "Ninety-five Theses", "1517"],
  ["The Communist Manifesto", "The Communist Manifesto", "1848"], ["On the Origin of Species", "On the Origin of Species", "1859"],
];

const MOVEMENTS = [
  ["The Renaissance", "Renaissance", "The rebirth of classical learning and art in Europe"],
  ["The Reformation", "Reformation", "The split of Western Christianity from Rome"],
  ["The Enlightenment", "Age of Enlightenment", "The eighteenth-century turn to reason and liberty"],
  ["The Scientific Revolution", "Scientific Revolution", "The reshaping of natural philosophy into modern science"],
  ["The Industrial Revolution", "Industrial Revolution", "The shift to mechanised manufacturing"],
  ["The Age of Discovery", "Age of Discovery", "European maritime exploration and expansion"],
  ["The Cold War", "Cold War", "The long standoff between the United States and the Soviet Union"],
  ["The Civil Rights Movement", "Civil rights movement", "The American campaign against racial segregation"],
  ["The Meiji Restoration", "Meiji Restoration", "Japan's rapid modernisation under imperial rule"],
  ["The Harlem Renaissance", "Harlem Renaissance", "A flowering of African American arts in 1920s New York"],
];

const QUOTES = [
  ["I have a dream", "I Have a Dream", "Martin Luther King Jr."], ["Veni, vidi, vici", "Veni, vidi, vici", "Julius Caesar"],
  ["Let them eat cake", "Let them eat cake", "Marie Antoinette"], ["Give me liberty, or give me death!", "Give me liberty, or give me death!", "Patrick Henry"],
  ["That's one small step for man", "Apollo 11", "Neil Armstrong"], ["We shall fight on the beaches", "We shall fight on the beaches", "Winston Churchill"],
  ["Ich bin ein Berliner", "Ich bin ein Berliner", "John F. Kennedy"], ["The only thing we have to fear is fear itself", "First inauguration of Franklin D. Roosevelt", "Franklin D. Roosevelt"],
  ["Eureka!", "Eureka (word)", "Archimedes"], ["And yet it moves", "And yet it moves", "Galileo Galilei"],
];

const ERAS = [
  ["The Stone Age", "Stone Age", "The age of stone tools"], ["The Bronze Age", "Bronze Age", "The age when bronze working spread"],
  ["The Iron Age", "Iron Age", "The age when iron working spread"], ["The Middle Ages", "Middle Ages", "The European period between antiquity and the Renaissance"],
  ["The Belle Époque", "Belle Époque", "The optimistic decades before the First World War"], ["The Gilded Age", "Gilded Age", "Rapid American growth and inequality after the Civil War"],
  ["The Victorian era", "Victorian era", "Britain under Queen Victoria"], ["The Edo period", "Edo period", "Japan under the Tokugawa shogunate"],
  ["The Warring States period", "Warring States period", "Centuries of conflict before China's unification"], ["The Golden Age of Islam", "Islamic Golden Age", "A flowering of science and learning across the Muslim world"],
];

const ASSASSINATIONS = [
  ["Julius Caesar", "Assassination of Julius Caesar", "44 BC"], ["Abraham Lincoln", "Assassination of Abraham Lincoln", "1865"],
  ["Archduke Franz Ferdinand", "Assassination of Archduke Franz Ferdinand", "1914"], ["Mahatma Gandhi", "Assassination of Mahatma Gandhi", "1948"],
  ["John F. Kennedy", "Assassination of John F. Kennedy", "1963"], ["Martin Luther King Jr.", "Assassination of Martin Luther King Jr.", "1968"],
];

const EXPLORATION_FIRSTS = [
  ["The first person in space", "Yuri Gagarin", "Yuri Gagarin"], ["The first woman in space", "Valentina Tereshkova", "Valentina Tereshkova"],
  ["The first person to walk on the Moon", "Neil Armstrong", "Neil Armstrong"], ["The first to reach the South Pole", "Roald Amundsen", "Roald Amundsen"],
  ["The first to summit Everest", "Edmund Hillary", "Edmund Hillary and Tenzing Norgay"], ["The first to fly solo across the Atlantic", "Charles Lindbergh", "Charles Lindbergh"],
  ["The first woman to fly solo across the Atlantic", "Amelia Earhart", "Amelia Earhart"], ["The first to sail around the world alone", "Joshua Slocum", "Joshua Slocum"],
];

const PLAGUES_AND_DISASTERS = [
  ["The Black Death", "Black Death", "1347"], ["The Great Fire of London", "Great Fire of London", "1666"],
  ["The eruption that buried Pompeii", "Eruption of Mount Vesuvius in 79 AD", "79"], ["The San Francisco earthquake", "1906 San Francisco earthquake", "1906"],
  ["The sinking of the Titanic", "Titanic", "1912"], ["The Spanish flu pandemic", "1918–1920 flu pandemic", "1918"],
  ["The Chernobyl disaster", "Chernobyl disaster", "1986"], ["The Lisbon earthquake", "1755 Lisbon earthquake", "1755"],
];

const NOBEL_PEACE = [
  ["Nelson Mandela", "Nelson Mandela", "Dismantling apartheid in South Africa"], ["Mother Teresa", "Mother Teresa", "Work among the destitute in Calcutta"],
  ["Martin Luther King Jr.", "Martin Luther King Jr.", "Non-violent resistance to racial segregation"], ["Malala Yousafzai", "Malala Yousafzai", "Campaigning for girls' education"],
  ["The Dalai Lama", "14th Dalai Lama", "Non-violent advocacy for Tibet"], ["Wangari Maathai", "Wangari Maathai", "Environmental and civic work in Kenya"],
];

export const HISTORY2_FAMILIES = [
  {
    category: "History", levels: [2, 4], facts: RULERS,
    forms: [
      { prompt: (ruler) => `${ruler} ruled where?`, explain: (ruler, place) => `${ruler} ruled ${place}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: DOCUMENTS,
    forms: [
      { prompt: (document) => `${document.replace("The ", "The ")} is associated with which year or place?`, explain: (document, answer) => `${document}: ${answer}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: MOVEMENTS,
    forms: [
      { prompt: (movement) => `What was ${movement.replace("The ", "the ")}?`, explain: (movement, description) => `${movement}: ${soft(description)}.` },
      { reverse: true, prompt: (movement, description) => `Which period or movement is described as ${soft(description)}?`, explain: (movement, description) => `That is ${soft(movement)}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: QUOTES,
    forms: [
      { prompt: (quote) => `Who said "${quote}"?`, explain: (quote, person) => `"${quote}" is attributed to ${person}.` },
    ],
  },
  {
    category: "History", levels: [2, 3], facts: ERAS, identify: true,
    forms: [
      { prompt: (era) => `What was ${era.replace("The ", "the ")}?`, explain: (era, description) => `${era}: ${soft(description)}.` },
    ],
  },
  {
    category: "History", levels: [3, 4], facts: ASSASSINATIONS,
    forms: [
      { prompt: (person) => `In which year was ${person} assassinated?`, explain: (person, year) => `${person} was assassinated in ${year}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: EXPLORATION_FIRSTS, describe: true,
    forms: [
      { prompt: (feat) => `Who was ${soft(feat)}?`, explain: (feat, person) => `${person}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: PLAGUES_AND_DISASTERS,
    forms: [
      { prompt: (event) => `In which year did ${event.replace("The ", "the ")} occur?`, explain: (event, year) => `${event} occurred in ${year}.` },
    ],
  },
  {
    category: "History", levels: [2, 3], facts: NOBEL_PEACE,
    forms: [
      { prompt: (person) => `${person} is honoured for what?`, explain: (person, work) => `${person}: ${soft(work)}.` },
    ],
  },
];
