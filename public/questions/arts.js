// Art and literature: who made the thing, and what the thing is.
const NOVELS = [
  ["Pride and Prejudice", "Pride and Prejudice", "Jane Austen"], ["Emma", "Emma (novel)", "Jane Austen"], ["Sense and Sensibility", "Sense and Sensibility", "Jane Austen"],
  ["Jane Eyre", "Jane Eyre", "Charlotte Brontë"], ["Wuthering Heights", "Wuthering Heights", "Emily Brontë"], ["Great Expectations", "Great Expectations", "Charles Dickens"],
  ["Oliver Twist", "Oliver Twist", "Charles Dickens"], ["Bleak House", "Bleak House", "Charles Dickens"], ["A Tale of Two Cities", "A Tale of Two Cities", "Charles Dickens"],
  ["Middlemarch", "Middlemarch", "George Eliot"], ["Vanity Fair", "Vanity Fair (novel)", "William Makepeace Thackeray"], ["Tess of the d'Urbervilles", "Tess of the d'Urbervilles", "Thomas Hardy"],
  ["Moby-Dick", "Moby-Dick", "Herman Melville"], ["The Scarlet Letter", "The Scarlet Letter", "Nathaniel Hawthorne"], ["Adventures of Huckleberry Finn", "Adventures of Huckleberry Finn", "Mark Twain"],
  ["The Great Gatsby", "The Great Gatsby", "F. Scott Fitzgerald"], ["The Sun Also Rises", "The Sun Also Rises", "Ernest Hemingway"], ["The Old Man and the Sea", "The Old Man and the Sea", "Ernest Hemingway"],
  ["The Grapes of Wrath", "The Grapes of Wrath", "John Steinbeck"], ["Of Mice and Men", "Of Mice and Men", "John Steinbeck"], ["To Kill a Mockingbird", "To Kill a Mockingbird", "Harper Lee"],
  ["Beloved", "Beloved (novel)", "Toni Morrison"], ["Invisible Man", "Invisible Man", "Ralph Ellison"], ["Catch-22", "Catch-22", "Joseph Heller"],
  ["Nineteen Eighty-Four", "Nineteen Eighty-Four", "George Orwell"], ["Animal Farm", "Animal Farm", "George Orwell"], ["Brave New World", "Brave New World", "Aldous Huxley"],
  ["Lord of the Flies", "Lord of the Flies", "William Golding"], ["Heart of Darkness", "Heart of Darkness", "Joseph Conrad"], ["Ulysses", "Ulysses (novel)", "James Joyce"],
  ["Mrs Dalloway", "Mrs Dalloway", "Virginia Woolf"], ["To the Lighthouse", "To the Lighthouse", "Virginia Woolf"], ["War and Peace", "War and Peace", "Leo Tolstoy"],
  ["Anna Karenina", "Anna Karenina", "Leo Tolstoy"], ["Crime and Punishment", "Crime and Punishment", "Fyodor Dostoevsky"], ["The Brothers Karamazov", "The Brothers Karamazov", "Fyodor Dostoevsky"],
  ["Dead Souls", "Dead Souls", "Nikolai Gogol"], ["Fathers and Sons", "Fathers and Sons (novel)", "Ivan Turgenev"], ["Doctor Zhivago", "Doctor Zhivago (novel)", "Boris Pasternak"],
  ["Madame Bovary", "Madame Bovary", "Gustave Flaubert"], ["Les Misérables", "Les Misérables", "Victor Hugo"], ["The Count of Monte Cristo", "The Count of Monte Cristo", "Alexandre Dumas"],
  ["The Three Musketeers", "The Three Musketeers", "Alexandre Dumas"], ["In Search of Lost Time", "In Search of Lost Time", "Marcel Proust"], ["The Stranger", "The Stranger (Camus novel)", "Albert Camus"],
  ["Don Quixote", "Don Quixote", "Miguel de Cervantes"], ["One Hundred Years of Solitude", "One Hundred Years of Solitude", "Gabriel García Márquez"], ["The Trial", "The Trial", "Franz Kafka"],
  ["The Metamorphosis", "The Metamorphosis", "Franz Kafka"], ["Buddenbrooks", "Buddenbrooks", "Thomas Mann"], ["The Tin Drum", "The Tin Drum", "Günter Grass"],
  ["Things Fall Apart", "Things Fall Apart", "Chinua Achebe"], ["Midnight's Children", "Midnight's Children", "Salman Rushdie"], ["The God of Small Things", "The God of Small Things", "Arundhati Roy"],
  ["Frankenstein", "Frankenstein", "Mary Shelley"], ["Dracula", "Dracula", "Bram Stoker"], ["The Picture of Dorian Gray", "The Picture of Dorian Gray", "Oscar Wilde"],
  ["Treasure Island", "Treasure Island", "Robert Louis Stevenson"], ["The Hobbit", "The Hobbit", "J. R. R. Tolkien"], ["The Lord of the Rings", "The Lord of the Rings", "J. R. R. Tolkien"],
  ["Robinson Crusoe", "Robinson Crusoe", "Daniel Defoe"], ["Gulliver's Travels", "Gulliver's Travels", "Jonathan Swift"], ["Alice's Adventures in Wonderland", "Alice's Adventures in Wonderland", "Lewis Carroll"],
  ["The Wind in the Willows", "The Wind in the Willows", "Kenneth Grahame"], ["Little Women", "Little Women", "Louisa May Alcott"], ["Uncle Tom's Cabin", "Uncle Tom's Cabin", "Harriet Beecher Stowe"],
  ["The Handmaid's Tale", "The Handmaid's Tale", "Margaret Atwood"], ["Never Let Me Go", "Never Let Me Go (novel)", "Kazuo Ishiguro"], ["Disgrace", "Disgrace", "J. M. Coetzee"],
];

