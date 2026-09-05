// Borders, waters and the shapes countries make on a map.
import { soft } from "./case.js";
const BORDERING = [
  ["Portugal", "Portugal", "Spain"], ["Ireland", "Republic of Ireland", "The United Kingdom"], ["Denmark", "Denmark", "Germany"],
  ["Monaco", "Monaco", "France"], ["San Marino", "San Marino", "Italy"], ["Vatican City", "Vatican City", "Italy"],
  ["Lesotho", "Lesotho", "South Africa"], ["The Gambia", "The Gambia", "Senegal"], ["East Timor", "East Timor", "Indonesia"],
  ["South Korea", "South Korea", "North Korea"], ["Canada", "Canada", "The United States"], ["Belize", "Belize", "Mexico"],
  ["Haiti", "Haiti", "The Dominican Republic"], ["Bangladesh", "Bangladesh", "India"], ["Nepal", "Nepal", "China"],
  ["Bhutan", "Bhutan", "India"], ["Mongolia", "Mongolia", "Russia"], ["Qatar", "Qatar", "Saudi Arabia"],
  ["Andorra", "Andorra", "Spain"], ["Liechtenstein", "Liechtenstein", "Switzerland"],
];

const BORDERING_SEAS = [
  ["Egypt", "Egypt", "The Mediterranean Sea"], ["Israel", "Israel", "The Mediterranean Sea"], ["Greece", "Greece", "The Aegean Sea"],
  ["Bulgaria", "Bulgaria", "The Black Sea"], ["Romania", "Romania", "The Black Sea"], ["Georgia (country)", "Georgia (country)", "The Black Sea"],
  ["Finland", "Finland", "The Baltic Sea"], ["Estonia", "Estonia", "The Baltic Sea"], ["Latvia", "Latvia", "The Baltic Sea"],
  ["The Netherlands", "Netherlands", "The North Sea"], ["Denmark", "Denmark", "The North Sea"], ["Norway", "Norway", "The Norwegian Sea"],
  ["Saudi Arabia", "Saudi Arabia", "The Red Sea"], ["Yemen", "Yemen", "The Arabian Sea"], ["Oman", "Oman", "The Arabian Sea"],
  ["Vietnam", "Vietnam", "The South China Sea"], ["The Philippines", "Philippines", "The South China Sea"], ["Japan", "Japan", "The Sea of Japan"],
  ["Cuba", "Cuba", "The Caribbean Sea"], ["Jamaica", "Jamaica", "The Caribbean Sea"], ["Australia", "Australia", "The Coral Sea"],
  ["Kazakhstan", "Kazakhstan", "The Caspian Sea"], ["Azerbaijan", "Azerbaijan", "The Caspian Sea"], ["Turkey", "Turkey", "The Black Sea"],
];


const REGIONS = [
  ["Bavaria", "Bavaria", "Germany"], ["Tuscany", "Tuscany", "Italy"], ["Andalusia", "Andalusia", "Spain"], ["Catalonia", "Catalonia", "Spain"],
  ["Normandy", "Normandy", "France"], ["Provence", "Provence", "France"], ["Flanders", "Flanders", "Belgium"], ["Wallonia", "Wallonia", "Belgium"],
  ["Transylvania", "Transylvania", "Romania"], ["Silesia", "Silesia", "Poland"], ["Lapland", "Lapland (Finland)", "Finland"],
  ["Siberia", "Siberia", "Russia"], ["Patagonia", "Patagonia", "Argentina and Chile"], ["The Amazon Basin", "Amazon basin", "Brazil"],
  ["Punjab", "Punjab", "India and Pakistan"], ["Kerala", "Kerala", "India"], ["Hokkaido", "Hokkaido", "Japan"],
  ["Queensland", "Queensland", "Australia"], ["Nunavut", "Nunavut", "Canada"], ["Quebec", "Quebec", "Canada"],
  ["Yucatán", "Yucatán Peninsula", "Mexico"], ["The Sahel", "Sahel", "Africa"], ["The Maghreb", "Maghreb", "North Africa"],
  ["The Levant", "Levant", "The eastern Mediterranean"], ["Scandinavia", "Scandinavia", "Northern Europe"], ["The Balkans", "Balkans", "South-eastern Europe"],
  ["Anatolia", "Anatolia", "Turkey"], ["Mesopotamia", "Mesopotamia", "Iraq"], ["Bohemia", "Bohemia", "The Czech Republic"], ["Galicia", "Galicia (Spain)", "Spain"],
];

const OCEANS_SEAS = [
  ["The largest ocean", "Pacific Ocean", "The Pacific Ocean"], ["The second-largest ocean", "Atlantic Ocean", "The Atlantic Ocean"],
  ["The third-largest ocean", "Indian Ocean", "The Indian Ocean"], ["The ocean around Antarctica", "Southern Ocean", "The Southern Ocean"],
  ["The smallest and shallowest ocean", "Arctic Ocean", "The Arctic Ocean"], ["The saltiest large lake, on the Israel-Jordan border", "Dead Sea", "The Dead Sea"],
  ["The largest inland body of water", "Caspian Sea", "The Caspian Sea"], ["The sea between Italy and Greece", "Ionian Sea", "The Ionian Sea"],
  ["The sea north of Norway and Russia", "Barents Sea", "The Barents Sea"], ["The sea between Korea and Japan", "Sea of Japan", "The Sea of Japan"],
  ["The sea north-east of Australia", "Coral Sea", "The Coral Sea"], ["The sea between Cuba and South America", "Caribbean Sea", "The Caribbean Sea"],
];

