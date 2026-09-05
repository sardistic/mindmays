// National institutions, symbols and the shapes of public life around the world.
import { soft } from "./case.js";
const PARLIAMENTS = [
  ["The United Kingdom", "Parliament of the United Kingdom", "Parliament"], ["The United States", "United States Congress", "Congress"],
  ["Russia", "Federal Assembly (Russia)", "The Federal Assembly"], ["Germany", "Bundestag", "The Bundestag"],
  ["Israel", "Knesset", "The Knesset"], ["Japan", "National Diet", "The Diet"],
  ["Iceland", "Althing", "The Althing"], ["Norway", "Storting", "The Storting"],
  ["Sweden", "Riksdag", "The Riksdag"], ["Denmark", "Folketing", "The Folketing"],
  ["Poland", "Sejm", "The Sejm"], ["Ireland", "Oireachtas", "The Oireachtas"],
  ["Spain", "Cortes Generales", "The Cortes Generales"], ["The Netherlands", "States General of the Netherlands", "The States General"],
  ["Iran", "Islamic Consultative Assembly", "The Majlis"], ["India", "Parliament of India", "The Sansad"],
  ["Afghanistan", "National Assembly (Afghanistan)", "The Loya Jirga tradition"], ["Switzerland", "Federal Assembly (Switzerland)", "The Federal Assembly"],
];

const HEADS_OF_STATE_TITLES = [
  ["Japan", "Emperor of Japan", "Emperor"], ["The Vatican", "Pope", "Pope"], ["Saudi Arabia", "King of Saudi Arabia", "King"],
  ["Qatar", "Emir of Qatar", "Emir"], ["Oman", "Sultan of Oman", "Sultan"], ["Brunei", "Sultan of Brunei", "Sultan"],
  ["Monaco", "Monaco", "Prince"], ["Liechtenstein", "Prince of Liechtenstein", "Prince"],
  ["Luxembourg", "Grand Duke of Luxembourg", "Grand Duke"], ["Andorra", "Co-Princes of Andorra", "Co-Prince"],
  ["Malaysia", "Yang di-Pertuan Agong", "Yang di-Pertuan Agong"], ["Bhutan", "Druk Gyalpo", "Druk Gyalpo"],
];

const NATIONAL_ANTHEMS = [
  ["France", "La Marseillaise", "La Marseillaise"], ["The United States", "The Star-Spangled Banner", "The Star-Spangled Banner"],
  ["Germany", "Deutschlandlied", "The Deutschlandlied"], ["Italy", "Il Canto degli Italiani", "Il Canto degli Italiani"],
  ["Spain", "Marcha Real", "The Marcha Real"], ["The Netherlands", "Wilhelmus", "The Wilhelmus"],
  ["Japan", "Kimigayo", "Kimigayo"], ["India", "Jana Gana Mana", "Jana Gana Mana"],
  ["Canada", "O Canada", "O Canada"], ["Australia", "Advance Australia Fair", "Advance Australia Fair"],
  ["New Zealand", "God Defend New Zealand", "God Defend New Zealand"], ["Ireland", "Amhrán na bhFiann", "Amhrán na bhFiann"],
  ["South Africa", "National anthem of South Africa", "Nkosi Sikelel' iAfrika and Die Stem"],
];

const PATRON_SAINTS = [
  ["England", "Saint George", "Saint George"], ["Scotland", "Andrew the Apostle", "Saint Andrew"],
  ["Ireland", "Saint Patrick", "Saint Patrick"], ["Wales", "Saint David", "Saint David"],
  ["France", "Denis", "Saint Denis"], ["Spain", "James the Great", "Saint James"],
  ["Italy", "Francis of Assisi", "Saint Francis of Assisi"], ["Russia", "Saint Nicholas", "Saint Nicholas"],
  ["Greece", "Andrew the Apostle", "Saint Andrew"], ["Portugal", "Anthony of Padua", "Saint Anthony of Padua"],
];

