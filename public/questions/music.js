// Music: who wrote what, what the instruments are, and what the markings mean.
import { soft } from "./case.js";
const WORKS = [
  ["The Ninth Symphony", "Symphony No. 9 (Beethoven)", "Ludwig van Beethoven"], ["The Fifth Symphony", "Symphony No. 5 (Beethoven)", "Ludwig van Beethoven"],
  ["The Moonlight Sonata", "Piano Sonata No. 14 (Beethoven)", "Ludwig van Beethoven"], ["Für Elise", "Für Elise", "Ludwig van Beethoven"],
  ["The Eroica Symphony", "Symphony No. 3 (Beethoven)", "Ludwig van Beethoven"], ["The Brandenburg Concertos", "Brandenburg Concertos", "Johann Sebastian Bach"],
  ["The Goldberg Variations", "Goldberg Variations", "Johann Sebastian Bach"], ["The Well-Tempered Clavier", "The Well-Tempered Clavier", "Johann Sebastian Bach"],
  ["The Mass in B minor", "Mass in B minor", "Johann Sebastian Bach"], ["The St Matthew Passion", "St Matthew Passion", "Johann Sebastian Bach"],
  ["The Magic Flute", "The Magic Flute", "Wolfgang Amadeus Mozart"], ["The Marriage of Figaro", "The Marriage of Figaro", "Wolfgang Amadeus Mozart"],
  ["Don Giovanni", "Don Giovanni", "Wolfgang Amadeus Mozart"], ["Eine kleine Nachtmusik", "Eine kleine Nachtmusik", "Wolfgang Amadeus Mozart"],
  ["The Jupiter Symphony", "Symphony No. 41 (Mozart)", "Wolfgang Amadeus Mozart"], ["The Messiah", "Messiah (Handel)", "George Frideric Handel"],
  ["Water Music", "Water Music", "George Frideric Handel"], ["Music for the Royal Fireworks", "Music for the Royal Fireworks", "George Frideric Handel"],
  ["The Four Seasons", "The Four Seasons (Vivaldi)", "Antonio Vivaldi"], ["The Surprise Symphony", "Symphony No. 94 (Haydn)", "Joseph Haydn"],
  ["The Creation", "The Creation (Haydn)", "Joseph Haydn"], ["The Nutcracker", "The Nutcracker", "Pyotr Ilyich Tchaikovsky"],
  ["Swan Lake", "Swan Lake", "Pyotr Ilyich Tchaikovsky"], ["The Sleeping Beauty", "The Sleeping Beauty (ballet)", "Pyotr Ilyich Tchaikovsky"],
  ["The 1812 Overture", "1812 Overture", "Pyotr Ilyich Tchaikovsky"], ["The Rite of Spring", "The Rite of Spring", "Igor Stravinsky"],
  ["The Firebird", "The Firebird", "Igor Stravinsky"], ["Petrushka", "Petrushka (ballet)", "Igor Stravinsky"],
  ["Boléro", "Boléro", "Maurice Ravel"], ["Clair de lune", "Suite bergamasque", "Claude Debussy"],
  ["Prélude à l'après-midi d'un faune", "Prélude à l'après-midi d'un faune", "Claude Debussy"], ["La mer", "La mer (Debussy)", "Claude Debussy"],
  ["The New World Symphony", "Symphony No. 9 (Dvořák)", "Antonín Dvořák"], ["Finlandia", "Finlandia", "Jean Sibelius"],
  ["Peer Gynt", "Peer Gynt (Grieg)", "Edvard Grieg"], ["The Planets", "The Planets", "Gustav Holst"],
  ["Pomp and Circumstance", "Pomp and Circumstance Marches", "Edward Elgar"], ["The Enigma Variations", "Enigma Variations", "Edward Elgar"],
  ["Rhapsody in Blue", "Rhapsody in Blue", "George Gershwin"], ["Porgy and Bess", "Porgy and Bess", "George Gershwin"],
  ["Appalachian Spring", "Appalachian Spring", "Aaron Copland"], ["Carmen", "Carmen", "Georges Bizet"],
  ["La traviata", "La traviata", "Giuseppe Verdi"], ["Aida", "Aida", "Giuseppe Verdi"], ["Rigoletto", "Rigoletto", "Giuseppe Verdi"],
  ["La bohème", "La bohème", "Giacomo Puccini"], ["Tosca", "Tosca", "Giacomo Puccini"], ["Madama Butterfly", "Madama Butterfly", "Giacomo Puccini"],
  ["The Ring of the Nibelung", "Der Ring des Nibelungen", "Richard Wagner"], ["Tristan und Isolde", "Tristan und Isolde", "Richard Wagner"],
  ["The Barber of Seville", "The Barber of Seville", "Gioachino Rossini"], ["Peter and the Wolf", "Peter and the Wolf", "Sergei Prokofiev"],
  ["The Carnival of the Animals", "The Carnival of the Animals", "Camille Saint-Saëns"], ["Also sprach Zarathustra", "Also sprach Zarathustra (Strauss)", "Richard Strauss"],
  ["The Blue Danube", "The Blue Danube", "Johann Strauss II"], ["Pictures at an Exhibition", "Pictures at an Exhibition", "Modest Mussorgsky"],
  ["Scheherazade", "Scheherazade (Rimsky-Korsakov)", "Nikolai Rimsky-Korsakov"], ["The Hungarian Rhapsodies", "Hungarian Rhapsodies", "Franz Liszt"],
  ["The Wedding March from A Midsummer Night's Dream", "A Midsummer Night's Dream (Mendelssohn)", "Felix Mendelssohn"], ["The German Requiem", "A German Requiem (Brahms)", "Johannes Brahms"],
];

