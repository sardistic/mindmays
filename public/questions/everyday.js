// Everyday knowledge: time and calendars, colours and gems, transport and building.
import { soft } from "./case.js";
const MONTHS = [
  ["January", "January", "Janus"], ["March", "March", "Mars"], ["May", "May", "Maia"], ["June", "June", "Juno"],
  ["July", "July", "Julius Caesar"], ["August", "August", "Augustus"], ["September", "September", "Seven"],
  ["October", "October", "Eight"], ["November", "November", "Nine"], ["December", "December", "Ten"],
];

const CALENDARS = [
  ["The calendar used in most of the world today", "Gregorian calendar", "The Gregorian calendar"],
  ["The calendar introduced by Julius Caesar", "Julian calendar", "The Julian calendar"],
  ["The lunar calendar of Islam", "Islamic calendar", "The Islamic calendar"],
  ["The lunisolar calendar of Judaism", "Hebrew calendar", "The Hebrew calendar"],
  ["The traditional lunisolar calendar of China", "Chinese calendar", "The Chinese calendar"],
  ["A year with an extra day in February", "Leap year", "A leap year"],
  ["The day the sun is highest or lowest at noon", "Solstice", "A solstice"],
  ["The day when day and night are of equal length", "Equinox", "An equinox"],
];

const GEMSTONES = [
  ["Ruby", "Ruby", "Red"], ["Emerald", "Emerald", "Green"], ["Sapphire", "Sapphire", "Blue"], ["Amethyst", "Amethyst", "Purple"],
  ["Topaz", "Topaz", "Yellow"], ["Turquoise", "Turquoise", "Blue-green"], ["Garnet", "Garnet", "Deep red"], ["Peridot", "Peridot", "Olive green"],
  ["Onyx", "Onyx", "Black"], ["Opal", "Opal", "Iridescent"], ["Jade", "Jade", "Green"], ["Lapis lazuli", "Lapis lazuli", "Deep blue"],
];

const COLOURS = [
  ["Red, yellow and blue", "Primary color", "The traditional primary colours"], ["Red, green and blue", "RGB color model", "The additive primaries of light"],
  ["Cyan, magenta and yellow", "CMYK color model", "The subtractive primaries of printing"],
  ["Colours opposite one another on the wheel", "Complementary colors", "Complementary colours"],
  ["The band of colours in sunlight", "Visible spectrum", "The visible spectrum"],
  ["The property distinguishing one colour from another", "Hue", "Hue"],
  ["The intensity or purity of a colour", "Colorfulness", "Saturation"],
];

const TRANSPORT = [
  ["The Wright Flyer", "Wright Flyer", "The first powered aeroplane"], ["Concorde", "Concorde", "A supersonic airliner"],
  ["The Spirit of St. Louis", "Spirit of St. Louis", "Lindbergh's transatlantic aircraft"], ["The Hindenburg", "LZ 129 Hindenburg", "A German passenger airship"],
  ["The Titanic", "Titanic", "An ocean liner lost on its maiden voyage"], ["The Mayflower", "Mayflower", "The ship carrying the Pilgrims to New England"],
  ["The Cutty Sark", "Cutty Sark", "A surviving tea clipper"], ["The Rocket", "Stephenson's Rocket", "An early steam locomotive"],
  ["The Flying Scotsman", "Flying Scotsman", "A famous British steam locomotive"], ["The Model T", "Ford Model T", "The first mass-produced affordable car"],
  ["The Trans-Siberian Railway", "Trans-Siberian Railway", "The longest railway line in the world"], ["The Channel Tunnel", "Channel Tunnel", "The rail tunnel under the English Channel"],
  ["The Shinkansen", "Shinkansen", "Japan's high-speed rail network"], ["The Orient Express", "Orient Express", "A long-distance luxury passenger train"],
];

