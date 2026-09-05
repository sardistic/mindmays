// Further science: chemistry in the world, physics in the sky, and the words for both.
import { soft } from "./case.js";
const ACIDS_AND_BASES = [
  ["A substance that donates protons in solution", "Acid", "An acid"], ["A substance that accepts protons in solution", "Base (chemistry)", "A base"],
  ["A base that dissolves in water", "Alkali", "An alkali"], ["The reaction of an acid with a base", "Neutralization", "Neutralisation"],
  ["The product of an acid reacting with a base", "Salt (chemistry)", "A salt"], ["A solution resisting changes in pH", "Buffer solution", "A buffer"],
  ["A substance that changes colour with pH", "PH indicator", "An indicator"], ["A pH below seven", "PH", "Acidic"],
  ["A pH above seven", "PH", "Alkaline"], ["A pH of exactly seven", "PH", "Neutral"],
];

const REACTIONS = [
  ["A reaction that releases heat", "Exothermic process", "Exothermic"], ["A reaction that absorbs heat", "Endothermic process", "Endothermic"],
  ["A reaction where a substance gains oxygen or loses electrons", "Redox", "Oxidation"], ["A reaction where a substance loses oxygen or gains electrons", "Redox", "Reduction"],
  ["A substance that speeds a reaction without being consumed", "Catalyst", "A catalyst"], ["A reaction with oxygen releasing heat and light", "Combustion", "Combustion"],
  ["The slow oxidation of iron in damp air", "Rust", "Rusting"], ["The breakdown of a compound by an electric current", "Electrolysis", "Electrolysis"],
  ["The joining of small molecules into a long chain", "Polymerization", "Polymerisation"], ["The breakdown of a substance by water", "Hydrolysis", "Hydrolysis"],
  ["A reaction in which two compounds exchange parts", "Salt metathesis reaction", "A double displacement reaction"],
  ["The conversion of sugars to alcohol by yeast", "Fermentation", "Fermentation"],
];

const MIXTURES = [
  ["A mixture with uniform composition throughout", "Homogeneous and heterogeneous mixtures", "A homogeneous mixture"],
  ["A substance dissolved in another", "Solution (chemistry)", "A solution"],
  ["Fine particles suspended in another substance", "Colloid", "A colloid"],
  ["Particles large enough to settle out", "Suspension (chemistry)", "A suspension"],
  ["The separation of components by boiling point", "Distillation", "Distillation"],
  ["The separation of components as they travel through a medium", "Chromatography", "Chromatography"],
  ["The separation of a solid from a liquid through a barrier", "Filtration", "Filtration"],
  ["The separation of dissolved solids by evaporating the liquid", "Evaporation", "Evaporation"],
];

const WAVES = [
  ["The distance between successive wave crests", "Wavelength", "Wavelength"], ["The number of waves passing a point each second", "Frequency", "Frequency"],
  ["The maximum displacement of a wave from rest", "Amplitude", "Amplitude"], ["A wave that vibrates along its direction of travel", "Longitudinal wave", "A longitudinal wave"],
  ["A wave that vibrates across its direction of travel", "Transverse wave", "A transverse wave"], ["Waves adding to make a larger wave", "Wave interference", "Constructive interference"],
  ["Waves cancelling one another", "Wave interference", "Destructive interference"], ["The natural frequency at which an object vibrates strongly", "Resonance", "Resonance"],
  ["The reflection of sound back to its source", "Echo", "An echo"], ["Sound above the range of human hearing", "Ultrasound", "Ultrasound"],
  ["Sound below the range of human hearing", "Infrasound", "Infrasound"],
];

const SPECTRUM = [
  ["The longest electromagnetic waves", "Radio wave", "Radio waves"], ["The waves used in ovens and some communications", "Microwave", "Microwaves"],
  ["The waves felt as heat", "Infrared", "Infrared"], ["The waves the eye can see", "Visible spectrum", "Visible light"],
  ["The waves that cause sunburn", "Ultraviolet", "Ultraviolet"], ["The waves used to image bones", "X-ray", "X-rays"],
  ["The shortest and most energetic electromagnetic waves", "Gamma ray", "Gamma rays"],
];

