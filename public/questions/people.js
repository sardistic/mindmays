// Notable people: the field they worked in and the country they came from.
import { soft } from "./case.js";
const FIELDS = [
  ["Marie Curie", "Marie Curie", "Physics and chemistry"], ["Albert Einstein", "Albert Einstein", "Physics"], ["Isaac Newton", "Isaac Newton", "Physics and mathematics"],
  ["Charles Darwin", "Charles Darwin", "Biology"], ["Gregor Mendel", "Gregor Mendel", "Biology"], ["Louis Pasteur", "Louis Pasteur", "Microbiology"],
  ["Sigmund Freud", "Sigmund Freud", "Psychology"], ["Carl Jung", "Carl Jung", "Psychology"], ["Ivan Pavlov", "Ivan Pavlov", "Physiology"],
  ["Niels Bohr", "Niels Bohr", "Physics"], ["Max Planck", "Max Planck", "Physics"], ["Erwin Schrödinger", "Erwin Schrödinger", "Physics"],
  ["Michael Faraday", "Michael Faraday", "Physics and chemistry"], ["Antoine Lavoisier", "Antoine Lavoisier", "Chemistry"], ["Dmitri Mendeleev", "Dmitri Mendeleev", "Chemistry"],
  ["Linus Pauling", "Linus Pauling", "Chemistry"], ["Rosalind Franklin", "Rosalind Franklin", "Chemistry"], ["Nikola Tesla", "Nikola Tesla", "Electrical engineering"],
  ["Leonardo da Vinci", "Leonardo da Vinci", "Art and invention"], ["Michelangelo", "Michelangelo", "Art and sculpture"],
  ["Johann Sebastian Bach", "Johann Sebastian Bach", "Music"], ["Ludwig van Beethoven", "Ludwig van Beethoven", "Music"],
  ["Wolfgang Amadeus Mozart", "Wolfgang Amadeus Mozart", "Music"], ["Frédéric Chopin", "Frédéric Chopin", "Music"],
  ["William Shakespeare", "William Shakespeare", "Drama and poetry"], ["Homer", "Homer", "Poetry"], ["Dante Alighieri", "Dante Alighieri", "Poetry"],
  ["Plato", "Plato", "Philosophy"], ["Aristotle", "Aristotle", "Philosophy"], ["Socrates", "Socrates", "Philosophy"],
  ["Immanuel Kant", "Immanuel Kant", "Philosophy"], ["Friedrich Nietzsche", "Friedrich Nietzsche", "Philosophy"], ["Confucius", "Confucius", "Philosophy"],
  ["René Descartes", "René Descartes", "Philosophy and mathematics"], ["John Locke", "John Locke", "Philosophy"], ["Karl Marx", "Karl Marx", "Philosophy and economics"],
  ["Adam Smith", "Adam Smith", "Economics"], ["John Maynard Keynes", "John Maynard Keynes", "Economics"],
  ["Florence Nightingale", "Florence Nightingale", "Nursing"], ["Hippocrates", "Hippocrates", "Medicine"], ["Galen", "Galen", "Medicine"],
  ["Andreas Vesalius", "Andreas Vesalius", "Anatomy"], ["William Harvey", "William Harvey", "Medicine"], ["Joseph Lister", "Joseph Lister", "Surgery"],
  ["Nicolaus Copernicus", "Nicolaus Copernicus", "Astronomy"], ["Johannes Kepler", "Johannes Kepler", "Astronomy"], ["Edwin Hubble", "Edwin Hubble", "Astronomy"],
  ["Carl Sagan", "Carl Sagan", "Astronomy"], ["Stephen Hawking", "Stephen Hawking", "Physics"], ["Caroline Herschel", "Caroline Herschel", "Astronomy"],
  ["Euclid", "Euclid", "Mathematics"], ["Archimedes", "Archimedes", "Mathematics"], ["Carl Friedrich Gauss", "Carl Friedrich Gauss", "Mathematics"],
  ["Leonhard Euler", "Leonhard Euler", "Mathematics"], ["Emmy Noether", "Emmy Noether", "Mathematics"], ["Srinivasa Ramanujan", "Srinivasa Ramanujan", "Mathematics"],
  ["Frank Lloyd Wright", "Frank Lloyd Wright", "Architecture"], ["Antoni Gaudí", "Antoni Gaudí", "Architecture"], ["Le Corbusier", "Le Corbusier", "Architecture"],
  ["Coco Chanel", "Coco Chanel", "Fashion"], ["Auguste Rodin", "Auguste Rodin", "Sculpture"], ["Ansel Adams", "Ansel Adams", "Photography"],
  ["Alfred Hitchcock", "Alfred Hitchcock", "Film direction"], ["Charlie Chaplin", "Charlie Chaplin", "Film"], ["Akira Kurosawa", "Akira Kurosawa", "Film"],
  ["Mahatma Gandhi", "Mahatma Gandhi", "Political leadership"], ["Nelson Mandela", "Nelson Mandela", "Political leadership"],
  ["Simón Bolívar", "Simón Bolívar", "Political and military leadership"], ["Winston Churchill", "Winston Churchill", "Political leadership"],
];

