// Facts are [clue, Wikipedia article, answer]. The article is chosen so that it
// evidences both the clue and the answer, which lets one row carry a question and
// its reverse.
import { soft } from "./case.js";
const CAPITALS = [
  ["France", "Paris", "Paris"], ["Japan", "Tokyo", "Tokyo"], ["Brazil", "Brasília", "Brasília"], ["Canada", "Ottawa", "Ottawa"],
  ["Australia", "Canberra", "Canberra"], ["Egypt", "Cairo", "Cairo"], ["Turkey", "Ankara", "Ankara"], ["Morocco", "Rabat", "Rabat"],
  ["Nigeria", "Abuja", "Abuja"], ["Kenya", "Nairobi", "Nairobi"], ["Argentina", "Buenos Aires", "Buenos Aires"], ["Thailand", "Bangkok", "Bangkok"],
  ["Kazakhstan", "Astana", "Astana"], ["Myanmar", "Naypyidaw", "Naypyidaw"], ["Tanzania", "Dodoma", "Dodoma"], ["Belize", "Belmopan", "Belmopan"],
  ["Bhutan", "Thimphu", "Thimphu"], ["Kyrgyzstan", "Bishkek", "Bishkek"], ["Palau", "Ngerulmud", "Ngerulmud"], ["Burkina Faso", "Ouagadougou", "Ouagadougou"],
  ["Brunei", "Bandar Seri Begawan", "Bandar Seri Begawan"], ["Germany", "Berlin", "Berlin"], ["Italy", "Rome", "Rome"], ["Spain", "Madrid", "Madrid"],
  ["Portugal", "Lisbon", "Lisbon"], ["Greece", "Athens", "Athens"], ["Poland", "Warsaw", "Warsaw"], ["Hungary", "Budapest", "Budapest"],
  ["Austria", "Vienna", "Vienna"], ["Switzerland", "Bern", "Bern"], ["Belgium", "Brussels", "Brussels"], ["Netherlands", "Amsterdam", "Amsterdam"],
  ["Denmark", "Copenhagen", "Copenhagen"], ["Sweden", "Stockholm", "Stockholm"], ["Norway", "Oslo", "Oslo"], ["Finland", "Helsinki", "Helsinki"],
  ["Iceland", "Reykjavík", "Reykjavík"], ["Ireland", "Dublin", "Dublin"], ["Czech Republic", "Prague", "Prague"], ["Slovakia", "Bratislava", "Bratislava"],
  ["Romania", "Bucharest", "Bucharest"], ["Bulgaria", "Sofia", "Sofia"], ["Serbia", "Belgrade", "Belgrade"], ["Croatia", "Zagreb", "Zagreb"],
  ["Slovenia", "Ljubljana", "Ljubljana"], ["Albania", "Tirana", "Tirana"], ["North Macedonia", "Skopje", "Skopje"], ["Montenegro", "Podgorica", "Podgorica"],
  ["Bosnia and Herzegovina", "Sarajevo", "Sarajevo"], ["Ukraine", "Kyiv", "Kyiv"], ["Belarus", "Minsk", "Minsk"], ["Lithuania", "Vilnius", "Vilnius"],
  ["Latvia", "Riga", "Riga"], ["Estonia", "Tallinn", "Tallinn"], ["Moldova", "Chișinău", "Chișinău"], ["Georgia (country)", "Tbilisi", "Tbilisi"],
  ["Armenia", "Yerevan", "Yerevan"], ["Azerbaijan", "Baku", "Baku"], ["Iran", "Tehran", "Tehran"], ["Iraq", "Baghdad", "Baghdad"],
  ["Syria", "Damascus", "Damascus"], ["Lebanon", "Beirut", "Beirut"], ["Jordan", "Amman", "Amman"], ["Saudi Arabia", "Riyadh", "Riyadh"],
  ["Yemen", "Sanaa", "Sanaa"], ["Oman", "Muscat", "Muscat"], ["Qatar", "Doha", "Doha"], ["Kuwait", "Kuwait City", "Kuwait City"],
  ["Afghanistan", "Kabul", "Kabul"], ["Pakistan", "Islamabad", "Islamabad"], ["India", "New Delhi", "New Delhi"], ["Nepal", "Kathmandu", "Kathmandu"],
  ["Bangladesh", "Dhaka", "Dhaka"], ["China", "Beijing", "Beijing"], ["Mongolia", "Ulaanbaatar", "Ulaanbaatar"], ["Vietnam", "Hanoi", "Hanoi"],
  ["Cambodia", "Phnom Penh", "Phnom Penh"], ["Laos", "Vientiane", "Vientiane"], ["Malaysia", "Kuala Lumpur", "Kuala Lumpur"], ["Indonesia", "Jakarta", "Jakarta"],
  ["Philippines", "Manila", "Manila"], ["South Korea", "Seoul", "Seoul"], ["North Korea", "Pyongyang", "Pyongyang"], ["Uzbekistan", "Tashkent", "Tashkent"],
  ["Turkmenistan", "Ashgabat", "Ashgabat"], ["Tajikistan", "Dushanbe", "Dushanbe"], ["Ethiopia", "Addis Ababa", "Addis Ababa"], ["Ghana", "Accra", "Accra"],
  ["Senegal", "Dakar", "Dakar"], ["Mali", "Bamako", "Bamako"], ["Niger", "Niamey", "Niamey"], ["Chad", "N'Djamena", "N'Djamena"],
  ["Sudan", "Khartoum", "Khartoum"], ["Uganda", "Kampala", "Kampala"], ["Zambia", "Lusaka", "Lusaka"], ["Zimbabwe", "Harare", "Harare"],
  ["Mozambique", "Maputo", "Maputo"], ["Angola", "Luanda", "Luanda"], ["Namibia", "Windhoek", "Windhoek"], ["Botswana", "Gaborone", "Gaborone"],
  ["Madagascar", "Antananarivo", "Antananarivo"], ["Cameroon", "Yaoundé", "Yaoundé"], ["Tunisia", "Tunis", "Tunis"], ["Algeria", "Algiers", "Algiers"],
  ["Libya", "Tripoli, Libya", "Tripoli"], ["Rwanda", "Kigali", "Kigali"], ["Somalia", "Mogadishu", "Mogadishu"], ["Eritrea", "Asmara", "Asmara"],
  ["Mexico", "Mexico City", "Mexico City"], ["Guatemala", "Guatemala City", "Guatemala City"], ["Honduras", "Tegucigalpa", "Tegucigalpa"], ["Nicaragua", "Managua", "Managua"],
  ["Costa Rica", "San José, Costa Rica", "San José"], ["Panama", "Panama City", "Panama City"], ["Cuba", "Havana", "Havana"], ["Jamaica", "Kingston, Jamaica", "Kingston"],
  ["Haiti", "Port-au-Prince", "Port-au-Prince"], ["Dominican Republic", "Santo Domingo", "Santo Domingo"], ["Colombia", "Bogotá", "Bogotá"], ["Venezuela", "Caracas", "Caracas"],
  ["Ecuador", "Quito", "Quito"], ["Peru", "Lima", "Lima"], ["Bolivia", "Sucre", "Sucre"], ["Chile", "Santiago", "Santiago"],
  ["Uruguay", "Montevideo", "Montevideo"], ["Paraguay", "Asunción", "Asunción"], ["Guyana", "Georgetown, Guyana", "Georgetown"], ["Suriname", "Paramaribo", "Paramaribo"],
  ["New Zealand", "Wellington", "Wellington"], ["Fiji", "Suva", "Suva"], ["Papua New Guinea", "Port Moresby", "Port Moresby"], ["Samoa", "Apia", "Apia"],
  ["Russia", "Moscow", "Moscow"], ["South Africa", "Pretoria", "Pretoria"], ["Israel", "Jerusalem", "Jerusalem"], ["Sri Lanka", "Sri Jayawardenepura Kotte", "Sri Jayawardenepura Kotte"],
];

