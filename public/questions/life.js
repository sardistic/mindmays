// Life science: anatomy, taxonomy, physiology and the naming of living things.
import { soft } from "./case.js";
const BINOMIALS = [
  ["The domestic dog", "Dog", "Canis familiaris"], ["The domestic cat", "Cat", "Felis catus"], ["The lion", "Lion", "Panthera leo"], ["The tiger", "Tiger", "Panthera tigris"],
  ["The leopard", "Leopard", "Panthera pardus"], ["The jaguar", "Jaguar", "Panthera onca"], ["The grey wolf", "Wolf", "Canis lupus"], ["The red fox", "Red fox", "Vulpes vulpes"],
  ["The brown bear", "Brown bear", "Ursus arctos"], ["The polar bear", "Polar bear", "Ursus maritimus"], ["The giant panda", "Giant panda", "Ailuropoda melanoleuca"], ["The horse", "Horse", "Equus caballus"],
  ["The domestic cattle", "Cattle", "Bos taurus"], ["The domestic pig", "Pig", "Sus domesticus"], ["The domestic sheep", "Sheep", "Ovis aries"], ["The domestic goat", "Goat", "Capra hircus"],
  ["The African bush elephant", "African bush elephant", "Loxodonta africana"], ["The Asian elephant", "Asian elephant", "Elephas maximus"], ["The giraffe", "Giraffe", "Giraffa camelopardalis"], ["The hippopotamus", "Hippopotamus", "Hippopotamus amphibius"],
  ["The blue whale", "Blue whale", "Balaenoptera musculus"], ["The killer whale", "Orca", "Orcinus orca"], ["The chimpanzee", "Chimpanzee", "Pan troglodytes"], ["The gorilla", "Western gorilla", "Gorilla gorilla"],
  ["The human", "Human", "Homo sapiens"], ["The house mouse", "House mouse", "Mus musculus"], ["The brown rat", "Brown rat", "Rattus norvegicus"], ["The European rabbit", "European rabbit", "Oryctolagus cuniculus"],
  ["The honey bee", "Western honey bee", "Apis mellifera"], ["The fruit fly of genetics", "Drosophila melanogaster", "Drosophila melanogaster"], ["The domestic chicken", "Chicken", "Gallus gallus domesticus"], ["The mallard", "Mallard", "Anas platyrhynchos"],
  ["The common raven", "Common raven", "Corvus corax"], ["The barn owl", "Barn owl", "Tyto alba"], ["The peregrine falcon", "Peregrine falcon", "Falco peregrinus"], ["The emperor penguin", "Emperor penguin", "Aptenodytes forsteri"],
  ["Baker's yeast", "Saccharomyces cerevisiae", "Saccharomyces cerevisiae"], ["The gut bacterium of the laboratory", "Escherichia coli", "Escherichia coli"], ["The thale cress of plant genetics", "Arabidopsis thaliana", "Arabidopsis thaliana"], ["The nematode of developmental biology", "Caenorhabditis elegans", "Caenorhabditis elegans"],
  ["Bread wheat", "Common wheat", "Triticum aestivum"], ["Rice", "Rice", "Oryza sativa"], ["Maize", "Maize", "Zea mays"], ["The potato", "Potato", "Solanum tuberosum"],
  ["The tomato", "Tomato", "Solanum lycopersicum"], ["The olive", "Olive", "Olea europaea"], ["The grape vine", "Vitis vinifera", "Vitis vinifera"], ["The apple", "Apple", "Malus domestica"],
];

const BONES = [
  ["The femur", "Femur", "Thigh"], ["The tibia", "Tibia", "Lower leg"], ["The fibula", "Fibula", "Lower leg"], ["The humerus", "Humerus", "Upper arm"],
  ["The radius", "Radius (bone)", "Forearm"], ["The ulna", "Ulna", "Forearm"], ["The clavicle", "Clavicle", "Shoulder"], ["The scapula", "Scapula", "Shoulder"],
  ["The sternum", "Sternum", "Chest"], ["The patella", "Patella", "Knee"], ["The mandible", "Mandible", "Jaw"], ["The maxilla", "Maxilla", "Face"],
  ["The sacrum", "Sacrum", "Pelvis"], ["The coccyx", "Coccyx", "The final segment of the vertebral column"], ["The calcaneus", "Calcaneus", "Foot"], ["The talus", "Talus bone", "Ankle"],
  ["The stapes", "Stapes", "Middle ear"], ["The incus", "Incus", "Middle ear"], ["The malleus", "Malleus", "Middle ear"], ["The hyoid", "Hyoid bone", "Neck"],
  ["The atlas", "Atlas (anatomy)", "Neck"], ["The axis", "Axis (anatomy)", "Neck"], ["The ilium", "Ilium (bone)", "Pelvis"], ["The occipital bone", "Occipital bone", "Skull"],
  ["The frontal bone", "Frontal bone", "Skull"], ["The parietal bone", "Parietal bone", "Skull"], ["The temporal bone", "Temporal bone", "Skull"], ["The metacarpals", "Metacarpal bones", "Hand"],
  ["The metatarsals", "Metatarsal bones", "Foot"], ["The phalanges", "Phalanx bone", "Fingers and toes"],
];

