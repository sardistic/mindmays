// More music: further works, the shape of a score, and the instruments' families.
import { soft } from "./case.js";
const MORE_WORKS = [
  ["The Emperor Concerto", "Piano Concerto No. 5 (Beethoven)", "Ludwig van Beethoven"], ["The Pastoral Symphony", "Symphony No. 6 (Beethoven)", "Ludwig van Beethoven"],
  ["The Pathétique Sonata", "Piano Sonata No. 8 (Beethoven)", "Ludwig van Beethoven"], ["The Violin Concerto in D major", "Violin Concerto (Beethoven)", "Ludwig van Beethoven"],
  ["The Art of Fugue", "The Art of Fugue", "Johann Sebastian Bach"], ["The Musical Offering", "The Musical Offering", "Johann Sebastian Bach"],
  ["The Toccata and Fugue in D minor", "Toccata and Fugue in D minor, BWV 565", "Johann Sebastian Bach"], ["The Cello Suites", "Cello Suites (Bach)", "Johann Sebastian Bach"],
  ["The Requiem in D minor", "Requiem (Mozart)", "Wolfgang Amadeus Mozart"], ["Così fan tutte", "Così fan tutte", "Wolfgang Amadeus Mozart"],
  ["The Clarinet Concerto in A major", "Clarinet Concerto (Mozart)", "Wolfgang Amadeus Mozart"], ["The Abduction from the Seraglio", "Die Entführung aus dem Serail", "Wolfgang Amadeus Mozart"],
  ["The Trout Quintet", "Trout Quintet", "Franz Schubert"], ["The Unfinished Symphony", "Symphony No. 8 (Schubert)", "Franz Schubert"],
  ["Winterreise", "Winterreise", "Franz Schubert"], ["Carnaval", "Carnaval (Schumann)", "Robert Schumann"],
  ["The Hungarian Dances", "Hungarian Dances", "Johannes Brahms"], ["The Violin Concerto in D major", "Violin Concerto (Brahms)", "Johannes Brahms"],
  ["The Nocturnes", "Nocturnes (Chopin)", "Frédéric Chopin"], ["The Revolutionary Étude", "Étude Op. 10, No. 12 (Chopin)", "Frédéric Chopin"],
  ["The Minute Waltz", "Minute Waltz", "Frédéric Chopin"], ["La campanella", "La campanella", "Franz Liszt"],
  ["The Symphonie fantastique", "Symphonie fantastique", "Hector Berlioz"], ["The Damnation of Faust", "La damnation de Faust", "Hector Berlioz"],
  ["Má vlast", "Má vlast", "Bedřich Smetana"], ["The Slavonic Dances", "Slavonic Dances", "Antonín Dvořák"],
  ["The Peer Gynt Suites", "Peer Gynt (Grieg)", "Edvard Grieg"], ["The Cello Concerto in E minor", "Cello Concerto (Elgar)", "Edward Elgar"],
  ["The Lark Ascending", "The Lark Ascending", "Ralph Vaughan Williams"], ["Fantasia on a Theme by Thomas Tallis", "Fantasia on a Theme by Thomas Tallis", "Ralph Vaughan Williams"],
  ["The Young Person's Guide to the Orchestra", "The Young Person's Guide to the Orchestra", "Benjamin Britten"], ["The War Requiem", "War Requiem", "Benjamin Britten"],
  ["Gymnopédies", "Gymnopédies", "Erik Satie"], ["Pavane pour une infante défunte", "Pavane pour une infante défunte", "Maurice Ravel"],
  ["Daphnis et Chloé", "Daphnis et Chloé", "Maurice Ravel"], ["The Threepenny Opera", "The Threepenny Opera", "Kurt Weill"],
  ["Romeo and Juliet", "Romeo and Juliet (Prokofiev)", "Sergei Prokofiev"], ["The Piano Concerto No. 2", "Piano Concerto No. 2 (Rachmaninoff)", "Sergei Rachmaninoff"],
  ["The Rhapsody on a Theme of Paganini", "Rhapsody on a Theme of Paganini", "Sergei Rachmaninoff"], ["The Leningrad Symphony", "Symphony No. 7 (Shostakovich)", "Dmitri Shostakovich"],
  ["An American in Paris", "An American in Paris", "George Gershwin"], ["Fanfare for the Common Man", "Fanfare for the Common Man", "Aaron Copland"],
  ["Rodeo", "Rodeo (ballet)", "Aaron Copland"], ["Adagio for Strings", "Adagio for Strings", "Samuel Barber"],
  ["The Rite of Spring's riotous premiere venue", "Théâtre des Champs-Élysées", "Igor Stravinsky"],
];

const OPERA_SETTINGS = [
  ["Carmen", "Carmen", "Seville"], ["Aida", "Aida", "Ancient Egypt"], ["Madama Butterfly", "Madama Butterfly", "Nagasaki"],
  ["Tosca", "Tosca", "Rome"], ["La bohème", "La bohème", "Paris"], ["The Marriage of Figaro", "The Marriage of Figaro", "Seville"],
  ["Turandot", "Turandot", "Peking"], ["Rigoletto", "Rigoletto", "Mantua"], ["Otello", "Otello", "Cyprus"],
  ["Der Rosenkavalier", "Der Rosenkavalier", "Vienna"],
];

