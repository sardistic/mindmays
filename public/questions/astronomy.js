// Astronomy: the sky's catalogue — constellations, moons, missions and bright stars.
import { soft } from "./case.js";
const CONSTELLATIONS = [
  ["Andromeda", "Andromeda (constellation)", "The chained maiden"], ["Aquarius", "Aquarius (constellation)", "The water-bearer"], ["Aquila", "Aquila (constellation)", "The eagle"],
  ["Ara", "Ara (constellation)", "The altar"], ["Aries", "Aries (constellation)", "The ram"], ["Auriga", "Auriga (constellation)", "The charioteer"],
  ["Boötes", "Boötes", "The herdsman"], ["Cancer", "Cancer (constellation)", "The crab"], ["Canis Major", "Canis Major", "The greater dog"],
  ["Canis Minor", "Canis Minor", "The lesser dog"], ["Capricornus", "Capricornus", "The sea goat"], ["Cassiopeia", "Cassiopeia (constellation)", "The seated queen"],
  ["Centaurus", "Centaurus", "The centaur"], ["Cepheus", "Cepheus (constellation)", "The king"], ["Cetus", "Cetus", "The whale"],
  ["Columba", "Columba (constellation)", "The dove"], ["Corona Borealis", "Corona Borealis", "The northern crown"], ["Corvus", "Corvus (constellation)", "The crow"],
  ["Crater", "Crater (constellation)", "The cup"], ["Crux", "Crux", "The southern cross"], ["Cygnus", "Cygnus (constellation)", "The swan"],
  ["Delphinus", "Delphinus", "The dolphin"], ["Draco", "Draco (constellation)", "The dragon"], ["Eridanus", "Eridanus (constellation)", "The river"],
  ["Gemini", "Gemini (constellation)", "The twins"], ["Grus", "Grus (constellation)", "The crane"], ["Hercules", "Hercules (constellation)", "The strongman"],
  ["Hydra", "Hydra (constellation)", "The water snake"], ["Leo", "Leo (constellation)", "The lion"], ["Lepus", "Lepus (constellation)", "The hare"],
  ["Libra", "Libra (constellation)", "The scales"], ["Lupus", "Lupus (constellation)", "The wolf"], ["Lyra", "Lyra", "The lyre"],
  ["Ophiuchus", "Ophiuchus", "The serpent-bearer"], ["Orion", "Orion (constellation)", "The hunter"], ["Pavo", "Pavo (constellation)", "The peacock"],
  ["Pegasus", "Pegasus (constellation)", "The winged horse"], ["Perseus", "Perseus (constellation)", "The hero"], ["Phoenix", "Phoenix (constellation)", "The phoenix"],
  ["Pisces", "Pisces (constellation)", "The fishes"], ["Puppis", "Puppis", "The stern"], ["Sagittarius", "Sagittarius (constellation)", "The archer"],
  ["Scorpius", "Scorpius", "The scorpion"], ["Serpens", "Serpens", "The serpent"], ["Taurus", "Taurus (constellation)", "The bull"],
  ["Tucana", "Tucana", "The toucan"], ["Ursa Major", "Ursa Major", "The great bear"], ["Ursa Minor", "Ursa Minor", "The little bear"],
  ["Vela", "Vela (constellation)", "The sails"], ["Virgo", "Virgo (constellation)", "The maiden"], ["Volans", "Volans", "The flying fish"],
  ["Vulpecula", "Vulpecula", "The fox"], ["Sagitta", "Sagitta", "The arrow"], ["Scutum", "Scutum (constellation)", "The shield"],
  ["Lynx", "Lynx (constellation)", "The lynx"], ["Monoceros", "Monoceros", "The unicorn"], ["Pictor", "Pictor", "The painter's easel"],
  ["Carina", "Carina (constellation)", "The keel"], ["Dorado", "Dorado", "The dolphinfish"], ["Hydrus", "Hydrus", "The lesser water snake"],
];