const TEMPO_TERMS = [
  ["Largo", "Tempo", "Very slow and broad"], ["Adagio", "Tempo", "Slow and stately"], ["Andante", "Tempo", "At a walking pace"],
  ["Moderato", "Tempo", "At a moderate speed"], ["Allegro", "Tempo", "Fast and bright"], ["Vivace", "Tempo", "Lively"],
  ["Presto", "Tempo", "Very fast"], ["Prestissimo", "Tempo", "As fast as possible"], ["Lento", "Tempo", "Slow"], ["Grave", "Tempo", "Slow and solemn"],
];

const DYNAMICS = [
  ["Pianissimo", "Dynamics (music)", "Very quiet"], ["Piano", "Dynamics (music)", "Quiet"], ["Mezzo-piano", "Dynamics (music)", "Moderately quiet"],
  ["Mezzo-forte", "Dynamics (music)", "Moderately loud"], ["Forte", "Dynamics (music)", "Loud"], ["Fortissimo", "Dynamics (music)", "Very loud"],
  ["Crescendo", "Dynamics (music)", "Growing gradually louder"], ["Diminuendo", "Dynamics (music)", "Growing gradually quieter"],
];

const INSTRUMENT_FAMILIES = [
  ["The violin", "Violin", "Strings"], ["The cello", "Cello", "Strings"], ["The viola", "Viola", "Strings"], ["The double bass", "Double bass", "Strings"],
  ["The harp", "Harp", "Strings"], ["The flute", "Flute", "Woodwind"], ["The oboe", "Oboe", "Woodwind"], ["The clarinet", "Clarinet", "Woodwind"],
  ["The bassoon", "Bassoon", "Woodwind"], ["The saxophone", "Saxophone", "Woodwind"], ["The trumpet", "Trumpet", "Brass"], ["The trombone", "Trombone", "Brass"],
  ["The French horn", "French horn", "Brass"], ["The tuba", "Tuba", "Brass"], ["The timpani", "Timpani", "Percussion"], ["The snare drum", "Snare drum", "Percussion"],
  ["The xylophone", "Xylophone", "Percussion"], ["The triangle", "Triangle (musical instrument)", "Percussion"], ["The celesta", "Celesta", "Percussion"], ["The marimba", "Marimba", "Percussion"],
];