const CURRENCIES = [
  ["Japan", "Japanese yen", "Yen"], ["India", "Indian rupee", "Rupee"], ["Poland", "Polish złoty", "Złoty"], ["Sweden", "Swedish krona", "Krona"],
  ["Denmark", "Danish krone", "Krone"], ["Norway", "Norwegian krone", "Krone"], ["Iceland", "Icelandic króna", "Króna"], ["Switzerland", "Swiss franc", "Franc"],
  ["Turkey", "Turkish lira", "Lira"], ["Israel", "Israeli new shekel", "Shekel"], ["South Korea", "South Korean won", "Won"], ["China", "Renminbi", "Renminbi"],
  ["Thailand", "Thai baht", "Baht"], ["Vietnam", "Vietnamese đồng", "Đồng"], ["Malaysia", "Malaysian ringgit", "Ringgit"], ["Indonesia", "Indonesian rupiah", "Rupiah"],
  ["Bangladesh", "Bangladeshi taka", "Taka"], ["Myanmar", "Burmese kyat", "Kyat"], ["Mongolia", "Mongolian tögrög", "Tögrög"], ["Cambodia", "Cambodian riel", "Riel"],
  ["Laos", "Lao kip", "Kip"], ["Nepal", "Nepalese rupee", "Rupee"], ["Iran", "Iranian rial", "Rial"], ["Iraq", "Iraqi dinar", "Dinar"],
  ["Saudi Arabia", "Saudi riyal", "Riyal"], ["Kuwait", "Kuwaiti dinar", "Dinar"], ["Russia", "Russian ruble", "Ruble"], ["Ukraine", "Ukrainian hryvnia", "Hryvnia"],
  ["Hungary", "Hungarian forint", "Forint"], ["Czech Republic", "Czech koruna", "Koruna"], ["Romania", "Romanian leu", "Leu"], ["Bulgaria", "Bulgarian lev", "Lev"],
  ["Serbia", "Serbian dinar", "Dinar"], ["Croatia", "Croatian kuna", "Kuna"], ["North Macedonia", "Macedonian denar", "Denar"], ["Albania", "Albanian lek", "Lek"],
  ["South Africa", "South African rand", "Rand"], ["Nigeria", "Nigerian naira", "Naira"], ["Ghana", "Ghanaian cedi", "Cedi"], ["Kenya", "Kenyan shilling", "Shilling"],
  ["Ethiopia", "Ethiopian birr", "Birr"], ["Botswana", "Botswana pula", "Pula"], ["Zambia", "Zambian kwacha", "Kwacha"], ["Angola", "Angolan kwanza", "Kwanza"],
  ["Morocco", "Moroccan dirham", "Dirham"], ["Egypt", "Egyptian pound", "Pound"], ["Peru", "Peruvian sol", "Sol"], ["Guatemala", "Guatemalan quetzal", "Quetzal"],
  ["Costa Rica", "Costa Rican colón", "Colón"], ["Panama", "Panamanian balboa", "Balboa"], ["Venezuela", "Venezuelan bolívar", "Bolívar"], ["Paraguay", "Paraguayan guaraní", "Guaraní"],
  ["Brazil", "Brazilian real", "Real"], ["Mexico", "Mexican peso", "Peso"], ["Haiti", "Haitian gourde", "Gourde"], ["Samoa", "Samoan tālā", "Tālā"],
];

