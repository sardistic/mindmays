// More literature: who else wrote what, who is in it, and where the words come from.
import { soft } from "./case.js";
const MORE_NOVELS = [
  ["Persuasion", "Persuasion (novel)", "Jane Austen"], ["Northanger Abbey", "Northanger Abbey", "Jane Austen"], ["Mansfield Park", "Mansfield Park", "Jane Austen"],
  ["Villette", "Villette (novel)", "Charlotte Brontë"], ["Shirley", "Shirley (novel)", "Charlotte Brontë"], ["Agnes Grey", "Agnes Grey", "Anne Brontë"],
  ["David Copperfield", "David Copperfield", "Charles Dickens"], ["Hard Times", "Hard Times (novel)", "Charles Dickens"], ["Little Dorrit", "Little Dorrit", "Charles Dickens"],
  ["Nicholas Nickleby", "Nicholas Nickleby", "Charles Dickens"], ["The Pickwick Papers", "The Pickwick Papers", "Charles Dickens"], ["Our Mutual Friend", "Our Mutual Friend", "Charles Dickens"],
  ["Silas Marner", "Silas Marner", "George Eliot"], ["The Mill on the Floss", "The Mill on the Floss", "George Eliot"], ["Far from the Madding Crowd", "Far from the Madding Crowd", "Thomas Hardy"],
  ["The Mayor of Casterbridge", "The Mayor of Casterbridge", "Thomas Hardy"], ["Jude the Obscure", "Jude the Obscure", "Thomas Hardy"], ["Billy Budd", "Billy Budd", "Herman Melville"],
  ["The House of the Seven Gables", "The House of the Seven Gables", "Nathaniel Hawthorne"], ["The Adventures of Tom Sawyer", "The Adventures of Tom Sawyer", "Mark Twain"],
  ["Tender Is the Night", "Tender Is the Night", "F. Scott Fitzgerald"], ["For Whom the Bell Tolls", "For Whom the Bell Tolls", "Ernest Hemingway"],
  ["A Farewell to Arms", "A Farewell to Arms", "Ernest Hemingway"], ["East of Eden", "East of Eden (novel)", "John Steinbeck"], ["Cannery Row", "Cannery Row (novel)", "John Steinbeck"],
  ["Song of Solomon", "Song of Solomon (novel)", "Toni Morrison"], ["The Bluest Eye", "The Bluest Eye", "Toni Morrison"], ["Slaughterhouse-Five", "Slaughterhouse-Five", "Kurt Vonnegut"],
  ["Cat's Cradle", "Cat's Cradle", "Kurt Vonnegut"], ["On the Road", "On the Road", "Jack Kerouac"], ["The Catcher in the Rye", "The Catcher in the Rye", "J. D. Salinger"],
  ["Fahrenheit 451", "Fahrenheit 451", "Ray Bradbury"], ["The Martian Chronicles", "The Martian Chronicles", "Ray Bradbury"], ["Dune", "Dune (novel)", "Frank Herbert"],
  ["Foundation", "Foundation (Asimov novel)", "Isaac Asimov"], ["I, Robot", "I, Robot", "Isaac Asimov"], ["The Left Hand of Darkness", "The Left Hand of Darkness", "Ursula K. Le Guin"],
  ["A Wizard of Earthsea", "A Wizard of Earthsea", "Ursula K. Le Guin"], ["Neuromancer", "Neuromancer", "William Gibson"], ["Do Androids Dream of Electric Sheep?", "Do Androids Dream of Electric Sheep?", "Philip K. Dick"],
  ["The Time Machine", "The Time Machine", "H. G. Wells"], ["The War of the Worlds", "The War of the Worlds", "H. G. Wells"], ["The Invisible Man", "The Invisible Man", "H. G. Wells"],
  ["Twenty Thousand Leagues Under the Seas", "Twenty Thousand Leagues Under the Seas", "Jules Verne"], ["Around the World in Eighty Days", "Around the World in Eighty Days", "Jules Verne"],
  ["Journey to the Center of the Earth", "Journey to the Center of the Earth", "Jules Verne"], ["Kidnapped", "Kidnapped (novel)", "Robert Louis Stevenson"],
  ["Strange Case of Dr Jekyll and Mr Hyde", "Strange Case of Dr Jekyll and Mr Hyde", "Robert Louis Stevenson"], ["The Jungle Book", "The Jungle Book", "Rudyard Kipling"],
  ["Kim", "Kim (novel)", "Rudyard Kipling"], ["Lord Jim", "Lord Jim", "Joseph Conrad"], ["Nostromo", "Nostromo", "Joseph Conrad"],
  ["A Portrait of the Artist as a Young Man", "A Portrait of the Artist as a Young Man", "James Joyce"], ["Finnegans Wake", "Finnegans Wake", "James Joyce"],
  ["Orlando", "Orlando: A Biography", "Virginia Woolf"], ["A Room of One's Own", "A Room of One's Own", "Virginia Woolf"], ["The Waves", "The Waves", "Virginia Woolf"],
  ["Resurrection", "Resurrection (Tolstoy novel)", "Leo Tolstoy"], ["The Death of Ivan Ilyich", "The Death of Ivan Ilyich", "Leo Tolstoy"],
  ["The Idiot", "The Idiot", "Fyodor Dostoevsky"], ["Notes from Underground", "Notes from Underground", "Fyodor Dostoevsky"], ["Demons", "Demons (Dostoevsky novel)", "Fyodor Dostoevsky"],
  ["The Master and Margarita", "The Master and Margarita", "Mikhail Bulgakov"], ["One Day in the Life of Ivan Denisovich", "One Day in the Life of Ivan Denisovich", "Aleksandr Solzhenitsyn"],
  ["Sentimental Education", "Sentimental Education", "Gustave Flaubert"], ["The Hunchback of Notre-Dame", "The Hunchback of Notre-Dame", "Victor Hugo"],
  ["Germinal", "Germinal (novel)", "Émile Zola"], ["Nana", "Nana (novel)", "Émile Zola"], ["The Plague", "The Plague (novel)", "Albert Camus"],
  ["Nausea", "Nausea (novel)", "Jean-Paul Sartre"], ["The Little Prince", "The Little Prince", "Antoine de Saint-Exupéry"],
  ["The Castle", "The Castle (novel)", "Franz Kafka"], ["Death in Venice", "Death in Venice", "Thomas Mann"], ["The Magic Mountain", "The Magic Mountain", "Thomas Mann"],
  ["Siddhartha", "Siddhartha (novel)", "Hermann Hesse"], ["Steppenwolf", "Steppenwolf (novel)", "Hermann Hesse"], ["All Quiet on the Western Front", "All Quiet on the Western Front", "Erich Maria Remarque"],
  ["Love in the Time of Cholera", "Love in the Time of Cholera", "Gabriel García Márquez"], ["The House of the Spirits", "The House of the Spirits", "Isabel Allende"],
  ["Ficciones", "Ficciones", "Jorge Luis Borges"], ["Pedro Páramo", "Pedro Páramo", "Juan Rulfo"], ["The Alchemist", "The Alchemist (novel)", "Paulo Coelho"],
  ["Norwegian Wood", "Norwegian Wood (novel)", "Haruki Murakami"], ["Kafka on the Shore", "Kafka on the Shore", "Haruki Murakami"],
  ["The Tale of Genji", "The Tale of Genji", "Murasaki Shikibu"], ["Snow Country", "Snow Country", "Yasunari Kawabata"],
  ["Half of a Yellow Sun", "Half of a Yellow Sun", "Chimamanda Ngozi Adichie"], ["The Remains of the Day", "The Remains of the Day", "Kazuo Ishiguro"],
  ["Wide Sargasso Sea", "Wide Sargasso Sea", "Jean Rhys"], ["Rebecca", "Rebecca (novel)", "Daphne du Maurier"],
  ["Brideshead Revisited", "Brideshead Revisited", "Evelyn Waugh"], ["A Passage to India", "A Passage to India", "E. M. Forster"],
  ["Howards End", "Howards End", "E. M. Forster"], ["The Heart of the Matter", "The Heart of the Matter", "Graham Greene"],
  ["The Quiet American", "The Quiet American", "Graham Greene"], ["Lucky Jim", "Lucky Jim", "Kingsley Amis"],
  ["A Clockwork Orange", "A Clockwork Orange (novel)", "Anthony Burgess"], ["The Golden Notebook", "The Golden Notebook", "Doris Lessing"],
];