const PAINTINGS = [
  ["The Mona Lisa", "Mona Lisa", "Leonardo da Vinci"], ["The Last Supper", "The Last Supper (Leonardo)", "Leonardo da Vinci"], ["The Starry Night", "The Starry Night", "Vincent van Gogh"],
  ["Sunflowers", "Sunflowers (Van Gogh series)", "Vincent van Gogh"], ["The Birth of Venus", "The Birth of Venus", "Sandro Botticelli"], ["Primavera", "Primavera (Botticelli)", "Sandro Botticelli"],
  ["The Night Watch", "The Night Watch", "Rembrandt"], ["Girl with a Pearl Earring", "Girl with a Pearl Earring", "Johannes Vermeer"], ["The Milkmaid", "The Milkmaid (Vermeer)", "Johannes Vermeer"],
  ["Guernica", "Guernica (Picasso)", "Pablo Picasso"], ["Les Demoiselles d'Avignon", "Les Demoiselles d'Avignon", "Pablo Picasso"], ["The Persistence of Memory", "The Persistence of Memory", "Salvador Dalí"],
  ["The Scream", "The Scream", "Edvard Munch"], ["The Kiss", "The Kiss (Klimt)", "Gustav Klimt"], ["American Gothic", "American Gothic", "Grant Wood"],
  ["Nighthawks", "Nighthawks", "Edward Hopper"], ["Impression, Sunrise", "Impression, Sunrise", "Claude Monet"], ["Water Lilies", "Water Lilies (Monet series)", "Claude Monet"],
  ["A Sunday Afternoon on the Island of La Grande Jatte", "A Sunday Afternoon on the Island of La Grande Jatte", "Georges Seurat"], ["The Card Players", "The Card Players", "Paul Cézanne"],
  ["Luncheon of the Boating Party", "Luncheon of the Boating Party", "Pierre-Auguste Renoir"], ["The Third of May 1808", "The Third of May 1808", "Francisco Goya"],
  ["Las Meninas", "Las Meninas", "Diego Velázquez"], ["The Garden of Earthly Delights", "The Garden of Earthly Delights", "Hieronymus Bosch"],
  ["The Hunters in the Snow", "The Hunters in the Snow", "Pieter Bruegel the Elder"], ["The Arnolfini Portrait", "Arnolfini Portrait", "Jan van Eyck"],
  ["The School of Athens", "The School of Athens", "Raphael"], ["The Creation of Adam", "The Creation of Adam", "Michelangelo"],
  ["Liberty Leading the People", "Liberty Leading the People", "Eugène Delacroix"], ["The Raft of the Medusa", "The Raft of the Medusa", "Théodore Géricault"],
  ["Whistler's Mother", "Whistler's Mother", "James McNeill Whistler"], ["The Great Wave off Kanagawa", "The Great Wave off Kanagawa", "Hokusai"],
  ["The Ambassadors", "The Ambassadors (Holbein)", "Hans Holbein the Younger"], ["The Fighting Temeraire", "The Fighting Temeraire", "J. M. W. Turner"],
  ["The Hay Wain", "The Hay Wain", "John Constable"], ["Composition VII", "Composition VII", "Wassily Kandinsky"],
  ["The Two Fridas", "The Two Fridas", "Frida Kahlo"], ["Christina's World", "Christina's World", "Andrew Wyeth"],
];

