// More art, film, stage and the places that keep them.
import { soft } from "./case.js";
const MORE_PAINTINGS = [
  ["The Anatomy Lesson of Dr Nicolaes Tulp", "The Anatomy Lesson of Dr. Nicolaes Tulp", "Rembrandt"], ["The Jewish Bride", "The Jewish Bride", "Rembrandt"],
  ["View of Delft", "View of Delft", "Johannes Vermeer"], ["The Art of Painting", "The Art of Painting", "Johannes Vermeer"],
  ["The Astronomer", "The Astronomer (Vermeer)", "Johannes Vermeer"], ["Café Terrace at Night", "Café Terrace at Night", "Vincent van Gogh"],
  ["The Potato Eaters", "The Potato Eaters", "Vincent van Gogh"], ["Irises", "Irises (painting)", "Vincent van Gogh"],
  ["Bal du moulin de la Galette", "Bal du moulin de la Galette", "Pierre-Auguste Renoir"], ["The Dance Class", "The Dance Class", "Edgar Degas"],
  ["Olympia", "Olympia (Manet)", "Édouard Manet"], ["Le Déjeuner sur l'herbe", "Le Déjeuner sur l'herbe", "Édouard Manet"],
  ["A Bar at the Folies-Bergère", "A Bar at the Folies-Bergère", "Édouard Manet"], ["Rouen Cathedral", "Rouen Cathedral (Monet series)", "Claude Monet"],
  ["Mont Sainte-Victoire", "Mont Sainte-Victoire (Cézanne)", "Paul Cézanne"], ["Where Do We Come From?", "Where Do We Come From? What Are We? Where Are We Going?", "Paul Gauguin"],
  ["The Old Guitarist", "The Old Guitarist", "Pablo Picasso"], ["The Weeping Woman", "The Weeping Woman", "Pablo Picasso"],
  ["The Son of Man", "The Son of Man", "René Magritte"], ["The Treachery of Images", "The Treachery of Images", "René Magritte"],
  ["Broadway Boogie Woogie", "Broadway Boogie Woogie", "Piet Mondrian"], ["Number 1, 1950 (Lavender Mist)", "Lavender Mist", "Jackson Pollock"],
  ["Campbell's Soup Cans", "Campbell's Soup Cans", "Andy Warhol"], ["Marilyn Diptych", "Marilyn Diptych", "Andy Warhol"],
  ["The Dream", "The Dream (Rousseau painting)", "Henri Rousseau"], ["Dance", "Dance (Matisse)", "Henri Matisse"],
  ["The Sleeping Gypsy", "The Sleeping Gypsy", "Henri Rousseau"], ["The Death of Marat", "The Death of Marat", "Jacques-Louis David"],
  ["Napoleon Crossing the Alps", "Napoleon Crossing the Alps", "Jacques-Louis David"], ["The Oath of the Horatii", "Oath of the Horatii", "Jacques-Louis David"],
  ["Wanderer above the Sea of Fog", "Wanderer above the Sea of Fog", "Caspar David Friedrich"], ["Saturn Devouring His Son", "Saturn Devouring His Son", "Francisco Goya"],
  ["The Naked Maja", "La maja desnuda", "Francisco Goya"], ["The Calling of St Matthew", "The Calling of Saint Matthew", "Caravaggio"],
  ["Judith Slaying Holofernes", "Artemisia Gentileschi", "Artemisia Gentileschi"],
  ["The Descent from the Cross", "The Descent from the Cross (Rubens)", "Peter Paul Rubens"], ["The Tower of Babel", "The Tower of Babel (Bruegel)", "Pieter Bruegel the Elder"],
  ["The Isenheim Altarpiece", "Isenheim Altarpiece", "Matthias Grünewald"], ["Melencolia I", "Melencolia I", "Albrecht Dürer"],
  ["The Annunciation", "Annunciation (Fra Angelico, San Marco)", "Fra Angelico"], ["The Sistine Chapel ceiling", "Sistine Chapel ceiling", "Michelangelo"],
];