const CHARACTERS = [
  ["Elizabeth Bennet", "Pride and Prejudice", "Pride and Prejudice"], ["Mr Darcy", "Mr. Darcy", "Pride and Prejudice"],
  ["Heathcliff", "Heathcliff (Wuthering Heights)", "Wuthering Heights"], ["Ebenezer Scrooge", "Ebenezer Scrooge", "A Christmas Carol"],
  ["Miss Havisham", "Miss Havisham", "Great Expectations"], ["Fagin", "Fagin", "Oliver Twist"], ["Captain Ahab", "Captain Ahab", "Moby-Dick"],
  ["Hester Prynne", "Hester Prynne", "The Scarlet Letter"], ["Jay Gatsby", "Jay Gatsby", "The Great Gatsby"], ["Holden Caulfield", "Holden Caulfield", "The Catcher in the Rye"],
  ["Atticus Finch", "Atticus Finch", "To Kill a Mockingbird"], ["Winston Smith", "Winston Smith", "Nineteen Eighty-Four"],
  ["Big Brother", "Big Brother (Nineteen Eighty-Four)", "Nineteen Eighty-Four"], ["Napoleon the pig", "Animal Farm", "Animal Farm"],
  ["Bilbo Baggins", "Bilbo Baggins", "The Hobbit"], ["Frodo Baggins", "Frodo Baggins", "The Lord of the Rings"], ["Gandalf", "Gandalf", "The Lord of the Rings"],
  ["Sherlock Holmes", "Sherlock Holmes", "A Study in Scarlet"], ["Dr Watson", "Dr. Watson", "A Study in Scarlet"],
  ["Long John Silver", "Long John Silver", "Treasure Island"], ["The Cheshire Cat", "Cheshire Cat", "Alice's Adventures in Wonderland"],
  ["Mowgli", "Mowgli", "The Jungle Book"], ["Dorian Gray", "The Picture of Dorian Gray", "The Picture of Dorian Gray"],
  ["Jean Valjean", "Jean Valjean", "Les Misérables"], ["Quasimodo", "Quasimodo", "The Hunchback of Notre-Dame"],
  ["Edmond Dantès", "The Count of Monte Cristo", "The Count of Monte Cristo"], ["Raskolnikov", "Crime and Punishment", "Crime and Punishment"],
  ["Anna Karenina", "Anna Karenina", "Anna Karenina"], ["Emma Bovary", "Madame Bovary", "Madame Bovary"],
  ["Gregor Samsa", "The Metamorphosis", "The Metamorphosis"], ["Josef K.", "The Trial", "The Trial"],
  ["Sancho Panza", "Sancho Panza", "Don Quixote"], ["Robinson Crusoe", "Robinson Crusoe", "Robinson Crusoe"],
  ["Lemuel Gulliver", "Gulliver's Travels", "Gulliver's Travels"], ["Victor Frankenstein", "Victor Frankenstein", "Frankenstein"],
  ["Jonathan Harker", "Jonathan Harker", "Dracula"], ["Piggy", "Lord of the Flies", "Lord of the Flies"],
  ["Yossarian", "Catch-22", "Catch-22"], ["Okonkwo", "Things Fall Apart", "Things Fall Apart"],
  ["Offred", "The Handmaid's Tale", "The Handmaid's Tale"], ["Paul Atreides", "Dune (novel)", "Dune"],
  ["Ishmael", "Moby-Dick", "Moby-Dick"], ["Tiny Tim", "Tiny Tim (A Christmas Carol)", "A Christmas Carol"],
];