const SCULPTURES = [
  ["David", "David (Michelangelo)", "Michelangelo"], ["The Pietà", "Pietà (Michelangelo)", "Michelangelo"], ["The Thinker", "The Thinker", "Auguste Rodin"],
  ["The Kiss", "The Kiss (Rodin sculpture)", "Auguste Rodin"], ["The Burghers of Calais", "The Burghers of Calais", "Auguste Rodin"], ["Ecstasy of Saint Teresa", "Ecstasy of Saint Teresa", "Gian Lorenzo Bernini"],
  ["Apollo and Daphne", "Apollo and Daphne (Bernini)", "Gian Lorenzo Bernini"], ["The Statue of Liberty", "Statue of Liberty", "Frédéric Auguste Bartholdi"],
  ["Bird in Space", "Bird in Space", "Constantin Brâncuși"], ["The Gates of Paradise", "Florence Baptistery", "Lorenzo Ghiberti"],
];

const ART_MOVEMENTS = [
  ["Claude Monet", "Claude Monet", "Impressionism"], ["Pierre-Auguste Renoir", "Pierre-Auguste Renoir", "Impressionism"], ["Edgar Degas", "Edgar Degas", "Impressionism"],
  ["Georges Seurat", "Georges Seurat", "Pointillism"], ["Vincent van Gogh", "Vincent van Gogh", "Post-Impressionism"], ["Paul Gauguin", "Paul Gauguin", "Post-Impressionism"],
  ["Pablo Picasso", "Pablo Picasso", "Cubism"], ["Georges Braque", "Georges Braque", "Cubism"], ["Salvador Dalí", "Salvador Dalí", "Surrealism"],
  ["René Magritte", "René Magritte", "Surrealism"], ["Jackson Pollock", "Jackson Pollock", "Abstract expressionism"], ["Mark Rothko", "Mark Rothko", "Abstract expressionism"],
  ["Andy Warhol", "Andy Warhol", "Pop art"], ["Roy Lichtenstein", "Roy Lichtenstein", "Pop art"], ["Wassily Kandinsky", "Wassily Kandinsky", "Abstract art"],
  ["Piet Mondrian", "Piet Mondrian", "De Stijl"], ["Gustav Klimt", "Gustav Klimt", "Art Nouveau"], ["Edvard Munch", "Edvard Munch", "Expressionism"],
  ["Caravaggio", "Caravaggio", "Baroque"], ["Peter Paul Rubens", "Peter Paul Rubens", "Baroque"], ["Jacques-Louis David", "Jacques-Louis David", "Neoclassicism"],
  ["Eugène Delacroix", "Eugène Delacroix", "Romanticism"], ["Marcel Duchamp", "Marcel Duchamp", "Dada"], ["Umberto Boccioni", "Umberto Boccioni", "Futurism"],
];