const RIVER_OUTFLOWS = [
  ["The Nile", "Nile", "Mediterranean Sea"], ["The Amazon", "Amazon River", "Atlantic Ocean"], ["The Danube", "Danube", "Black Sea"], ["The Rhine", "Rhine", "North Sea"],
  ["The Volga", "Volga", "Caspian Sea"], ["The Mississippi", "Mississippi River", "Gulf of Mexico"], ["The Yangtze", "Yangtze", "East China Sea"], ["The Ganges", "Ganges", "Bay of Bengal"],
  ["The Indus", "Indus River", "Arabian Sea"], ["The Congo", "Congo River", "Atlantic Ocean"], ["The Niger", "Niger River", "Gulf of Guinea"], ["The Zambezi", "Zambezi", "Indian Ocean"],
  ["The Mekong", "Mekong", "South China Sea"], ["The Euphrates", "Euphrates", "Persian Gulf"], ["The Rhône", "Rhône", "Mediterranean Sea"], ["The Elbe", "Elbe", "North Sea"],
  ["The Vistula", "Vistula", "Baltic Sea"], ["The Douro", "Douro", "Atlantic Ocean"], ["The Po", "Po (river)", "Adriatic Sea"], ["The Seine", "Seine", "English Channel"],
  ["The Colorado", "Colorado River", "Gulf of California"], ["The Yukon", "Yukon River", "Bering Sea"], ["The Murray", "Murray River", "Southern Ocean"], ["The Orinoco", "Orinoco", "Atlantic Ocean"],
];

