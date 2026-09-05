// Physical science: the periodic table, units, constants, laws, materials and the
// people who described them. Facts are [clue, Wikipedia article, answer].
import { soft } from "./case.js";
const ELEMENTS = [
  ["Hydrogen", "H", 1], ["Helium", "He", 2], ["Lithium", "Li", 3], ["Beryllium", "Be", 4], ["Boron", "B", 5], ["Carbon", "C", 6],
  ["Nitrogen", "N", 7], ["Oxygen", "O", 8], ["Fluorine", "F", 9], ["Neon", "Ne", 10], ["Sodium", "Na", 11], ["Magnesium", "Mg", 12],
  ["Aluminium", "Al", 13], ["Silicon", "Si", 14], ["Phosphorus", "P", 15], ["Sulfur", "S", 16], ["Chlorine", "Cl", 17], ["Argon", "Ar", 18],
  ["Potassium", "K", 19], ["Calcium", "Ca", 20], ["Scandium", "Sc", 21], ["Titanium", "Ti", 22], ["Vanadium", "V", 23], ["Chromium", "Cr", 24],
  ["Manganese", "Mn", 25], ["Iron", "Fe", 26], ["Cobalt", "Co", 27], ["Nickel", "Ni", 28], ["Copper", "Cu", 29], ["Zinc", "Zn", 30],
  ["Gallium", "Ga", 31], ["Germanium", "Ge", 32], ["Arsenic", "As", 33], ["Selenium", "Se", 34], ["Bromine", "Br", 35], ["Krypton", "Kr", 36],
  ["Rubidium", "Rb", 37], ["Strontium", "Sr", 38], ["Yttrium", "Y", 39], ["Zirconium", "Zr", 40], ["Niobium", "Nb", 41], ["Molybdenum", "Mo", 42],
  ["Technetium", "Tc", 43], ["Ruthenium", "Ru", 44], ["Rhodium", "Rh", 45], ["Palladium", "Pd", 46], ["Silver", "Ag", 47], ["Cadmium", "Cd", 48],
  ["Indium", "In", 49], ["Tin", "Sn", 50], ["Antimony", "Sb", 51], ["Tellurium", "Te", 52], ["Iodine", "I", 53], ["Xenon", "Xe", 54],
  ["Caesium", "Cs", 55], ["Barium", "Ba", 56], ["Lanthanum", "La", 57], ["Cerium", "Ce", 58], ["Praseodymium", "Pr", 59], ["Neodymium", "Nd", 60],
  ["Promethium", "Pm", 61], ["Samarium", "Sm", 62], ["Europium", "Eu", 63], ["Gadolinium", "Gd", 64], ["Terbium", "Tb", 65], ["Dysprosium", "Dy", 66],
  ["Holmium", "Ho", 67], ["Erbium", "Er", 68], ["Thulium", "Tm", 69], ["Ytterbium", "Yb", 70], ["Lutetium", "Lu", 71], ["Hafnium", "Hf", 72],
  ["Tantalum", "Ta", 73], ["Tungsten", "W", 74], ["Rhenium", "Re", 75], ["Osmium", "Os", 76], ["Iridium", "Ir", 77], ["Platinum", "Pt", 78],
  ["Gold", "Au", 79], ["Mercury (element)", "Hg", 80], ["Thallium", "Tl", 81], ["Lead", "Pb", 82], ["Bismuth", "Bi", 83], ["Polonium", "Po", 84],
  ["Astatine", "At", 85], ["Radon", "Rn", 86], ["Francium", "Fr", 87], ["Radium", "Ra", 88], ["Actinium", "Ac", 89], ["Thorium", "Th", 90],
  ["Protactinium", "Pa", 91], ["Uranium", "U", 92], ["Neptunium", "Np", 93], ["Plutonium", "Pu", 94], ["Americium", "Am", 95], ["Curium", "Cm", 96],
  ["Berkelium", "Bk", 97], ["Californium", "Cf", 98], ["Einsteinium", "Es", 99], ["Fermium", "Fm", 100], ["Mendelevium", "Md", 101], ["Nobelium", "No", 102],
  ["Lawrencium", "Lr", 103], ["Rutherfordium", "Rf", 104], ["Dubnium", "Db", 105], ["Seaborgium", "Sg", 106], ["Bohrium", "Bh", 107], ["Hassium", "Hs", 108],
  ["Meitnerium", "Mt", 109], ["Darmstadtium", "Ds", 110], ["Roentgenium", "Rg", 111], ["Copernicium", "Cn", 112], ["Nihonium", "Nh", 113], ["Flerovium", "Fl", 114],
  ["Moscovium", "Mc", 115], ["Livermorium", "Lv", 116], ["Tennessine", "Ts", 117], ["Oganesson", "Og", 118],
];
const plainElement = (name) => name.replace(" (element)", "");
const ELEMENT_SYMBOLS = ELEMENTS.map(([name, symbol]) => [plainElement(name), name, symbol]);
const ELEMENT_NUMBERS = ELEMENTS.map(([name, , number]) => [plainElement(name), name, String(number)]);

