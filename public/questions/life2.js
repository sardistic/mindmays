// More life science: muscles and senses, prehistoric animals, plants, genetics and ecology.
import { soft } from "./case.js";
const MUSCLES = [
  ["The biceps brachii", "Biceps", "Upper arm"], ["The triceps brachii", "Triceps", "Upper arm"], ["The deltoid", "Deltoid muscle", "Shoulder"],
  ["The trapezius", "Trapezius muscle", "Upper back"], ["The latissimus dorsi", "Latissimus dorsi muscle", "Back"], ["The pectoralis major", "Pectoralis major muscle", "Chest"],
  ["The rectus abdominis", "Rectus abdominis muscle", "Abdomen"], ["The gluteus maximus", "Gluteus maximus muscle", "Buttock"],
  ["The quadriceps", "Quadriceps", "Front of the thigh"], ["The hamstrings", "Hamstring", "Back of the thigh"],
  ["The gastrocnemius", "Gastrocnemius muscle", "Calf"], ["The soleus", "Soleus muscle", "Calf"], ["The masseter", "Masseter muscle", "Jaw"],
  ["The diaphragm", "Thoracic diaphragm", "Below the lungs"], ["The sartorius", "Sartorius muscle", "Thigh"], ["The orbicularis oculi", "Orbicularis oculi muscle", "Around the eye"],
];

const SENSES = [
  ["The retina", "Retina", "Vision"], ["The cochlea", "Cochlea", "Hearing"], ["The olfactory bulb", "Olfactory bulb", "Smell"],
  ["The taste buds", "Taste bud", "Taste"], ["The semicircular canals", "Vestibular system", "Balance"], ["The cornea", "Cornea", "Vision"],
  ["The eardrum", "Eardrum", "Hearing"], ["The iris", "Iris (anatomy)", "Vision"],
];

const BRAIN_PARTS = [
  ["The cerebellum", "Cerebellum", "Coordinating movement and balance"], ["The hippocampus", "Hippocampus", "Forming new memories"],
  ["The amygdala", "Amygdala", "Processing fear and emotion"], ["The hypothalamus", "Hypothalamus", "Regulating hunger, thirst and temperature"],
  ["The medulla oblongata", "Medulla oblongata", "Controlling breathing and heart rate"], ["The corpus callosum", "Corpus callosum", "Joining the two hemispheres"],
  ["The occipital lobe", "Occipital lobe", "Processing vision"], ["The frontal lobe", "Frontal lobe", "Planning and judgement"],
  ["The temporal lobe", "Temporal lobe", "Processing hearing and language"], ["Broca's area", "Broca's area", "Producing speech"],
  ["Wernicke's area", "Wernicke's area", "Understanding language"], ["The thalamus", "Thalamus", "Relaying sensory signals"],
];

const DINOSAURS = [
  ["Tyrannosaurus rex", "Tyrannosaurus", "Cretaceous"], ["Triceratops", "Triceratops", "Cretaceous"], ["Velociraptor", "Velociraptor", "Cretaceous"],
  ["Stegosaurus", "Stegosaurus", "Jurassic"], ["Brachiosaurus", "Brachiosaurus", "Jurassic"], ["Diplodocus", "Diplodocus", "Jurassic"],
  ["Allosaurus", "Allosaurus", "Jurassic"], ["Ankylosaurus", "Ankylosaurus", "Cretaceous"], ["Spinosaurus", "Spinosaurus", "Cretaceous"],
  ["Iguanodon", "Iguanodon", "Cretaceous"], ["Archaeopteryx", "Archaeopteryx", "Jurassic"], ["Plateosaurus", "Plateosaurus", "Triassic"],
  ["Coelophysis", "Coelophysis", "Triassic"], ["Parasaurolophus", "Parasaurolophus", "Cretaceous"],
];

const PREHISTORIC = [
  ["The woolly mammoth", "Woolly mammoth", "An ice-age elephant relative"], ["The sabre-toothed cat", "Smilodon", "A big cat with elongated canines"],
  ["The pterosaur", "Pterosaur", "A flying reptile, not a dinosaur"], ["The plesiosaur", "Plesiosauria", "A long-necked marine reptile"],
  ["The trilobite", "Trilobite", "An extinct marine arthropod"], ["The ammonite", "Ammonoidea", "An extinct coiled-shelled mollusc"],
  ["The dodo", "Dodo", "A flightless bird of Mauritius hunted to extinction"], ["The megalodon", "Otodus megalodon", "An enormous extinct shark"],
];

const TREES = [
  ["The oak", "Oak", "Acorn"], ["The horse chestnut", "Aesculus hippocastanum", "Conker"], ["The pine", "Pine", "Cone"],
  ["The willow", "Willow", "Catkin"], ["The maple", "Maple", "Samara"], ["The beech", "Beech", "Beech nut"],
  ["The hazel", "Hazel", "Hazelnut"], ["The ash", "Fraxinus", "Key"],
];

const PLANT_TYPES = [
  ["A plant that lives for one growing season", "Annual plant", "An annual"], ["A plant that lives more than two years", "Perennial plant", "A perennial"],
  ["A plant that completes its cycle in two years", "Biennial plant", "A biennial"], ["A plant that keeps its leaves all year", "Evergreen", "An evergreen"],
  ["A plant that sheds its leaves seasonally", "Deciduous", "A deciduous plant"], ["A plant that reproduces by spores rather than seeds", "Fern", "A fern"],
  ["A cone-bearing seed plant", "Conifer", "A conifer"], ["A flowering seed plant", "Flowering plant", "An angiosperm"],
];