const MORE_FILMS = [
  ["North by Northwest", "North by Northwest", "Alfred Hitchcock"], ["The Birds", "The Birds (film)", "Alfred Hitchcock"],
  ["A Clockwork Orange", "A Clockwork Orange (film)", "Stanley Kubrick"], ["Barry Lyndon", "Barry Lyndon", "Stanley Kubrick"],
  ["The Conversation", "The Conversation", "Francis Ford Coppola"], ["Raging Bull", "Raging Bull", "Martin Scorsese"],
  ["The Departed", "The Departed", "Martin Scorsese"], ["E.T. the Extra-Terrestrial", "E.T. the Extra-Terrestrial", "Steven Spielberg"],
  ["Raiders of the Lost Ark", "Raiders of the Lost Ark", "Steven Spielberg"], ["Saving Private Ryan", "Saving Private Ryan", "Steven Spielberg"],
  ["Ran", "Ran (film)", "Akira Kurosawa"], ["Yojimbo", "Yojimbo (film)", "Akira Kurosawa"],
  ["Wild Strawberries", "Wild Strawberries (film)", "Ingmar Bergman"], ["Persona", "Persona (1966 film)", "Ingmar Bergman"],
  ["Amarcord", "Amarcord", "Federico Fellini"], ["Tokyo Story", "Tokyo Story", "Yasujirō Ozu"],
  ["Spirited Away", "Spirited Away", "Hayao Miyazaki"], ["My Neighbor Totoro", "My Neighbor Totoro", "Hayao Miyazaki"],
  ["Princess Mononoke", "Princess Mononoke", "Hayao Miyazaki"], ["Reservoir Dogs", "Reservoir Dogs", "Quentin Tarantino"],
  ["Gladiator", "Gladiator (2000 film)", "Ridley Scott"], ["Inception", "Inception", "Christopher Nolan"],
  ["Memento", "Memento (film)", "Christopher Nolan"], ["The Dark Knight", "The Dark Knight", "Christopher Nolan"],
  ["Fargo", "Fargo (1996 film)", "Joel and Ethan Coen"], ["No Country for Old Men", "No Country for Old Men (film)", "Joel and Ethan Coen"],
  ["Do the Right Thing", "Do the Right Thing", "Spike Lee"], ["Roma", "Roma (2018 film)", "Alfonso Cuarón"],
  ["Pan's Labyrinth", "Pan's Labyrinth", "Guillermo del Toro"], ["City of God", "City of God (2002 film)", "Fernando Meirelles"],
  ["Cinema Paradiso", "Cinema Paradiso", "Giuseppe Tornatore"], ["Amélie", "Amélie", "Jean-Pierre Jeunet"],
  ["Run Lola Run", "Run Lola Run", "Tom Tykwer"], ["The Lives of Others", "The Lives of Others", "Florian Henckel von Donnersmarck"],
  ["Crouching Tiger, Hidden Dragon", "Crouching Tiger, Hidden Dragon", "Ang Lee"], ["In the Mood for Love", "In the Mood for Love", "Wong Kar-wai"],
  ["Oldboy", "Oldboy (2003 film)", "Park Chan-wook"], ["The Sound of Music", "The Sound of Music (film)", "Robert Wise"],
  ["Lawrence of Arabia", "Lawrence of Arabia (film)", "David Lean"], ["The Bridge on the River Kwai", "The Bridge on the River Kwai", "David Lean"],
];

const MUSEUMS = [
  ["The Louvre", "Louvre", "Paris"], ["The Musée d'Orsay", "Musée d'Orsay", "Paris"], ["The Centre Pompidou", "Centre Pompidou", "Paris"],
  ["The Uffizi", "Uffizi", "Florence"], ["The Vatican Museums", "Vatican Museums", "Vatican City"], ["The Prado", "Museo del Prado", "Madrid"],
  ["The Reina Sofía", "Museo Reina Sofía", "Madrid"], ["The Rijksmuseum", "Rijksmuseum", "Amsterdam"], ["The Van Gogh Museum", "Van Gogh Museum", "Amsterdam"],
  ["The British Museum", "British Museum", "London"], ["The National Gallery", "National Gallery", "London"], ["Tate Modern", "Tate Modern", "London"],
  ["The Victoria and Albert Museum", "Victoria and Albert Museum", "London"], ["The Hermitage", "Hermitage Museum", "Saint Petersburg"],
  ["The Metropolitan Museum of Art", "Metropolitan Museum of Art", "New York City"], ["The Museum of Modern Art", "Museum of Modern Art", "New York City"],
  ["The Art Institute", "Art Institute of Chicago", "Chicago"], ["The Getty Center", "Getty Center", "Los Angeles"],
  ["The Pergamon Museum", "Pergamon Museum", "Berlin"], ["The Kunsthistorisches Museum", "Kunsthistorisches Museum", "Vienna"],
  ["The Egyptian Museum", "Egyptian Museum", "Cairo"], ["The National Palace Museum", "National Palace Museum", "Taipei"],
];