const COMPOUNDS = [
  ["Water", "Water", "H2O"], ["Carbon dioxide", "Carbon dioxide", "CO2"], ["Ammonia", "Ammonia", "NH3"], ["Methane", "Methane", "CH4"],
  ["Sodium chloride", "Sodium chloride", "NaCl"], ["Sulfuric acid", "Sulfuric acid", "H2SO4"], ["Nitric acid", "Nitric acid", "HNO3"], ["Ethanol", "Ethanol", "C2H5OH"],
  ["Glucose", "Glucose", "C6H12O6"], ["Calcium carbonate", "Calcium carbonate", "CaCO3"], ["Hydrogen peroxide", "Hydrogen peroxide", "H2O2"], ["Ozone", "Ozone", "O3"],
  ["Carbon monoxide", "Carbon monoxide", "CO"], ["Hydrochloric acid", "Hydrochloric acid", "HCl"], ["Sodium hydroxide", "Sodium hydroxide", "NaOH"], ["Acetic acid", "Acetic acid", "CH3COOH"],
  ["Benzene", "Benzene", "C6H6"], ["Sucrose", "Sucrose", "C12H22O11"], ["Nitrous oxide", "Nitrous oxide", "N2O"], ["Sulfur dioxide", "Sulfur dioxide", "SO2"],
];

const SI_UNITS = [
  ["Length", "Metre", "Metre"], ["Mass", "Kilogram", "Kilogram"], ["Time", "Second", "Second"], ["Electric current", "Ampere", "Ampere"],
  ["Thermodynamic temperature", "Kelvin", "Kelvin"], ["Amount of substance", "Mole (unit)", "Mole"], ["Luminous intensity", "Candela", "Candela"], ["Force", "Newton (unit)", "Newton"],
  ["Energy", "Joule", "Joule"], ["Power", "Watt", "Watt"], ["Pressure", "Pascal (unit)", "Pascal"], ["Frequency", "Hertz", "Hertz"],
  ["Electric charge", "Coulomb", "Coulomb"], ["Voltage", "Volt", "Volt"], ["Electrical resistance", "Ohm", "Ohm"], ["Capacitance", "Farad", "Farad"],
  ["Inductance", "Henry (unit)", "Henry"], ["Magnetic flux", "Weber (unit)", "Weber"], ["Magnetic flux density", "Tesla (unit)", "Tesla"], ["Radioactivity", "Becquerel", "Becquerel"],
  ["Absorbed radiation dose", "Gray (unit)", "Gray"], ["Illuminance", "Lux", "Lux"], ["Luminous flux", "Lumen (unit)", "Lumen"], ["Catalytic activity", "Katal", "Katal"],
];