const INSTRUMENT_ORIGINS = [
  ["The sitar", "Sitar", "India"], ["The koto", "Koto (instrument)", "Japan"], ["The shamisen", "Shamisen", "Japan"], ["The erhu", "Erhu", "China"],
  ["The didgeridoo", "Didgeridoo", "Australia"], ["The bagpipes", "Bagpipes", "Scotland"], ["The balalaika", "Balalaika", "Russia"], ["The bouzouki", "Bouzouki", "Greece"],
  ["The kora", "Kora (instrument)", "West Africa"], ["The banjo", "Banjo", "The United States"], ["The accordion", "Accordion", "Germany"],
  ["The ukulele", "Ukulele", "Hawaii"], ["The steelpan", "Steelpan", "Trinidad and Tobago"], ["The gamelan", "Gamelan", "Indonesia"], ["The oud", "Oud", "The Middle East"],
];

const MUSIC_TERMS = [
  ["A composition for a solo instrument with orchestra", "Concerto", "A concerto"], ["A large work for orchestra in several movements", "Symphony", "A symphony"],
  ["A piece for a small group of players", "Chamber music", "Chamber music"], ["A dramatic work sung throughout", "Opera", "An opera"],
  ["A large sacred work for voices and orchestra without staging", "Oratorio", "An oratorio"], ["A short piece introducing a larger work", "Overture", "An overture"],
  ["A melody sung or played against itself at a delay", "Canon (music)", "A canon"], ["A composition built by imitative entries of one subject", "Fugue", "A fugue"],
  ["A song for a solo voice in an opera", "Aria", "An aria"], ["Sung speech that follows the rhythms of talking", "Recitative", "Recitative"],
  ["The simultaneous sounding of notes", "Chord (music)", "A chord"], ["The speed at which a piece is played", "Tempo", "Tempo"],
  ["The pattern of beats in a bar", "Time signature", "The time signature"], ["The distance between two pitches", "Interval (music)", "An interval"],
  ["The set of sharps or flats at the start of a stave", "Key signature", "The key signature"], ["A gradual slowing down", "Ritardando", "Ritardando"],
];

export const MUSIC_FAMILIES = [
  {
    category: "Music", levels: [1, 4], facts: WORKS,
    forms: [
      { prompt: (work) => `Who composed ${work.replace("The ", "the ")}?`, explain: (work, composer) => `${work} was composed by ${composer}.` },
      { reverse: true, prompt: (work, composer) => `Which of these works did ${composer} compose?`, explain: (work, composer) => `${composer} composed ${soft(work)}.` },
    ],
  },
  {
    category: "Music", levels: [2, 3], facts: TEMPO_TERMS,
    forms: [
      { prompt: (term) => `What does the tempo marking ${soft(term)} indicate?`, explain: (term, meaning) => `${term}: ${soft(meaning)}.` },
    ],
  },
  {
    category: "Music", levels: [1, 3], facts: DYNAMICS,
    forms: [
      { prompt: (term) => `What does the dynamic marking ${soft(term)} indicate?`, explain: (term, meaning) => `${term}: ${soft(meaning)}.` },
    ],
  },
  {
    category: "Music", levels: [1, 2], facts: INSTRUMENT_FAMILIES,
    forms: [
      { prompt: (instrument) => `To which orchestral family does ${soft(instrument)} belong?`, explain: (instrument, family) => `${instrument} belongs to the ${soft(family)}.` },
    ],
  },
  {
    category: "Music", levels: [2, 4], facts: INSTRUMENT_ORIGINS,
    forms: [
      { prompt: (instrument) => `From which country or region does ${soft(instrument)} come?`, explain: (instrument, place) => `${instrument} comes from ${place}.` },
    ],
  },
  {
    category: "Music", levels: [2, 4], facts: MUSIC_TERMS, identify: true,
    forms: [
      { prompt: (definition) => `What is the term for ${soft(definition)}?`, explain: (definition, term) => `${term}: ${soft(definition)}.` },
    ],
  },
];