const WORLD_ORGANISATIONS = [
  ["The court settling disputes between states at The Hague", "International Court of Justice", "The International Court of Justice"],
  ["The court trying individuals for genocide and war crimes", "International Criminal Court", "The International Criminal Court"],
  ["The body coordinating international police cooperation", "Interpol", "Interpol"],
  ["The bank lending to developing countries", "World Bank", "The World Bank"],
  ["The forum of the world's largest economies", "G20", "The G20"],
  ["The union of African states", "African Union", "The African Union"],
  ["The organisation of American states", "Organization of American States", "The Organization of American States"],
  ["The body governing world football", "FIFA", "FIFA"],
  ["The body governing the modern Olympic movement", "International Olympic Committee", "The International Olympic Committee"],
  ["The body standardising weights and measures internationally", "International Bureau of Weights and Measures", "The International Bureau of Weights and Measures"],
  ["The agency for refugees", "UNHCR", "The UNHCR"],
  ["The body regulating international shipping", "International Maritime Organization", "The International Maritime Organization"],
];

const FLAG_FEATURES = [
  ["Canada", "Flag of Canada", "A red maple leaf"], ["Japan", "Flag of Japan", "A red disc on white"],
  ["Switzerland", "Flag of Switzerland", "A white cross on red, and square"], ["Nepal", "Flag of Nepal", "Two stacked pennants, the only non-rectangular national flag"],
  ["Brazil", "Flag of Brazil", "A green field with a yellow rhombus and starry globe"],
  ["South Korea", "Flag of South Korea", "A red and blue taegeuk with four trigrams"],
  ["India", "Flag of India", "A saffron, white and green tricolour with a wheel"],
  ["Turkey", "Flag of Turkey", "A white star and crescent on red"],
  ["Israel", "Flag of Israel", "A blue Star of David between two stripes"],
  ["Mexico", "Flag of Mexico", "An eagle on a cactus devouring a snake"],
  ["Wales", "Flag of Wales", "A red dragon on green and white"],
  ["Greece", "Flag of Greece", "Nine blue and white stripes with a cross"],
  ["Portugal", "Flag of Portugal", "Green and red with an armillary sphere"],
  ["Kenya", "Flag of Kenya", "A Maasai shield and spears over black, red and green"],
];

const TIME_ZONES = [
  ["The reference time on the prime meridian", "Coordinated Universal Time", "Coordinated Universal Time"],
  ["The older name for that reference time", "Greenwich Mean Time", "Greenwich Mean Time"],
  ["Shifting clocks forward in summer", "Daylight saving time", "Daylight saving time"],
  ["The line where the calendar day changes", "International Date Line", "The International Date Line"],
  ["A country spanning eleven time zones", "Russia", "Russia"],
  ["A country using a single time zone despite its width", "Time in China", "China"],
  ["A country whose standard time is offset by thirty minutes", "Indian Standard Time", "India"],
];

export const WORLD2_FAMILIES = [
  {
    category: "History", levels: [3, 4], facts: PARLIAMENTS,
    forms: [
      { prompt: (country) => `What is the legislature of ${country} called?`, explain: (country, name) => `${country}'s legislature is ${name.replace("The ", "the ")}.` },
    ],
  },
  {
    category: "History", levels: [3, 4], facts: HEADS_OF_STATE_TITLES,
    forms: [
      { prompt: (country) => `What title does the head of state of ${country} hold?`, explain: (country, title) => `${country}'s head of state is styled ${title}.` },
    ],
  },
  {
    category: "Music", levels: [2, 4], facts: NATIONAL_ANTHEMS,
    forms: [
      { prompt: (country) => `What is the national anthem of ${country} called?`, explain: (country, anthem) => `${country}'s anthem is ${anthem.replace("The ", "")}.` },
      { reverse: true, prompt: (country, anthem) => `${anthem.replace("The ", "")} is the national anthem of which country?`, explain: (country, anthem) => `That is the anthem of ${country}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: PATRON_SAINTS,
    forms: [
      { prompt: (country) => `Who is the patron saint of ${country}?`, explain: (country, saint) => `${saint} is the patron saint of ${country}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: WORLD_ORGANISATIONS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, body) => `That is ${body.replace("The ", "the ")}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: FLAG_FEATURES, identify: true,
    forms: [
      { prompt: (country) => `What appears on the flag of ${country}?`, explain: (country, feature) => `${country}'s flag shows ${soft(feature)}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: TIME_ZONES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, answer) => `That is ${answer.replace("The ", "the ")}.` },
    ],
  },
];