const BRIGHT_STARS = [
  ["Sirius", "Sirius", "Canis Major"], ["Canopus", "Canopus", "Carina"], ["Arcturus", "Arcturus", "Boötes"], ["Vega", "Vega", "Lyra"],
  ["Capella", "Capella", "Auriga"], ["Rigel", "Rigel", "Orion"], ["Procyon", "Procyon", "Canis Minor"], ["Betelgeuse", "Betelgeuse", "Orion"],
  ["Achernar", "Achernar", "Eridanus"], ["Altair", "Altair", "Aquila"], ["Aldebaran", "Aldebaran", "Taurus"], ["Antares", "Antares", "Scorpius"],
  ["Spica", "Spica", "Virgo"], ["Pollux", "Pollux (star)", "Gemini"], ["Fomalhaut", "Fomalhaut", "Piscis Austrinus"], ["Deneb", "Deneb", "Cygnus"],
  ["Regulus", "Regulus", "Leo"], ["Castor", "Castor (star)", "Gemini"], ["Polaris", "Polaris", "Ursa Minor"], ["Bellatrix", "Bellatrix", "Orion"],
  ["Alnilam", "Alnilam", "Orion"], ["Algol", "Algol", "Perseus"], ["Mizar", "Mizar", "Ursa Major"], ["Alpha Centauri", "Alpha Centauri", "Centaurus"],
];

const MOONS = [
  ["Io", "Io (moon)", "Jupiter"], ["Europa", "Europa (moon)", "Jupiter"], ["Ganymede", "Ganymede (moon)", "Jupiter"], ["Callisto", "Callisto (moon)", "Jupiter"],
  ["Titan", "Titan (moon)", "Saturn"], ["Enceladus", "Enceladus", "Saturn"], ["Mimas", "Mimas", "Saturn"], ["Iapetus", "Iapetus (moon)", "Saturn"],
  ["Rhea", "Rhea (moon)", "Saturn"], ["Dione", "Dione (moon)", "Saturn"], ["Tethys", "Tethys (moon)", "Saturn"], ["Titania", "Titania (moon)", "Uranus"],
  ["Oberon", "Oberon (moon)", "Uranus"], ["Miranda", "Miranda (moon)", "Uranus"], ["Ariel", "Ariel (moon)", "Uranus"], ["Umbriel", "Umbriel", "Uranus"],
  ["Triton", "Triton (moon)", "Neptune"], ["Nereid", "Nereid (moon)", "Neptune"], ["Phobos", "Phobos (moon)", "Mars"], ["Deimos", "Deimos (moon)", "Mars"],
  ["Charon", "Charon (moon)", "Pluto"],
];

const PLANET_FACTS = [
  ["Mercury", "Mercury (planet)", "The smallest planet and the closest to the Sun"], ["Venus", "Venus", "The hottest planet, wrapped in carbon dioxide"],
  ["Earth", "Earth", "The only planet known to bear life"], ["Mars", "Mars", "The red planet, host to the tallest volcano in the Solar System"],
  ["Jupiter", "Jupiter", "The largest planet, marked by a centuries-old storm"], ["Saturn", "Saturn", "The planet famous for its bright ring system"],
  ["Uranus", "Uranus", "The ice giant that rotates on its side"], ["Neptune", "Neptune", "The farthest planet from the Sun"],
  ["Pluto", "Pluto", "Reclassified as a dwarf planet in 2006"], ["Ceres", "Ceres (dwarf planet)", "The largest object in the asteroid belt"],
];

const MISSIONS = [
  ["Apollo 11", "Apollo 11", "The first crewed Moon landing"], ["Sputnik 1", "Sputnik 1", "The first artificial satellite"],
  ["Vostok 1", "Vostok 1", "The first human spaceflight"], ["Voyager 1", "Voyager 1", "The most distant human-made object"],
  ["Voyager 2", "Voyager 2", "The only spacecraft to visit Uranus and Neptune"], ["Cassini", "Cassini–Huygens", "A long orbital survey of Saturn"],
  ["Galileo", "Galileo (spacecraft)", "The first orbiter of Jupiter"], ["New Horizons", "New Horizons", "The first close flyby of Pluto"],
  ["Hubble", "Hubble Space Telescope", "An optical telescope in low Earth orbit"], ["The James Webb Space Telescope", "James Webb Space Telescope", "An infrared observatory at the second Lagrange point"],
  ["Curiosity", "Curiosity (rover)", "A nuclear-powered rover in Gale crater"], ["Perseverance", "Perseverance (rover)", "A rover collecting samples in Jezero crater"],
  ["Viking 1", "Viking 1", "The first successful long-duration Mars lander"], ["Rosetta", "Rosetta (spacecraft)", "The first mission to orbit a comet"],
  ["Parker Solar Probe", "Parker Solar Probe", "The closest approach yet to the Sun"], ["Chang'e 4", "Chang'e 4", "The first landing on the far side of the Moon"],
];

