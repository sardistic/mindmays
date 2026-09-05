// The rest of the world's capitals, and the physical geography that surrounds them.
import { soft } from "./case.js";
const MORE_CAPITALS = [
  ["Albania", "Tirana", "Tirana"], ["Andorra", "Andorra la Vella", "Andorra la Vella"], ["Antigua and Barbuda", "St. John's, Antigua and Barbuda", "St. John's"],
  ["Bahamas", "Nassau, Bahamas", "Nassau"], ["Bahrain", "Manama", "Manama"], ["Barbados", "Bridgetown", "Bridgetown"],
  ["Benin", "Porto-Novo", "Porto-Novo"], ["Bolivia's seat of government", "La Paz", "La Paz"], ["Burundi", "Gitega", "Gitega"],
  ["Cape Verde", "Praia", "Praia"], ["Central African Republic", "Bangui", "Bangui"], ["Comoros", "Moroni, Comoros", "Moroni"],
  ["Democratic Republic of the Congo", "Kinshasa", "Kinshasa"], ["Republic of the Congo", "Brazzaville", "Brazzaville"], ["Cyprus", "Nicosia", "Nicosia"],
  ["Djibouti", "Djibouti City", "Djibouti City"], ["Dominica", "Roseau", "Roseau"], ["East Timor", "Dili", "Dili"],
  ["Equatorial Guinea", "Malabo", "Malabo"], ["Eswatini", "Mbabane", "Mbabane"], ["Gabon", "Libreville", "Libreville"],
  ["Gambia", "Banjul", "Banjul"], ["Grenada", "St. George's, Grenada", "St. George's"], ["Guinea", "Conakry", "Conakry"],
  ["Guinea-Bissau", "Bissau", "Bissau"], ["Kiribati", "Tarawa", "Tarawa"], ["Kosovo", "Pristina", "Pristina"],
  ["Lesotho", "Maseru", "Maseru"], ["Liberia", "Monrovia", "Monrovia"], ["Liechtenstein", "Vaduz", "Vaduz"],
  ["Luxembourg", "Luxembourg City", "Luxembourg City"], ["Malawi", "Lilongwe", "Lilongwe"], ["Maldives", "Malé", "Malé"],
  ["Malta", "Valletta", "Valletta"], ["Marshall Islands", "Majuro", "Majuro"], ["Mauritania", "Nouakchott", "Nouakchott"],
  ["Mauritius", "Port Louis", "Port Louis"], ["Monaco", "Monaco", "Monaco"], ["Nauru", "Yaren District", "Yaren"],
  ["Papua New Guinea", "Port Moresby", "Port Moresby"], ["Saint Lucia", "Castries", "Castries"], ["San Marino", "City of San Marino", "San Marino"],
  ["São Tomé and Príncipe", "São Tomé", "São Tomé"], ["Seychelles", "Victoria, Seychelles", "Victoria"], ["Sierra Leone", "Freetown", "Freetown"],
  ["Solomon Islands", "Honiara", "Honiara"], ["South Sudan", "Juba", "Juba"], ["Togo", "Lomé", "Lomé"],
  ["Tonga", "Nukuʻalofa", "Nuku'alofa"], ["Trinidad and Tobago", "Port of Spain", "Port of Spain"], ["Tuvalu", "Funafuti", "Funafuti"],
  ["United Arab Emirates", "Abu Dhabi", "Abu Dhabi"], ["Vanuatu", "Port Vila", "Port Vila"], ["Vatican City", "Vatican City", "Vatican City"],
  ["Cuba", "Havana", "Havana"], ["Bahrain's largest city", "Manama", "Manama"], ["Scotland", "Edinburgh", "Edinburgh"],
  ["Wales", "Cardiff", "Cardiff"], ["Northern Ireland", "Belfast", "Belfast"], ["England", "London", "London"],
];

const CAPITAL_RIVERS = [
  ["Paris", "Seine", "The Seine"], ["London", "River Thames", "The Thames"], ["Rome", "Tiber", "The Tiber"], ["Vienna", "Danube", "The Danube"],
  ["Cairo", "Nile", "The Nile"], ["Baghdad", "Tigris", "The Tigris"], ["Warsaw", "Vistula", "The Vistula"], ["Prague", "Vltava", "The Vltava"],
  ["Lisbon", "Tagus", "The Tagus"], ["Berlin", "Spree", "The Spree"], ["Moscow", "Moskva (river)", "The Moskva"], ["Delhi", "Yamuna", "The Yamuna"],
  ["Seoul", "Han River (Korea)", "The Han"], ["Bangkok", "Chao Phraya River", "The Chao Phraya"], ["Dublin", "River Liffey", "The Liffey"],
  ["Madrid", "Manzanares (river)", "The Manzanares"], ["Rio de Janeiro's neighbour Buenos Aires", "Río de la Plata", "The Río de la Plata"],
  ["Khartoum", "Nile", "The Nile"], ["Kyiv", "Dnieper", "The Dnieper"], ["Budapest", "Danube", "The Danube"],
];

