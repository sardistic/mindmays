const FAMILIES = [
  {
    category: "Geography",
    prompt: (country) => `What is the capital of ${country}?`,
    explain: (country, capital) => `${capital} is the capital of ${country}.`,
    facts: [
      ["France", "France", "Paris"], ["Japan", "Japan", "Tokyo"], ["Brazil", "Brazil", "Brasília"], ["Canada", "Canada", "Ottawa"], ["Australia", "Australia", "Canberra"], ["Egypt", "Egypt", "Cairo"],
      ["Turkey", "Turkey", "Ankara"], ["Morocco", "Morocco", "Rabat"], ["Nigeria", "Nigeria", "Abuja"], ["Kenya", "Kenya", "Nairobi"], ["Argentina", "Argentina", "Buenos Aires"], ["Thailand", "Thailand", "Bangkok"],
      ["Kazakhstan", "Kazakhstan", "Astana"], ["Myanmar", "Myanmar", "Naypyidaw"], ["Tanzania", "Tanzania", "Dodoma"], ["Sri Lanka", "Sri Lanka", "Sri Jayawardenepura Kotte"], ["Ivory Coast", "Côte d’Ivoire", "Yamoussoukro"], ["Belize", "Belize", "Belmopan"],
      ["Bhutan", "Bhutan", "Thimphu"], ["Kyrgyzstan", "Kyrgyzstan", "Bishkek"], ["Palau", "Palau", "Ngerulmud"], ["Federated States of Micronesia", "Micronesia", "Palikir"], ["Burkina Faso", "Burkina Faso", "Ouagadougou"], ["Brunei", "Brunei", "Bandar Seri Begawan"],
    ],
  },
  {
    category: "Geography",
    prompt: (landmark) => `In which present-day country is ${landmark}?`,
    explain: (landmark, country) => `${landmark} is in ${country}.`,
    facts: [
      ["Machu Picchu", "Machu Picchu", "Peru"], ["Petra", "Petra", "Jordan"], ["Angkor Wat", "Angkor Wat", "Cambodia"], ["Taj Mahal", "the Taj Mahal", "India"], ["Great Pyramid of Giza", "the Great Pyramid of Giza", "Egypt"], ["Colosseum", "the Colosseum", "Italy"],
      ["Alhambra", "the Alhambra", "Spain"], ["Borobudur", "Borobudur", "Indonesia"], ["Chichen Itza", "Chichén Itzá", "Mexico"], ["Easter Island", "the moai of Rapa Nui", "Chile"], ["Rock-Hewn Churches, Lalibela", "the rock-hewn churches of Lalibela", "Ethiopia"], ["Neuschwanstein Castle", "Neuschwanstein Castle", "Germany"],
      ["Bagan", "Bagan", "Myanmar"], ["Sigiriya", "Sigiriya", "Sri Lanka"], ["Great Zimbabwe", "Great Zimbabwe", "Zimbabwe"], ["Leptis Magna", "Leptis Magna", "Libya"], ["Persepolis", "Persepolis", "Iran"], ["Tikal", "Tikal", "Guatemala"],
      ["Nan Madol", "Nan Madol", "Micronesia"], ["Mesa Verde National Park", "the Mesa Verde cliff dwellings", "United States"], ["Skara Brae", "Skara Brae", "Scotland"], ["Göbekli Tepe", "Göbekli Tepe", "Turkey"], ["Aït Benhaddou", "Aït Benhaddou", "Morocco"], ["Meroë", "Meroë", "Sudan"],
    ],
  },
  {
    category: "Geography",
    prompt: (clue) => `Which geographical feature matches this description: ${clue}?`,
    explain: (clue, feature) => `${feature} is the feature described.`,
    facts: [
      ["Pacific Ocean", "Earth’s largest ocean", "Pacific Ocean"], ["Mount Everest", "Earth’s highest mountain above sea level", "Mount Everest"], ["Andes", "the world’s longest continental mountain range", "Andes"], ["Sahara", "the world’s largest hot desert", "Sahara"], ["Lake Baikal", "the world’s deepest lake", "Lake Baikal"], ["Greenland", "the world’s largest island that is not a continent", "Greenland"],
      ["Nile", "the river flowing north through Egypt to the Mediterranean", "Nile"], ["Mediterranean Sea", "the sea between southern Europe and northern Africa", "Mediterranean Sea"], ["Victoria Falls", "the great waterfall on the Zambia–Zimbabwe border", "Victoria Falls"], ["Tibetan Plateau", "the high plateau often called the Roof of the World", "Tibetan Plateau"], ["Great Barrier Reef", "the vast coral reef system off northeastern Australia", "Great Barrier Reef"], ["Ganges Delta", "the enormous delta shared principally by Bangladesh and India", "Ganges–Brahmaputra Delta"],
      ["Strait of Gibraltar", "the narrow passage linking the Atlantic Ocean and Mediterranean Sea", "Strait of Gibraltar"], ["Lake Titicaca", "the large navigable high-altitude lake between Peru and Bolivia", "Lake Titicaca"], ["Gobi Desert", "the cold desert spanning southern Mongolia and northern China", "Gobi Desert"], ["Grand Canyon", "the immense Colorado River gorge in Arizona", "Grand Canyon"], ["Salar de Uyuni", "the immense salt flat on Bolivia’s Altiplano", "Salar de Uyuni"], ["Mount Etna", "the active stratovolcano on eastern Sicily", "Mount Etna"],
      ["Mariana Trench", "the ocean trench containing Challenger Deep", "Mariana Trench"], ["Okavango Delta", "the inland delta that fans into Botswana’s Kalahari", "Okavango Delta"], ["Mount Roraima", "the table-top tepui at the junction of Venezuela, Guyana, and Brazil", "Mount Roraima"], ["Sognefjord", "Norway’s longest and deepest fjord", "Sognefjord"], ["Lambert Glacier", "the enormous glacier draining part of East Antarctica", "Lambert Glacier"], ["Sơn Đoòng Cave", "the gigantic cave passage discovered in central Vietnam", "Sơn Đoòng Cave"],
    ],
  },
  {
    category: "History",
    prompt: (year) => `Which event occurred in ${year}?`,
    explain: (year, event) => `${event} occurred in ${year}.`,
    facts: [
      ["Norman Conquest", "1066", "The Norman Conquest of England"], ["Fall of Constantinople", "1453", "The fall of Constantinople"], ["Voyages of Christopher Columbus", "1492", "Columbus’s first Atlantic voyage"], ["Ninety-five Theses", "1517", "Luther’s publication of the Ninety-five Theses"], ["Spanish Armada", "1588", "The defeat of the Spanish Armada"], ["Peace of Westphalia", "1648", "The Peace of Westphalia"],
      ["Philosophiæ Naturalis Principia Mathematica", "1687", "Publication of Newton’s Principia"], ["United States Declaration of Independence", "1776", "The American Declaration of Independence"], ["French Revolution", "1789", "The beginning of the French Revolution"], ["Haitian Declaration of Independence", "1804", "Haitian independence"], ["Battle of Waterloo", "1815", "The Battle of Waterloo"], ["Revolutions of 1848", "1848", "The Revolutions of 1848"],
      ["American Civil War", "1861", "The beginning of the American Civil War"], ["Meiji Restoration", "1868", "The Meiji Restoration"], ["World War I", "1914", "The beginning of World War I"], ["Russian Revolution", "1917", "The Russian Revolution"], ["Treaty of Versailles", "1919", "The signing of the Treaty of Versailles"], ["History of penicillin", "1928", "Fleming’s observation of penicillin"],
      ["United Nations", "1945", "The founding of the United Nations"], ["Indian Independence Act 1947", "1947", "Indian independence from British rule"], ["Sputnik 1", "1957", "The launch of Sputnik 1"], ["Apollo 11", "1969", "The Apollo 11 Moon landing"], ["Fall of the Berlin Wall", "1989", "The opening of the Berlin Wall"], ["Dissolution of the Soviet Union", "1991", "The dissolution of the Soviet Union"],
    ],
  },
  {
    category: "History",
    prompt: (clue) => `Which historical figure is most closely associated with ${clue}?`,
    explain: (clue, figure) => `${figure} is most closely associated with ${clue}.`,
    facts: [
      ["Hammurabi", "the Babylonian law code carved on a famous stele", "Hammurabi"], ["Pericles", "the political leadership of Athens during much of its fifth-century BCE golden age", "Pericles"], ["Ashoka", "rock and pillar edicts promoting dharma across the Mauryan Empire", "Ashoka"], ["Qin Shi Huang", "the first unification of imperial China", "Qin Shi Huang"], ["Augustus", "becoming the first Roman emperor", "Augustus"], ["Mansa Musa", "the spectacular fourteenth-century pilgrimage from Mali to Mecca", "Mansa Musa"],
      ["Charlemagne", "a western imperial coronation on Christmas Day in 800", "Charlemagne"], ["Saladin", "the Ayyubid recapture of Jerusalem in 1187", "Saladin"], ["Genghis Khan", "the founding of the Mongol Empire", "Genghis Khan"], ["Joan of Arc", "the relief of Orléans during the Hundred Years’ War", "Joan of Arc"], ["Suleiman the Magnificent", "the sixteenth-century height of Ottoman imperial power", "Suleiman the Magnificent"], ["Akbar", "Mughal expansion and a policy of broad religious accommodation", "Akbar"],
      ["Simón Bolívar", "independence movements across northern South America", "Simón Bolívar"], ["Toussaint Louverture", "leadership during the Haitian Revolution", "Toussaint Louverture"], ["Otto von Bismarck", "German unification through diplomacy and war", "Otto von Bismarck"], ["Emmeline Pankhurst", "the British Women’s Social and Political Union", "Emmeline Pankhurst"], ["Sun Yat-sen", "the revolutionary movement that helped end China’s Qing dynasty", "Sun Yat-sen"], ["Mustafa Kemal Atatürk", "the founding and secular reform of the Republic of Turkey", "Mustafa Kemal Atatürk"],
      ["Kwame Nkrumah", "Ghanaian independence and Pan-Africanism", "Kwame Nkrumah"], ["Nelson Mandela", "the anti-apartheid struggle and South Africa’s first fully democratic presidency", "Nelson Mandela"], ["Lech Wałęsa", "Poland’s Solidarity trade-union movement", "Lech Wałęsa"], ["Václav Havel", "Czechoslovakia’s dissident movement and Velvet Revolution", "Václav Havel"], ["Aung San", "the movement for Burmese independence before 1948", "Aung San"], ["Ellen Johnson Sirleaf", "becoming Africa’s first elected female head of state", "Ellen Johnson Sirleaf"],
    ],
  },
  {
    category: "Arts",
    prompt: (work) => `Who created ${work}?`,
    explain: (work, artist) => `${work} was created by ${artist}.`,
    facts: [
      ["Mona Lisa", "the Mona Lisa", "Leonardo da Vinci"], ["The Starry Night", "The Starry Night", "Vincent van Gogh"], ["Guernica (Picasso)", "Guernica", "Pablo Picasso"], ["The Great Wave off Kanagawa", "The Great Wave off Kanagawa", "Hokusai"], ["Girl with a Pearl Earring", "Girl with a Pearl Earring", "Johannes Vermeer"], ["The Birth of Venus", "The Birth of Venus", "Sandro Botticelli"],
      ["Las Meninas", "Las Meninas", "Diego Velázquez"], ["The Night Watch", "The Night Watch", "Rembrandt"], ["The Kiss (Klimt)", "The Kiss", "Gustav Klimt"], ["The Persistence of Memory", "The Persistence of Memory", "Salvador Dalí"], ["American Gothic", "American Gothic", "Grant Wood"], ["Nighthawks (Hopper)", "Nighthawks", "Edward Hopper"],
      ["Arnolfini Portrait", "the Arnolfini Portrait", "Jan van Eyck"], ["The Garden of Earthly Delights", "The Garden of Earthly Delights", "Hieronymus Bosch"], ["Liberty Leading the People", "Liberty Leading the People", "Eugène Delacroix"], ["Olympia (Manet)", "Olympia", "Édouard Manet"], ["No. 5, 1948", "No. 5, 1948", "Jackson Pollock"], ["The Two Fridas", "The Two Fridas", "Frida Kahlo"],
      ["The School of Athens", "The School of Athens", "Raphael"], ["The Burial of the Count of Orgaz", "The Burial of the Count of Orgaz", "El Greco"], ["Wanderer above the Sea of Fog", "Wanderer above the Sea of Fog", "Caspar David Friedrich"], ["The Third of May 1808", "The Third of May 1808", "Francisco Goya"], ["The Son of Man", "The Son of Man", "René Magritte"], ["The Sleeping Gypsy", "The Sleeping Gypsy", "Henri Rousseau"],
    ],
  },
  {
    category: "Literature",
    prompt: (work) => `Who wrote ${work}?`,
    explain: (work, author) => `${work} was written by ${author}.`,
    facts: [
      ["Odyssey", "the Odyssey", "Homer"], ["Hamlet", "Hamlet", "William Shakespeare"], ["Pride and Prejudice", "Pride and Prejudice", "Jane Austen"], ["Don Quixote", "Don Quixote", "Miguel de Cervantes"], ["The Tale of Genji", "The Tale of Genji", "Murasaki Shikibu"], ["Divine Comedy", "the Divine Comedy", "Dante Alighieri"],
      ["Things Fall Apart", "Things Fall Apart", "Chinua Achebe"], ["One Hundred Years of Solitude", "One Hundred Years of Solitude", "Gabriel García Márquez"], ["The Metamorphosis", "The Metamorphosis", "Franz Kafka"], ["Beloved (novel)", "Beloved", "Toni Morrison"], ["The Stranger (Camus novel)", "The Stranger", "Albert Camus"], ["Invisible Man", "Invisible Man", "Ralph Ellison"],
      ["The Master and Margarita", "The Master and Margarita", "Mikhail Bulgakov"], ["Middlemarch", "Middlemarch", "George Eliot"], ["Pedro Páramo", "Pedro Páramo", "Juan Rulfo"], ["The Tale of Kiều", "The Tale of Kiều", "Nguyễn Du"], ["Season of Migration to the North", "Season of Migration to the North", "Tayeb Salih"], ["The Leopard", "The Leopard", "Giuseppe Tomasi di Lampedusa"],
      ["The Conference of the Birds", "The Conference of the Birds", "Attar of Nishapur"], ["Dream of the Red Chamber", "Dream of the Red Chamber", "Cao Xueqin"], ["Ficciones", "Ficciones", "Jorge Luis Borges"], ["Snow Country", "Snow Country", "Yasunari Kawabata"], ["The Tin Drum", "The Tin Drum", "Günter Grass"], ["Palace of the Peacock", "Palace of the Peacock", "Wilson Harris"],
    ],
  },
  {
    category: "Music",
    prompt: (work) => `Which composer wrote ${work}?`,
    explain: (work, composer) => `${work} was composed by ${composer}.`,
    facts: [
      ["The Four Seasons (Vivaldi)", "The Four Seasons", "Antonio Vivaldi"], ["The Magic Flute", "The Magic Flute", "Wolfgang Amadeus Mozart"], ["Symphony No. 5 (Beethoven)", "Beethoven’s Fifth Symphony", "Ludwig van Beethoven"], ["Messiah (Handel)", "Messiah", "George Frideric Handel"], ["Brandenburg Concertos", "the Brandenburg Concertos", "Johann Sebastian Bach"], ["Swan Lake", "Swan Lake", "Pyotr Ilyich Tchaikovsky"],
      ["Boléro", "Boléro", "Maurice Ravel"], ["The Rite of Spring", "The Rite of Spring", "Igor Stravinsky"], ["The Planets", "The Planets", "Gustav Holst"], ["New World Symphony", "the New World Symphony", "Antonín Dvořák"], ["Carmen", "Carmen", "Georges Bizet"], ["William Tell Overture", "the William Tell Overture", "Gioachino Rossini"],
      ["Clair de lune (Debussy)", "Clair de Lune", "Claude Debussy"], ["Enigma Variations", "the Enigma Variations", "Edward Elgar"], ["Pictures at an Exhibition", "Pictures at an Exhibition", "Modest Mussorgsky"], ["Symphonie fantastique", "Symphonie fantastique", "Hector Berlioz"], ["The Blue Danube", "The Blue Danube", "Johann Strauss II"], ["Peer Gynt (Grieg)", "the Peer Gynt incidental music", "Edvard Grieg"],
      ["Turandot", "Turandot", "Giacomo Puccini"], ["Aida", "Aida", "Giuseppe Verdi"], ["Finlandia", "Finlandia", "Jean Sibelius"], ["Appalachian Spring", "Appalachian Spring", "Aaron Copland"], ["Carmina Burana (Orff)", "Carmina Burana", "Carl Orff"], ["West Side Story", "West Side Story", "Leonard Bernstein"],
    ],
  },
  {
    category: "Biology",
    prompt: (clue) => `Which biological structure or process is described as ${clue}?`,
    explain: (clue, term) => `${term} is the structure or process described.`,
    facts: [
      ["Mitochondrion", "the organelle that produces most cellular ATP through aerobic respiration", "Mitochondrion"], ["Ribosome", "the cellular machine that translates RNA into protein", "Ribosome"], ["Cell membrane", "the selectively permeable boundary surrounding a cell", "Cell membrane"], ["Lysosome", "an animal-cell organelle containing digestive enzymes", "Lysosome"], ["Stoma", "a microscopic leaf pore controlling gas exchange", "Stoma"], ["Hemoglobin", "the iron-containing blood protein that carries oxygen", "Hemoglobin"],
      ["Enzyme", "a biological catalyst that lowers activation energy", "Enzyme"], ["Neuron", "a cell specialized to transmit electrical and chemical signals", "Neuron"], ["Antibody", "an immune protein that recognizes a specific antigen", "Antibody"], ["Nephron", "the microscopic functional unit of a kidney", "Nephron"], ["Pulmonary alveolus", "a tiny lung air sac where gases diffuse", "Alveolus"], ["Myelin", "the insulating sheath around many axons", "Myelin"],
      ["Adenosine triphosphate", "the cell’s immediately usable energy currency", "ATP"], ["Messenger RNA", "the RNA copy carrying coding information from DNA to a ribosome", "Messenger RNA"], ["Transfer RNA", "the adaptor molecule delivering amino acids during translation", "Transfer RNA"], ["DNA polymerase", "the enzyme that synthesizes DNA from a template", "DNA polymerase"], ["Homeostasis", "maintenance of a relatively stable internal environment", "Homeostasis"], ["Osmosis", "net water movement across a selectively permeable membrane", "Osmosis"],
      ["Apoptosis", "regulated, programmed cell death", "Apoptosis"], ["Meiosis", "the division process producing haploid gametes", "Meiosis"], ["Epigenetics", "heritable regulation that does not require changing the DNA sequence", "Epigenetics"], ["Telomere", "the repetitive protective region at a chromosome’s end", "Telomere"], ["Operon", "a jointly regulated cluster of genes common in prokaryotes", "Operon"], ["Ribozyme", "an RNA molecule capable of catalysis", "Ribozyme"],
    ],
  },
  {
    category: "Life Science",
    prompt: (clue) => `Which ecological or evolutionary term matches this definition: ${clue}?`,
    explain: (clue, term) => `${term} matches the definition.`,
    facts: [
      ["Primary producer", "an organism that builds organic matter from inorganic sources", "Primary producer"], ["Consumer (food chain)", "an organism obtaining energy by eating other organisms", "Consumer"], ["Decomposer", "an organism breaking down dead material and wastes", "Decomposer"], ["Food web", "a network of interconnected feeding relationships", "Food web"], ["Habitat", "the physical environment in which an organism lives", "Habitat"], ["Ecological niche", "a species’ role and resource use within an ecosystem", "Ecological niche"],
      ["Keystone species", "a species with an ecological effect disproportionate to its abundance", "Keystone species"], ["Ecological succession", "orderly community change following disturbance or new habitat", "Ecological succession"], ["Mutualism (biology)", "a close interaction benefiting both participating species", "Mutualism"], ["Commensalism", "an interaction benefiting one species without significantly affecting the other", "Commensalism"], ["Parasitism", "an interaction in which one organism benefits at its host’s expense", "Parasitism"], ["Biomagnification", "increasing contaminant concentration at higher trophic levels", "Biomagnification"],
      ["Carrying capacity", "the largest population an environment can sustain over time", "Carrying capacity"], ["Genetic drift", "random change in allele frequencies, especially in small populations", "Genetic drift"], ["Founder effect", "reduced variation when a new population begins from few individuals", "Founder effect"], ["Population bottleneck", "sharp population reduction that removes genetic variation", "Population bottleneck"], ["Convergent evolution", "independent evolution of similar traits in separate lineages", "Convergent evolution"], ["Adaptive radiation", "rapid diversification from one ancestor into multiple ecological roles", "Adaptive radiation"],
      ["Horizontal gene transfer", "movement of genetic material other than from parent to offspring", "Horizontal gene transfer"], ["Symbiogenesis", "the origin of new cellular structures through long-term symbiosis", "Symbiogenesis"], ["Cladogram", "a branching diagram representing hypothesized relationships", "Cladogram"], ["Synapomorphy", "a shared derived character supporting a clade", "Synapomorphy"], ["Allopatric speciation", "species formation following geographic separation", "Allopatric speciation"], ["Punctuated equilibrium", "long morphological stability interrupted by comparatively rapid change", "Punctuated equilibrium"],
    ],
  },
  {
    category: "Chemistry",
    prompt: (symbol) => `Which chemical element has the symbol ${symbol}?`,
    explain: (symbol, element) => `${symbol} is the chemical symbol for ${element}.`,
    facts: [
      ["Hydrogen", "H", "Hydrogen"], ["Helium", "He", "Helium"], ["Carbon", "C", "Carbon"], ["Nitrogen", "N", "Nitrogen"], ["Oxygen", "O", "Oxygen"], ["Sodium", "Na", "Sodium"],
      ["Magnesium", "Mg", "Magnesium"], ["Aluminium", "Al", "Aluminium"], ["Silicon", "Si", "Silicon"], ["Phosphorus", "P", "Phosphorus"], ["Sulfur", "S", "Sulfur"], ["Chlorine", "Cl", "Chlorine"],
      ["Potassium", "K", "Potassium"], ["Calcium", "Ca", "Calcium"], ["Iron", "Fe", "Iron"], ["Copper", "Cu", "Copper"], ["Silver", "Ag", "Silver"], ["Gold", "Au", "Gold"],
      ["Mercury (element)", "Hg", "Mercury"], ["Lead", "Pb", "Lead"], ["Tin", "Sn", "Tin"], ["Tungsten", "W", "Tungsten"], ["Uranium", "U", "Uranium"], ["Platinum", "Pt", "Platinum"],
    ],
  },
  {
    category: "Astronomy",
    prompt: (clue) => `Which astronomical object matches this description: ${clue}?`,
    explain: (clue, object) => `${object} is the object described.`,
    facts: [
      ["Sun", "the star at the center of the Solar System", "Sun"], ["Jupiter", "the largest planet in the Solar System", "Jupiter"], ["Mars", "the planet commonly called the Red Planet", "Mars"], ["Saturn", "the planet with the Solar System’s most conspicuous ring system", "Saturn"], ["Moon", "Earth’s only permanent natural satellite", "Moon"], ["Pluto", "the dwarf planet visited by New Horizons in 2015", "Pluto"],
      ["Milky Way", "the barred spiral galaxy containing the Solar System", "Milky Way"], ["Andromeda Galaxy", "the nearest large galaxy to the Milky Way", "Andromeda Galaxy"], ["Sirius", "the brightest star in Earth’s night sky", "Sirius"], ["Orion Nebula", "the bright stellar nursery in Orion’s sword", "Orion Nebula"], ["Crab Nebula", "the supernova remnant associated with the event observed in 1054", "Crab Nebula"], ["Halley's Comet", "the famous short-period comet returning roughly every 76 years", "Halley’s Comet"],
      ["Uranus", "the planet rotating with an axial tilt near 98 degrees", "Uranus"], ["Venus", "the hottest planet at its surface", "Venus"], ["Ganymede (moon)", "the largest moon in the Solar System", "Ganymede"], ["Neptune", "the blue giant planet whose color is influenced by atmospheric methane", "Neptune"], ["Eris (dwarf planet)", "the scattered-disc dwarf planet whose discovery helped prompt Pluto’s reclassification", "Eris"], ["Ceres (dwarf planet)", "the largest object in the main asteroid belt", "Ceres"],
      ["PSR B1919+21", "the first pulsar to be discovered", "PSR B1919+21"], ["Sagittarius A*", "the supermassive black hole at the Milky Way’s center", "Sagittarius A*"], ["51 Pegasi b", "the first exoplanet found orbiting a Sun-like main-sequence star", "51 Pegasi b"], ["Olympus Mons", "the enormous shield volcano on Mars", "Olympus Mons"], ["Voyager 1", "the most distant human-made object from Earth", "Voyager 1"], ["Heliopause", "the boundary where the solar wind yields to the interstellar medium", "Heliopause"],
    ],
  },
  {
    category: "Computing",
    prompt: (clue) => `Which computing term matches this definition: ${clue}?`,
    explain: (clue, term) => `${term} matches the definition.`,
    facts: [
      ["Binary number", "a numeral system using only 0 and 1", "Binary"], ["Bit", "a single binary digit", "Bit"], ["Byte", "a unit conventionally composed of eight bits", "Byte"], ["Central processing unit", "the processor that executes a computer’s instructions", "CPU"], ["Random-access memory", "fast volatile working memory", "RAM"], ["Operating system", "software managing hardware resources and application execution", "Operating system"],
      ["Algorithm", "a finite procedure for solving a class of problems", "Algorithm"], ["Compiler", "software translating source code into another executable form", "Compiler"], ["Database", "an organized collection of electronically accessible data", "Database"], ["Communication protocol", "agreed rules governing data exchange", "Protocol"], ["Encryption", "reversible transformation of plaintext using a key", "Encryption"], ["Hash function", "a function mapping data to a fixed-size digest", "Hash function"],
      ["Recursion (computer science)", "a technique in which a definition or routine invokes itself", "Recursion"], ["Stack (abstract data type)", "a last-in, first-out data structure", "Stack"], ["Queue (abstract data type)", "a first-in, first-out data structure", "Queue"], ["Tree (data structure)", "a hierarchical structure of connected nodes without cycles", "Tree"], ["Graph (abstract data type)", "a structure of vertices joined by edges", "Graph"], ["Cache (computing)", "a fast store holding copies of frequently needed data", "Cache"],
      ["Public-key cryptography", "encryption using mathematically related public and private keys", "Public-key cryptography"], ["SQL", "the standard language widely used to query relational databases", "SQL"], ["Domain Name System", "the distributed system translating domain names to network records", "DNS"], ["HTTP", "the application protocol underlying ordinary web document transfer", "HTTP"], ["Transmission Control Protocol", "the transport protocol providing an ordered reliable byte stream", "TCP"], ["Big O notation", "notation describing asymptotic growth of resource use", "Big O notation"],
    ],
  },
  {
    category: "Mathematics",
    prompt: (clue) => `Which mathematical term matches this definition: ${clue}?`,
    explain: (clue, term) => `${term} matches the definition.`,
    facts: [
      ["Triangle", "a polygon with three sides", "Triangle"], ["Prime number", "a positive integer greater than one with exactly two positive divisors", "Prime number"], ["Pi", "the ratio of a circle’s circumference to its diameter", "Pi"], ["Hypotenuse", "the side opposite the right angle in a right triangle", "Hypotenuse"], ["Arithmetic mean", "the sum of values divided by their count", "Arithmetic mean"], ["Median", "the middle value of an ordered data set", "Median"],
      ["Derivative", "an instantaneous rate of change", "Derivative"], ["Integral", "an accumulation represented by an antiderivative or limiting sum", "Integral"], ["Matrix (mathematics)", "a rectangular array of mathematical entries", "Matrix"], ["Euclidean vector", "a quantity having magnitude and direction", "Vector"], ["Logarithm", "the inverse operation of exponentiation", "Logarithm"], ["Factorial", "the product of positive integers up to a given nonnegative integer", "Factorial"],
      ["Bijection", "a mapping that is both one-to-one and onto", "Bijection"], ["Irrational number", "a real number not expressible as a ratio of integers", "Irrational number"], ["Complex number", "a number expressible in the form a + bi", "Complex number"], ["Topology", "the study of properties preserved under continuous deformation", "Topology"], ["Group (mathematics)", "a set with an associative operation, identity, and inverses", "Group"], ["Eigenvalues and eigenvectors", "a nonzero vector whose direction is preserved by a linear transformation", "Eigenvector"],
      ["Cardinality", "the measure of the number of elements in a set", "Cardinality"], ["Asymptote", "a line a curve approaches arbitrarily closely", "Asymptote"], ["Determinant", "a scalar associated with a square matrix and its scaling effect", "Determinant"], ["Permutation", "an arrangement of a set’s members into an order", "Permutation"], ["Standard deviation", "a measure of dispersion around a mean", "Standard deviation"], ["Fibonacci sequence", "the sequence in which each term after the first two is their sum", "Fibonacci sequence"],
    ],
  },
];

function questionsFromFamily(family, familyIndex) {
  const answerPool = family.facts.map(([, , answer]) => answer);
  return family.facts.map(([source, clue, answer], index) => {
    const distractors = [5, 11, 17].map((offset) => answerPool[(index + offset) % answerPool.length]);
    const correct = (familyIndex + index) % 4;
    const answers = [...distractors]; answers.splice(correct, 0, answer);
    return {
      category: family.category,
      difficulty: Math.floor(index / 6) + 1,
      source,
      prompt: family.prompt(clue),
      answers,
      correct,
      explanation: family.explain(clue, answer),
    };
  });
}

export const EXPANDED_QUESTIONS = FAMILIES.flatMap(questionsFromFamily);