const ASTRONOMICAL_TERMS = [
  ["The point of a planet's orbit closest to the Sun", "Perihelion", "Perihelion"], ["The point of a planet's orbit farthest from the Sun", "Apsis", "Aphelion"],
  ["The apparent backward motion of a planet", "Apparent retrograde motion", "Retrograde motion"], ["The boundary beyond which nothing escapes a black hole", "Event horizon", "Event horizon"],
  ["The collapsed core left by a massive supernova", "Neutron star", "Neutron star"], ["A rapidly spinning neutron star seen as pulses", "Pulsar", "Pulsar"],
  ["The distance light travels in a year", "Light-year", "Light-year"], ["The mean distance from Earth to the Sun", "Astronomical unit", "Astronomical unit"],
  ["The distance at which a star shows one arcsecond of parallax", "Parsec", "Parsec"], ["The shift of spectral lines toward longer wavelengths", "Redshift", "Redshift"],
  ["The diagram plotting luminosity against temperature", "Hertzsprung–Russell diagram", "The Hertzsprung–Russell diagram"], ["The mass limit above which a white dwarf collapses", "Chandrasekhar limit", "The Chandrasekhar limit"],
  ["The disc-shaped region of icy bodies beyond Neptune", "Kuiper belt", "The Kuiper belt"], ["The distant spherical shell thought to source long-period comets", "Oort cloud", "The Oort cloud"],
  ["The glowing shell cast off by a dying low-mass star", "Planetary nebula", "A planetary nebula"], ["A galaxy's extremely luminous active core", "Quasar", "A quasar"],
];

const GALAXIES = [
  ["The Milky Way", "Milky Way", "Barred spiral"], ["Andromeda", "Andromeda Galaxy", "Barred spiral"], ["The Triangulum Galaxy", "Triangulum Galaxy", "Spiral"],
  ["The Whirlpool Galaxy", "Whirlpool Galaxy", "Spiral"], ["The Sombrero Galaxy", "Sombrero Galaxy", "Spiral"], ["The Large Magellanic Cloud", "Large Magellanic Cloud", "Irregular"],
  ["The Small Magellanic Cloud", "Small Magellanic Cloud", "Irregular"], ["Centaurus A", "Centaurus A", "Elliptical"],
];

export const ASTRONOMY_FAMILIES = [
  {
    category: "Astronomy", levels: [2, 4], facts: CONSTELLATIONS,
    forms: [
      { prompt: (name) => `Which figure does the constellation ${name} represent?`, explain: (name, figure) => `${name} represents ${soft(figure)}.` },
      { reverse: true, prompt: (name, figure) => `Which constellation represents ${soft(figure)}?`, explain: (name, figure) => `${figure} is ${name}.` },
    ],
  },
  {
    category: "Astronomy", levels: [2, 4], facts: BRIGHT_STARS,
    forms: [
      { prompt: (star) => `In which constellation does ${star} lie?`, explain: (star, constellation) => `${star} lies in ${constellation}.` },
    ],
  },
  {
    category: "Astronomy", levels: [1, 3], facts: MOONS,
    forms: [
      { prompt: (moon) => `${moon} is a moon of which body?`, explain: (moon, planet) => `${moon} orbits ${planet}.` },
    ],
  },
  {
    category: "Astronomy", levels: [1, 2], facts: PLANET_FACTS,
    forms: [
      { prompt: (planet) => `Which description fits ${planet}?`, explain: (planet, description) => `${planet}: ${soft(description)}.` },
      { reverse: true, prompt: (planet, description) => `Which body is described as ${soft(description)}?`, explain: (planet, description) => `That is ${planet}.` },
    ],
  },
  {
    category: "Astronomy", levels: [2, 4], facts: MISSIONS, identify: true,
    forms: [
      { prompt: (mission) => `What is ${mission.replace("The ", "the ")} remembered for?`, explain: (mission, deed) => `${mission}: ${soft(deed)}.` },
      { reverse: true, prompt: (mission, deed) => `Which mission is remembered for ${soft(deed)}?`, explain: (mission, deed) => `That was ${mission}.` },
    ],
  },
  {
    category: "Astronomy", levels: [2, 4], facts: ASTRONOMICAL_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `What is the term for ${soft(definition)}?`, explain: (definition, term) => `${term} is ${soft(definition)}.` },
    ],
  },
  {
    category: "Astronomy", levels: [3, 4], facts: GALAXIES,
    forms: [
      { prompt: (galaxy) => `What kind of galaxy is ${galaxy.replace("The ", "the ")}?`, explain: (galaxy, kind) => `${galaxy} is ${/^[aeiou]/i.test(kind) ? "an" : "a"} ${soft(kind)} galaxy.` },
    ],
  },
];
