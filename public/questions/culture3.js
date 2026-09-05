// The rest of the concert hall, the gallery wall and the reading room.
import { soft } from "./case.js";
const CONCERTOS = [
  ["The Concierto de Aranjuez", "Concierto de Aranjuez", "Joaquín Rodrigo"],
  ["The Piano Concerto in A minor", "Piano Concerto (Grieg)", "Edvard Grieg"],
  ["The Violin Concerto in E minor", "Violin Concerto (Mendelssohn)", "Felix Mendelssohn"],
  ["The Cello Concerto in B minor", "Cello Concerto (Dvořák)", "Antonín Dvořák"],
  ["The Piano Concerto No. 1 in B-flat minor", "Piano Concerto No. 1 (Tchaikovsky)", "Pyotr Ilyich Tchaikovsky"],
  ["The Violin Concerto in D major of 1878", "Violin Concerto (Tchaikovsky)", "Pyotr Ilyich Tchaikovsky"],
  ["The Concerto for Orchestra", "Concerto for Orchestra (Bartók)", "Béla Bartók"],
  ["The Clarinet Quintet in A major", "Clarinet Quintet (Mozart)", "Wolfgang Amadeus Mozart"],
  ["The Piano Quintet 'The Trout'", "Trout Quintet", "Franz Schubert"],
  ["The Carnival Overture", "Carnival Overture", "Antonín Dvořák"],
];

const BALLETS = [
  ["Giselle", "Giselle", "Adolphe Adam"], ["Coppélia", "Coppélia", "Léo Delibes"], ["Sylvia", "Sylvia (ballet)", "Léo Delibes"],
  ["La Bayadère", "La Bayadère", "Ludwig Minkus"], ["Don Quixote", "Don Quixote (ballet)", "Ludwig Minkus"],
  ["Cinderella", "Cinderella (Prokofiev)", "Sergei Prokofiev"], ["Spartacus", "Spartacus (ballet)", "Aram Khachaturian"],
  ["Gayaneh", "Gayane (ballet)", "Aram Khachaturian"], ["Appalachian Spring's choreography", "Appalachian Spring", "Aaron Copland"],
];

const JAZZ_AND_POPULAR = [
  ["Louis Armstrong", "Louis Armstrong", "Trumpet"], ["Duke Ellington", "Duke Ellington", "Piano"],
  ["Charlie Parker", "Charlie Parker", "Alto saxophone"], ["John Coltrane", "John Coltrane", "Tenor saxophone"],
  ["Miles Davis", "Miles Davis", "Trumpet"], ["Thelonious Monk", "Thelonious Monk", "Piano"],
  ["Ella Fitzgerald", "Ella Fitzgerald", "Voice"], ["Billie Holiday", "Billie Holiday", "Voice"],
  ["Django Reinhardt", "Django Reinhardt", "Guitar"], ["Benny Goodman", "Benny Goodman", "Clarinet"],
  ["Dizzy Gillespie", "Dizzy Gillespie", "Trumpet"], ["Art Tatum", "Art Tatum", "Piano"],
  ["Charles Mingus", "Charles Mingus", "Double bass"], ["Jelly Roll Morton", "Jelly Roll Morton", "Piano"],
];

const SCULPTORS_AND_ARTISTS = [
  ["Barbara Hepworth", "Barbara Hepworth", "Sculpture"], ["Henry Moore", "Henry Moore", "Sculpture"],
  ["Alberto Giacometti", "Alberto Giacometti", "Sculpture"], ["Louise Bourgeois", "Louise Bourgeois", "Sculpture"],
  ["Alexander Calder", "Alexander Calder", "Mobiles and sculpture"], ["Donatello", "Donatello", "Sculpture"],
  ["Antonio Canova", "Antonio Canova", "Sculpture"], ["Käthe Kollwitz", "Käthe Kollwitz", "Printmaking and sculpture"],
  ["Albrecht Dürer", "Albrecht Dürer", "Printmaking and painting"], ["Katsushika Hokusai", "Hokusai", "Woodblock printing"],
  ["Utagawa Hiroshige", "Hiroshige", "Woodblock printing"], ["Mary Cassatt", "Mary Cassatt", "Painting and printmaking"],
  ["Georgia O'Keeffe", "Georgia O'Keeffe", "Painting"], ["Artemisia Gentileschi", "Artemisia Gentileschi", "Painting"],
  ["Ansel Adams", "Ansel Adams", "Photography"], ["Henri Cartier-Bresson", "Henri Cartier-Bresson", "Photography"],
  ["Dorothea Lange", "Dorothea Lange", "Photography"], ["Yayoi Kusama", "Yayoi Kusama", "Installation art"],
];

