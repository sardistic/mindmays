// The living world: what animals are called, where they live and what they do.
import { soft } from "./case.js";
const ANIMAL_YOUNG = [
  ["A cat", "Kitten", "Kitten"], ["A dog", "Puppy", "Puppy"], ["A horse", "Foal", "Foal"], ["A cow", "Calf", "Calf"],
  ["A sheep", "Lamb", "Lamb"], ["A goat", "Goat", "Kid"], ["A pig", "Piglet", "Piglet"], ["A deer", "Fawn", "Fawn"],
  ["A swan", "Cygnet", "Cygnet"], ["A goose", "Gosling", "Gosling"], ["A duck", "Duckling", "Duckling"], ["An eagle", "Eaglet", "Eaglet"],
  ["A frog", "Tadpole", "Tadpole"], ["A butterfly", "Caterpillar", "Caterpillar"], ["A kangaroo", "Kangaroo", "Joey"], ["A seal", "Pinniped", "Pup"],
];

const ANIMAL_HABITATS = [
  ["The polar bear", "Polar bear", "The Arctic"], ["The penguin", "Penguin", "The Southern Hemisphere"], ["The camel", "Camel", "Deserts"],
  ["The koala", "Koala", "Australia"], ["The lemur", "Lemur", "Madagascar"], ["The llama", "Llama", "The Andes"],
  ["The bison", "Bison", "North America and Europe"], ["The reindeer", "Reindeer", "The Arctic tundra"], ["The orangutan", "Orangutan", "Borneo and Sumatra"],
  ["The tapir", "Tapir", "Central and South America and Southeast Asia"], ["The wombat", "Wombat", "Australia"], ["The armadillo", "Armadillo", "The Americas"],
  ["The meerkat", "Meerkat", "Southern Africa"], ["The okapi", "Okapi", "The Congo"], ["The snow leopard", "Snow leopard", "The mountains of Central Asia"],
  ["The manatee", "Manatee", "Warm coastal waters"], ["The narwhal", "Narwhal", "The Arctic"], ["The platypus", "Platypus", "Eastern Australia"],
];

const ANIMAL_TRAITS = [
  ["The cheetah", "Cheetah", "The fastest land animal"], ["The giraffe", "Giraffe", "The tallest living land animal"],
  ["The blue whale", "Blue whale", "The largest animal ever known"], ["The African bush elephant", "African bush elephant", "The largest living land animal"],
  ["The sloth", "Sloth", "Among the slowest of mammals"], ["The chameleon", "Chameleon", "Able to change colour and move its eyes independently"],
  ["The octopus", "Octopus", "Having three hearts and blue blood"], ["The starfish", "Starfish", "Able to regenerate lost arms"],
  ["The axolotl", "Axolotl", "Retaining larval features into adulthood"], ["The tardigrade", "Tardigrade", "Surviving extremes by entering cryptobiosis"],
  ["The honey badger", "Honey badger", "Noted for its ferocity and thick skin"], ["The mantis shrimp", "Mantis shrimp", "Striking with extraordinary speed and force"],
  ["The archerfish", "Archerfish", "Shooting jets of water to knock down prey"], ["The electric eel", "Electric eel", "Generating strong electric discharges"],
  ["The pistol shrimp", "Alpheidae", "Snapping a claw loudly enough to stun prey"], ["The bowerbird", "Bowerbird", "Building decorated structures to attract mates"],
];

const ANIMAL_SOUNDS = [
  ["A wolf", "Wolf", "Howl"], ["A lion", "Lion", "Roar"], ["A horse", "Horse", "Neigh"], ["A donkey", "Donkey", "Bray"],
  ["A frog", "Frog", "Croak"], ["A crow", "Crow", "Caw"], ["A duck", "Duck", "Quack"], ["A snake", "Snake", "Hiss"],
  ["A bee", "Bee", "Buzz"], ["A cricket", "Cricket (insect)", "Chirp"],
];

const MIGRATIONS = [
  ["The arctic tern", "Arctic tern", "Pole to pole each year"], ["The monarch butterfly", "Monarch butterfly", "From North America to central Mexico"],
  ["The wildebeest", "Wildebeest", "In a great circuit of the Serengeti"], ["The Atlantic salmon", "Atlantic salmon", "From the sea back to its natal river"],
  ["The European eel", "European eel", "From European rivers to the Sargasso Sea"], ["The humpback whale", "Humpback whale", "Between polar feeding and tropical breeding grounds"],
];

const INSECTS = [
  ["The dragonfly", "Dragonfly", "Odonata"], ["The butterfly", "Butterfly", "Lepidoptera"], ["The beetle", "Beetle", "Coleoptera"],
  ["The ant", "Ant", "Hymenoptera"], ["The bee", "Bee", "Hymenoptera"], ["The fly", "Fly", "Diptera"],
  ["The grasshopper", "Grasshopper", "Orthoptera"], ["The termite", "Termite", "Blattodea"], ["The cockroach", "Cockroach", "Blattodea"],
  ["The flea", "Flea", "Siphonaptera"],
];

