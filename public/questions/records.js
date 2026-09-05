// Firsts, highest points and brightest stars: rows that pair one thing with one other.
import { soft } from "./case.js";
const BRIGHTEST_STARS = [
  ["Orion", "Rigel", "Rigel"], ["Canis Major", "Sirius", "Sirius"], ["Canis Minor", "Procyon", "Procyon"], ["Taurus", "Aldebaran", "Aldebaran"],
  ["Boötes", "Arcturus", "Arcturus"], ["Lyra", "Vega", "Vega"], ["Auriga", "Capella", "Capella"], ["Aquila", "Altair", "Altair"],
  ["Cygnus", "Deneb", "Deneb"], ["Virgo", "Spica", "Spica"], ["Scorpius", "Antares", "Antares"], ["Leo", "Regulus", "Regulus"],
  ["Gemini", "Pollux (star)", "Pollux"], ["Ursa Minor", "Polaris", "Polaris"], ["Ursa Major", "Alioth", "Alioth"], ["Carina", "Canopus", "Canopus"],
  ["Eridanus", "Achernar", "Achernar"], ["Centaurus", "Alpha Centauri", "Alpha Centauri"], ["Crux", "Acrux", "Acrux"], ["Piscis Austrinus", "Fomalhaut", "Fomalhaut"],
  ["Grus", "Alnair", "Alnair"], ["Pavo", "Alpha Pavonis", "Peacock"], ["Perseus", "Mirfak", "Mirfak"], ["Cassiopeia", "Schedar", "Schedar"],
  ["Andromeda", "Alpheratz", "Alpheratz"], ["Pegasus", "Enif", "Enif"], ["Aries", "Hamal", "Hamal"], ["Cetus", "Beta Ceti", "Diphda"],
  ["Hydra", "Alphard", "Alphard"], ["Ophiuchus", "Rasalhague", "Rasalhague"], ["Sagittarius", "Kaus Australis", "Kaus Australis"], ["Corona Borealis", "Alphecca", "Alphecca"],
];

const COUNTRY_HIGH_POINTS = [
  ["France", "Mont Blanc", "Mont Blanc"], ["Italy", "Mont Blanc", "Mont Blanc"], ["Switzerland", "Monte Rosa", "Monte Rosa"],
  ["Austria", "Grossglockner", "The Grossglockner"], ["Germany", "Zugspitze", "The Zugspitze"], ["Spain", "Teide", "Teide"],
  ["Norway", "Galdhøpiggen", "Galdhøpiggen"], ["Sweden", "Kebnekaise", "Kebnekaise"], ["Scotland", "Ben Nevis", "Ben Nevis"],
  ["Wales", "Snowdon", "Snowdon"], ["Ireland", "Carrauntoohil", "Carrauntoohil"], ["Greece", "Mount Olympus", "Mount Olympus"],
  ["Japan", "Mount Fuji", "Mount Fuji"], ["Nepal", "Mount Everest", "Mount Everest"], ["Tanzania", "Mount Kilimanjaro", "Mount Kilimanjaro"],
  ["Kenya", "Mount Kenya", "Mount Kenya"], ["Morocco", "Toubkal", "Toubkal"], ["South Africa", "Mafadi", "Mafadi"],
  ["Argentina", "Aconcagua", "Aconcagua"], ["Chile", "Ojos del Salado", "Ojos del Salado"], ["Mexico", "Pico de Orizaba", "Pico de Orizaba"],
  ["The United States", "Denali", "Denali"], ["Canada", "Mount Logan", "Mount Logan"], ["Australia", "Mount Kosciuszko", "Mount Kosciuszko"],
  ["New Zealand", "Aoraki / Mount Cook", "Aoraki / Mount Cook"], ["Indonesia", "Puncak Jaya", "Puncak Jaya"], ["Russia", "Mount Elbrus", "Mount Elbrus"],
  ["Turkey", "Mount Ararat", "Mount Ararat"], ["Iran", "Mount Damavand", "Mount Damavand"], ["Pakistan", "K2", "K2"],
];

const COUNTRY_RIVERS = [
  ["Germany", "Rhine", "The Rhine"], ["Poland", "Vistula", "The Vistula"], ["Hungary", "Danube", "The Danube"],
  ["Spain", "Tagus", "The Tagus"], ["Portugal", "Tagus", "The Tagus"], ["France", "Loire", "The Loire"],
  ["Italy", "Po (river)", "The Po"], ["England", "River Severn", "The Severn"], ["Ireland", "River Shannon", "The Shannon"],
  ["Sweden", "Klarälven", "The Klarälven"], ["Finland", "Kemijoki", "The Kemijoki"], ["Russia", "Lena (river)", "The Lena"],
  ["India", "Ganges", "The Ganges"], ["Pakistan", "Indus River", "The Indus"], ["Bangladesh", "Brahmaputra River", "The Brahmaputra"],
  ["China", "Yangtze", "The Yangtze"], ["Vietnam", "Mekong", "The Mekong"], ["Myanmar", "Irrawaddy River", "The Irrawaddy"],
  ["Egypt", "Nile", "The Nile"], ["Nigeria", "Niger River", "The Niger"], ["Brazil", "Amazon River", "The Amazon"],
  ["Argentina", "Paraná River", "The Paraná"], ["The United States", "Missouri River", "The Missouri"], ["Canada", "Mackenzie River", "The Mackenzie"],
  ["Australia", "Murray River", "The Murray"],
];