const OPERA_VOICES = [
  ["Carmen", "Carmen", "Mezzo-soprano"], ["The Queen of the Night", "The Magic Flute", "Soprano"],
  ["Figaro in The Barber of Seville", "The Barber of Seville", "Baritone"], ["Sarastro", "The Magic Flute", "Bass"],
  ["Violetta", "La traviata", "Soprano"], ["Rodolfo", "La bohème", "Tenor"],
  ["Mimì", "La bohème", "Soprano"], ["Don Giovanni", "Don Giovanni", "Baritone"],
];

const LIBRARIES_AND_ARCHIVES = [
  ["The Library of Alexandria", "Library of Alexandria", "The great library of the ancient world"],
  ["The Bodleian Library", "Bodleian Library", "The main research library of Oxford"],
  ["The Vatican Library", "Vatican Library", "One of the oldest libraries in the world"],
  ["The Library of Congress", "Library of Congress", "The research library of the United States Congress"],
  ["The British Library", "British Library", "The national library of the United Kingdom"],
  ["The Bibliothèque nationale de France", "Bibliothèque nationale de France", "The national library of France"],
  ["The Dead Sea Scrolls", "Dead Sea Scrolls", "Ancient Jewish manuscripts found near the Dead Sea"],
  ["The Book of Kells", "Book of Kells", "An illuminated gospel book made in early medieval Ireland"],
  ["The Domesday Book", "Domesday Book", "The great survey of England completed in 1086"],
  ["The Gutenberg Bible", "Gutenberg Bible", "The first major book printed with movable type in Europe"],
];

export const CULTURE3_FAMILIES = [
  {
    category: "Music", levels: [3, 4], facts: CONCERTOS,
    forms: [
      { prompt: (work) => `Who composed ${work.replace("The ", "the ")}?`, explain: (work, composer) => `${work} is by ${composer}.` },
    ],
  },
  {
    category: "Music", levels: [3, 4], facts: BALLETS,
    forms: [
      { prompt: (ballet) => `Who wrote the music for the ballet ${ballet}?`, explain: (ballet, composer) => `${ballet} has music by ${composer}.` },
    ],
  },
  {
    category: "Music", levels: [2, 4], facts: JAZZ_AND_POPULAR,
    forms: [
      { prompt: (musician) => `Which instrument is ${musician} best known for?`, explain: (musician, instrument) => `${musician} is known for the ${soft(instrument)}.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: SCULPTORS_AND_ARTISTS,
    forms: [
      { prompt: (artist) => `In which art form did ${artist} chiefly work?`, explain: (artist, form) => `${artist} worked chiefly in ${soft(form)}.` },
    ],
  },
  {
    category: "Music", levels: [3, 4], facts: OPERA_VOICES,
    forms: [
      { prompt: (role) => `Which voice type sings ${role}?`, explain: (role, voice) => `${role} is sung by a ${soft(voice)}.` },
    ],
  },
  {
    category: "Literature", levels: [2, 4], facts: LIBRARIES_AND_ARCHIVES, identify: true,
    forms: [
      { prompt: (thing) => `What is ${thing.replace("The ", "the ")}?`, explain: (thing, note) => `${thing}: ${soft(note)}.` },
    ],
  },
];
