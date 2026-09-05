// The world as people live in it: food, drink, festivals, emblems and institutions.
import { soft } from "./case.js";
const NATIONAL_DISHES = [
  ["Sushi", "Sushi", "Japan"], ["Ramen", "Ramen", "Japan"], ["Kimchi", "Kimchi", "Korea"], ["Bibimbap", "Bibimbap", "Korea"],
  ["Peking duck", "Peking duck", "China"], ["Dim sum", "Dim sum", "China"], ["Pad thai", "Pad thai", "Thailand"], ["Pho", "Pho", "Vietnam"],
  ["Nasi goreng", "Nasi goreng", "Indonesia"], ["Rendang", "Rendang", "Indonesia"], ["Biryani", "Biryani", "The Indian subcontinent"],
  ["Tandoori chicken", "Tandoori chicken", "The Indian subcontinent"], ["Hummus", "Hummus", "The Middle East"], ["Falafel", "Falafel", "The Middle East"],
  ["Baklava", "Baklava", "The Ottoman Empire"], ["Kebab", "Kebab", "The Middle East"], ["Tagine", "Tajine", "North Africa"],
  ["Couscous", "Couscous", "North Africa"], ["Injera", "Injera", "Ethiopia"], ["Jollof rice", "Jollof rice", "West Africa"],
  ["Paella", "Paella", "Spain"], ["Gazpacho", "Gazpacho", "Spain"], ["Tapas", "Tapas", "Spain"], ["Pizza", "Pizza", "Italy"],
  ["Risotto", "Risotto", "Italy"], ["Lasagne", "Lasagne", "Italy"], ["Tiramisu", "Tiramisu", "Italy"], ["Moussaka", "Moussaka", "Greece"],
  ["Souvlaki", "Souvlaki", "Greece"], ["Croissant", "Croissant", "Austria"], ["Wiener schnitzel", "Wiener schnitzel", "Austria"],
  ["Sauerkraut", "Sauerkraut", "Germany"], ["Bratwurst", "Bratwurst", "Germany"], ["Fondue", "Fondue", "Switzerland"],
  ["Ratatouille", "Ratatouille", "France"], ["Bouillabaisse", "Bouillabaisse", "France"], ["Crêpe", "Crêpe", "France"],
  ["Waffle", "Waffle", "Belgium"], ["Stroopwafel", "Stroopwafel", "The Netherlands"], ["Smørrebrød", "Smørrebrød", "Denmark"],
  ["Gravlax", "Gravlax", "Scandinavia"], ["Haggis", "Haggis", "Scotland"], ["Shepherd's pie", "Shepherd's pie", "Britain"],
  ["Irish stew", "Irish stew", "Ireland"], ["Borscht", "Borscht", "Eastern Europe"], ["Pierogi", "Pierogi", "Poland"],
  ["Goulash", "Goulash", "Hungary"], ["Ceviche", "Ceviche", "Peru"], ["Empanada", "Empanada", "Spain and Latin America"],
  ["Asado", "Asado", "Argentina"], ["Feijoada", "Feijoada", "Brazil"], ["Tacos", "Taco", "Mexico"], ["Guacamole", "Guacamole", "Mexico"],
  ["Poutine", "Poutine", "Canada"], ["Gumbo", "Gumbo", "Louisiana"], ["Pavlova", "Pavlova (food)", "Australia and New Zealand"],
];

