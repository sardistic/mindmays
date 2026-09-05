// More physical science: where elements sit in the table, what things are made of,
// and who built the machines.
import { soft } from "./case.js";
const ELEMENT_GROUPS = [
  ["Lithium", "Lithium", "Alkali metal"], ["Sodium", "Sodium", "Alkali metal"], ["Potassium", "Potassium", "Alkali metal"], ["Rubidium", "Rubidium", "Alkali metal"],
  ["Caesium", "Caesium", "Alkali metal"], ["Francium", "Francium", "Alkali metal"], ["Beryllium", "Beryllium", "Alkaline earth metal"], ["Magnesium", "Magnesium", "Alkaline earth metal"],
  ["Calcium", "Calcium", "Alkaline earth metal"], ["Strontium", "Strontium", "Alkaline earth metal"], ["Barium", "Barium", "Alkaline earth metal"], ["Radium", "Radium", "Alkaline earth metal"],
  ["Fluorine", "Fluorine", "Halogen"], ["Chlorine", "Chlorine", "Halogen"], ["Bromine", "Bromine", "Halogen"], ["Iodine", "Iodine", "Halogen"], ["Astatine", "Astatine", "Halogen"],
  ["Helium", "Helium", "Noble gas"], ["Neon", "Neon", "Noble gas"], ["Argon", "Argon", "Noble gas"], ["Krypton", "Krypton", "Noble gas"], ["Xenon", "Xenon", "Noble gas"], ["Radon", "Radon", "Noble gas"],
  ["Iron", "Iron", "Transition metal"], ["Copper", "Copper", "Transition metal"], ["Zinc", "Zinc", "Transition metal"], ["Nickel", "Nickel", "Transition metal"],
  ["Cobalt", "Cobalt", "Transition metal"], ["Titanium", "Titanium", "Transition metal"], ["Chromium", "Chromium", "Transition metal"], ["Manganese", "Manganese", "Transition metal"],
  ["Silver", "Silver", "Transition metal"], ["Gold", "Gold", "Transition metal"], ["Platinum", "Platinum", "Transition metal"], ["Tungsten", "Tungsten", "Transition metal"],
  ["Cerium", "Cerium", "Lanthanide"], ["Neodymium", "Neodymium", "Lanthanide"], ["Europium", "Europium", "Lanthanide"], ["Gadolinium", "Gadolinium", "Lanthanide"],
  ["Uranium", "Uranium", "Actinide"], ["Thorium", "Thorium", "Actinide"], ["Plutonium", "Plutonium", "Actinide"], ["Americium", "Americium", "Actinide"],
  ["Boron", "Boron", "Metalloid"], ["Silicon", "Silicon", "Metalloid"], ["Germanium", "Germanium", "Metalloid"], ["Arsenic", "Arsenic", "Metalloid"], ["Tellurium", "Tellurium", "Metalloid"],
];

const ELEMENT_STATES = [
  ["Hydrogen", "Hydrogen", "Gas"], ["Helium", "Helium", "Gas"], ["Nitrogen", "Nitrogen", "Gas"], ["Oxygen", "Oxygen", "Gas"], ["Fluorine", "Fluorine", "Gas"],
  ["Neon", "Neon", "Gas"], ["Chlorine", "Chlorine", "Gas"], ["Argon", "Argon", "Gas"], ["Krypton", "Krypton", "Gas"], ["Xenon", "Xenon", "Gas"], ["Radon", "Radon", "Gas"],
  ["Bromine", "Bromine", "Liquid"], ["Mercury", "Mercury (element)", "Liquid"],
  ["Iron", "Iron", "Solid"], ["Carbon", "Carbon", "Solid"], ["Sulfur", "Sulfur", "Solid"], ["Gold", "Gold", "Solid"], ["Lead", "Lead", "Solid"],
];