const ARCHITECTURE_TERMS = [
  ["A curved structure spanning an opening", "Arch", "An arch"], ["A rounded roof forming the top of a building", "Dome", "A dome"],
  ["An upright support, often round", "Column", "A column"], ["A projecting support against a wall", "Buttress", "A buttress"],
  ["An arched support standing away from the wall", "Flying buttress", "A flying buttress"],
  ["The triangular space above a classical portico", "Pediment", "A pediment"], ["A covered walkway with columns", "Colonnade", "A colonnade"],
  ["A grotesque waterspout carved as a figure", "Gargoyle", "A gargoyle"], ["A round window with radiating tracery", "Rose window", "A rose window"],
  ["An open courtyard surrounded by covered walks", "Cloister", "A cloister"], ["A tall pointed structure on a roof", "Spire", "A spire"],
  ["The horizontal band resting on columns", "Entablature", "An entablature"],
];

const ARCHITECTURE_STYLES = [
  ["Pointed arches, ribbed vaults and flying buttresses", "Gothic architecture", "Gothic"],
  ["Round arches, thick walls and small windows", "Romanesque architecture", "Romanesque"],
  ["Symmetry, columns and classical proportion revived", "Renaissance architecture", "Renaissance"],
  ["Drama, movement and rich ornament", "Baroque architecture", "Baroque"],
  ["Light, asymmetrical and highly decorative", "Rococo", "Rococo"],
  ["Steel frames, glass and an absence of ornament", "Modern architecture", "Modernism"],
  ["Flowing organic lines drawn from plants", "Art Nouveau", "Art Nouveau"],
  ["Bold geometry, rich colour and stylised form", "Art Deco", "Art Deco"],
  ["Raw exposed concrete and heavy blocky form", "Brutalist architecture", "Brutalism"],
];

const CLOTHING_ORIGINS = [
  ["The kimono", "Kimono", "Japan"], ["The sari", "Sari", "India"], ["The kilt", "Kilt", "Scotland"], ["The poncho", "Poncho", "South America"],
  ["The sombrero", "Sombrero", "Mexico"], ["The dirndl", "Dirndl", "Austria and Bavaria"], ["The hanbok", "Hanbok", "Korea"],
  ["The kaftan", "Kaftan", "The Middle East"], ["The beret", "Beret", "France and Spain"], ["The fez", "Fez (hat)", "Morocco"],
  ["The clogs", "Clog", "The Netherlands"], ["The kente cloth", "Kente cloth", "Ghana"],
];

export const EVERYDAY_FAMILIES = [
  {
    category: "Language", levels: [2, 4], facts: MONTHS,
    forms: [
      { prompt: (month) => `The month of ${month} takes its name from what?`, explain: (month, origin) => `${month} is named for ${soft(origin)}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: CALENDARS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Earth Science", levels: [1, 3], facts: GEMSTONES,
    forms: [
      { prompt: (gem) => `What colour is ${soft(gem)} typically?`, explain: (gem, colour) => `${gem} is typically ${soft(colour)}.` },
    ],
  },
  {
    category: "Arts", levels: [1, 3], facts: COLOURS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Technology", levels: [1, 3], facts: TRANSPORT,
    forms: [
      { prompt: (thing) => `What was ${thing.replace("The ", "the ")}?`, explain: (thing, description) => `${thing}: ${soft(description)}.` },
      { reverse: true, prompt: (thing, description) => `Which of these is ${soft(description)}?`, explain: (thing, description) => `That is ${soft(thing)}.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: ARCHITECTURE_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `In architecture, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: ARCHITECTURE_STYLES, describe: true,
    forms: [
      { prompt: (features) => `Which architectural style is marked by ${soft(features)}?`, explain: (features, style) => `Those are the marks of ${style}.` },
    ],
  },
  {
    category: "Geography", levels: [1, 3], facts: CLOTHING_ORIGINS,
    forms: [
      { prompt: (garment) => `From where does ${soft(garment)} come?`, explain: (garment, place) => `${garment} comes from ${place}.` },
    ],
  },
];