const NATIONALITIES = [
  ["Albert Einstein", "Albert Einstein", "German"], ["Isaac Newton", "Isaac Newton", "English"], ["Marie Curie", "Marie Curie", "Polish"],
  ["Charles Darwin", "Charles Darwin", "English"], ["Louis Pasteur", "Louis Pasteur", "French"], ["Nikola Tesla", "Nikola Tesla", "Serbian"],
  ["Galileo Galilei", "Galileo Galilei", "Italian"], ["Leonardo da Vinci", "Leonardo da Vinci", "Italian"], ["Michelangelo", "Michelangelo", "Italian"],
  ["Rembrandt", "Rembrandt", "Dutch"], ["Vincent van Gogh", "Vincent van Gogh", "Dutch"], ["Pablo Picasso", "Pablo Picasso", "Spanish"],
  ["Salvador Dalí", "Salvador Dalí", "Spanish"], ["Francisco Goya", "Francisco Goya", "Spanish"], ["Claude Monet", "Claude Monet", "French"],
  ["Edvard Munch", "Edvard Munch", "Norwegian"], ["Gustav Klimt", "Gustav Klimt", "Austrian"], ["Frida Kahlo", "Frida Kahlo", "Mexican"],
  ["Johann Sebastian Bach", "Johann Sebastian Bach", "German"], ["Ludwig van Beethoven", "Ludwig van Beethoven", "German"],
  ["Wolfgang Amadeus Mozart", "Wolfgang Amadeus Mozart", "Austrian"], ["Joseph Haydn", "Joseph Haydn", "Austrian"],
  ["Frédéric Chopin", "Frédéric Chopin", "Polish"], ["Franz Liszt", "Franz Liszt", "Hungarian"], ["Antonín Dvořák", "Antonín Dvořák", "Czech"],
  ["Jean Sibelius", "Jean Sibelius", "Finnish"], ["Edvard Grieg", "Edvard Grieg", "Norwegian"], ["Pyotr Ilyich Tchaikovsky", "Pyotr Ilyich Tchaikovsky", "Russian"],
  ["Giuseppe Verdi", "Giuseppe Verdi", "Italian"], ["Giacomo Puccini", "Giacomo Puccini", "Italian"], ["Antonio Vivaldi", "Antonio Vivaldi", "Italian"],
  ["William Shakespeare", "William Shakespeare", "English"], ["Charles Dickens", "Charles Dickens", "English"], ["Jane Austen", "Jane Austen", "English"],
  ["James Joyce", "James Joyce", "Irish"], ["Oscar Wilde", "Oscar Wilde", "Irish"], ["Samuel Beckett", "Samuel Beckett", "Irish"],
  ["Leo Tolstoy", "Leo Tolstoy", "Russian"], ["Fyodor Dostoevsky", "Fyodor Dostoevsky", "Russian"], ["Anton Chekhov", "Anton Chekhov", "Russian"],
  ["Victor Hugo", "Victor Hugo", "French"], ["Marcel Proust", "Marcel Proust", "French"], ["Albert Camus", "Albert Camus", "French"],
  ["Franz Kafka", "Franz Kafka", "Czech"], ["Thomas Mann", "Thomas Mann", "German"], ["Johann Wolfgang von Goethe", "Johann Wolfgang von Goethe", "German"],
  ["Henrik Ibsen", "Henrik Ibsen", "Norwegian"], ["Miguel de Cervantes", "Miguel de Cervantes", "Spanish"], ["Jorge Luis Borges", "Jorge Luis Borges", "Argentine"],
  ["Gabriel García Márquez", "Gabriel García Márquez", "Colombian"], ["Pablo Neruda", "Pablo Neruda", "Chilean"], ["Chinua Achebe", "Chinua Achebe", "Nigerian"],
  ["Rabindranath Tagore", "Rabindranath Tagore", "Indian"], ["Haruki Murakami", "Haruki Murakami", "Japanese"], ["Confucius", "Confucius", "Chinese"],
  ["Ibn Sina", "Avicenna", "Persian"], ["Al-Khwarizmi", "Al-Khwarizmi", "Persian"],   ["Kurt Gödel", "Kurt Gödel", "Austrian"], ["Alan Turing", "Alan Turing", "English"], ["Ada Lovelace", "Ada Lovelace", "English"],
  ["Alexander Fleming", "Alexander Fleming", "Scottish"], ["James Watt", "James Watt", "Scottish"], ["Adam Smith", "Adam Smith", "Scottish"],
  ["David Hume", "David Hume", "Scottish"], ["Alfred Nobel", "Alfred Nobel", "Swedish"], ["Carl Linnaeus", "Carl Linnaeus", "Swedish"],
  ["Niels Bohr", "Niels Bohr", "Danish"], ["Hans Christian Andersen", "Hans Christian Andersen", "Danish"], ["Roald Amundsen", "Roald Amundsen", "Norwegian"],
];

