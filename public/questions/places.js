// More places: cities and their countries, and the dates that fixed them in memory.
const CITIES2 = [
  ["Bruges", "Bruges", "Belgium"], ["Ghent", "Ghent", "Belgium"], ["Utrecht", "Utrecht", "The Netherlands"],
  ["The Hague", "The Hague", "The Netherlands"], ["Bonn", "Bonn", "Germany"], ["Cologne", "Cologne", "Germany"],
  ["Dresden", "Dresden", "Germany"], ["Frankfurt", "Frankfurt", "Germany"], ["Nuremberg", "Nuremberg", "Germany"],
  ["Innsbruck", "Innsbruck", "Austria"], ["Graz", "Graz", "Austria"], ["Basel", "Basel", "Switzerland"],
  ["Zurich", "Zurich", "Switzerland"], ["Lausanne", "Lausanne", "Switzerland"], ["Bordeaux", "Bordeaux", "France"],
  ["Toulouse", "Toulouse", "France"], ["Nice", "Nice", "France"], ["Strasbourg", "Strasbourg", "France"],
  ["Seville", "Seville", "Spain"], ["Valencia", "Valencia", "Spain"], ["Bilbao", "Bilbao", "Spain"],
  ["Granada", "Granada", "Spain"], ["Coimbra", "Coimbra", "Portugal"], ["Faro", "Faro, Portugal", "Portugal"],
  ["Naples", "Naples", "Italy"], ["Turin", "Turin", "Italy"], ["Bologna", "Bologna", "Italy"],
  ["Genoa", "Genoa", "Italy"], ["Palermo", "Palermo", "Italy"], ["Verona", "Verona", "Italy"],
  ["Patras", "Patras", "Greece"], ["Heraklion", "Heraklion", "Greece"], ["Izmir", "İzmir", "Turkey"],
  ["Antalya", "Antalya", "Turkey"], ["Gdańsk", "Gdańsk", "Poland"], ["Wrocław", "Wrocław", "Poland"],
  ["Brno", "Brno", "The Czech Republic"], ["Košice", "Košice", "Slovakia"], ["Debrecen", "Debrecen", "Hungary"],
  ["Cluj-Napoca", "Cluj-Napoca", "Romania"], ["Plovdiv", "Plovdiv", "Bulgaria"], ["Novi Sad", "Novi Sad", "Serbia"],
  ["Split", "Split, Croatia", "Croatia"], ["Dubrovnik", "Dubrovnik", "Croatia"], ["Lviv", "Lviv", "Ukraine"],
  ["Odesa", "Odesa", "Ukraine"], ["Saint Petersburg", "Saint Petersburg", "Russia"], ["Novosibirsk", "Novosibirsk", "Russia"],
  ["Yekaterinburg", "Yekaterinburg", "Russia"], ["Vladivostok", "Vladivostok", "Russia"], ["Tartu", "Tartu", "Estonia"],
  ["Bergen", "Bergen", "Norway"], ["Trondheim", "Trondheim", "Norway"], ["Malmö", "Malmö", "Sweden"],
  ["Uppsala", "Uppsala", "Sweden"], ["Tampere", "Tampere", "Finland"], ["Turku", "Turku", "Finland"],
  ["Cork", "Cork (city)", "Ireland"], ["Galway", "Galway", "Ireland"], ["Glasgow", "Glasgow", "Scotland"],
  ["Aberdeen", "Aberdeen", "Scotland"], ["Swansea", "Swansea", "Wales"], ["Manchester", "Manchester", "England"],
  ["Liverpool", "Liverpool", "England"], ["Bristol", "Bristol", "England"], ["Oxford", "Oxford", "England"],
  ["Cambridge", "Cambridge", "England"], ["York", "York", "England"], ["Bath", "Bath, Somerset", "England"],
  ["Hiroshima", "Hiroshima", "Japan"], ["Nagoya", "Nagoya", "Japan"], ["Sapporo", "Sapporo", "Japan"],
  ["Incheon", "Incheon", "South Korea"], ["Gyeongju", "Gyeongju", "South Korea"], ["Xi'an", "Xi'an", "China"],
  ["Chengdu", "Chengdu", "China"], ["Hangzhou", "Hangzhou", "China"], ["Shenzhen", "Shenzhen", "China"],
  ["Kolkata", "Kolkata", "India"], ["Bengaluru", "Bengaluru", "India"], ["Jaipur", "Jaipur", "India"],
  ["Varanasi", "Varanasi", "India"], ["Karachi", "Karachi", "Pakistan"], ["Colombo", "Colombo", "Sri Lanka"],
  ["Chiang Mai", "Chiang Mai", "Thailand"], ["Da Nang", "Da Nang", "Vietnam"], ["Surabaya", "Surabaya", "Indonesia"],
  ["Cebu City", "Cebu City", "The Philippines"], ["Fez", "Fez, Morocco", "Morocco"], ["Tangier", "Tangier", "Morocco"],
  ["Luxor", "Luxor", "Egypt"], ["Aswan", "Aswan", "Egypt"], ["Timbuktu", "Timbuktu", "Mali"],
  ["Kano", "Kano", "Nigeria"], ["Cape Town", "Cape Town", "South Africa"], ["Johannesburg", "Johannesburg", "South Africa"],
  ["Zanzibar City", "Zanzibar City", "Tanzania"], ["Marrakech's neighbour Agadir", "Agadir", "Morocco"],
  ["Cusco", "Cusco", "Peru"], ["Arequipa", "Arequipa", "Peru"], ["Cartagena", "Cartagena, Colombia", "Colombia"],
  ["Salvador", "Salvador, Bahia", "Brazil"], ["Recife", "Recife", "Brazil"], ["Curitiba", "Curitiba", "Brazil"],
  ["Rosario", "Rosario, Santa Fe", "Argentina"], ["Mendoza", "Mendoza, Argentina", "Argentina"],
  ["Guadalajara", "Guadalajara", "Mexico"], ["Oaxaca", "Oaxaca City", "Mexico"], ["Quebec City", "Quebec City", "Canada"],
  ["Calgary", "Calgary", "Canada"], ["Halifax", "Halifax, Nova Scotia", "Canada"], ["Boston", "Boston", "The United States"],
  ["Philadelphia", "Philadelphia", "The United States"], ["New Orleans", "New Orleans", "The United States"],
  ["Perth", "Perth", "Australia"], ["Adelaide", "Adelaide", "Australia"], ["Hobart", "Hobart", "Australia"],
  ["Dunedin", "Dunedin", "New Zealand"], ["Queenstown", "Queenstown, New Zealand", "New Zealand"],
];