const NOTE_VALUES = [
  ["A semibreve", "Whole note", "Four beats"], ["A minim", "Half note", "Two beats"], ["A crotchet", "Quarter note", "One beat"],
  ["A quaver", "Eighth note", "Half a beat"], ["A semiquaver", "Sixteenth note", "A quarter of a beat"],
];

const CLEFS_AND_SCALES = [
  ["The clef used for higher-pitched instruments", "Clef", "The treble clef"], ["The clef used for lower-pitched instruments", "Clef", "The bass clef"],
  ["A scale of seven notes in the pattern of the white keys from C", "Major scale", "The major scale"],
  ["A scale with a lowered third degree", "Minor scale", "The minor scale"],
  ["A scale of all twelve semitones", "Chromatic scale", "The chromatic scale"],
  ["A scale of five notes", "Pentatonic scale", "The pentatonic scale"],
  ["A scale of whole tones only", "Whole tone scale", "The whole tone scale"],
  ["The interval spanning eight scale degrees", "Octave", "An octave"],
  ["The interval of three whole tones", "Tritone", "The tritone"],
  ["A chord of three notes", "Triad (music)", "A triad"],
];

const VOICE_TYPES = [
  ["The highest female voice", "Soprano", "Soprano"], ["The female voice between soprano and contralto", "Mezzo-soprano", "Mezzo-soprano"],
  ["The lowest female voice", "Contralto", "Contralto"], ["The highest common male voice", "Tenor", "Tenor"],
  ["The male voice between tenor and bass", "Baritone", "Baritone"], ["The lowest male voice", "Bass (voice type)", "Bass"],
  ["A male voice singing in the female range", "Countertenor", "Countertenor"],
];

const GENRES = [
  ["Jazz", "Jazz", "New Orleans"], ["The blues", "Blues", "The American South"], ["Reggae", "Reggae", "Jamaica"],
  ["Calypso", "Calypso music", "Trinidad and Tobago"], ["Fado", "Fado", "Portugal"], ["Tango music", "Tango music", "Argentina and Uruguay"],
  ["Bossa nova", "Bossa nova", "Brazil"], ["Highlife", "Highlife", "Ghana"], ["Rai", "Raï", "Algeria"],
  ["Flamenco", "Flamenco", "Andalusia"], ["Country music", "Country music", "The southern United States"], ["K-pop", "K-pop", "South Korea"],
  ["Bhangra", "Bhangra (music)", "Punjab"], ["Gamelan music", "Gamelan", "Java and Bali"],
];

const INSTRUMENT_PARTS = [
  ["The bridge", "Bridge (instrument)", "It transfers the strings' vibration to the body"],
  ["The fret", "Fret", "It marks where a string is stopped on the fingerboard"],
  ["The reed", "Reed (mouthpiece)", "It vibrates to make the sound in woodwinds"],
  ["The valve", "Brass instrument", "It redirects air through extra tubing on brass instruments"],
  ["The soundhole", "Sound hole", "It lets the body of the instrument project sound"],
  ["The bow", "Bow (music)", "It is drawn across strings to sound them"],
  ["The pedal", "Piano pedals", "It sustains or softens the notes of a piano"],
];

export const MUSIC2_FAMILIES = [
  {
    category: "Music", levels: [3, 4], facts: MORE_WORKS,
    forms: [
      { prompt: (work) => `Who composed ${work.replace("The ", "the ")}?`, explain: (work, composer) => `${work} is by ${composer}.` },
    ],
  },
  {
    category: "Music", levels: [3, 4], facts: OPERA_SETTINGS,
    forms: [
      { prompt: (opera) => `Where is the opera ${opera} set?`, explain: (opera, place) => `${opera} is set in ${place}.` },
    ],
  },
  {
    category: "Music", levels: [2, 3], facts: NOTE_VALUES,
    forms: [
      { prompt: (note) => `How long is ${soft(note)} in common time?`, explain: (note, length) => `${note} lasts ${soft(length)}.` },
    ],
  },
  {
    category: "Music", levels: [2, 4], facts: CLEFS_AND_SCALES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Music", levels: [1, 3], facts: VOICE_TYPES,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, voice) => `That is the ${soft(voice)}.` },
      { reverse: true, prompt: (definition, voice) => `The ${soft(voice)} voice is best described as what?`, explain: (definition, voice) => `${voice}: ${soft(definition)}.` },
    ],
  },
  {
    category: "Music", levels: [1, 3], facts: GENRES,
    forms: [
      { prompt: (genre) => `Where did ${soft(genre)} originate?`, explain: (genre, place) => `${genre} originated in ${place}.` },
    ],
  },
  {
    category: "Music", levels: [2, 3], facts: INSTRUMENT_PARTS, identify: true,
    forms: [
      { prompt: (part) => `What does ${soft(part)} of an instrument do?`, explain: (part, role) => `${part}: ${soft(role)}.` },
    ],
  },
];