const PHILOSOPHERS = [
  ["Plato", "Plato", "The Republic"], ["Aristotle", "Aristotle", "Nicomachean Ethics"], ["Immanuel Kant", "Immanuel Kant", "Critique of Pure Reason"],
  ["René Descartes", "René Descartes", "Meditations on First Philosophy"], ["Thomas Hobbes", "Thomas Hobbes", "Leviathan"],
  ["John Stuart Mill", "John Stuart Mill", "On Liberty"], ["Friedrich Nietzsche", "Friedrich Nietzsche", "Thus Spoke Zarathustra"],
  ["Niccolò Machiavelli", "Niccolò Machiavelli", "The Prince"], ["Jean-Jacques Rousseau", "Jean-Jacques Rousseau", "The Social Contract"],
  ["Karl Marx", "Karl Marx", "Das Kapital"], ["Adam Smith", "Adam Smith", "The Wealth of Nations"], ["Simone de Beauvoir", "Simone de Beauvoir", "The Second Sex"],
  ["Ludwig Wittgenstein", "Ludwig Wittgenstein", "Tractatus Logico-Philosophicus"], ["Sun Tzu", "Sun Tzu", "The Art of War"],
  ["Marcus Aurelius", "Marcus Aurelius", "Meditations"], ["Saint Augustine", "Augustine of Hippo", "Confessions"],
  ["Thomas Aquinas", "Thomas Aquinas", "Summa Theologica"], ["Baruch Spinoza", "Baruch Spinoza", "Ethics"],
];

const SCIENTIST_PRIZES = [
  ["The first person to win two Nobel Prizes", "Marie Curie", "Marie Curie"], ["The father of modern taxonomy", "Carl Linnaeus", "Carl Linnaeus"],
  ["The father of geometry", "Euclid", "Euclid"], ["The father of medicine", "Hippocrates", "Hippocrates"],
  ["The father of history", "Herodotus", "Herodotus"], ["The father of modern chemistry", "Antoine Lavoisier", "Antoine Lavoisier"],
  ["The father of genetics", "Gregor Mendel", "Gregor Mendel"], ["The father of computer science", "Alan Turing", "Alan Turing"],
  ["The father of the atomic bomb", "J. Robert Oppenheimer", "J. Robert Oppenheimer"], ["The mother of modern nursing", "Florence Nightingale", "Florence Nightingale"],
];

export const PEOPLE_FAMILIES = [
  {
    category: "History", levels: [1, 3], facts: FIELDS,
    forms: [
      { prompt: (person) => `In which field did ${person} work?`, explain: (person, field) => `${person} worked in ${soft(field)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: NATIONALITIES,
    forms: [
      { prompt: (person) => `What nationality was ${person}?`, explain: (person, nationality) => `${person} was ${nationality}.` },
    ],
  },
  {
    category: "Literature", levels: [3, 4], facts: PHILOSOPHERS,
    forms: [
      { prompt: (person) => `Which work is by ${person}?`, explain: (person, work) => `${person} wrote ${work}.` },
      { reverse: true, prompt: (person, work) => `Who wrote ${work}?`, explain: (person, work) => `${work} is by ${person}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: SCIENTIST_PRIZES,
    forms: [
      { prompt: (title) => `Who is called ${soft(title)}?`, explain: (title, person) => `${person} is called ${soft(title)}.` },
    ],
  },
];