const PLAYS = [
  ["Hamlet", "Hamlet", "William Shakespeare"], ["Macbeth", "Macbeth", "William Shakespeare"], ["King Lear", "King Lear", "William Shakespeare"],
  ["Othello", "Othello", "William Shakespeare"], ["The Tempest", "The Tempest", "William Shakespeare"], ["A Midsummer Night's Dream", "A Midsummer Night's Dream", "William Shakespeare"],
  ["Oedipus Rex", "Oedipus Rex", "Sophocles"], ["Antigone", "Antigone (Sophocles play)", "Sophocles"], ["Medea", "Medea (play)", "Euripides"],
  ["The Oresteia", "Oresteia", "Aeschylus"], ["Lysistrata", "Lysistrata", "Aristophanes"], ["A Doll's House", "A Doll's House", "Henrik Ibsen"],
  ["Hedda Gabler", "Hedda Gabler", "Henrik Ibsen"], ["The Seagull", "The Seagull", "Anton Chekhov"], ["The Cherry Orchard", "The Cherry Orchard", "Anton Chekhov"],
  ["Death of a Salesman", "Death of a Salesman", "Arthur Miller"], ["The Crucible", "The Crucible", "Arthur Miller"], ["A Streetcar Named Desire", "A Streetcar Named Desire", "Tennessee Williams"],
  ["Waiting for Godot", "Waiting for Godot", "Samuel Beckett"], ["Pygmalion", "Pygmalion (play)", "George Bernard Shaw"], ["The Importance of Being Earnest", "The Importance of Being Earnest", "Oscar Wilde"],
  ["Faust", "Goethe's Faust", "Johann Wolfgang von Goethe"], ["Tartuffe", "Tartuffe", "Molière"], ["Cyrano de Bergerac", "Cyrano de Bergerac (play)", "Edmond Rostand"],
];

const POEMS = [
  ["The Divine Comedy", "Divine Comedy", "Dante Alighieri"], ["Paradise Lost", "Paradise Lost", "John Milton"], ["The Canterbury Tales", "The Canterbury Tales", "Geoffrey Chaucer"],
  ["The Rime of the Ancient Mariner", "The Rime of the Ancient Mariner", "Samuel Taylor Coleridge"], ["Ode to a Nightingale", "Ode to a Nightingale", "John Keats"],
  ["The Waste Land", "The Waste Land", "T. S. Eliot"], ["Leaves of Grass", "Leaves of Grass", "Walt Whitman"], ["The Raven", "The Raven", "Edgar Allan Poe"],
  ["Beowulf", "Beowulf", "An anonymous Old English poet"], ["The Iliad", "Iliad", "Homer"], ["The Odyssey", "Odyssey", "Homer"], ["The Aeneid", "Aeneid", "Virgil"],
  ["Metamorphoses", "Metamorphoses", "Ovid"], ["The Faerie Queene", "The Faerie Queene", "Edmund Spenser"], ["Don Juan", "Don Juan (poem)", "Lord Byron"],
  ["Ozymandias", "Ozymandias", "Percy Bysshe Shelley"], ["The Road Not Taken", "The Road Not Taken", "Robert Frost"], ["Howl", "Howl", "Allen Ginsberg"],
];

const FILMS = [
  ["Citizen Kane", "Citizen Kane", "Orson Welles"], ["Psycho", "Psycho (1960 film)", "Alfred Hitchcock"], ["Vertigo", "Vertigo (film)", "Alfred Hitchcock"],
  ["Rear Window", "Rear Window", "Alfred Hitchcock"], ["2001: A Space Odyssey", "2001: A Space Odyssey (film)", "Stanley Kubrick"], ["The Shining", "The Shining (film)", "Stanley Kubrick"],
  ["Dr. Strangelove", "Dr. Strangelove", "Stanley Kubrick"], ["The Godfather", "The Godfather", "Francis Ford Coppola"], ["Apocalypse Now", "Apocalypse Now", "Francis Ford Coppola"],
  ["Taxi Driver", "Taxi Driver", "Martin Scorsese"], ["Goodfellas", "Goodfellas", "Martin Scorsese"], ["Jaws", "Jaws (film)", "Steven Spielberg"],
  ["Schindler's List", "Schindler's List", "Steven Spielberg"], ["Seven Samurai", "Seven Samurai", "Akira Kurosawa"], ["Rashomon", "Rashomon", "Akira Kurosawa"],
  ["Bicycle Thieves", "Bicycle Thieves", "Vittorio De Sica"], ["8½", "8½", "Federico Fellini"], ["La Dolce Vita", "La Dolce Vita", "Federico Fellini"],
  ["The Seventh Seal", "The Seventh Seal", "Ingmar Bergman"], ["Breathless", "Breathless (1960 film)", "Jean-Luc Godard"], ["The 400 Blows", "The 400 Blows", "François Truffaut"],
  ["Metropolis", "Metropolis (1927 film)", "Fritz Lang"], ["Battleship Potemkin", "Battleship Potemkin", "Sergei Eisenstein"], ["Pulp Fiction", "Pulp Fiction", "Quentin Tarantino"],
  ["Blade Runner", "Blade Runner", "Ridley Scott"], ["Alien", "Alien (film)", "Ridley Scott"], ["Casablanca", "Casablanca (film)", "Michael Curtiz"],
  ["Singin' in the Rain", "Singin' in the Rain", "Gene Kelly"], ["Some Like It Hot", "Some Like It Hot", "Billy Wilder"], ["Parasite", "Parasite (2019 film)", "Bong Joon-ho"],
];