const PHYSICS_LAWS = [
  ["Universal gravitation", "Newton's law of universal gravitation", "Isaac Newton"], ["The three laws of motion", "Newton's laws of motion", "Isaac Newton"],
  ["Special relativity", "Special relativity", "Albert Einstein"], ["General relativity", "General relativity", "Albert Einstein"],
  ["The uncertainty principle", "Uncertainty principle", "Werner Heisenberg"], ["The exclusion principle", "Pauli exclusion principle", "Wolfgang Pauli"],
  ["The photoelectric effect explanation", "Photoelectric effect", "Albert Einstein"], ["The law of electrolysis", "Faraday's laws of electrolysis", "Michael Faraday"],
  ["The law of electrical resistance", "Ohm's law", "Georg Ohm"], ["The gas law relating pressure and volume", "Boyle's law", "Robert Boyle"],
  ["The gas law relating volume and temperature", "Charles's law", "Jacques Charles"], ["The principle of buoyancy", "Archimedes' principle", "Archimedes"],
  ["The law of induction", "Faraday's law of induction", "Michael Faraday"], ["The principle of fluid pressure transmission", "Pascal's law", "Blaise Pascal"],
  ["The equation of a wave function", "Schrödinger equation", "Erwin Schrödinger"], ["The law of falling bodies", "Equations of motion", "Galileo Galilei"],
  ["The law of thermal radiation", "Planck's law", "Max Planck"], ["The law of cooling", "Newton's law of cooling", "Isaac Newton"],
  ["The law of definite proportions", "Law of definite proportions", "Joseph Proust"], ["The periodic law", "Periodic table", "Dmitri Mendeleev"],
  ["The law of conservation of mass", "Conservation of mass", "Antoine Lavoisier"], ["The law of partial pressures", "Dalton's law", "John Dalton"],
];

const PARTICLES = [
  ["The proton", "Proton", "Positive"], ["The electron", "Electron", "Negative"], ["The neutron", "Neutron", "Neutral"], ["The positron", "Positron", "Positive"],
];

const DISCOVERIES = [
  ["Penicillin", "Penicillin", "Alexander Fleming"], ["Radioactivity", "Radioactive decay", "Henri Becquerel"], ["The neutron", "Neutron", "James Chadwick"],
  ["The electron", "Electron", "J. J. Thomson"], ["The atomic nucleus", "Atomic nucleus", "Ernest Rutherford"], ["X-rays", "X-ray", "Wilhelm Röntgen"],
  ["Radium", "Radium", "Marie Curie"], ["Vaccination against smallpox", "Smallpox vaccine", "Edward Jenner"], ["The structure of DNA", "Nucleic acid double helix", "James Watson"],
  ["The circulation of the blood", "Circulatory system", "William Harvey"], ["Oxygen", "Oxygen", "Joseph Priestley"], ["The telephone", "Telephone", "Alexander Graham Bell"],
  ["The cosmic microwave background", "Cosmic microwave background", "Arno Penzias"], ["Nuclear fission", "Nuclear fission", "Otto Hahn"],
  ["Superconductivity", "Superconductivity", "Heike Kamerlingh Onnes"], ["The expansion of the universe", "Hubble's law", "Edwin Hubble"],
];

const MINERALS = [
  ["Diamond", "Diamond", "Carbon"], ["Graphite", "Graphite", "Carbon"], ["Quartz", "Quartz", "Silicon dioxide"], ["Halite", "Halite", "Sodium chloride"],
  ["Calcite", "Calcite", "Calcium carbonate"], ["Pyrite", "Pyrite", "Iron sulfide"], ["Galena", "Galena", "Lead sulfide"], ["Hematite", "Hematite", "Iron oxide"],
  ["Bauxite", "Bauxite", "Aluminium"], ["Cinnabar", "Cinnabar", "Mercury"], ["Gypsum", "Gypsum", "Calcium sulfate"], ["Magnetite", "Magnetite", "Iron oxide"],
];