const VOLCANOES = [
  ["Mount Vesuvius", "Mount Vesuvius", "Italy"], ["Mount Etna", "Mount Etna", "Italy"], ["Stromboli", "Stromboli", "Italy"],
  ["Krakatoa", "Krakatoa", "Indonesia"], ["Mount Merapi", "Mount Merapi", "Indonesia"], ["Mount Tambora", "Mount Tambora", "Indonesia"],
  ["Mount St. Helens", "Mount St. Helens", "The United States"], ["Kilauea", "Kīlauea", "Hawaii"], ["Mauna Loa", "Mauna Loa", "Hawaii"],
  ["Eyjafjallajökull", "Eyjafjallajökull", "Iceland"], ["Hekla", "Hekla", "Iceland"], ["Cotopaxi", "Cotopaxi", "Ecuador"],
  ["Mount Pinatubo", "Mount Pinatubo", "The Philippines"], ["Mount Fuji", "Mount Fuji", "Japan"], ["Popocatépetl", "Popocatépetl", "Mexico"],
  ["Mount Erebus", "Mount Erebus", "Antarctica"], ["Nyiragongo", "Mount Nyiragongo", "The Democratic Republic of the Congo"], ["Villarrica", "Villarrica (volcano)", "Chile"],
];

const WATERFALLS = [
  ["Angel Falls", "Angel Falls", "Venezuela"], ["Niagara Falls", "Niagara Falls", "The Canada-United States border"], ["Victoria Falls", "Victoria Falls", "The Zambia-Zimbabwe border"],
  ["Iguazu Falls", "Iguazu Falls", "The Argentina-Brazil border"], ["Gullfoss", "Gullfoss", "Iceland"], ["Sutherland Falls", "Sutherland Falls", "New Zealand"],
  ["Tugela Falls", "Tugela Falls", "South Africa"], ["Yosemite Falls", "Yosemite Falls", "California"],
];

const MOUNTAIN_RANGES = [
  ["The Andes", "Andes", "South America"], ["The Himalayas", "Himalayas", "Asia"], ["The Alps", "Alps", "Europe"], ["The Rockies", "Rocky Mountains", "North America"],
  ["The Urals", "Ural Mountains", "Between Europe and Asia"], ["The Atlas Mountains", "Atlas Mountains", "North Africa"], ["The Pyrenees", "Pyrenees", "Between France and Spain"],
  ["The Carpathians", "Carpathian Mountains", "Central and Eastern Europe"], ["The Appalachians", "Appalachian Mountains", "Eastern North America"],
  ["The Great Dividing Range", "Great Dividing Range", "Eastern Australia"], ["The Drakensberg", "Drakensberg", "Southern Africa"], ["The Caucasus", "Caucasus Mountains", "Between the Black and Caspian seas"],
  ["The Karakoram", "Karakoram", "Asia"], ["The Apennines", "Apennine Mountains", "Italy"], ["The Scandinavian Mountains", "Scandinavian Mountains", "Scandinavia"], ["The Zagros Mountains", "Zagros Mountains", "Iran"],
];

const NATIONAL_PARKS = [
  ["Yellowstone", "Yellowstone National Park", "The United States"], ["Yosemite", "Yosemite National Park", "The United States"], ["The Serengeti", "Serengeti National Park", "Tanzania"],
  ["Kruger", "Kruger National Park", "South Africa"], ["Banff", "Banff National Park", "Canada"], ["The Galápagos", "Galápagos National Park", "Ecuador"],
  ["Torres del Paine", "Torres del Paine National Park", "Chile"], ["Kakadu", "Kakadu National Park", "Australia"], ["Plitvice Lakes", "Plitvice Lakes National Park", "Croatia"],
  ["Fiordland", "Fiordland National Park", "New Zealand"],
];

