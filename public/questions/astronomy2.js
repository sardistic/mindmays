// The rest of the sky: remaining constellations, more stars, deep-sky objects and orbits.
import { soft } from "./case.js";
const MORE_CONSTELLATIONS = [
  ["Antlia", "Antlia", "The air pump"], ["Apus", "Apus", "The bird of paradise"], ["Caelum", "Caelum", "The chisel"],
  ["Camelopardalis", "Camelopardalis", "The giraffe"], ["Canes Venatici", "Canes Venatici", "The hunting dogs"], ["Chamaeleon", "Chamaeleon", "The chameleon"],
  ["Circinus", "Circinus", "The compasses"], ["Corona Australis", "Corona Australis", "The southern crown"], ["Equuleus", "Equuleus", "The little horse"],
  ["Fornax", "Fornax", "The furnace"], ["Horologium", "Horologium", "The clock"], ["Indus", "Indus (constellation)", "The Indian"],
  ["Lacerta", "Lacerta", "The lizard"], ["Leo Minor", "Leo Minor", "The smaller lion"], ["Mensa", "Mensa (constellation)", "The table mountain"],
  ["Microscopium", "Microscopium", "The microscope"], ["Musca", "Musca", "The fly"], ["Norma", "Norma (constellation)", "The carpenter's square"],
  ["Octans", "Octans", "The octant"], ["Piscis Austrinus", "Piscis Austrinus", "The southern fish"], ["Pyxis", "Pyxis", "The compass box"],
  ["Reticulum", "Reticulum", "The reticle"], ["Sculptor", "Sculptor (constellation)", "The sculptor"], ["Sextans", "Sextans", "The sextant"],
  ["Telescopium", "Telescopium", "The telescope"], ["Triangulum", "Triangulum", "The triangle"], ["Triangulum Australe", "Triangulum Australe", "The southern triangle"],
];

const MORE_STARS = [
  ["Alnitak", "Alnitak", "Orion"], ["Mintaka", "Mintaka", "Orion"], ["Saiph", "Saiph", "Orion"], ["Meissa", "Meissa", "Orion"],
  ["Dubhe", "Dubhe", "Ursa Major"], ["Merak", "Merak", "Ursa Major"], ["Alkaid", "Alkaid", "Ursa Major"], ["Alioth", "Alioth", "Ursa Major"],
  ["Kochab", "Kochab", "Ursa Minor"], ["Denebola", "Denebola", "Leo"], ["Algieba", "Algieba", "Leo"], ["Alphard", "Alphard", "Hydra"],
  ["Shaula", "Shaula", "Scorpius"], ["Sabik", "Sabik", "Ophiuchus"], ["Rasalhague", "Rasalhague", "Ophiuchus"], ["Nunki", "Nunki", "Sagittarius"],
  ["Kaus Australis", "Kaus Australis", "Sagittarius"], ["Enif", "Enif", "Pegasus"], ["Markab", "Alpha Pegasi", "Pegasus"], ["Alpheratz", "Alpheratz", "Andromeda"],
  ["Mirach", "Mirach", "Andromeda"], ["Almach", "Almach", "Andromeda"], ["Mirfak", "Mirfak", "Perseus"], ["Schedar", "Schedar", "Cassiopeia"],
  ["Caph", "Caph", "Cassiopeia"], ["Hamal", "Hamal", "Aries"], ["Menkar", "Menkar", "Cetus"], ["Mira", "Mira", "Cetus"],
  ["Diphda", "Beta Ceti", "Cetus"], ["Acrux", "Acrux", "Crux"], ["Gacrux", "Gacrux", "Crux"], ["Mimosa", "Mimosa (star)", "Crux"],
  ["Hadar", "Beta Centauri", "Centaurus"], ["Proxima Centauri", "Proxima Centauri", "Centaurus"], ["Atria", "Alpha Trianguli Australis", "Triangulum Australe"],
  ["Alnair", "Alnair", "Grus"], ["Ankaa", "Alpha Phoenicis", "Phoenix"], ["Peacock", "Alpha Pavonis", "Pavo"],
];

