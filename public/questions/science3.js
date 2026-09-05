// Applied and everyday science: materials, forces, weather, and the machinery of things.
import { soft } from "./case.js";
const MORE_COMPOUNDS = [
  ["Calcium oxide", "Calcium oxide", "CaO"], ["Magnesium oxide", "Magnesium oxide", "MgO"], ["Iron(III) oxide", "Iron(III) oxide", "Fe2O3"],
  ["Silicon dioxide", "Silicon dioxide", "SiO2"], ["Aluminium oxide", "Aluminium oxide", "Al2O3"], ["Sodium bicarbonate", "Sodium bicarbonate", "NaHCO3"],
  ["Potassium nitrate", "Potassium nitrate", "KNO3"], ["Calcium hydroxide", "Calcium hydroxide", "Ca(OH)2"], ["Ammonium chloride", "Ammonium chloride", "NH4Cl"],
  ["Hydrogen sulfide", "Hydrogen sulfide", "H2S"], ["Nitrogen dioxide", "Nitrogen dioxide", "NO2"], ["Phosphoric acid", "Phosphoric acid", "H3PO4"],
  ["Methanol", "Methanol", "CH3OH"], ["Acetone", "Acetone", "C3H6O"], ["Propane", "Propane", "C3H8"], ["Butane", "Butane", "C4H10"],
  ["Ethylene", "Ethylene", "C2H4"], ["Acetylene", "Acetylene", "C2H2"], ["Urea", "Urea", "CH4N2O"], ["Caffeine", "Caffeine", "C8H10N4O2"],
];

const POLYMERS = [
  ["Polyethylene", "Polyethylene", "Plastic bags and bottles"], ["Polystyrene", "Polystyrene", "Foam packaging and insulation"],
  ["Polyvinyl chloride", "Polyvinyl chloride", "Pipes and window frames"], ["Nylon", "Nylon", "Ropes and textiles"],
  ["Teflon", "Polytetrafluoroethylene", "Non-stick coatings"], ["Kevlar", "Kevlar", "Body armour and cables"],
  ["Bakelite", "Bakelite", "Early electrical fittings"], ["Rubber", "Natural rubber", "Tyres and seals"],
  ["Cellulose", "Cellulose", "Paper and plant cell walls"], ["Polyester", "Polyester", "Clothing fibres and bottles"],
];

const FORCES = [
  ["The force holding nuclei together", "Nuclear force", "The strong nuclear force"], ["The force behind radioactive beta decay", "Weak interaction", "The weak nuclear force"],
  ["The force between charges", "Electromagnetism", "The electromagnetic force"], ["The force between masses", "Gravity", "Gravity"],
  ["The resistance of a fluid to flow", "Viscosity", "Viscosity"], ["The resistance between sliding surfaces", "Friction", "Friction"],
  ["The upward force on a body in a fluid", "Buoyancy", "Buoyancy"], ["The inward force keeping a body in a circle", "Centripetal force", "Centripetal force"],
  ["The tendency of a body to resist a change in motion", "Inertia", "Inertia"], ["The turning effect of a force", "Torque", "Torque"],
];

const MACHINES = [
  ["The lever", "Lever", "A rigid bar turning about a fulcrum"], ["The pulley", "Pulley", "A wheel carrying a rope to change the direction of a force"],
  ["The inclined plane", "Inclined plane", "A sloping surface reducing the force needed to raise a load"],
  ["The wheel and axle", "Wheel and axle", "A wheel fixed to a shaft that turns with it"],
  ["The wedge", "Wedge", "A triangular tool splitting or lifting by driving in"],
  ["The screw", "Screw (simple machine)", "An inclined plane wound around a cylinder"],
];

const WEATHER = [
  ["A rotating storm over warm tropical oceans", "Tropical cyclone", "A tropical cyclone"], ["A violently rotating column of air touching the ground", "Tornado", "A tornado"],
  ["The boundary between two air masses", "Weather front", "A front"], ["An area of low atmospheric pressure", "Low-pressure area", "A depression"],
  ["An area of high atmospheric pressure", "High-pressure area", "An anticyclone"], ["Water vapour condensing near the ground", "Fog", "Fog"],
  ["Ice pellets falling from thunderstorms", "Hail", "Hail"], ["A warming of the eastern Pacific affecting global weather", "El Niño", "El Niño"],
  ["The instrument measuring atmospheric pressure", "Barometer", "A barometer"], ["The instrument measuring wind speed", "Anemometer", "An anemometer"],
  ["The instrument measuring humidity", "Hygrometer", "A hygrometer"], ["The instrument measuring rainfall", "Rain gauge", "A rain gauge"],
  ["A high thin ice cloud", "Cirrus cloud", "Cirrus"], ["A towering cloud that brings thunderstorms", "Cumulonimbus cloud", "Cumulonimbus"],
  ["A flat grey sheet of low cloud", "Stratus cloud", "Stratus"], ["A heaped fair-weather cloud", "Cumulus cloud", "Cumulus"],
];

