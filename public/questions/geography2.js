// More geography: which continent, which language, which biggest city, which people.
import { soft } from "./case.js";
const CONTINENTS = [
  ["France", "France", "Europe"], ["Germany", "Germany", "Europe"], ["Italy", "Italy", "Europe"], ["Spain", "Spain", "Europe"], ["Portugal", "Portugal", "Europe"],
  ["Greece", "Greece", "Europe"], ["Poland", "Poland", "Europe"], ["Sweden", "Sweden", "Europe"], ["Norway", "Norway", "Europe"], ["Ireland", "Ireland", "Europe"],
  ["Japan", "Japan", "Asia"], ["China", "China", "Asia"], ["India", "India", "Asia"], ["Thailand", "Thailand", "Asia"], ["Vietnam", "Vietnam", "Asia"],
  ["Indonesia", "Indonesia", "Asia"], ["Nepal", "Nepal", "Asia"], ["Mongolia", "Mongolia", "Asia"], ["Sri Lanka", "Sri Lanka", "Asia"], ["Philippines", "Philippines", "Asia"],
  ["Egypt", "Egypt", "Africa"], ["Nigeria", "Nigeria", "Africa"], ["Kenya", "Kenya", "Africa"], ["Ethiopia", "Ethiopia", "Africa"], ["Ghana", "Ghana", "Africa"],
  ["Morocco", "Morocco", "Africa"], ["Tanzania", "Tanzania", "Africa"], ["Namibia", "Namibia", "Africa"], ["Senegal", "Senegal", "Africa"], ["Madagascar", "Madagascar", "Africa"],
  ["Brazil", "Brazil", "South America"], ["Argentina", "Argentina", "South America"], ["Chile", "Chile", "South America"], ["Peru", "Peru", "South America"],
  ["Colombia", "Colombia", "South America"], ["Bolivia", "Bolivia", "South America"], ["Uruguay", "Uruguay", "South America"], ["Ecuador", "Ecuador", "South America"],
  ["Mexico", "Mexico", "North America"], ["Canada", "Canada", "North America"], ["Cuba", "Cuba", "North America"], ["Guatemala", "Guatemala", "North America"],
  ["Panama", "Panama", "North America"], ["Jamaica", "Jamaica", "North America"], ["Honduras", "Honduras", "North America"], ["Costa Rica", "Costa Rica", "North America"],
  ["Australia", "Australia", "Oceania"], ["New Zealand", "New Zealand", "Oceania"], ["Fiji", "Fiji", "Oceania"], ["Papua New Guinea", "Papua New Guinea", "Oceania"],
  ["Samoa", "Samoa", "Oceania"], ["Vanuatu", "Vanuatu", "Oceania"], ["Tonga", "Tonga", "Oceania"], ["Solomon Islands", "Solomon Islands", "Oceania"],
];