const EXTREMES = [
  ["The longest river", "Nile", "The Nile"], ["The largest ocean", "Pacific Ocean", "The Pacific"], ["The largest desert", "Antarctic desert", "The Antarctic desert"],
  ["The deepest ocean trench", "Mariana Trench", "The Mariana Trench"], ["The largest island", "Greenland", "Greenland"], ["The largest lake by area", "Caspian Sea", "The Caspian Sea"],
  ["The deepest lake", "Lake Baikal", "Lake Baikal"], ["The largest coral reef system", "Great Barrier Reef", "The Great Barrier Reef"],
  ["The largest rainforest", "Amazon rainforest", "The Amazon rainforest"], ["The highest waterfall", "Angel Falls", "Angel Falls"],
  ["The largest country by area", "Russia", "Russia"], ["The smallest country", "Vatican City", "Vatican City"],
  ["The most populous country", "India", "India"], ["The largest hot desert", "Sahara", "The Sahara"],
];

const CITY_COUNTRIES = [
  ["Barcelona", "Barcelona", "Spain"], ["Milan", "Milan", "Italy"], ["Munich", "Munich", "Germany"], ["Hamburg", "Hamburg", "Germany"],
  ["Marseille", "Marseille", "France"], ["Lyon", "Lyon", "France"], ["Porto", "Porto", "Portugal"], ["Thessaloniki", "Thessaloniki", "Greece"],
  ["Krakow", "Kraków", "Poland"], ["Gothenburg", "Gothenburg", "Sweden"], ["Bergen", "Bergen", "Norway"], ["Aarhus", "Aarhus", "Denmark"],
  ["Rotterdam", "Rotterdam", "The Netherlands"], ["Antwerp", "Antwerp", "Belgium"], ["Geneva", "Geneva", "Switzerland"], ["Salzburg", "Salzburg", "Austria"],
  ["Kyoto", "Kyoto", "Japan"], ["Osaka", "Osaka", "Japan"], ["Busan", "Busan", "South Korea"], ["Guangzhou", "Guangzhou", "China"],
  ["Chennai", "Chennai", "India"], ["Lahore", "Lahore", "Pakistan"], ["Isfahan", "Isfahan", "Iran"], ["Alexandria", "Alexandria", "Egypt"],
  ["Marrakesh", "Marrakesh", "Morocco"], ["Mombasa", "Mombasa", "Kenya"], ["Durban", "Durban", "South Africa"], ["Medellín", "Medellín", "Colombia"],
  ["Córdoba, Argentina", "Córdoba, Argentina", "Argentina"], ["Valparaíso", "Valparaíso", "Chile"], ["Monterrey", "Monterrey", "Mexico"], ["Melbourne", "Melbourne", "Australia"],
  ["Christchurch", "Christchurch", "New Zealand"], ["Montreal", "Montreal", "Canada"], ["Vancouver", "Vancouver", "Canada"], ["Chicago", "Chicago", "The United States"],
];

export const GEOGRAPHY3_FAMILIES = [
  {
    category: "Geography", levels: [3, 4], facts: MORE_CAPITALS,
    forms: [
      { prompt: (country) => `What is the capital of ${country}?`, explain: (country, capital) => `${capital} is the capital of ${country}.` },
      { reverse: true, prompt: (country, capital) => `${capital} is the capital of which country or nation?`, explain: (country, capital) => `${capital} is the capital of ${country}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: CAPITAL_RIVERS,
    forms: [
      { prompt: (city) => `Which river flows through ${city}?`, explain: (city, river) => `${river} flows through ${city}.` },
    ],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: VOLCANOES,
    forms: [
      { prompt: (volcano) => `In which country or region is ${volcano}?`, explain: (volcano, place) => `${volcano} is in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: WATERFALLS,
    forms: [
      { prompt: (falls) => `Where is ${falls}?`, explain: (falls, place) => `${falls} is in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: MOUNTAIN_RANGES,
    forms: [
      { prompt: (range) => `Where do ${range.replace("The ", "the ")} lie?`, explain: (range, place) => `${range} lie in ${soft(place)}.` },
    ],
  },
  {
    category: "Geography", levels: [3, 4], facts: NATIONAL_PARKS,
    forms: [
      { prompt: (park) => `In which country is ${park.replace("The ", "the ")} National Park?`, explain: (park, place) => `${park} is in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 2], facts: EXTREMES, describe: true,
    forms: [
      { prompt: (superlative) => `What is ${soft(superlative)} in the world?`, explain: (superlative, answer) => `${answer} holds that record.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: CITY_COUNTRIES,
    forms: [
      { prompt: (city) => `In which country is ${city.replace(/,.*/, "")}?`, explain: (city, country) => `${city.replace(/,.*/, "")} is in ${country}.` },
    ],
  },
];