const MUSICALS = [
  ["The Phantom of the Opera", "The Phantom of the Opera (1986 musical)", "Andrew Lloyd Webber"], ["Cats", "Cats (musical)", "Andrew Lloyd Webber"],
  ["Evita", "Evita (musical)", "Andrew Lloyd Webber"], ["Jesus Christ Superstar", "Jesus Christ Superstar", "Andrew Lloyd Webber"],
  ["West Side Story", "West Side Story", "Leonard Bernstein"], ["Oklahoma!", "Oklahoma!", "Richard Rodgers"],
  ["The Sound of Music", "The Sound of Music", "Richard Rodgers"], ["The King and I", "The King and I", "Richard Rodgers"],
  ["Hamilton", "Hamilton (musical)", "Lin-Manuel Miranda"], ["In the Heights", "In the Heights", "Lin-Manuel Miranda"],
  ["Les Misérables", "Les Misérables (musical)", "Claude-Michel Schönberg"], ["Miss Saigon", "Miss Saigon", "Claude-Michel Schönberg"],
  ["Sweeney Todd", "Sweeney Todd: The Demon Barber of Fleet Street", "Stephen Sondheim"], ["Into the Woods", "Into the Woods", "Stephen Sondheim"],
  ["Fiddler on the Roof", "Fiddler on the Roof", "Jerry Bock"], ["Chicago", "Chicago (musical)", "John Kander"],
];

const DANCE = [
  ["The waltz", "Waltz", "Austria"], ["The tango", "Tango", "Argentina"], ["The flamenco", "Flamenco", "Spain"],
  ["The samba", "Samba", "Brazil"], ["The salsa", "Salsa (dance)", "Cuba"], ["The polka", "Polka", "Bohemia"],
  ["The Charleston", "Charleston (dance)", "The United States"], ["Ballet", "Ballet", "Italy"], ["The hula", "Hula", "Hawaii"],
  ["The Highland fling", "Highland dance", "Scotland"], ["Kathak", "Kathak", "India"], ["Capoeira", "Capoeira", "Brazil"],
];

export const CULTURE2_FAMILIES = [
  {
    category: "Arts", levels: [3, 4], facts: MORE_PAINTINGS,
    forms: [
      { prompt: (title) => `Who painted ${title}?`, explain: (title, painter) => `${title} was painted by ${painter}.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: MORE_FILMS,
    forms: [
      { prompt: (title) => `Who directed ${title}?`, explain: (title, director) => `${title} was directed by ${director}.` },
    ],
  },
  {
    category: "Arts", levels: [1, 3], facts: MUSEUMS,
    forms: [
      { prompt: (museum) => `In which city is ${museum.replace("The ", "the ")}?`, explain: (museum, city) => `${museum} is in ${city}.` },
      { reverse: true, prompt: (museum, city) => `Which of these museums is in ${city}?`, explain: (museum, city) => `${museum} is in ${city}.` },
    ],
  },
  {
    category: "Music", levels: [2, 4], facts: MUSICALS,
    forms: [
      { prompt: (musical) => `Who wrote the music for ${musical}?`, explain: (musical, composer) => `${musical} has music by ${composer}.` },
    ],
  },
  {
    category: "Music", levels: [1, 3], facts: DANCE,
    forms: [
      { prompt: (dance) => `Where did ${soft(dance)} originate?`, explain: (dance, place) => `${dance} originated in ${place}.` },
    ],
  },
];