const HARDNESS = [
  ["Talc", "Talc", "1"], ["Gypsum", "Gypsum", "2"], ["Calcite", "Calcite", "3"], ["Fluorite", "Fluorite", "4"],
  ["Apatite", "Apatite", "5"], ["Orthoclase", "Orthoclase", "6"], ["Quartz", "Quartz", "7"], ["Topaz", "Topaz", "8"],
  ["Corundum", "Corundum", "9"], ["Diamond", "Diamond", "10"],
];

const GEOLOGY_PERIODS = [
  ["The Cambrian", "Cambrian", "Paleozoic"], ["The Ordovician", "Ordovician", "Paleozoic"], ["The Silurian", "Silurian", "Paleozoic"], ["The Devonian", "Devonian", "Paleozoic"],
  ["The Carboniferous", "Carboniferous", "Paleozoic"], ["The Permian", "Permian", "Paleozoic"], ["The Triassic", "Triassic", "Mesozoic"], ["The Jurassic", "Jurassic", "Mesozoic"],
  ["The Cretaceous", "Cretaceous", "Mesozoic"], ["The Paleogene", "Paleogene", "Cenozoic"], ["The Neogene", "Neogene", "Cenozoic"], ["The Quaternary", "Quaternary", "Cenozoic"],
];

const ROCK_TYPES = [
  ["Granite", "Granite", "Igneous"], ["Basalt", "Basalt", "Igneous"], ["Obsidian", "Obsidian", "Igneous"], ["Pumice", "Pumice", "Igneous"],
  ["Limestone", "Limestone", "Sedimentary"], ["Sandstone", "Sandstone", "Sedimentary"], ["Shale", "Shale", "Sedimentary"], ["Chalk", "Chalk", "Sedimentary"],
  ["Marble", "Marble", "Metamorphic"], ["Slate", "Slate", "Metamorphic"], ["Gneiss", "Gneiss", "Metamorphic"], ["Schist", "Schist", "Metamorphic"],
  ["Quartzite", "Quartzite", "Metamorphic"], ["Conglomerate", "Conglomerate (geology)", "Sedimentary"], ["Gabbro", "Gabbro", "Igneous"], ["Anthracite", "Anthracite", "Sedimentary"],
];

const ATMOSPHERE_LAYERS = [
  ["The troposphere", "Troposphere", "The lowest layer, where weather occurs"], ["The stratosphere", "Stratosphere", "The layer containing the ozone layer"],
  ["The mesosphere", "Mesosphere", "The layer where most meteors burn up"], ["The thermosphere", "Thermosphere", "The layer containing the aurorae"],
  ["The exosphere", "Exosphere", "The outermost layer, thinning into space"],
];

const SCALES = [
  ["Earthquake magnitude", "Moment magnitude scale", "Moment magnitude scale"], ["Wind force at sea", "Beaufort scale", "Beaufort scale"],
  ["Mineral hardness", "Mohs scale", "Mohs scale"], ["Tornado intensity", "Enhanced Fujita scale", "Enhanced Fujita scale"],
  ["Volcanic explosivity", "Volcanic Explosivity Index", "Volcanic Explosivity Index"], ["Hurricane strength", "Saffir–Simpson scale", "Saffir–Simpson scale"],
  ["Acidity and alkalinity", "PH", "pH scale"], ["Stellar brightness", "Apparent magnitude", "Apparent magnitude"],
];