const ELEMENT_NAMED_AFTER = [
  ["Curium", "Curium", "Marie and Pierre Curie"], ["Einsteinium", "Einsteinium", "Albert Einstein"], ["Fermium", "Fermium", "Enrico Fermi"],
  ["Mendelevium", "Mendelevium", "Dmitri Mendeleev"], ["Bohrium", "Bohrium", "Niels Bohr"], ["Rutherfordium", "Rutherfordium", "Ernest Rutherford"],
  ["Meitnerium", "Meitnerium", "Lise Meitner"], ["Seaborgium", "Seaborgium", "Glenn T. Seaborg"], ["Copernicium", "Copernicium", "Nicolaus Copernicus"],
  ["Roentgenium", "Roentgenium", "Wilhelm Röntgen"], ["Nobelium", "Nobelium", "Alfred Nobel"], ["Lawrencium", "Lawrencium", "Ernest Lawrence"],
];

const ALLOYS = [
  ["Bronze", "Bronze", "Copper and tin"], ["Brass", "Brass", "Copper and zinc"], ["Steel", "Steel", "Iron and carbon"], ["Pewter", "Pewter", "Tin with copper and antimony"],
  ["Sterling silver", "Sterling silver", "Silver and copper"], ["Duralumin", "Duralumin", "Aluminium and copper"], ["Solder", "Solder", "Tin and lead"], ["Cupronickel", "Cupronickel", "Copper and nickel"],
  ["Amalgam", "Amalgam (chemistry)", "Mercury with another metal"], ["Electrum", "Electrum", "Gold and silver"],
];

const INVENTIONS = [
  ["The telephone", "Telephone", "Alexander Graham Bell"], ["The phonograph", "Phonograph", "Thomas Edison"], ["The light bulb's practical form", "Incandescent light bulb", "Thomas Edison"],
  ["The steam engine's separate condenser", "Watt steam engine", "James Watt"], ["The printing press with movable type in Europe", "Printing press", "Johannes Gutenberg"],
  ["The telescope's astronomical use", "Galileo Galilei", "Galileo Galilei"], ["The cotton gin", "Cotton gin", "Eli Whitney"],
  ["The sewing machine", "Sewing machine", "Elias Howe"], ["The safety lamp for miners", "Davy lamp", "Humphry Davy"], ["Dynamite", "Dynamite", "Alfred Nobel"],
  ["The pneumatic tyre", "John Boyd Dunlop", "John Boyd Dunlop"], ["The diesel engine", "Diesel engine", "Rudolf Diesel"],
  ["Radio transmission across the Atlantic", "Guglielmo Marconi", "Guglielmo Marconi"], ["The first powered aeroplane flight", "Wright brothers", "The Wright brothers"],
  ["The assembly line for cars", "Ford Model T", "Henry Ford"], ["The hot-air balloon", "Montgolfier brothers", "The Montgolfier brothers"],
  ["The barometer", "Barometer", "Evangelista Torricelli"], ["The mercury thermometer", "Daniel Gabriel Fahrenheit", "Daniel Gabriel Fahrenheit"],
  ["The battery's first form, the voltaic pile", "Voltaic pile", "Alessandro Volta"], ["The camera obscura's photographic successor", "Louis Daguerre", "Louis Daguerre"],
  ["Vulcanised rubber", "Vulcanization", "Charles Goodyear"], ["The parachute's modern form", "André-Jacques Garnerin", "André-Jacques Garnerin"],
  ["The escalator", "Escalator", "Jesse W. Reno"], ["The safety elevator brake", "Elisha Otis", "Elisha Otis"],
];

const TEMPERATURE = [
  ["Water freezes at this Celsius temperature", "Celsius", "0"], ["Water boils at this Celsius temperature at sea level", "Celsius", "100"],
  ["Absolute zero in kelvin", "Absolute zero", "0"], ["Water freezes at this Fahrenheit temperature", "Fahrenheit", "32"],
  ["Water boils at this Fahrenheit temperature", "Fahrenheit", "212"],
];

const ENERGY_FORMS = [
  ["Energy stored by position in a field", "Potential energy", "Potential energy"], ["Energy of motion", "Kinetic energy", "Kinetic energy"],
  ["Energy carried by moving charge", "Electricity", "Electrical energy"], ["Energy released by rearranging nuclei", "Nuclear binding energy", "Nuclear energy"],
  ["Energy transferred by a temperature difference", "Heat", "Heat"], ["Energy carried by electromagnetic waves", "Radiant energy", "Radiant energy"],
];