const DRINKS = [
  ["Sake", "Sake", "Japan"], ["Soju", "Soju", "Korea"], ["Baijiu", "Baijiu", "China"], ["Vodka", "Vodka", "Eastern Europe"],
  ["Whisky", "Scotch whisky", "Scotland"], ["Guinness", "Guinness", "Ireland"], ["Port", "Port wine", "Portugal"],
  ["Sherry", "Sherry", "Spain"], ["Sangria", "Sangria", "Spain"], ["Champagne", "Champagne", "France"], ["Cognac", "Cognac", "France"],
  ["Chianti", "Chianti", "Italy"], ["Prosecco", "Prosecco", "Italy"], ["Ouzo", "Ouzo", "Greece"], ["Raki", "Rakı", "Turkey"],
  ["Tequila", "Tequila", "Mexico"], ["Mezcal", "Mezcal", "Mexico"], ["Rum", "Rum", "The Caribbean"], ["Cachaça", "Cachaça", "Brazil"],
  ["Pisco", "Pisco", "Peru and Chile"], ["Mate", "Mate (drink)", "South America"], ["Bourbon", "Bourbon whiskey", "The United States"],
  ["Absinthe", "Absinthe", "Switzerland"], ["Schnapps", "Schnapps", "Germany"], ["Aquavit", "Akvavit", "Scandinavia"],
];

const FESTIVALS = [
  ["Diwali", "Diwali", "India"], ["Holi", "Holi", "India"], ["Songkran", "Songkran", "Thailand"], ["Hanami", "Hanami", "Japan"],
  ["The Lunar New Year", "Chinese New Year", "China"], ["Oktoberfest", "Oktoberfest", "Germany"], ["Carnival of Venice", "Carnival of Venice", "Italy"],
  ["La Tomatina", "La Tomatina", "Spain"], ["Running of the Bulls", "Running of the bulls", "Spain"], ["Day of the Dead", "Day of the Dead", "Mexico"],
  ["Rio Carnival", "Rio Carnival", "Brazil"], ["Thanksgiving", "Thanksgiving", "The United States"], ["Hogmanay", "Hogmanay", "Scotland"],
  ["St Patrick's Day", "Saint Patrick's Day", "Ireland"], ["Eid al-Fitr", "Eid al-Fitr", "The Muslim world"], ["Hanukkah", "Hanukkah", "Judaism"],
  ["Nowruz", "Nowruz", "Iran"], ["Timkat", "Timkat", "Ethiopia"],
];

const NATIONAL_EMBLEMS = [
  ["The maple leaf", "Maple leaf", "Canada"], ["The kiwi", "Kiwi (bird)", "New Zealand"], ["The kangaroo", "Kangaroo", "Australia"],
  ["The bald eagle", "Bald eagle", "The United States"], ["The lion", "Lion", "England"], ["The unicorn", "Unicorn", "Scotland"],
  ["The dragon", "Welsh Dragon", "Wales"], ["The shamrock", "Shamrock", "Ireland"], ["The Gallic rooster", "Gallic rooster", "France"],
  ["The chrysanthemum", "Imperial Seal of Japan", "Japan"], ["The giant panda", "Giant panda", "China"], ["The Bengal tiger", "Bengal tiger", "India"],
  ["The springbok", "Springbok", "South Africa"], ["The condor", "Andean condor", "The Andes"], ["The edelweiss", "Edelweiss", "The Alps"],
  ["The tulip", "Tulip", "The Netherlands"], ["The cedar", "Cedrus libani", "Lebanon"], ["The elephant", "Elephant", "Thailand"],
];

const RELIGIONS = [
  ["Islam", "Islam", "The Quran"], ["Christianity", "Christianity", "The Bible"], ["Judaism", "Judaism", "The Torah"],
  ["Hinduism", "Hinduism", "The Vedas"], ["Sikhism", "Sikhism", "The Guru Granth Sahib"], ["Zoroastrianism", "Zoroastrianism", "The Avesta"],
  ["Taoism", "Taoism", "The Tao Te Ching"], ["Confucianism", "Confucianism", "The Analects"], ["Buddhism", "Buddhism", "The Tripitaka"],
];