const EARTH_STRUCTURE = [
  ["The Earth's outermost solid shell", "Crust (geology)", "The crust"], ["The layer beneath the crust", "Mantle (geology)", "The mantle"],
  ["The Earth's molten outer layer of iron and nickel", "Earth's outer core", "The outer core"], ["The solid innermost part of the Earth", "Earth's inner core", "The inner core"],
  ["The rigid outer shell broken into plates", "Lithosphere", "The lithosphere"], ["The boundary between crust and mantle", "Mohorovičić discontinuity", "The Mohorovičić discontinuity"],
  ["The theory that plates move over the mantle", "Plate tectonics", "Plate tectonics"], ["The place where one plate slides beneath another", "Subduction", "A subduction zone"],
  ["A crack where plates slide past one another", "Transform fault", "A transform fault"], ["A rift where new crust forms on the ocean floor", "Mid-ocean ridge", "A mid-ocean ridge"],
];

const LAB_EQUIPMENT = [
  ["A tall narrow vessel for measuring volume", "Graduated cylinder", "A graduated cylinder"], ["A conical flask used for mixing and titration", "Erlenmeyer flask", "An Erlenmeyer flask"],
  ["A tube with a tap for delivering measured liquid", "Burette", "A burette"], ["A device separating substances by spinning", "Centrifuge", "A centrifuge"],
  ["A gas burner used for heating in laboratories", "Bunsen burner", "A Bunsen burner"], ["A glass dish for growing cultures", "Petri dish", "A Petri dish"],
  ["A vessel for distillation with a long neck", "Retort", "A retort"], ["A tool for measuring small volumes by suction", "Pipette", "A pipette"],
  ["An instrument that separates light into its spectrum", "Spectrometer", "A spectrometer"], ["An instrument magnifying very small objects", "Microscope", "A microscope"],
];

const NUCLEAR = [
  ["The splitting of a heavy nucleus", "Nuclear fission", "Fission"], ["The joining of light nuclei", "Nuclear fusion", "Fusion"],
  ["The time for half a sample to decay", "Half-life", "The half-life"], ["A helium nucleus emitted in decay", "Alpha particle", "An alpha particle"],
  ["A fast electron emitted in decay", "Beta particle", "A beta particle"], ["High-energy electromagnetic radiation from nuclei", "Gamma ray", "A gamma ray"],
  ["Atoms of one element with different neutron counts", "Isotope", "Isotopes"], ["The minimum mass for a sustained chain reaction", "Critical mass", "Critical mass"],
];

const ELECTRICITY = [
  ["The flow of electric charge", "Electric current", "Current"], ["The push driving charge round a circuit", "Voltage", "Voltage"],
  ["Opposition to the flow of current", "Electrical resistance and conductance", "Resistance"], ["A circuit with one path for the current", "Series and parallel circuits", "A series circuit"],
  ["A circuit with more than one path", "Series and parallel circuits", "A parallel circuit"], ["A component that stores charge", "Capacitor", "A capacitor"],
  ["A component that resists current", "Resistor", "A resistor"], ["A component that allows current in one direction", "Diode", "A diode"],
  ["A device that changes voltage in an AC supply", "Transformer", "A transformer"], ["A device turning motion into electric current", "Electric generator", "A generator"],
];

export const SCIENCE3_FAMILIES = [
  {
    category: "Chemistry", levels: [3, 4], facts: MORE_COMPOUNDS,
    forms: [
      { prompt: (compound) => `What is the chemical formula of ${soft(compound)}?`, explain: (compound, formula) => `${compound} has the formula ${formula}.` },
      { reverse: true, prompt: (compound, formula) => `Which compound has the formula ${formula}?`, explain: (compound, formula) => `${formula} is ${soft(compound)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [2, 3], facts: POLYMERS, identify: true,
    forms: [
      { prompt: (polymer) => `What is ${soft(polymer)} chiefly used for?`, explain: (polymer, use) => `${polymer}: ${soft(use)}.` },
    ],
  },
  {
    category: "Physics", levels: [2, 4], facts: FORCES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Technology", levels: [1, 2], facts: MACHINES, identify: true,
    forms: [
      { prompt: (machine) => `How is ${soft(machine)} described?`, explain: (machine, description) => `${machine}: ${soft(description)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [1, 3], facts: WEATHER, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: EARTH_STRUCTURE, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [1, 3], facts: LAB_EQUIPMENT, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [2, 4], facts: NUCLEAR, describe: true,
    forms: [
      { prompt: (definition) => `What is the term for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 3], facts: ELECTRICITY, describe: true,
    forms: [
      { prompt: (definition) => `In electricity, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
];