const OPTICS = [
  ["The bending of light entering a new medium", "Refraction", "Refraction"], ["The bouncing of light from a surface", "Reflection (physics)", "Reflection"],
  ["The spreading of waves around an obstacle", "Diffraction", "Diffraction"], ["The splitting of white light into colours", "Dispersion (optics)", "Dispersion"],
  ["The restriction of light waves to one plane", "Polarization (waves)", "Polarisation"], ["The apparent change of pitch or frequency with motion", "Doppler effect", "The Doppler effect"],
];

const STATES_OF_MATTER = [
  ["A state with fixed shape and volume", "Solid", "Solid"], ["A state with fixed volume but no fixed shape", "Liquid", "Liquid"],
  ["A state with neither fixed shape nor volume", "Gas", "Gas"], ["An ionised state of matter found in stars", "Plasma (physics)", "Plasma"],
  ["A state reached by dilute bosons near absolute zero", "Bose–Einstein condensate", "Bose-Einstein condensate"],
];

const PHASE_CHANGES = [
  ["Solid to liquid", "Melting", "Melting"], ["Liquid to gas", "Vaporization", "Vaporisation"], ["Gas to liquid", "Condensation", "Condensation"],
  ["Liquid to solid", "Freezing", "Freezing"], ["Solid straight to gas", "Sublimation (phase transition)", "Sublimation"], ["Gas straight to solid", "Deposition (phase transition)", "Deposition"],
];

export const SCIENCE2_FAMILIES = [
  {
    category: "Chemistry", levels: [2, 4], facts: ELEMENT_GROUPS,
    forms: [
      { prompt: (element) => `To which group of elements does ${soft(element)} belong?`, explain: (element, group) => `${element} is ${/^[aeiou]/i.test(group) ? "an" : "a"} ${soft(group)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [1, 3], facts: ELEMENT_STATES,
    forms: [
      { prompt: (element) => `In what state is ${soft(element)} at room temperature?`, explain: (element, state) => `${element} is ${/^[aeiou]/i.test(state) ? "a" : "a"} ${soft(state)} at room temperature.` },
    ],
  },
  {
    category: "Chemistry", levels: [3, 4], facts: ELEMENT_NAMED_AFTER,
    forms: [
      { prompt: (element) => `${element} is named after whom?`, explain: (element, person) => `${element} is named after ${person}.` },
      { reverse: true, prompt: (element, person) => `Which element is named after ${person}?`, explain: (element, person) => `${element} honours ${person}.` },
    ],
  },
  {
    category: "Chemistry", levels: [2, 3], facts: ALLOYS,
    forms: [
      { prompt: (alloy) => `${alloy} is an alloy of which metals?`, explain: (alloy, metals) => `${alloy} is ${soft(metals)}.` },
      { reverse: true, prompt: (alloy, metals) => `Which alloy is made of ${soft(metals)}?`, explain: (alloy, metals) => `That is ${soft(alloy)}.` },
    ],
  },
  {
    category: "Technology", levels: [1, 3], facts: INVENTIONS,
    forms: [
      { prompt: (invention) => `Who is credited with ${invention.replace("The ", "the ").toLowerCase()}?`, explain: (invention, person) => `${person} is credited with ${invention.replace("The ", "the ").toLowerCase()}.` },
      { reverse: true, prompt: (invention, person) => `${person} is credited with which of these?`, explain: (invention, person) => `${person}: ${soft(invention)}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 2], facts: TEMPERATURE,
    forms: [
      { prompt: (definition) => `${definition}?`, explain: (definition, value) => `The value is ${value}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 3], facts: ENERGY_FORMS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [2, 3], facts: OPTICS, describe: true,
    forms: [
      { prompt: (definition) => `What is the name for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 3], facts: STATES_OF_MATTER, describe: true,
    forms: [
      { prompt: (definition) => `Which state of matter is ${soft(definition)}?`, explain: (definition, state) => `That is ${soft(state)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [1, 3], facts: PHASE_CHANGES, describe: true,
    forms: [
      { prompt: (change) => `What is the change from ${soft(change)} called?`, explain: (change, term) => `${change} is ${soft(term)}.` },
    ],
  },
];
