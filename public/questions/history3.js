// Government, economy and the machinery of states, past and present.
import { soft } from "./case.js";
const GOVERNMENT_FORMS = [
  ["Rule by the people", "Democracy", "Democracy"], ["Rule by one hereditary head of state", "Monarchy", "Monarchy"],
  ["Rule by a small privileged group", "Oligarchy", "Oligarchy"], ["Rule by the best or noblest", "Aristocracy", "Aristocracy"],
  ["Rule by religious authority", "Theocracy", "Theocracy"], ["Rule by a single absolute leader", "Autocracy", "Autocracy"],
  ["Rule by officials and departments", "Bureaucracy", "Bureaucracy"], ["Rule by the wealthy", "Plutocracy", "Plutocracy"],
  ["A state with no monarch, headed by elected officers", "Republic", "A republic"], ["A union of partially self-governing states", "Federation", "A federation"],
  ["Government seized and held by force", "Dictatorship", "Dictatorship"], ["The absence of government", "Anarchy", "Anarchy"],
  ["Rule by a military junta", "Military dictatorship", "A military dictatorship"], ["A monarchy limited by a constitution", "Constitutional monarchy", "A constitutional monarchy"],
];

const POLITICAL_TERMS = [
  ["The power to reject a proposed law", "Veto", "A veto"], ["A direct popular vote on a single question", "Referendum", "A referendum"],
  ["The formal charge of a public official", "Impeachment", "Impeachment"], ["A prolonged speech to delay a vote", "Filibuster", "A filibuster"],
  ["The drawing of electoral boundaries for advantage", "Gerrymandering", "Gerrymandering"], ["A ban on trade with a country", "Economic sanctions", "An embargo"],
  ["The pursuit of national interests through negotiation", "Diplomacy", "Diplomacy"], ["Formal approval of a treaty", "Ratification", "Ratification"],
  ["The transfer of power from central to regional government", "Devolution", "Devolution"], ["A group of ministers advising a head of government", "Cabinet (government)", "The cabinet"],
  ["A written plan of a party's intentions", "Manifesto", "A manifesto"], ["The right to vote", "Suffrage", "Suffrage"],
  ["A count of a country's population", "Census", "A census"], ["A change to a constitution or law", "Constitutional amendment", "An amendment"],
];

const ECONOMICS = [
  ["A general rise in prices", "Inflation", "Inflation"], ["A general fall in prices", "Deflation", "Deflation"],
  ["A sustained fall in economic output", "Recession", "A recession"], ["A severe and prolonged downturn", "Depression (economics)", "A depression"],
  ["The total value of goods and services produced", "Gross domestic product", "Gross domestic product"],
  ["A tax on imported goods", "Tariff", "A tariff"], ["The exchange of goods without money", "Barter", "Barter"],
  ["A market dominated by a single seller", "Monopoly", "A monopoly"], ["A market with a few dominant sellers", "Oligopoly", "An oligopoly"],
  ["The cost of the next best alternative forgone", "Opportunity cost", "Opportunity cost"],
  ["Money borrowed that must be repaid", "Debt", "Debt"], ["A share in the ownership of a company", "Share (finance)", "A share"],
  ["The difference between exports and imports", "Balance of trade", "The balance of trade"], ["A period of rising share prices", "Market trend", "A bull market"],
];

const LAW_TERMS = [
  ["A written order compelling a person's appearance", "Subpoena", "A subpoena"], ["A protection against unlawful detention", "Habeas corpus", "Habeas corpus"],
  ["A group of citizens who decide a verdict", "Jury", "A jury"], ["The person accused in a criminal case", "Defendant", "The defendant"],
  ["The party bringing a civil action", "Plaintiff", "The plaintiff"], ["A previous decision that guides later cases", "Precedent", "Precedent"],
  ["Money paid to release a defendant before trial", "Bail", "Bail"], ["An official pardon for a class of offences", "Amnesty", "An amnesty"],
  ["The surrender of a suspect to another jurisdiction", "Extradition", "Extradition"], ["The unlawful killing of a person with intent", "Murder", "Murder"],
  ["A false statement damaging a reputation in writing", "Defamation", "Libel"], ["A false spoken statement damaging a reputation", "Defamation", "Slander"],
  ["The deliberate destruction of property", "Vandalism", "Vandalism"], ["The right of an author over their work", "Copyright", "Copyright"],
];