const VENOMOUS = [
  ["The box jellyfish", "Box jellyfish", "Among the most venomous marine animals"], ["The inland taipan", "Inland taipan", "The most venomous land snake by toxicity"],
  ["The blue-ringed octopus", "Blue-ringed octopus", "Carrying tetrodotoxin"], ["The stonefish", "Synanceia", "The most venomous known fish"],
  ["The Brazilian wandering spider", "Phoneutria", "Among the most venomous spiders"], ["The cone snail", "Conus", "Hunting with a venomous harpoon"],
  ["The poison dart frog", "Poison dart frog", "Carrying toxins in its skin"], ["The platypus", "Platypus", "A venomous spur on the male's hind leg"],
];

const TREE_FACTS = [
  ["The giant sequoia", "Sequoiadendron giganteum", "The largest tree by volume"], ["The coast redwood", "Sequoia sempervirens", "The tallest tree species"],
  ["The bristlecone pine", "Pinus longaeva", "Among the longest-lived trees"], ["The baobab", "Adansonia", "A swollen-trunked tree of Africa and Madagascar"],
  ["The banyan", "Ficus benghalensis", "Spreading by aerial roots into many trunks"], ["The mangrove", "Mangrove", "A salt-tolerant coastal tree"],
  ["The eucalyptus", "Eucalyptus", "The chief food of the koala"], ["The bamboo", "Bamboo", "A giant grass, not a tree"],
];

const CONSERVATION = [
  ["Extinct", "Extinct", "No individuals remain"], ["Extinct in the wild", "Extinct in the wild", "Surviving only in captivity"],
  ["Critically endangered", "Critically endangered", "At extremely high risk of extinction"], ["Endangered", "Endangered species", "At high risk of extinction"],
  ["Vulnerable", "Vulnerable species", "At risk of becoming endangered"], ["Least concern", "Least-concern species", "Widespread and abundant"],
];

const MARINE = [
  ["The whale shark", "Whale shark", "The largest living fish"], ["The giant squid", "Giant squid", "Bearing the largest eyes of any animal"],
  ["The coelacanth", "Coelacanth", "A fish long thought extinct"], ["Coral", "Coral", "An animal building reefs from calcium carbonate"],
  ["Krill", "Krill", "Small crustaceans at the base of the polar food web"], ["Plankton", "Plankton", "Drifting organisms carried by currents"],
  ["The anglerfish", "Anglerfish", "Luring prey with a bioluminescent appendage"], ["The nautilus", "Nautilus", "A cephalopod in a chambered shell"],
];

export const NATURE_FAMILIES = [
  {
    category: "Biology", levels: [1, 2], facts: ANIMAL_YOUNG,
    forms: [
      { prompt: (animal) => `What is the young of ${soft(animal)} called?`, explain: (animal, young) => `${animal}'s young is a ${soft(young)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: ANIMAL_HABITATS,
    forms: [
      { prompt: (animal) => `Where does ${soft(animal)} live?`, explain: (animal, place) => `${animal} lives in ${soft(place)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: ANIMAL_TRAITS,
    forms: [
      { prompt: (animal) => `What distinguishes ${soft(animal)}?`, explain: (animal, trait) => `${animal}: ${soft(trait)}.` },
      { reverse: true, prompt: (animal, trait) => `Which animal is described as ${soft(trait)}?`, explain: (animal, trait) => `That is ${soft(animal)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 2], facts: ANIMAL_SOUNDS,
    forms: [
      { prompt: (animal) => `What sound does ${soft(animal)} make?`, explain: (animal, sound) => `${animal} will ${soft(sound)}.` },
    ],
  },
  {
    category: "Biology", levels: [2, 4], facts: MIGRATIONS,
    forms: [
      { prompt: (animal) => `How does ${soft(animal)} migrate?`, explain: (animal, route) => `${animal} migrates ${soft(route)}.` },
    ],
  },
  {
    category: "Biology", levels: [3, 4], facts: INSECTS,
    forms: [
      { prompt: (insect) => `To which order does ${soft(insect)} belong?`, explain: (insect, order) => `${insect} belongs to ${order}.` },
    ],
  },
  {
    category: "Biology", levels: [2, 4], facts: VENOMOUS, identify: true,
    forms: [
      { prompt: (animal) => `What is notable about ${soft(animal)}?`, explain: (animal, note) => `${animal}: ${soft(note)}.` },
    ],
  },
  {
    category: "Biology", levels: [2, 3], facts: TREE_FACTS, identify: true,
    forms: [
      { prompt: (tree) => `What is notable about ${soft(tree)}?`, explain: (tree, note) => `${tree}: ${soft(note)}.` },
    ],
  },
  {
    category: "Biology", levels: [2, 4], facts: CONSERVATION,
    forms: [
      { prompt: (status) => `What does the conservation status "${soft(status)}" mean?`, explain: (status, meaning) => `${status}: ${soft(meaning)}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 3], facts: MARINE, identify: true,
    forms: [
      { prompt: (creature) => `What is notable about ${soft(creature)}?`, explain: (creature, note) => `${creature}: ${soft(note)}.` },
    ],
  },
];