export const SCIENCE_FAMILIES = [
  {
    category: "Chemistry", levels: [1, 3], facts: ELEMENT_SYMBOLS,
    forms: [
      { prompt: (element) => `What is the chemical symbol for ${soft(element)}?`, explain: (element, symbol) => `${element} has the chemical symbol ${symbol}.` },
      { reverse: true, prompt: (element, symbol) => `Which element has the chemical symbol ${symbol}?`, explain: (element, symbol) => `${symbol} is the symbol for ${soft(element)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [2, 4], facts: ELEMENT_NUMBERS,
    forms: [
      { prompt: (element) => `What is the atomic number of ${soft(element)}?`, explain: (element, number) => `${element} has atomic number ${number}.` },
      { reverse: true, prompt: (element, number) => `Which element has atomic number ${number}?`, explain: (element, number) => `Atomic number ${number} belongs to ${soft(element)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [1, 3], facts: COMPOUNDS,
    forms: [
      { prompt: (compound) => `What is the chemical formula of ${soft(compound)}?`, explain: (compound, formula) => `${compound} has the formula ${formula}.` },
      { reverse: true, prompt: (compound, formula) => `Which substance has the chemical formula ${formula}?`, explain: (compound, formula) => `${formula} is the formula of ${soft(compound)}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 3], facts: SI_UNITS,
    forms: [
      { prompt: (quantity) => `Which SI unit measures ${soft(quantity)}?`, explain: (quantity, unit) => `The ${soft(unit)} is the SI unit of ${soft(quantity)}.` },
      { reverse: true, prompt: (quantity, unit) => `The ${soft(unit)} is the SI unit of which quantity?`, explain: (quantity, unit) => `The ${soft(unit)} measures ${soft(quantity)}.` },
    ],
  },
  {
    category: "Physics", levels: [2, 4], facts: PHYSICS_LAWS,
    forms: [
      { prompt: (law) => `${law} is credited to which scientist?`, explain: (law, person) => `${law} is credited to ${person}.` },
      { reverse: true, prompt: (law, person) => `Which of these is credited to ${person}?`, explain: (law, person) => `${person} is credited with ${soft(law)}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 2], facts: PARTICLES,
    forms: [
      { prompt: (particle) => `What electric charge does ${soft(particle)} carry?`, explain: (particle, charge) => `${particle} carries ${soft(charge)} charge.` },
    ],
  },
  {
    category: "Physics", levels: [2, 4], facts: DISCOVERIES,
    forms: [
      { prompt: (discovery) => `Who is credited with the discovery of ${soft(discovery)}?`, explain: (discovery, person) => `${person} is credited with the discovery of ${soft(discovery)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: MINERALS,
    forms: [
      { prompt: (mineral) => `${mineral} is composed chiefly of what?`, explain: (mineral, makeup) => `${mineral} is composed chiefly of ${soft(makeup)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [3, 4], facts: HARDNESS,
    forms: [
      { prompt: (mineral) => `What is the Mohs hardness of ${soft(mineral)}?`, explain: (mineral, value) => `${mineral} defines hardness ${value} on the Mohs scale.` },
      { reverse: true, prompt: (mineral, value) => `Which mineral defines hardness ${value} on the Mohs scale?`, explain: (mineral, value) => `${mineral} defines hardness ${value} on the Mohs scale.` },
    ],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: GEOLOGY_PERIODS,
    forms: [
      { prompt: (period) => `${period} period belongs to which geological era?`, explain: (period, era) => `${period} period falls within the ${era} era.` },
    ],
  },
  {
    category: "Earth Science", levels: [1, 3], facts: ROCK_TYPES,
    forms: [
      { prompt: (rock) => `${rock} is which type of rock?`, explain: (rock, type) => `${rock} is an ${soft(type)} rock.` },
    ],
  },
  {
    category: "Earth Science", levels: [2, 3], facts: ATMOSPHERE_LAYERS, identify: true,
    forms: [
      { prompt: (layer) => `How is ${soft(layer)} best described?`, explain: (layer, description) => `${layer}: ${soft(description)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: SCALES, describe: true,
    forms: [
      { prompt: (quantity) => `Which scale measures ${soft(quantity)}?`, explain: (quantity, scale) => `The ${scale} measures ${soft(quantity)}.` },
    ],
  },
];