const DEEP_SKY = [
  ["The Crab Nebula", "Crab Nebula", "A supernova remnant"], ["The Orion Nebula", "Orion Nebula", "A stellar nursery"],
  ["The Ring Nebula", "Ring Nebula", "A planetary nebula"], ["The Horsehead Nebula", "Horsehead Nebula", "A dark nebula"],
  ["The Eagle Nebula", "Eagle Nebula", "An emission nebula with the Pillars of Creation"], ["The Pleiades", "Pleiades", "An open star cluster"],
  ["The Hyades", "Hyades (star cluster)", "An open star cluster"], ["Omega Centauri", "Omega Centauri", "A globular cluster"],
  ["The Great Globular Cluster in Hercules", "Messier 13", "A globular cluster"], ["The Veil Nebula", "Veil Nebula", "A supernova remnant"],
  ["The Helix Nebula", "Helix Nebula", "A planetary nebula"], ["The Carina Nebula", "Carina Nebula", "An emission nebula"],
];

const ORBITS = [
  ["Mercury", "Mercury (planet)", "88 days"], ["Venus", "Venus", "225 days"], ["Earth", "Earth", "365 days"], ["Mars", "Mars", "687 days"],
  ["Jupiter", "Jupiter", "12 years"], ["Saturn", "Saturn", "29 years"], ["Uranus", "Uranus", "84 years"], ["Neptune", "Neptune", "165 years"],
];

const SOLAR_FACTS = [
  ["The largest volcano in the Solar System", "Olympus Mons", "Olympus Mons"], ["The largest canyon on Mars", "Valles Marineris", "Valles Marineris"],
  ["Jupiter's long-lived storm", "Great Red Spot", "The Great Red Spot"], ["The largest moon in the Solar System", "Ganymede (moon)", "Ganymede"],
  ["The most volcanically active body in the Solar System", "Io (moon)", "Io"], ["The moon with a thick nitrogen atmosphere", "Titan (moon)", "Titan"],
  ["The moon that erupts water plumes from its south pole", "Enceladus", "Enceladus"], ["The band of rocky bodies between Mars and Jupiter", "Asteroid belt", "The asteroid belt"],
  ["The comet returning about every 76 years", "Halley's Comet", "Halley's Comet"], ["The layer of the Sun we see", "Photosphere", "The photosphere"],
  ["The Sun's outer atmosphere seen during an eclipse", "Stellar corona", "The corona"], ["Dark patches of cooler solar surface", "Sunspot", "Sunspots"],
];

const ECLIPSES = [
  ["The Moon passing between Earth and the Sun", "Solar eclipse", "A solar eclipse"], ["Earth passing between the Sun and the Moon", "Lunar eclipse", "A lunar eclipse"],
  ["The Moon fully covering the Sun", "Solar eclipse", "A total solar eclipse"], ["The Moon too far to cover the Sun completely", "Annular eclipse", "An annular eclipse"],
  ["A planet crossing the Sun's disc", "Astronomical transit", "A transit"], ["One body passing in front of another", "Occultation", "An occultation"],
];

export const ASTRONOMY2_FAMILIES = [
  {
    category: "Astronomy", levels: [3, 4], facts: MORE_CONSTELLATIONS,
    forms: [
      { prompt: (name) => `Which figure or object does the constellation ${name} represent?`, explain: (name, figure) => `${name} represents ${soft(figure)}.` },
      { reverse: true, prompt: (name, figure) => `Which constellation is named for ${soft(figure)}?`, explain: (name, figure) => `That is ${name}.` },
    ],
  },
  {
    category: "Astronomy", levels: [3, 4], facts: MORE_STARS,
    forms: [
      { prompt: (star) => `${star} is a star in which constellation?`, explain: (star, constellation) => `${star} lies in ${constellation}.` },
    ],
  },
  {
    category: "Astronomy", levels: [2, 4], facts: DEEP_SKY, identify: true,
    forms: [
      { prompt: (object) => `What kind of object is ${object.replace("The ", "the ")}?`, explain: (object, kind) => `${object} is ${soft(kind)}.` },
    ],
  },
  {
    category: "Astronomy", levels: [2, 4], facts: ORBITS,
    forms: [
      { prompt: (planet) => `Roughly how long does ${planet} take to orbit the Sun?`, explain: (planet, period) => `${planet} orbits the Sun in about ${period}.` },
    ],
  },
  {
    category: "Astronomy", levels: [1, 3], facts: SOLAR_FACTS, describe: true,
    forms: [
      { prompt: (description) => `What is ${soft(description)}?`, explain: (description, answer) => `${answer} is ${soft(description)}.` },
    ],
  },
  {
    category: "Astronomy", levels: [1, 3], facts: ECLIPSES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
];