const HOLY_CITIES = [
  ["Mecca", "Mecca", "Islam"], ["Medina", "Medina", "Islam"], ["Jerusalem", "Jerusalem", "Judaism, Christianity and Islam"],
  ["Varanasi", "Varanasi", "Hinduism"], ["Bodh Gaya", "Bodh Gaya", "Buddhism"], ["Lhasa", "Lhasa", "Tibetan Buddhism"],
  ["Amritsar", "Amritsar", "Sikhism"], ["Vatican City", "Vatican City", "The Catholic Church"], ["Salt Lake City", "Salt Lake City", "The Latter Day Saint movement"],
];

const CURRENCIES_MORE = [
  ["Vietnam", "Vietnamese đồng", "Đồng"], ["North Korea", "North Korean won", "Won"], ["Sri Lanka", "Sri Lankan rupee", "Rupee"],
  ["Pakistan", "Pakistani rupee", "Rupee"], ["Afghanistan", "Afghan afghani", "Afghani"], ["Armenia", "Armenian dram", "Dram"],
  ["Georgia (country)", "Georgian lari", "Lari"], ["Azerbaijan", "Azerbaijani manat", "Manat"], ["Kazakhstan", "Kazakhstani tenge", "Tenge"],
  ["Uzbekistan", "Uzbekistani sum", "Sum"], ["Mongolia", "Mongolian tögrög", "Tögrög"], ["Lesotho", "Lesotho loti", "Loti"],
  ["Eswatini", "Swazi lilangeni", "Lilangeni"], ["Malawi", "Malawian kwacha", "Kwacha"], ["Sierra Leone", "Sierra Leonean leone", "Leone"],
  ["The Gambia", "Gambian dalasi", "Dalasi"], ["Mauritania", "Mauritanian ouguiya", "Ouguiya"], ["Madagascar", "Malagasy ariary", "Ariary"],
  ["Costa Rica", "Costa Rican colón", "Colón"], ["Nicaragua", "Nicaraguan córdoba", "Córdoba"], ["Honduras", "Honduran lempira", "Lempira"],
  ["Bolivia", "Bolivian boliviano", "Boliviano"], ["Papua New Guinea", "Papua New Guinean kina", "Kina"], ["Tonga", "Tongan paʻanga", "Pa'anga"],
];

export const WORLD_FAMILIES = [
  {
    category: "Geography", levels: [1, 3], facts: NATIONAL_DISHES,
    forms: [
      { prompt: (dish) => `From which country or region does ${soft(dish)} come?`, explain: (dish, place) => `${dish} comes from ${place}.` },
      { reverse: true, prompt: (dish, place) => `Which of these dishes comes from ${place}?`, explain: (dish, place) => `${dish} comes from ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: DRINKS,
    forms: [
      { prompt: (drink) => `Where does ${soft(drink)} come from?`, explain: (drink, place) => `${drink} comes from ${place}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: FESTIVALS,
    forms: [
      { prompt: (festival) => `${festival.replace("The ", "The ")} is celebrated chiefly where?`, explain: (festival, place) => `${festival} is chiefly celebrated in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: NATIONAL_EMBLEMS,
    forms: [
      { prompt: (emblem) => `${emblem.replace("The ", "The ")} is a national emblem of where?`, explain: (emblem, place) => `${emblem} is an emblem of ${place}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: RELIGIONS,
    forms: [
      { prompt: (religion) => `Which text is central to ${religion}?`, explain: (religion, text) => `${text} is central to ${religion}.` },
      { reverse: true, prompt: (religion, text) => `${text} is the central text of which tradition?`, explain: (religion, text) => `${text} belongs to ${religion}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: HOLY_CITIES,
    forms: [
      { prompt: (city) => `${city} is a holy city of which tradition?`, explain: (city, faith) => `${city} is holy to ${faith}.` },
    ],
  },
  {
    category: "Geography", levels: [3, 4], facts: CURRENCIES_MORE,
    forms: [
      { prompt: (country) => `Which currency does ${country.replace(" (country)", "")} use?`, explain: (country, currency) => `The ${soft(currency)} is the currency of ${country.replace(" (country)", "")}.` },
    ],
  },
];