const ORGAN_SYSTEMS = [
  ["The heart", "Heart", "Circulatory system"], ["The lungs", "Lung", "Respiratory system"], ["The stomach", "Stomach", "Digestive system"], ["The liver", "Liver", "Digestive system"],
  ["The kidneys", "Kidney", "Urinary system"], ["The brain", "Brain", "Nervous system"], ["The spinal cord", "Spinal cord", "Nervous system"], ["The pancreas", "Pancreas", "Endocrine system"],
  ["The thyroid", "Thyroid", "Endocrine system"], ["The spleen", "Spleen", "Lymphatic system"], ["The skin", "Human skin", "Integumentary system"], ["The bladder", "Urinary bladder", "Urinary system"],
  ["The small intestine", "Small intestine", "Digestive system"], ["The trachea", "Trachea", "Respiratory system"], ["The pituitary gland", "Pituitary gland", "Endocrine system"], ["The thymus", "Thymus", "Lymphatic system"],
];

const HORMONES = [
  ["Insulin", "Insulin", "Pancreas"], ["Thyroxine", "Thyroid hormones", "Thyroid"], ["Adrenaline", "Adrenaline", "Adrenal gland"], ["Cortisol", "Cortisol", "Adrenal gland"],
  ["Melatonin", "Melatonin", "Pineal gland"], ["Oxytocin", "Oxytocin", "Pituitary gland"], ["Testosterone", "Testosterone", "Testicle"], ["Oestrogen", "Estrogen", "Ovary"],
  ["Growth hormone", "Growth hormone", "Pituitary gland"], ["Glucagon", "Glucagon", "Pancreas"],
];

const CELL_PARTS = [
  ["The mitochondrion", "Mitochondrion", "Producing ATP"], ["The ribosome", "Ribosome", "Building proteins"], ["The chloroplast", "Chloroplast", "Photosynthesis"], ["The nucleus", "Cell nucleus", "Holding the DNA"],
  ["The Golgi apparatus", "Golgi apparatus", "Packaging proteins"], ["The lysosome", "Lysosome", "Breaking down waste"], ["The cell membrane", "Cell membrane", "Controlling what enters the cell"], ["The vacuole", "Vacuole", "Storing water and solutes"],
  ["The endoplasmic reticulum", "Endoplasmic reticulum", "Synthesising and transporting molecules"], ["The cytoskeleton", "Cytoskeleton", "Giving the cell its shape"],
];

const TAXONOMY_CLASSES = [
  ["The frog", "Frog", "Amphibian"], ["The salamander", "Salamander", "Amphibian"], ["The newt", "Newt", "Amphibian"], ["The crocodile", "Crocodile", "Reptile"],
  ["The tortoise", "Tortoise", "Reptile"], ["The chameleon", "Chameleon", "Reptile"], ["The platypus", "Platypus", "Mammal"], ["The kangaroo", "Kangaroo", "Mammal"],
  ["The bat", "Bat", "Mammal"], ["The dolphin", "Dolphin", "Mammal"], ["The shark", "Shark", "Fish"], ["The seahorse", "Seahorse", "Fish"],
  ["The octopus", "Octopus", "Mollusc"], ["The snail", "Snail", "Mollusc"], ["The squid", "Squid", "Mollusc"], ["The lobster", "Lobster", "Crustacean"],
  ["The barnacle", "Barnacle", "Crustacean"], ["The spider", "Spider", "Arachnid"], ["The scorpion", "Scorpion", "Arachnid"], ["The dragonfly", "Dragonfly", "Insect"],
  ["The beetle", "Beetle", "Insect"], ["The starfish", "Starfish", "Echinoderm"], ["The sea urchin", "Sea urchin", "Echinoderm"], ["The earthworm", "Earthworm", "Annelid"],
];

const ANIMAL_GROUPS = [
  ["Lions", "Lion", "Pride"], ["Wolves", "Wolf", "Pack"], ["Crows", "Crow", "Murder"], ["Geese on the ground", "Goose", "Gaggle"],
  ["Fish", "Shoaling and schooling", "School"], ["Whales", "Whale", "Pod"], ["Ants", "Ant", "Colony"], ["Bees", "Beehive", "Hive"],
];

const DISEASES = [
  ["Tuberculosis", "Tuberculosis", "Bacteria"], ["Malaria", "Malaria", "Protozoan parasite"], ["Influenza", "Influenza", "Virus"], ["Measles", "Measles", "Virus"],
  ["Cholera", "Cholera", "Bacteria"], ["Athlete's foot", "Athlete's foot", "Fungus"], ["Rabies", "Rabies", "Virus"], ["Tetanus", "Tetanus", "Bacteria"],
  ["Ringworm", "Dermatophytosis", "Fungus"], ["Typhoid fever", "Typhoid fever", "Bacteria"], ["Poliomyelitis", "Polio", "Virus"], ["Sleeping sickness", "African trypanosomiasis", "Protozoan parasite"],
];