const RIVER_COUNTRIES = [
  ["The Seine", "Seine", "France"], ["The Thames", "River Thames", "England"], ["The Tiber", "Tiber", "Italy"], ["The Tagus", "Tagus", "Portugal"],
  ["The Shannon", "River Shannon", "Ireland"], ["The Vistula", "Vistula", "Poland"], ["The Ebro", "Ebro", "Spain"], ["The Loire", "Loire", "France"],
  ["The Ganges", "Ganges", "India"], ["The Irrawaddy", "Irrawaddy River", "Myanmar"], ["The Yellow River", "Yellow River", "China"], ["The Limpopo", "Limpopo River", "South Africa"],
  ["The Orange", "Orange River", "South Africa"], ["The Darling", "Darling River", "Australia"], ["The Fraser", "Fraser River", "Canada"], ["The Magdalena", "Magdalena River", "Colombia"],
];

const MOUNTAINS = [
  ["Mount Everest", "Mount Everest", "Himalayas"], ["K2", "K2", "Karakoram"], ["Mont Blanc", "Mont Blanc", "Alps"], ["Aconcagua", "Aconcagua", "Andes"],
  ["Denali", "Denali", "Alaska Range"], ["Mount Elbrus", "Mount Elbrus", "Caucasus Mountains"], ["Matterhorn", "Matterhorn", "Alps"], ["Mount Kilimanjaro", "Mount Kilimanjaro", "Tanzania"],
  ["Mount Fuji", "Mount Fuji", "Japan"], ["Mount Kosciuszko", "Mount Kosciuszko", "Australia"], ["Ben Nevis", "Ben Nevis", "Scotland"], ["Mount Olympus", "Mount Olympus", "Greece"],
  ["Mount Vesuvius", "Mount Vesuvius", "Italy"], ["Mount Etna", "Mount Etna", "Sicily"], ["Mount Rainier", "Mount Rainier", "Washington"], ["Table Mountain", "Table Mountain", "Cape Town"],
  ["Mount Kenya", "Mount Kenya", "Kenya"], ["Mount Ararat", "Mount Ararat", "Turkey"], ["Mount Cook", "Aoraki / Mount Cook", "New Zealand"], ["Popocatépetl", "Popocatépetl", "Mexico"],
];

const DESERTS = [
  ["The Sahara", "Sahara", "Africa"], ["The Gobi", "Gobi Desert", "Asia"], ["The Atacama", "Atacama Desert", "South America"], ["The Kalahari", "Kalahari Desert", "Africa"],
  ["The Mojave", "Mojave Desert", "North America"], ["The Sonoran Desert", "Sonoran Desert", "North America"], ["The Thar Desert", "Thar Desert", "Asia"], ["The Namib", "Namib", "Africa"],
  ["The Great Victoria Desert", "Great Victoria Desert", "Australia"], ["The Karakum Desert", "Karakum Desert", "Asia"], ["The Patagonian Desert", "Patagonian Desert", "South America"], ["The Simpson Desert", "Simpson Desert", "Australia"],
];

const LAKES = [
  ["Lake Baikal", "Lake Baikal", "Russia"], ["Lake Victoria", "Lake Victoria", "Africa"], ["Lake Titicaca", "Lake Titicaca", "Andes"], ["Lake Superior", "Lake Superior", "North America"],
  ["The Caspian Sea", "Caspian Sea", "Asia"], ["Lake Tanganyika", "Lake Tanganyika", "Africa"], ["Lake Balaton", "Lake Balaton", "Hungary"], ["Loch Ness", "Loch Ness", "Scotland"],
  ["Lake Geneva", "Lake Geneva", "Switzerland"], ["Lake Como", "Lake Como", "Italy"], ["The Dead Sea", "Dead Sea", "Jordan"], ["The Aral Sea", "Aral Sea", "Kazakhstan"],
  ["Lake Malawi", "Lake Malawi", "Africa"], ["Lake Ladoga", "Lake Ladoga", "Russia"], ["Great Bear Lake", "Great Bear Lake", "Canada"], ["Lake Eyre", "Kati Thanda–Lake Eyre", "Australia"],
];

