// Further reading and looking: poets, playwrights, prizes, and works by their opening idea.
import { soft } from "./case.js";
const POETS = [
  ["William Wordsworth", "William Wordsworth", "England"], ["Samuel Taylor Coleridge", "Samuel Taylor Coleridge", "England"],
  ["John Keats", "John Keats", "England"], ["Percy Bysshe Shelley", "Percy Bysshe Shelley", "England"],
  ["Lord Byron", "Lord Byron", "England"], ["William Blake", "William Blake", "England"],
  ["Alfred, Lord Tennyson", "Alfred, Lord Tennyson", "England"], ["Robert Browning", "Robert Browning", "England"],
  ["Emily Dickinson", "Emily Dickinson", "The United States"], ["Walt Whitman", "Walt Whitman", "The United States"],
  ["Robert Frost", "Robert Frost", "The United States"], ["Langston Hughes", "Langston Hughes", "The United States"],
  ["Maya Angelou", "Maya Angelou", "The United States"], ["Sylvia Plath", "Sylvia Plath", "The United States"],
  ["W. B. Yeats", "W. B. Yeats", "Ireland"], ["Seamus Heaney", "Seamus Heaney", "Ireland"],
  ["Dylan Thomas", "Dylan Thomas", "Wales"], ["Robert Burns", "Robert Burns", "Scotland"],
  ["Charles Baudelaire", "Charles Baudelaire", "France"], ["Arthur Rimbaud", "Arthur Rimbaud", "France"],
  ["Rainer Maria Rilke", "Rainer Maria Rilke", "Austria"], ["Federico García Lorca", "Federico García Lorca", "Spain"],
  ["Anna Akhmatova", "Anna Akhmatova", "Russia"], ["Alexander Pushkin", "Alexander Pushkin", "Russia"],
  ["Matsuo Bashō", "Matsuo Bashō", "Japan"], ["Rumi", "Rumi", "Persia"],
  ["Omar Khayyam", "Omar Khayyam", "Persia"], ["Kahlil Gibran", "Kahlil Gibran", "Lebanon"],
];

const SHAKESPEARE_LINES = [
  ["To be, or not to be", "To be, or not to be", "Hamlet"], ["Now is the winter of our discontent", "Richard III (play)", "Richard III"],
  ["All the world's a stage", "All the world's a stage", "As You Like It"], ["Friends, Romans, countrymen", "Julius Caesar (play)", "Julius Caesar"],
  ["Double, double toil and trouble", "Macbeth", "Macbeth"], ["A horse! a horse! my kingdom for a horse!", "Richard III (play)", "Richard III"],
  ["The quality of mercy is not strained", "The Merchant of Venice", "The Merchant of Venice"], ["If music be the food of love, play on", "Twelfth Night", "Twelfth Night"],
  ["Once more unto the breach", "Henry V (play)", "Henry V"], ["The course of true love never did run smooth", "A Midsummer Night's Dream", "A Midsummer Night's Dream"],
];

const SHAKESPEARE_TYPES = [
  ["Hamlet", "Hamlet", "Tragedy"], ["Macbeth", "Macbeth", "Tragedy"], ["King Lear", "King Lear", "Tragedy"],
  ["Othello", "Othello", "Tragedy"], ["Romeo and Juliet", "Romeo and Juliet", "Tragedy"], ["Julius Caesar", "Julius Caesar (play)", "Tragedy"],
  ["Twelfth Night", "Twelfth Night", "Comedy"], ["As You Like It", "As You Like It", "Comedy"], ["Much Ado About Nothing", "Much Ado About Nothing", "Comedy"],
  ["The Comedy of Errors", "The Comedy of Errors", "Comedy"], ["The Taming of the Shrew", "The Taming of the Shrew", "Comedy"],
  ["Henry V", "Henry V (play)", "History"], ["Richard III", "Richard III (play)", "History"], ["Henry IV, Part 1", "Henry IV, Part 1", "History"],
  ["The Tempest", "The Tempest", "Romance"], ["The Winter's Tale", "The Winter's Tale", "Romance"],
];

const AWARDS = [
  ["The highest honour in physics, chemistry and medicine", "Nobel Prize", "The Nobel Prize"],
  ["The American award for achievement in film", "Academy Awards", "The Academy Award"],
  ["The British award for achievement in film and television", "British Academy Film Awards", "The BAFTA"],
  ["The chief American award for the stage", "Tony Awards", "The Tony Award"],
  ["The chief award for recorded music", "Grammy Awards", "The Grammy Award"],
  ["The American prize for journalism and letters", "Pulitzer Prize", "The Pulitzer Prize"],
  ["The leading British prize for a novel", "Booker Prize", "The Booker Prize"],
  ["The top prize at the Cannes festival", "Palme d'Or", "The Palme d'Or"],
  ["The highest honour in mathematics for those under forty", "Fields Medal", "The Fields Medal"],
  ["The prize regarded as the Nobel of computing", "Turing Award", "The Turing Award"],
  ["The chief prize in architecture", "Pritzker Architecture Prize", "The Pritzker Prize"],
  ["The leading award for American television", "Emmy Awards", "The Emmy Award"],
];