const NOBEL_LITERATURE = [
  ["Rudyard Kipling", "Rudyard Kipling", "The United Kingdom"], ["Rabindranath Tagore", "Rabindranath Tagore", "India"],
  ["George Bernard Shaw", "George Bernard Shaw", "Ireland"], ["Thomas Mann", "Thomas Mann", "Germany"],
  ["Ernest Hemingway", "Ernest Hemingway", "The United States"], ["Albert Camus", "Albert Camus", "France"],
  ["Jean-Paul Sartre", "Jean-Paul Sartre", "France"], ["Pablo Neruda", "Pablo Neruda", "Chile"],
  ["Gabriel García Márquez", "Gabriel García Márquez", "Colombia"], ["Toni Morrison", "Toni Morrison", "The United States"],
  ["Wole Soyinka", "Wole Soyinka", "Nigeria"], ["Naguib Mahfouz", "Naguib Mahfouz", "Egypt"],
  ["Olga Tokarczuk", "Olga Tokarczuk", "Poland"],
  ["Yasunari Kawabata", "Yasunari Kawabata", "Japan"],
  ["Selma Lagerlöf", "Selma Lagerlöf", "Sweden"], ["Seamus Heaney", "Seamus Heaney", "Ireland"],
];

const LITERARY_TERMS = [
  ["A story with a hidden moral or political meaning", "Allegory", "Allegory"], ["A long narrative poem about heroic deeds", "Epic poetry", "An epic"],
  ["A fourteen-line poem", "Sonnet", "A sonnet"], ["A three-line Japanese poem of seventeen sounds", "Haiku", "A haiku"],
  ["A poem mourning the dead", "Elegy", "An elegy"], ["A poem addressed to a person or thing", "Ode", "An ode"],
  ["A story within a story", "Frame story", "A frame story"], ["A hint of what is to come", "Foreshadowing", "Foreshadowing"],
  ["The turning point of a plot", "Climax (narrative)", "The climax"], ["The resolution after the climax", "Dénouement", "The dénouement"],
  ["A character who contrasts with the protagonist", "Foil (literature)", "A foil"], ["A narrator who cannot be trusted", "Unreliable narrator", "An unreliable narrator"],
  ["A speech delivered by a character alone on stage", "Soliloquy", "A soliloquy"], ["A recurring symbol or idea", "Motif (narrative)", "A motif"],
  ["A flash-forward or flashback in time", "Flashback (narrative)", "A flashback"], ["Verse without rhyme in iambic pentameter", "Blank verse", "Blank verse"],
  ["Verse with neither regular rhyme nor metre", "Free verse", "Free verse"], ["An extended metaphor in metaphysical poetry", "Conceit", "A conceit"],
];

export const LITERATURE2_FAMILIES = [
  {
    category: "Literature", levels: [2, 4], facts: MORE_NOVELS,
    forms: [
      { prompt: (title) => `Who wrote ${title}?`, explain: (title, author) => `${title} was written by ${author}.` },
    ],
  },
  {
    category: "Literature", levels: [1, 3], facts: CHARACTERS,
    forms: [
      { prompt: (character) => `In which work does ${character} appear?`, explain: (character, work) => `${character} appears in ${work}.` },
      { reverse: true, prompt: (character, work) => `Which of these characters appears in ${work}?`, explain: (character, work) => `${character} appears in ${work}.` },
    ],
  },
  {
    category: "Literature", levels: [3, 4], facts: NOBEL_LITERATURE,
    forms: [
      { prompt: (writer) => `${writer} is most associated with which country?`, explain: (writer, country) => `${writer} is associated with ${country}.` },
    ],
  },
  {
    category: "Literature", levels: [1, 3], facts: LITERARY_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `What is the literary term for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
];