const OFFICIAL_LANGUAGES = [
  ["Brazil", "Brazil", "Portuguese"], ["Angola", "Angola", "Portuguese"], ["Mozambique", "Mozambique", "Portuguese"], ["Argentina", "Argentina", "Spanish"],
  ["Colombia", "Colombia", "Spanish"], ["Peru", "Peru", "Spanish"], ["Austria", "Austria", "German"], ["Liechtenstein", "Liechtenstein", "German"],
  ["Senegal", "Senegal", "French"], ["Ivory Coast", "Ivory Coast", "French"], ["Haiti", "Haiti", "French"], ["Egypt", "Egypt", "Arabic"],
  ["Morocco", "Morocco", "Arabic"], ["Jordan", "Jordan", "Arabic"], ["Iran", "Iran", "Persian"], ["Afghanistan", "Afghanistan", "Pashto"],
  ["Pakistan", "Pakistan", "Urdu"], ["Bangladesh", "Bangladesh", "Bengali"], ["Israel", "Israel", "Hebrew"], ["Turkey", "Turkey", "Turkish"],
  ["Greece", "Greece", "Greek"], ["Finland", "Finland", "Finnish"], ["Hungary", "Hungary", "Hungarian"], ["Romania", "Romania", "Romanian"],
  ["Netherlands", "Netherlands", "Dutch"], ["Suriname", "Suriname", "Dutch"], ["Kenya", "Kenya", "Swahili"], ["Tanzania", "Tanzania", "Swahili"],
  ["Ethiopia", "Ethiopia", "Amharic"], ["Thailand", "Thailand", "Thai"], ["Vietnam", "Vietnam", "Vietnamese"], ["Cambodia", "Cambodia", "Khmer"],
  ["Indonesia", "Indonesia", "Indonesian"], ["Philippines", "Philippines", "Filipino"], ["Japan", "Japan", "Japanese"], ["South Korea", "South Korea", "Korean"],
  ["Mongolia", "Mongolia", "Mongolian"], ["Iceland", "Iceland", "Icelandic"], ["Estonia", "Estonia", "Estonian"], ["Latvia", "Latvia", "Latvian"],
  ["Lithuania", "Lithuania", "Lithuanian"], ["Albania", "Albania", "Albanian"], ["Armenia", "Armenia", "Armenian"], ["Georgia (country)", "Georgia (country)", "Georgian"],
];

const LARGEST_CITIES = [
  ["Turkey", "Istanbul", "Istanbul"], ["Australia", "Sydney", "Sydney"], ["Canada", "Toronto", "Toronto"], ["Switzerland", "Zurich", "Zurich"],
  ["Morocco", "Casablanca", "Casablanca"], ["Nigeria", "Lagos", "Lagos"], ["Brazil", "São Paulo", "São Paulo"], ["Pakistan", "Karachi", "Karachi"],
  ["India", "Mumbai", "Mumbai"], ["China", "Shanghai", "Shanghai"], ["Vietnam", "Ho Chi Minh City", "Ho Chi Minh City"], ["Myanmar", "Yangon", "Yangon"],
  ["Kazakhstan", "Almaty", "Almaty"], ["Ivory Coast", "Abidjan", "Abidjan"], ["Tanzania", "Dar es Salaam", "Dar es Salaam"], ["New Zealand", "Auckland", "Auckland"],
  ["United States", "New York City", "New York City"], ["Israel", "Tel Aviv", "Tel Aviv"], ["Ecuador", "Guayaquil", "Guayaquil"], ["Bolivia", "Santa Cruz de la Sierra", "Santa Cruz de la Sierra"],
];

const DEMONYMS = [
  ["The Netherlands", "Dutch people", "Dutch"], ["Denmark", "Danes", "Danish"], ["Poland", "Poles", "Polish"], ["Sweden", "Swedes", "Swedish"],
  ["Portugal", "Portuguese people", "Portuguese"], ["Switzerland", "Swiss people", "Swiss"], ["Wales", "Welsh people", "Welsh"], ["Scotland", "Scottish people", "Scottish"],
  ["Finland", "Finns", "Finnish"], ["Norway", "Norwegians", "Norwegian"], ["Iceland", "Icelanders", "Icelandic"], ["Greece", "Greeks", "Greek"],
  ["Thailand", "Thai people", "Thai"], ["Nepal", "Nepalis", "Nepali"], ["Mongolia", "Mongols", "Mongolian"], ["Peru", "Peruvians", "Peruvian"],
];