const VITAMINS = [
  ["Vitamin C", "Vitamin C", "Scurvy"], ["Vitamin D", "Vitamin D", "Rickets"], ["Vitamin B1", "Thiamine", "Beriberi"], ["Vitamin B3", "Niacin", "Pellagra"],
  ["Vitamin A", "Vitamin A", "Night blindness"], ["Vitamin B12", "Vitamin B12", "Pernicious anaemia"], ["Iodine", "Iodine deficiency", "Goitre"], ["Iron", "Iron-deficiency anemia", "Anaemia"],
];

const BLOOD = [
  ["Red blood cells", "Red blood cell", "Carrying oxygen"], ["White blood cells", "White blood cell", "Fighting infection"], ["Platelets", "Platelet", "Clotting"], ["Plasma", "Blood plasma", "Carrying cells and dissolved substances"],
  ["Haemoglobin", "Hemoglobin", "Binding oxygen in red cells"],
];

const PLANT_PARTS = [
  ["The root", "Root", "Anchoring the plant and absorbing water"], ["The stem", "Plant stem", "Supporting the plant and carrying sap"], ["The leaf", "Leaf", "Photosynthesis"],
  ["Xylem", "Xylem", "Carrying water upward"], ["Phloem", "Phloem", "Carrying sugars around the plant"], ["The stamen", "Stamen", "The male reproductive organ of a flower"],
  ["The pistil", "Gynoecium", "The female reproductive organ of a flower"], ["The stoma", "Stoma", "Allowing gas exchange"],
];

export const LIFE_FAMILIES = [
  {
    category: "Biology", levels: [2, 4], facts: BINOMIALS,
    forms: [
      { prompt: (creature) => `What is the binomial name of ${soft(creature)}?`, explain: (creature, name) => `${creature} is ${name}.` },
      { reverse: true, prompt: (creature, name) => `${name} is the binomial name of what?`, explain: (creature, name) => `${name} is ${soft(creature)}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 3], facts: BONES,
    forms: [
      { prompt: (bone) => `Where in the body is ${soft(bone)} found?`, explain: (bone, place) => `${bone} is found in the ${soft(place)}.` },
      { reverse: true, prompt: (bone, place) => `Which of these bones is found in the ${soft(place)}?`, explain: (bone, place) => `${bone} is found in the ${soft(place)}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 2], facts: ORGAN_SYSTEMS,
    forms: [
      { prompt: (organ) => `To which body system does ${soft(organ)} belong?`, explain: (organ, system) => `${organ} belongs to the ${soft(system)}.` },
    ],
  },
  {
    category: "Life Science", levels: [3, 4], facts: HORMONES,
    forms: [
      { prompt: (hormone) => `Which gland or organ produces ${soft(hormone)}?`, explain: (hormone, gland) => `${hormone} is produced by the ${soft(gland)}.` },
      { reverse: true, prompt: (hormone, gland) => `Which of these hormones is produced by the ${soft(gland)}?`, explain: (hormone, gland) => `${hormone} is produced by the ${soft(gland)}.` },
    ],
  },
  {
    category: "Life Science", levels: [2, 3], facts: CELL_PARTS, identify: true,
    forms: [
      { prompt: (part) => `What is the chief role of ${soft(part)} in a cell?`, explain: (part, role) => `${part}: ${soft(role)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 2], facts: TAXONOMY_CLASSES,
    forms: [
      { prompt: (animal) => `${animal} belongs to which group of animals?`, explain: (animal, group) => `${animal} is ${/^[aeiou]/i.test(group) ? "an" : "a"} ${soft(group)}.` },
    ],
  },
  {
    category: "Biology", levels: [2, 4], facts: ANIMAL_GROUPS,
    forms: [
      { prompt: (animal) => `What is a group of ${soft(animal)} called?`, explain: (animal, term) => `A group of ${soft(animal)} is called a ${soft(term)}.` },
    ],
  },
  {
    category: "Life Science", levels: [2, 4], facts: DISEASES,
    forms: [
      { prompt: (disease) => `What kind of organism causes ${soft(disease)}?`, explain: (disease, cause) => `${disease} is caused by ${/^[aeiou]/i.test(cause) ? "an" : "a"} ${soft(cause)}.` },
    ],
  },
  {
    category: "Life Science", levels: [2, 4], facts: VITAMINS,
    forms: [
      { prompt: (nutrient) => `A deficiency of ${nutrient.replace("Vitamin ", "vitamin ")} causes which condition?`, explain: (nutrient, illness) => `Lack of ${nutrient.replace("Vitamin ", "vitamin ")} causes ${soft(illness)}.` },
      { reverse: true, prompt: (nutrient, illness) => `${illness} is caused by a deficiency of what?`, explain: (nutrient, illness) => `${illness} follows a deficiency of ${nutrient.replace("Vitamin ", "vitamin ")}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 2], facts: BLOOD, identify: true,
    forms: [
      { prompt: (component) => `What is the chief role of ${soft(component)}?`, explain: (component, role) => `${component}: ${soft(role)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: PLANT_PARTS, identify: true,
    forms: [
      { prompt: (part) => `What does ${soft(part)} of a plant do?`, explain: (part, role) => `${part}: ${soft(role)}.` },
    ],
  },
];