const ELEMENT_DISCOVERERS = [
  ["Oxygen", "Oxygen", "Joseph Priestley"], ["Hydrogen", "Hydrogen", "Henry Cavendish"], ["Nitrogen", "Nitrogen", "Daniel Rutherford"],
  ["Chlorine", "Chlorine", "Carl Wilhelm Scheele"], ["Radium", "Radium", "Marie Curie"], ["Polonium", "Polonium", "Marie Curie"],
  ["Helium", "Helium", "Pierre Janssen"], ["Argon", "Argon", "Lord Rayleigh"], ["Neon", "Neon", "William Ramsay"],
  ["Uranium", "Uranium", "Martin Heinrich Klaproth"], ["Potassium", "Potassium", "Humphry Davy"], ["Sodium", "Sodium", "Humphry Davy"],
  ["Calcium", "Calcium", "Humphry Davy"], ["Aluminium", "Aluminium", "Hans Christian Ørsted"], ["Iodine", "Iodine", "Bernard Courtois"],
  ["Phosphorus", "Phosphorus", "Hennig Brand"], ["Nickel", "Nickel", "Axel Fredrik Cronstedt"], ["Cobalt", "Cobalt", "Georg Brandt"],
];

const TALL_BUILDINGS = [
  ["The Burj Khalifa", "Burj Khalifa", "Dubai"], ["The Shanghai Tower", "Shanghai Tower", "Shanghai"], ["The Abraj Al Bait", "Abraj Al Bait", "Mecca"],
  ["The Empire State Building", "Empire State Building", "New York City"], ["The Chrysler Building", "Chrysler Building", "New York City"],
  ["One World Trade Center", "One World Trade Center", "New York City"], ["The Willis Tower", "Willis Tower", "Chicago"],
  ["Taipei 101", "Taipei 101", "Taipei"], ["The Shard", "The Shard", "London"], ["The CN Tower", "CN Tower", "Toronto"],
  ["The Ostankino Tower", "Ostankino Tower", "Moscow"], ["The Tokyo Skytree", "Tokyo Skytree", "Tokyo"],
];

const BRIDGES_AND_TUNNELS = [
  ["The Golden Gate Bridge", "Golden Gate Bridge", "San Francisco"], ["The Brooklyn Bridge", "Brooklyn Bridge", "New York City"],
  ["Tower Bridge", "Tower Bridge", "London"], ["The Sydney Harbour Bridge", "Sydney Harbour Bridge", "Sydney"],
  ["The Ponte Vecchio", "Ponte Vecchio", "Florence"], ["The Rialto Bridge", "Rialto Bridge", "Venice"],
  ["The Charles Bridge", "Charles Bridge", "Prague"], ["The Akashi Kaikyō Bridge", "Akashi Kaikyō Bridge", "Japan"],
  ["The Øresund Bridge", "Øresund Bridge", "Denmark and Sweden"], ["The Millau Viaduct", "Millau Viaduct", "France"],
  ["The Gotthard Base Tunnel", "Gotthard Base Tunnel", "Switzerland"], ["The Seikan Tunnel", "Seikan Tunnel", "Japan"],
];

const CITY_NICKNAMES = [
  ["New York City", "New York City", "The Big Apple"], ["Paris", "Paris", "The City of Light"], ["Venice", "Venice", "The Floating City"],
  ["Rome", "Rome", "The Eternal City"], ["Amsterdam", "Amsterdam", "The Venice of the North"], ["Chicago", "Chicago", "The Windy City"],
  ["Las Vegas", "Las Vegas", "Sin City"], ["New Orleans", "New Orleans", "The Big Easy"], ["Detroit", "Detroit", "Motor City"],
  ["Edinburgh", "Edinburgh", "The Athens of the North"], ["Istanbul", "Istanbul", "The city on two continents"], ["Jerusalem", "Jerusalem", "The Holy City"],
];

export const RECORDS_FAMILIES = [
  {
    category: "Astronomy", levels: [3, 4], facts: BRIGHTEST_STARS,
    forms: [
      { prompt: (constellation) => `Which is the brightest star of ${constellation}?`, explain: (constellation, star) => `${star} is the brightest star of ${constellation}.` },
      { reverse: true, prompt: (constellation, star) => `${star} is the brightest star of which constellation?`, explain: (constellation, star) => `${star} is the brightest star of ${constellation}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: COUNTRY_HIGH_POINTS,
    forms: [
      { prompt: (country) => `What is the highest point of ${country}?`, explain: (country, peak) => `${peak} is the highest point of ${country}.` },
    ],
  },
  {
    category: "Geography", levels: [2, 4], facts: COUNTRY_RIVERS,
    forms: [
      { prompt: (country) => `Which is the longest river of ${country}?`, explain: (country, river) => `${river} is the longest river of ${country}.` },
    ],
  },
  {
    category: "Chemistry", levels: [3, 4], facts: ELEMENT_DISCOVERERS,
    forms: [
      { prompt: (element) => `Who is credited with discovering ${soft(element)}?`, explain: (element, person) => `${person} is credited with discovering ${soft(element)}.` },
    ],
  },
  {
    category: "Arts", levels: [1, 3], facts: TALL_BUILDINGS,
    forms: [
      { prompt: (building) => `In which city does ${building.replace("The ", "the ")} stand?`, explain: (building, city) => `${building} stands in ${city}.` },
    ],
  },
  {
    category: "Technology", levels: [1, 3], facts: BRIDGES_AND_TUNNELS,
    forms: [
      { prompt: (structure) => `Where is ${structure.replace("The ", "the ")}?`, explain: (structure, place) => `${structure} is in ${place}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: CITY_NICKNAMES,
    forms: [
      { prompt: (city) => `By which nickname is ${city} known?`, explain: (city, nickname) => `${city} is known as ${nickname}.` },
      { reverse: true, prompt: (city, nickname) => `Which city is known as ${nickname}?`, explain: (city, nickname) => `${city} is known as ${nickname}.` },
    ],
  },
];