const UK_PRIME_MINISTERS = [
  ["Winston Churchill", "Winston Churchill", "The Second World War"], ["Clement Attlee", "Clement Attlee", "The founding of the National Health Service"],
  ["Margaret Thatcher", "Margaret Thatcher", "The first woman to hold the office"], ["Tony Blair", "Tony Blair", "New Labour and the Good Friday Agreement"],
  ["William Gladstone", "William Ewart Gladstone", "Four separate terms in the Victorian era"], ["Benjamin Disraeli", "Benjamin Disraeli", "Rivalry with Gladstone and imperial expansion"],
  ["Robert Walpole", "Robert Walpole", "Generally regarded as the first prime minister"], ["David Lloyd George", "David Lloyd George", "Leadership through the later First World War"],
];

const AMERICAN_HISTORY = [
  ["The Boston Tea Party", "Boston Tea Party", "1773"], ["The Louisiana Purchase", "Louisiana Purchase", "1803"],
  ["The Gettysburg Address", "Gettysburg Address", "1863"], ["The Wall Street Crash", "Wall Street Crash of 1929", "1929"],
  ["The attack on Pearl Harbor", "Attack on Pearl Harbor", "1941"], ["The Marshall Plan", "Marshall Plan", "1948"],
  ["The March on Washington", "March on Washington for Jobs and Freedom", "1963"], ["The Apollo 11 landing", "Apollo 11", "1969"],
  ["The Watergate break-in", "Watergate scandal", "1972"], ["The Louisiana Territory's exploration by Lewis and Clark", "Lewis and Clark Expedition", "1804"],
];

const EMPIRES = [
  ["The Roman Empire", "Roman Empire", "The Mediterranean world"], ["The British Empire", "British Empire", "A quarter of the world's land"],
  ["The Mongol Empire", "Mongol Empire", "The largest contiguous land empire"], ["The Spanish Empire", "Spanish Empire", "The Americas and the Philippines"],
  ["The Portuguese Empire", "Portuguese Empire", "Brazil, Africa and trading posts in Asia"], ["The Ottoman Empire", "Ottoman Empire", "South-east Europe, west Asia and north Africa"],
  ["The Russian Empire", "Russian Empire", "Northern Eurasia"], ["The Austro-Hungarian Empire", "Austria-Hungary", "Central Europe"],
  ["The Persian Achaemenid Empire", "Achaemenid Empire", "From the Balkans to the Indus"], ["The Han dynasty", "Han dynasty", "China for four centuries"],
];

const WORLD_WAR_FACTS = [
  ["The assassination that triggered the First World War", "Assassination of Archduke Franz Ferdinand", "Sarajevo"],
  ["The 1918 agreement that ended the fighting of the First World War", "Armistice of 11 November 1918", "The Armistice"],
  ["The 1944 Allied landings in Normandy", "Normandy landings", "D-Day"],
  ["The 1940 air campaign over Britain", "Battle of Britain", "The Battle of Britain"],
  ["The Allied conference dividing post-war Europe", "Yalta Conference", "The Yalta Conference"],
  ["The trials of Nazi leaders after the war", "Nuremberg trials", "The Nuremberg trials"],
  ["The wall dividing a German city from 1961", "Berlin Wall", "The Berlin Wall"],
  ["The 1962 standoff over missiles in the Caribbean", "Cuban Missile Crisis", "The Cuban Missile Crisis"],
];

export const HISTORY3_FAMILIES = [
  {
    category: "History", levels: [1, 3], facts: GOVERNMENT_FORMS, describe: true,
    forms: [
      { prompt: (definition) => `What is the name for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: POLITICAL_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `In politics, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: ECONOMICS, describe: true,
    forms: [
      { prompt: (definition) => `In economics, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: LAW_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `In law, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "History", levels: [3, 4], facts: UK_PRIME_MINISTERS,
    forms: [
      { prompt: (person) => `${person} is chiefly associated with what?`, explain: (person, note) => `${person}: ${soft(note)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: AMERICAN_HISTORY,
    forms: [
      { prompt: (event) => `In which year did ${event.replace("The ", "the ")} take place?`, explain: (event, year) => `${event}: ${year}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: EMPIRES, identify: true,
    forms: [
      { prompt: (empire) => `${empire} is best described as covering what?`, explain: (empire, extent) => `${empire}: ${soft(extent)}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: WORLD_WAR_FACTS, describe: true,
    forms: [
      { prompt: (description) => `What is the name for ${soft(description)}?`, explain: (description, term) => `That is ${soft(term)}.` },
    ],
  },
];