const UNIVERSITIES = [
  ["The University of Oxford", "University of Oxford", "England"], ["The University of Cambridge", "University of Cambridge", "England"],
  ["The Sorbonne", "University of Paris", "France"], ["The University of Bologna", "University of Bologna", "Italy"],
  ["The University of Salamanca", "University of Salamanca", "Spain"], ["The University of Coimbra", "University of Coimbra", "Portugal"],
  ["Heidelberg University", "Heidelberg University", "Germany"], ["Uppsala University", "Uppsala University", "Sweden"],
  ["Leiden University", "Leiden University", "The Netherlands"], ["The University of Edinburgh", "University of Edinburgh", "Scotland"],
  ["Trinity College Dublin", "Trinity College Dublin", "Ireland"], ["Harvard University", "Harvard University", "The United States"],
  ["Yale University", "Yale University", "The United States"], ["McGill University", "McGill University", "Canada"],
  ["The University of Tokyo", "University of Tokyo", "Japan"], ["Peking University", "Peking University", "China"],
  ["Al-Azhar University", "Al-Azhar University", "Egypt"], ["The University of al-Qarawiyyin", "University of al-Qarawiyyin", "Morocco"],
];

const WORLD_EVENTS = [
  ["The fall of the Berlin Wall", "Fall of the Berlin Wall", "1989"], ["The moon landing", "Apollo 11", "1969"],
  ["The signing of the Magna Carta", "Magna Carta", "1215"], ["The fall of Constantinople", "Fall of Constantinople", "1453"],
  ["The Norman conquest of England", "Norman Conquest", "1066"], ["The first printing of the Gutenberg Bible", "Gutenberg Bible", "1455"],
  ["Columbus's first Atlantic crossing", "Voyages of Christopher Columbus", "1492"], ["The Great Plague of London", "Great Plague of London", "1665"],
  ["The storming of the Bastille", "Storming of the Bastille", "1789"], ["The abolition of the British slave trade", "Slave Trade Act 1807", "1807"],
  ["The first modern Olympic Games", "1896 Summer Olympics", "1896"], ["The founding of the United Nations", "United Nations", "1945"],
  ["The partition of India", "Partition of India", "1947"], ["The founding of the People's Republic of China", "Chinese Communist Revolution", "1949"],
  ["The Cuban Revolution", "Cuban Revolution", "1959"], ["The end of apartheid's first free election", "1994 South African general election", "1994"],
  ["The dissolution of the Soviet Union", "Dissolution of the Soviet Union", "1991"], ["The Chernobyl accident", "Chernobyl disaster", "1986"],
  ["The eruption of Krakatoa", "1883 eruption of Krakatoa", "1883"], ["The first flight of the Wright brothers", "Wright brothers", "1903"],
];

export const PLACES_FAMILIES = [
  {
    category: "Geography", levels: [2, 4], facts: CITIES2,
    forms: [
      { prompt: (city) => `In which country is ${city.replace(/'s neighbour.*/, "").replace(/,.*/, "")}?`, explain: (city, country) => `${city.replace(/,.*/, "")} is in ${country}.` },
    ],
  },
  {
    category: "History", levels: [3, 4], facts: UNIVERSITIES,
    forms: [
      { prompt: (university) => `In which country is ${university.replace("The ", "the ")}?`, explain: (university, country) => `${university} is in ${country}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: WORLD_EVENTS,
    forms: [
      { prompt: (event) => `In which year did ${event.replace("The ", "the ")} take place?`, explain: (event, year) => `${event}: ${year}.` },
    ],
  },
];