const CAPES_AND_POINTS = [
  ["The southern tip of Africa", "Cape Agulhas", "Cape Agulhas"], ["The southernmost point of South America's mainland", "Cape Froward", "Cape Froward"],
  ["The headland at the southern end of Tierra del Fuego", "Cape Horn", "Cape Horn"], ["The cape at the south-west of South Africa", "Cape of Good Hope", "The Cape of Good Hope"],
  ["The northernmost point of mainland Europe", "Cape Nordkinn", "Cape Nordkinn"], ["The most westerly point of continental Europe", "Cabo da Roca", "Cabo da Roca"],
  ["The southernmost point of mainland Australia", "Wilsons Promontory", "Wilsons Promontory"], ["The rock at the southern tip of the Iberian Peninsula", "Gibraltar", "Gibraltar"],
];

const PENINSULAS = [
  ["The Iberian Peninsula", "Iberian Peninsula", "Spain and Portugal"], ["The Scandinavian Peninsula", "Scandinavian Peninsula", "Norway and Sweden"],
  ["The Italian Peninsula", "Italian Peninsula", "Italy"], ["The Balkan Peninsula", "Balkans", "South-eastern Europe"],
  ["The Arabian Peninsula", "Arabian Peninsula", "Saudi Arabia and its neighbours"], ["The Korean Peninsula", "Korean Peninsula", "The two Koreas"],
  ["The Indochinese Peninsula", "Mainland Southeast Asia", "Mainland South-east Asia"], ["The Yucatán Peninsula", "Yucatán Peninsula", "Mexico"],
  ["The Kamchatka Peninsula", "Kamchatka Peninsula", "Russia"], ["The Sinai Peninsula", "Sinai Peninsula", "Egypt"],
  ["The Crimean Peninsula", "Crimea", "The northern Black Sea"], ["The Jutland Peninsula", "Jutland", "Denmark"],
];

const CLIMATE_ZONES = [
  ["Hot and wet all year near the equator", "Tropical rainforest climate", "Tropical rainforest"],
  ["Hot with distinct wet and dry seasons", "Tropical savanna climate", "Tropical savanna"],
  ["Very dry with sparse vegetation", "Desert climate", "Desert"],
  ["Mild wet winters and hot dry summers", "Mediterranean climate", "Mediterranean"],
  ["Warm summers and cold snowy winters", "Humid continental climate", "Humid continental"],
  ["Cold with short cool summers and conifer forest", "Subarctic climate", "Subarctic"],
  ["Treeless, frozen for much of the year", "Tundra climate", "Tundra"],
  ["Permanently frozen with ice sheets", "Ice cap climate", "Ice cap"],
  ["Mild and damp with cool summers", "Oceanic climate", "Oceanic"],
];

const BIOMES = [
  ["The taiga", "Taiga", "The northern coniferous forest"], ["The tundra", "Tundra", "Treeless ground above or beyond the tree line"],
  ["The savanna", "Savanna", "Grassland scattered with trees"], ["The steppe", "Steppe", "Dry grassland without trees"],
  ["The chaparral", "Chaparral", "Dense drought-adapted shrubland"], ["The mangrove forest", "Mangrove forest", "Salt-tolerant coastal woodland"],
  ["The coral reef", "Coral reef", "A shallow marine structure built by corals"], ["The prairie", "Prairie", "Temperate grassland of North America"],
];

export const GEOGRAPHY4_FAMILIES = [
  {
    category: "Geography", levels: [2, 4], facts: BORDERING,
    forms: [
      { prompt: (country) => `${country.replace("The ", "The ")} shares a land border chiefly with which country?`, explain: (country, neighbour) => `${country} borders ${neighbour}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: BORDERING_SEAS,
    forms: [
      { prompt: (country) => `Which sea does ${country.replace(" (country)", "")} border?`, explain: (country, sea) => `${country.replace(" (country)", "")} borders ${soft(sea)}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: REGIONS,
    forms: [
      { prompt: (region) => `${region.replace("The ", "The ")} is a region of where?`, explain: (region, place) => `${region} is in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: OCEANS_SEAS, describe: true,
    forms: [
      { prompt: (description) => `What is ${soft(description)}?`, explain: (description, name) => `That is ${soft(name)}.` },
    ],
  },
  {
    category: "Geography", levels: [3, 4], facts: CAPES_AND_POINTS, describe: true,
    forms: [
      { prompt: (description) => `What is ${soft(description)} called?`, explain: (description, name) => `That is ${name}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 3], facts: PENINSULAS,
    forms: [
      { prompt: (peninsula) => `${peninsula} covers which countries or area?`, explain: (peninsula, place) => `${peninsula} covers ${soft(place)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: CLIMATE_ZONES, describe: true,
    forms: [
      { prompt: (description) => `Which climate is ${soft(description)}?`, explain: (description, zone) => `That is the ${soft(zone)} climate.` },
    ],
  },
  {
    category: "Earth Science", levels: [1, 3], facts: BIOMES,
    forms: [
      { prompt: (biome) => `What is ${soft(biome)}?`, explain: (biome, description) => `${biome}: ${soft(description)}.` },
      { reverse: true, prompt: (biome, description) => `Which biome is ${soft(description)}?`, explain: (biome, description) => `That is ${soft(biome)}.` },
    ],
  },
];