const MOTION = [
  ["The rate of change of position", "Velocity", "Velocity"], ["The rate of change of velocity", "Acceleration", "Acceleration"],
  ["The product of mass and velocity", "Momentum", "Momentum"], ["The product of force and distance moved", "Work (physics)", "Work"],
  ["The rate of doing work", "Power (physics)", "Power"], ["A push or pull acting on a body", "Force", "Force"],
  ["The force of gravity acting on a mass", "Weight", "Weight"], ["The amount of matter in a body", "Mass", "Mass"],
  ["Mass divided by volume", "Density", "Density"], ["Force divided by area", "Pressure", "Pressure"],
];

const CLIMATE_SCIENCE = [
  ["The trapping of heat by atmospheric gases", "Greenhouse effect", "The greenhouse effect"],
  ["The long-term shift in global temperature and weather", "Climate change", "Climate change"],
  ["The layer of gas protecting Earth from ultraviolet light", "Ozone layer", "The ozone layer"],
  ["The lowering of ocean pH by absorbed carbon dioxide", "Ocean acidification", "Ocean acidification"],
  ["The cycle by which water moves through the environment", "Water cycle", "The water cycle"],
  ["The cycle by which carbon moves between air, land and sea", "Carbon cycle", "The carbon cycle"],
  ["The clearing of forest for other uses", "Deforestation", "Deforestation"],
  ["Energy from sources that are naturally replenished", "Renewable energy", "Renewable energy"],
  ["The proportion of sunlight a surface reflects", "Albedo", "Albedo"],
  ["The gradual spread of desert conditions", "Desertification", "Desertification"],
];

const SCIENTIFIC_METHOD = [
  ["A proposed explanation that can be tested", "Hypothesis", "A hypothesis"],
  ["A well-tested explanation supported by much evidence", "Theory", "A theory"],
  ["A statement describing a consistent natural relationship", "Scientific law", "A law"],
  ["The factor deliberately changed in an experiment", "Dependent and independent variables", "The independent variable"],
  ["The factor measured as a result", "Dependent and independent variables", "The dependent variable"],
  ["A comparison group left untreated", "Scientific control", "A control"],
  ["The review of research by other specialists", "Peer review", "Peer review"],
  ["A study where neither subject nor researcher knows the assignment", "Blinded experiment", "A double-blind study"],
  ["The repeating of an experiment to confirm results", "Reproducibility", "Reproducibility"],
];

const GREAT_EXPERIMENTS = [
  ["The double-slit experiment", "Double-slit experiment", "The wave nature of light and matter"],
  ["The Michelson-Morley experiment", "Michelson–Morley experiment", "The absence of a luminiferous aether"],
  ["Rutherford's gold foil experiment", "Geiger–Marsden experiments", "The existence of the atomic nucleus"],
  ["Millikan's oil drop experiment", "Oil drop experiment", "The charge of the electron"],
  ["The Miller-Urey experiment", "Miller–Urey experiment", "That amino acids can form from simple gases"],
  ["Pavlov's dogs", "Classical conditioning", "Learning by association"],
  ["Mendel's pea plants", "Gregor Mendel", "The laws of inheritance"],
  ["The Cavendish experiment", "Cavendish experiment", "The density of the Earth and the gravitational constant"],
];

export const SCIENCE4_FAMILIES = [
  {
    category: "Chemistry", levels: [1, 3], facts: ACIDS_AND_BASES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [2, 4], facts: REACTIONS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Chemistry", levels: [2, 3], facts: MIXTURES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [2, 4], facts: WAVES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 3], facts: SPECTRUM,
    forms: [
      { prompt: (definition) => `Which part of the electromagnetic spectrum is ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 3], facts: MOTION, describe: true,
    forms: [
      { prompt: (definition) => `In physics, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [1, 3], facts: CLIMATE_SCIENCE, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Science", levels: [1, 3], facts: SCIENTIFIC_METHOD, describe: true,
    forms: [
      { prompt: (definition) => `In science, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Physics", levels: [3, 4], facts: GREAT_EXPERIMENTS,
    forms: [
      { prompt: (experiment) => `What did ${experiment.replace("The ", "the ")} establish?`, explain: (experiment, finding) => `${experiment} established ${soft(finding)}.` },
      { reverse: true, prompt: (experiment, finding) => `Which experiment established ${soft(finding)}?`, explain: (experiment, finding) => `That was ${soft(experiment)}.` },
    ],
  },
];