const STATE_CAPITALS = [
  ["California", "Sacramento, California", "Sacramento"], ["Texas", "Austin, Texas", "Austin"], ["New York", "Albany, New York", "Albany"], ["Florida", "Tallahassee, Florida", "Tallahassee"],
  ["Illinois", "Springfield, Illinois", "Springfield"], ["Pennsylvania", "Harrisburg, Pennsylvania", "Harrisburg"], ["Ohio", "Columbus, Ohio", "Columbus"], ["Georgia (U.S. state)", "Atlanta", "Atlanta"],
  ["Michigan", "Lansing, Michigan", "Lansing"], ["Washington (state)", "Olympia, Washington", "Olympia"], ["Oregon", "Salem, Oregon", "Salem"], ["Nevada", "Carson City, Nevada", "Carson City"],
  ["Arizona", "Phoenix, Arizona", "Phoenix"], ["Colorado", "Denver", "Denver"], ["Utah", "Salt Lake City", "Salt Lake City"], ["New Mexico", "Santa Fe, New Mexico", "Santa Fe"],
  ["Louisiana", "Baton Rouge, Louisiana", "Baton Rouge"], ["Missouri", "Jefferson City, Missouri", "Jefferson City"], ["Wisconsin", "Madison, Wisconsin", "Madison"], ["Minnesota", "Saint Paul, Minnesota", "Saint Paul"],
  ["Massachusetts", "Boston", "Boston"], ["Maryland", "Annapolis, Maryland", "Annapolis"], ["Virginia", "Richmond, Virginia", "Richmond"], ["North Carolina", "Raleigh, North Carolina", "Raleigh"],
  ["South Carolina", "Columbia, South Carolina", "Columbia"], ["Tennessee", "Nashville, Tennessee", "Nashville"], ["Kentucky", "Frankfort, Kentucky", "Frankfort"], ["Alabama", "Montgomery, Alabama", "Montgomery"],
  ["Mississippi", "Jackson, Mississippi", "Jackson"], ["Arkansas", "Little Rock, Arkansas", "Little Rock"], ["Oklahoma", "Oklahoma City", "Oklahoma City"], ["Kansas", "Topeka, Kansas", "Topeka"],
  ["Nebraska", "Lincoln, Nebraska", "Lincoln"], ["Iowa", "Des Moines, Iowa", "Des Moines"], ["Indiana", "Indianapolis", "Indianapolis"], ["Maine", "Augusta, Maine", "Augusta"],
  ["Vermont", "Montpelier, Vermont", "Montpelier"], ["New Hampshire", "Concord, New Hampshire", "Concord"], ["Connecticut", "Hartford, Connecticut", "Hartford"], ["Rhode Island", "Providence, Rhode Island", "Providence"],
  ["New Jersey", "Trenton, New Jersey", "Trenton"], ["Delaware", "Dover, Delaware", "Dover"], ["West Virginia", "Charleston, West Virginia", "Charleston"], ["Montana", "Helena, Montana", "Helena"],
  ["Idaho", "Boise, Idaho", "Boise"], ["Wyoming", "Cheyenne, Wyoming", "Cheyenne"], ["North Dakota", "Bismarck, North Dakota", "Bismarck"], ["South Dakota", "Pierre, South Dakota", "Pierre"],
  ["Alaska", "Juneau, Alaska", "Juneau"], ["Hawaii", "Honolulu", "Honolulu"],
];

const LANDMARK_CITIES = [
  ["The Eiffel Tower", "Eiffel Tower", "Paris"], ["The Colosseum", "Colosseum", "Rome"], ["The Acropolis", "Acropolis of Athens", "Athens"], ["The Brandenburg Gate", "Brandenburg Gate", "Berlin"],
  ["The Sagrada Família", "Sagrada Família", "Barcelona"], ["Tower Bridge", "Tower Bridge", "London"], ["The Charles Bridge", "Charles Bridge", "Prague"], ["St Mark's Basilica", "St Mark's Basilica", "Venice"],
  ["The Hagia Sophia", "Hagia Sophia", "Istanbul"], ["The Taj Mahal", "Taj Mahal", "Agra"], ["The Kremlin", "Moscow Kremlin", "Moscow"], ["The Atomium", "Atomium", "Brussels"],
  ["The Little Mermaid statue", "The Little Mermaid (statue)", "Copenhagen"], ["The Golden Gate Bridge", "Golden Gate Bridge", "San Francisco"], ["The Space Needle", "Space Needle", "Seattle"], ["Christ the Redeemer", "Christ the Redeemer (statue)", "Rio de Janeiro"],
  ["The Sydney Opera House", "Sydney Opera House", "Sydney"], ["The Burj Khalifa", "Burj Khalifa", "Dubai"], ["The Petronas Towers", "Petronas Towers", "Kuala Lumpur"], ["The Forbidden City", "Forbidden City", "Beijing"],
];