const ARCHITECTURE = [
  ["The Guggenheim Museum in New York", "Solomon R. Guggenheim Museum", "Frank Lloyd Wright"], ["Fallingwater", "Fallingwater", "Frank Lloyd Wright"],
  ["The Sagrada Família", "Sagrada Família", "Antoni Gaudí"], ["Park Güell", "Park Güell", "Antoni Gaudí"],
  ["The Sydney Opera House", "Sydney Opera House", "Jørn Utzon"], ["The Villa Savoye", "Villa Savoye", "Le Corbusier"],
  ["The Seagram Building", "Seagram Building", "Ludwig Mies van der Rohe"], ["St Paul's Cathedral", "St Paul's Cathedral", "Christopher Wren"],
  ["The dome of Florence Cathedral", "Florence Cathedral", "Filippo Brunelleschi"], ["St Peter's Square", "St. Peter's Square", "Gian Lorenzo Bernini"],
  ["The Louvre Pyramid", "Louvre Pyramid", "I. M. Pei"], ["The Bilbao Guggenheim", "Guggenheim Museum Bilbao", "Frank Gehry"],
];

export const ARTS_FAMILIES = [
  {
    category: "Literature", levels: [1, 4], facts: NOVELS,
    forms: [
      { prompt: (title) => `Who wrote ${title}?`, explain: (title, author) => `${title} was written by ${author}.` },
      { reverse: true, prompt: (title, author) => `Which of these novels did ${author} write?`, explain: (title, author) => `${author} wrote ${title}.` },
    ],
  },
  {
    category: "Arts", levels: [1, 4], facts: PAINTINGS,
    forms: [
      { prompt: (title) => `Who painted ${title}?`, explain: (title, painter) => `${title} was painted by ${painter}.` },
      { reverse: true, prompt: (title, painter) => `Which of these works did ${painter} paint?`, explain: (title, painter) => `${painter} painted ${title}.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: SCULPTURES,
    forms: [
      { prompt: (title) => `Who sculpted ${title}?`, explain: (title, artist) => `${title} is the work of ${artist}.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: ART_MOVEMENTS,
    forms: [
      { prompt: (artist) => `${artist} is associated with which movement?`, explain: (artist, movement) => `${artist} is associated with ${movement}.` },
      { reverse: true, prompt: (artist, movement) => `Which of these artists is associated with ${movement}?`, explain: (artist, movement) => `${artist} is associated with ${movement}.` },
    ],
  },
  {
    category: "Literature", levels: [2, 4], facts: PLAYS,
    forms: [
      { prompt: (title) => `Who wrote the play ${title}?`, explain: (title, author) => `${title} was written by ${author}.` },
      { reverse: true, prompt: (title, author) => `Which of these plays is by ${author}?`, explain: (title, author) => `${author} wrote ${title}.` },
    ],
  },
  {
    category: "Literature", levels: [2, 4], facts: POEMS,
    forms: [
      { prompt: (title) => `Who wrote ${title}?`, explain: (title, poet) => `${title} is the work of ${poet}.` },
    ],
  },
  {
    category: "Arts", levels: [1, 3], facts: FILMS,
    forms: [
      { prompt: (title) => `Who directed ${title}?`, explain: (title, director) => `${title} was directed by ${director}.` },
      { reverse: true, prompt: (title, director) => `Which of these films did ${director} direct?`, explain: (title, director) => `${director} directed ${title}.` },
    ],
  },
  {
    category: "Arts", levels: [3, 4], facts: ARCHITECTURE,
    forms: [
      { prompt: (building) => `Who designed ${building.replace("The ", "the ")}?`, explain: (building, architect) => `${building} was designed by ${architect}.` },
    ],
  },
];