const GENETICS = [
  ["The molecule carrying hereditary information", "DNA", "DNA"], ["The sugar in RNA", "Ribose", "Ribose"],
  ["A section of DNA coding for a trait", "Gene", "A gene"], ["The full genetic complement of an organism", "Genome", "The genome"],
  ["An alternative form of a gene", "Allele", "An allele"], ["The observable characteristics of an organism", "Phenotype", "The phenotype"],
  ["The genetic makeup of an organism", "Genotype", "The genotype"], ["A change in the DNA sequence", "Mutation", "A mutation"],
  ["The structure carrying genes in the nucleus", "Chromosome", "A chromosome"], ["The process copying DNA into RNA", "Transcription (biology)", "Transcription"],
  ["The process building protein from RNA", "Translation (biology)", "Translation"], ["Cell division producing two identical cells", "Mitosis", "Mitosis"],
  ["Cell division producing gametes", "Meiosis", "Meiosis"], ["The monk who described inheritance in pea plants", "Gregor Mendel", "Gregor Mendel"],
];

const ECOLOGY = [
  ["An organism that makes its own food", "Autotroph", "A producer"], ["An organism that eats plants only", "Herbivore", "A herbivore"],
  ["An organism that eats animals only", "Carnivore", "A carnivore"], ["An organism that eats both", "Omnivore", "An omnivore"],
  ["An organism that breaks down dead matter", "Decomposer", "A decomposer"], ["A relationship benefiting both partners", "Mutualism (biology)", "Mutualism"],
  ["A relationship where one benefits and the other is unharmed", "Commensalism", "Commensalism"], ["A relationship where one benefits at the other's cost", "Parasitism", "Parasitism"],
  ["The role a species plays in its habitat", "Ecological niche", "Its niche"], ["A community of organisms and their environment", "Ecosystem", "An ecosystem"],
  ["The largest ecological area defined by climate and life", "Biome", "A biome"], ["The variety of life in a place", "Biodiversity", "Biodiversity"],
];

const BIRDS = [
  ["The ostrich", "Common ostrich", "The largest living bird"], ["The peregrine falcon", "Peregrine falcon", "The fastest animal in a dive"],
  ["The bee hummingbird", "Bee hummingbird", "The smallest living bird"], ["The albatross", "Albatross", "The largest wingspan of any living bird"],
  ["The kiwi", "Kiwi (bird)", "A flightless bird of New Zealand"], ["The emperor penguin", "Emperor penguin", "The tallest and heaviest penguin"],
  ["The arctic tern", "Arctic tern", "The longest annual migration of any animal"], ["The kakapo", "Kākāpō", "A flightless nocturnal parrot"],
];

export const LIFE2_FAMILIES = [
  {
    category: "Life Science", levels: [2, 4], facts: MUSCLES,
    forms: [
      { prompt: (muscle) => `Where is ${soft(muscle)} found?`, explain: (muscle, place) => `${muscle} lies in the ${soft(place)}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 3], facts: SENSES,
    forms: [
      { prompt: (organ) => `Which sense does ${soft(organ)} serve?`, explain: (organ, sense) => `${organ} serves ${soft(sense)}.` },
    ],
  },
  {
    category: "Life Science", levels: [2, 4], facts: BRAIN_PARTS,
    forms: [
      { prompt: (part) => `What is ${soft(part)} chiefly responsible for?`, explain: (part, role) => `${part}: ${soft(role)}.` },
      { reverse: true, prompt: (part, role) => `Which part of the brain is chiefly responsible for ${soft(role)}?`, explain: (part, role) => `That is ${soft(part)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: DINOSAURS,
    forms: [
      { prompt: (dinosaur) => `In which period did ${dinosaur} live?`, explain: (dinosaur, period) => `${dinosaur} lived in the ${period}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: PREHISTORIC, identify: true,
    forms: [
      { prompt: (creature) => `What was ${creature.replace("The ", "the ")}?`, explain: (creature, description) => `${creature}: ${soft(description)}.` },
    ],
  },
  {
    category: "Biology", levels: [2, 4], facts: TREES,
    forms: [
      { prompt: (tree) => `What is the fruit or seed of ${soft(tree)} called?`, explain: (tree, seed) => `${tree} bears the ${soft(seed)}.` },
      { reverse: true, prompt: (tree, seed) => `Which tree bears the ${soft(seed)}?`, explain: (tree, seed) => `That is ${soft(tree)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: PLANT_TYPES, describe: true,
    forms: [
      { prompt: (definition) => `What is the term for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Genetics", levels: [1, 4], facts: GENETICS, describe: true,
    forms: [
      { prompt: (definition) => `What is the term for ${soft(definition)}?`, explain: (definition, term) => `That is ${term}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: ECOLOGY, describe: true,
    forms: [
      { prompt: (definition) => `In ecology, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Biology", levels: [2, 3], facts: BIRDS,
    forms: [
      { prompt: (bird) => `What distinguishes ${bird.replace("The ", "the ")}?`, explain: (bird, claim) => `${bird}: ${soft(claim)}.` },
      { reverse: true, prompt: (bird, claim) => `Which bird holds this distinction: ${soft(claim)}?`, explain: (bird, claim) => `That is ${soft(bird)}.` },
    ],
  },
];