const FAIRY_TALES = [
  ["Cinderella", "Cinderella", "A folk tale collected by Perrault and the Grimms"],
  ["The Little Mermaid", "The Little Mermaid", "Hans Christian Andersen"],
  ["The Ugly Duckling", "The Ugly Duckling", "Hans Christian Andersen"],
  ["The Emperor's New Clothes", "The Emperor's New Clothes", "Hans Christian Andersen"],
  ["Hansel and Gretel", "Hansel and Gretel", "The Brothers Grimm"],
  ["Rumpelstiltskin", "Rumpelstiltskin", "The Brothers Grimm"],
  ["Snow White", "Snow White", "The Brothers Grimm"],
  ["Rapunzel", "Rapunzel", "The Brothers Grimm"],
  ["Puss in Boots", "Puss in Boots", "Charles Perrault"],
  ["Sleeping Beauty", "Sleeping Beauty", "Charles Perrault"],
  ["One Thousand and One Nights", "One Thousand and One Nights", "A collection of Middle Eastern folk tales"],
  ["Aesop's Fables", "Aesop's Fables", "Aesop"],
];

const COMPOSERS_ERAS = [
  ["Johann Sebastian Bach", "Johann Sebastian Bach", "Baroque"], ["George Frideric Handel", "George Frideric Handel", "Baroque"],
  ["Antonio Vivaldi", "Antonio Vivaldi", "Baroque"], ["Claudio Monteverdi", "Claudio Monteverdi", "Renaissance and early Baroque"],
  ["Joseph Haydn", "Joseph Haydn", "Classical"], ["Wolfgang Amadeus Mozart", "Wolfgang Amadeus Mozart", "Classical"],
  ["Franz Schubert", "Franz Schubert", "Early Romantic"], ["Frédéric Chopin", "Frédéric Chopin", "Romantic"],
  ["Robert Schumann", "Robert Schumann", "Romantic"], ["Johannes Brahms", "Johannes Brahms", "Romantic"],
  ["Richard Wagner", "Richard Wagner", "Romantic"], ["Gustav Mahler", "Gustav Mahler", "Late Romantic"],
  ["Claude Debussy", "Claude Debussy", "Impressionist"], ["Maurice Ravel", "Maurice Ravel", "Impressionist"],
  ["Igor Stravinsky", "Igor Stravinsky", "Modernist"], ["Arnold Schoenberg", "Arnold Schoenberg", "Modernist"],
  ["Philip Glass", "Philip Glass", "Minimalist"], ["Steve Reich", "Steve Reich", "Minimalist"],
];

const PHOTOGRAPHY_AND_PRINT = [
  ["An image formed on a silvered copper plate", "Daguerreotype", "A daguerreotype"],
  ["A print made from an inked engraved metal plate", "Etching", "An etching"],
  ["A print made from a carved wooden block", "Woodcut", "A woodcut"],
  ["A print made from a greasy drawing on stone", "Lithography", "A lithograph"],
  ["A print pushed through a stencilled mesh", "Screen printing", "A screen print"],
  ["A picture assembled from pasted fragments", "Collage", "A collage"],
  ["A picture made from small pieces of coloured glass or stone", "Mosaic", "A mosaic"],
  ["Painting on wet plaster so the colour becomes part of the wall", "Fresco", "A fresco"],
  ["A painting made with pigment bound in egg", "Tempera", "Tempera"],
  ["A sculpture cut away from a solid block", "Sculpture", "A carving"],
];

export const ARTS3_FAMILIES = [
  {
    category: "Literature", levels: [2, 4], facts: POETS,
    forms: [
      { prompt: (poet) => `${poet} is associated with which country?`, explain: (poet, country) => `${poet} is associated with ${country}.` },
    ],
  },
  {
    category: "Literature", levels: [2, 4], facts: SHAKESPEARE_LINES,
    forms: [
      { prompt: (line) => `From which play does the line "${line}" come?`, explain: (line, play) => `That line is from ${play}.` },
    ],
  },
  {
    category: "Literature", levels: [1, 3], facts: SHAKESPEARE_TYPES,
    forms: [
      { prompt: (play) => `${play} is classed as which kind of Shakespeare play?`, explain: (play, kind) => `${play} is ${/^[aeiou]/i.test(kind) ? "an" : "a"} ${soft(kind)}.` },
    ],
  },
  {
    category: "Arts", levels: [1, 3], facts: AWARDS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, award) => `That is ${soft(award)}.` },
    ],
  },
  {
    category: "Literature", levels: [1, 3], facts: FAIRY_TALES,
    forms: [
      { prompt: (tale) => `Who told or collected ${tale}?`, explain: (tale, teller) => `${tale}: ${teller}.` },
    ],
  },
  {
    category: "Music", levels: [2, 4], facts: COMPOSERS_ERAS,
    forms: [
      { prompt: (composer) => `${composer} belongs to which musical period?`, explain: (composer, era) => `${composer} belongs to the ${era} period.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: PHOTOGRAPHY_AND_PRINT, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
];