const SEAS = [
  ["The Bosporus", "Bosporus", "Turkey"], ["The Suez Canal", "Suez Canal", "Egypt"], ["The Panama Canal", "Panama Canal", "Panama"], ["The Strait of Gibraltar", "Strait of Gibraltar", "Spain"],
  ["The Strait of Hormuz", "Strait of Hormuz", "Iran"], ["The Strait of Malacca", "Strait of Malacca", "Malaysia"], ["The Bering Strait", "Bering Strait", "Russia"], ["The Kiel Canal", "Kiel Canal", "Germany"],
  ["The Danish straits", "Danish straits", "Denmark"], ["The Dardanelles", "Dardanelles", "Turkey"],
];

const HIGHEST_POINTS = [
  ["Africa", "Mount Kilimanjaro", "Mount Kilimanjaro"], ["South America", "Aconcagua", "Aconcagua"], ["North America", "Denali", "Denali"], ["Europe", "Mount Elbrus", "Mount Elbrus"],
  ["Antarctica", "Vinson Massif", "Vinson Massif"], ["Oceania", "Puncak Jaya", "Puncak Jaya"], ["Asia", "Mount Everest", "Mount Everest"],
];

export const GEOGRAPHY_FAMILIES = [
  {
    category: "Geography", levels: [1, 3], facts: CAPITALS,
    forms: [
      { prompt: (country) => `What is the capital of ${country.replace(" (country)", "")}?`, explain: (country, capital) => `${capital} is the capital of ${country.replace(" (country)", "")}.` },
      { reverse: true, prompt: (country, capital) => `${capital} is the capital city of which country?`, explain: (country, capital) => `${capital} is the capital of ${country.replace(" (country)", "")}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: CURRENCIES,
    forms: [
      { prompt: (country) => `Which currency does ${country} use?`, explain: (country, currency) => `The ${soft(currency)} is the currency of ${country}.` },
      { reverse: true, prompt: (country, currency) => `The ${soft(currency)} is the currency of which country?`, explain: (country, currency) => `The ${soft(currency)} is the currency of ${country}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: RIVER_OUTFLOWS,
    forms: [
      { prompt: (river) => `Into which body of water does ${river.replace("The ", "the ")} empty?`, explain: (river, water) => `${river} drains into the ${water.replace("The ", "").toLowerCase()}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: RIVER_COUNTRIES,
    forms: [
      { prompt: (river) => `${river} flows chiefly through which country?`, explain: (river, place) => `${river} runs chiefly through ${place}.` },
      { reverse: true, prompt: (river, place) => `Which of these rivers runs chiefly through ${place}?`, explain: (river, place) => `${river} runs chiefly through ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: MOUNTAINS,
    forms: [
      { prompt: (peak) => `Where does ${peak} stand?`, explain: (peak, place) => `${peak} stands in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: DESERTS,
    forms: [
      { prompt: (desert) => `On which continent does ${desert.replace("The ", "the ")} lie?`, explain: (desert, place) => `${desert} lies in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: LAKES,
    forms: [
      { prompt: (lake) => `Where is ${lake} found?`, explain: (lake, place) => `${lake} is found in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: STATE_CAPITALS,
    forms: [
      { prompt: (state) => `What is the capital of ${state.replace(" (U.S. state)", "").replace(" (state)", "")}?`, explain: (state, capital) => `${capital} is the capital of ${state.replace(" (U.S. state)", "").replace(" (state)", "")}.` },
      { reverse: true, prompt: (state, capital) => `${capital} is the capital of which US state?`, explain: (state, capital) => `${capital} is the capital of ${state.replace(" (U.S. state)", "").replace(" (state)", "")}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 2], facts: LANDMARK_CITIES,
    forms: [
      { prompt: (landmark) => `In which city would you find ${landmark.replace("The ", "the ")}?`, explain: (landmark, city) => `${landmark} stands in ${city}.` },
      { reverse: true, prompt: (landmark, city) => `Which of these landmarks stands in ${city}?`, explain: (landmark, city) => `${landmark} stands in ${city}.` },
    ],
  },
  {
    category: "Geography", levels: [3, 4], facts: SEAS,
    forms: [
      { prompt: (passage) => `Which country lies along ${passage.replace("The ", "the ")}?`, explain: (passage, country) => `${passage} lies along ${country}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: HIGHEST_POINTS,
    forms: [
      { prompt: (continent) => `What is the highest mountain of ${continent}?`, explain: (continent, peak) => `${peak} is the highest peak of ${continent}.` },
    ],
  },
];