const ISLANDS = [
  ["Greenland", "Greenland", "Denmark"], ["Sicily", "Sicily", "Italy"], ["Sardinia", "Sardinia", "Italy"], ["Corsica", "Corsica", "France"],
  ["Crete", "Crete", "Greece"], ["Tasmania", "Tasmania", "Australia"], ["Hokkaido", "Hokkaido", "Japan"], ["Honshu", "Honshu", "Japan"],
  ["Borneo", "Borneo", "Indonesia"], ["Java", "Java", "Indonesia"], ["Sumatra", "Sumatra", "Indonesia"], ["Luzon", "Luzon", "Philippines"],
  ["Zanzibar", "Zanzibar", "Tanzania"], ["Tenerife", "Tenerife", "Spain"], ["Mallorca", "Mallorca", "Spain"], ["Baffin Island", "Baffin Island", "Canada"],
  ["Vancouver Island", "Vancouver Island", "Canada"], ["The Isle of Man", "Isle of Man", "The British Isles"], ["Svalbard", "Svalbard", "Norway"], ["Easter Island", "Easter Island", "Chile"],
];

const SEAS_AND_GULFS = [
  ["The Baltic Sea", "Baltic Sea", "Northern Europe"], ["The Adriatic Sea", "Adriatic Sea", "Between Italy and the Balkans"],
  ["The Aegean Sea", "Aegean Sea", "Between Greece and Turkey"], ["The Black Sea", "Black Sea", "Between Europe and Asia"],
  ["The Red Sea", "Red Sea", "Between Africa and Arabia"], ["The Coral Sea", "Coral Sea", "Off north-east Australia"],
  ["The Tasman Sea", "Tasman Sea", "Between Australia and New Zealand"], ["The Sargasso Sea", "Sargasso Sea", "In the North Atlantic"],
  ["Hudson Bay", "Hudson Bay", "In northern Canada"], ["The Bay of Biscay", "Bay of Biscay", "Off France and Spain"],
  ["The Persian Gulf", "Persian Gulf", "Between Iran and Arabia"], ["The Gulf of Bothnia", "Gulf of Bothnia", "Between Sweden and Finland"],
];

const TIME_AND_LINES = [
  ["The prime meridian", "Prime meridian", "Greenwich"], ["The equator", "Equator", "Zero degrees latitude"],
  ["The Tropic of Cancer", "Tropic of Cancer", "The northern tropic"], ["The Tropic of Capricorn", "Tropic of Capricorn", "The southern tropic"],
  ["The Arctic Circle", "Arctic Circle", "The northern polar circle"], ["The Antarctic Circle", "Antarctic Circle", "The southern polar circle"],
  ["The International Date Line", "International Date Line", "Roughly the 180th meridian"],
];

export const GEOGRAPHY2_FAMILIES = [
  {
    category: "Geography", levels: [1, 2], facts: CONTINENTS,
    forms: [
      { prompt: (country) => `On which continent is ${country}?`, explain: (country, continent) => `${country} is in ${continent}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: OFFICIAL_LANGUAGES,
    forms: [
      { prompt: (country) => `Which language is official in ${country.replace(" (country)", "")}?`, explain: (country, language) => `${language} is an official language of ${country.replace(" (country)", "")}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: LARGEST_CITIES,
    forms: [
      { prompt: (country) => `What is the largest city of ${country}?`, explain: (country, city) => `${city} is the largest city of ${country}.` },
      { reverse: true, prompt: (country, city) => `${city} is the largest city of which country?`, explain: (country, city) => `${city} is the largest city of ${country}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 3], facts: DEMONYMS,
    forms: [
      { prompt: (place) => `What are the people of ${place.replace("The ", "the ")} called?`, explain: (place, demonym) => `They are ${demonym}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: ISLANDS,
    forms: [
      { prompt: (island) => `${island.replace("The ", "The ")} belongs to which country?`, explain: (island, country) => `${island} belongs to ${country}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: SEAS_AND_GULFS,
    forms: [
      { prompt: (sea) => `Where does ${sea.replace("The ", "the ")} lie?`, explain: (sea, place) => `${sea} lies ${soft(place)}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: TIME_AND_LINES,
    forms: [
      { prompt: (line) => `What is ${line.replace("The ", "the ")}?`, explain: (line, meaning) => `${line}: ${soft(meaning)}.` },
    ],
  },
];
