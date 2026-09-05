// Sport and games: hosts, rules, origins and the words that go with them.
import { soft } from "./case.js";
const SUMMER_OLYMPICS = [
  ["1896", "1896 Summer Olympics", "Athens"], ["1900", "1900 Summer Olympics", "Paris"], ["1904", "1904 Summer Olympics", "St. Louis"],
  ["1908", "1908 Summer Olympics", "London"], ["1912", "1912 Summer Olympics", "Stockholm"], ["1920", "1920 Summer Olympics", "Antwerp"],
  ["1924", "1924 Summer Olympics", "Paris"], ["1928", "1928 Summer Olympics", "Amsterdam"], ["1932", "1932 Summer Olympics", "Los Angeles"],
  ["1936", "1936 Summer Olympics", "Berlin"], ["1948", "1948 Summer Olympics", "London"], ["1952", "1952 Summer Olympics", "Helsinki"],
  ["1956", "1956 Summer Olympics", "Melbourne"], ["1960", "1960 Summer Olympics", "Rome"], ["1964", "1964 Summer Olympics", "Tokyo"],
  ["1968", "1968 Summer Olympics", "Mexico City"], ["1972", "1972 Summer Olympics", "Munich"], ["1976", "1976 Summer Olympics", "Montreal"],
  ["1980", "1980 Summer Olympics", "Moscow"], ["1984", "1984 Summer Olympics", "Los Angeles"], ["1988", "1988 Summer Olympics", "Seoul"],
  ["1992", "1992 Summer Olympics", "Barcelona"], ["1996", "1996 Summer Olympics", "Atlanta"], ["2000", "2000 Summer Olympics", "Sydney"],
  ["2004", "2004 Summer Olympics", "Athens"], ["2008", "2008 Summer Olympics", "Beijing"], ["2012", "2012 Summer Olympics", "London"],
  ["2016", "2016 Summer Olympics", "Rio de Janeiro"], ["2020", "2020 Summer Olympics", "Tokyo"], ["2024", "2024 Summer Olympics", "Paris"],
];

const WINTER_OLYMPICS = [
  ["1924", "1924 Winter Olympics", "Chamonix"], ["1932", "1932 Winter Olympics", "Lake Placid"], ["1936", "1936 Winter Olympics", "Garmisch-Partenkirchen"],
  ["1952", "1952 Winter Olympics", "Oslo"], ["1956", "1956 Winter Olympics", "Cortina d'Ampezzo"], ["1960", "1960 Winter Olympics", "Squaw Valley"],
  ["1964", "1964 Winter Olympics", "Innsbruck"], ["1968", "1968 Winter Olympics", "Grenoble"], ["1972", "1972 Winter Olympics", "Sapporo"],
  ["1976", "1976 Winter Olympics", "Innsbruck"], ["1980", "1980 Winter Olympics", "Lake Placid"], ["1984", "1984 Winter Olympics", "Sarajevo"],
  ["1988", "1988 Winter Olympics", "Calgary"], ["1992", "1992 Winter Olympics", "Albertville"], ["1994", "1994 Winter Olympics", "Lillehammer"],
  ["1998", "1998 Winter Olympics", "Nagano"], ["2002", "2002 Winter Olympics", "Salt Lake City"], ["2006", "2006 Winter Olympics", "Turin"],
  ["2010", "2010 Winter Olympics", "Vancouver"], ["2014", "2014 Winter Olympics", "Sochi"], ["2018", "2018 Winter Olympics", "Pyeongchang"],
  ["2022", "2022 Winter Olympics", "Beijing"],
];

const TEAM_SIZES = [
  ["Association football", "Association football", "11"], ["Cricket", "Cricket", "11"], ["Rugby union", "Rugby union", "15"],
  ["Rugby league", "Rugby league", "13"], ["Basketball", "Basketball", "5"], ["Ice hockey", "Ice hockey", "6"],
  ["Volleyball", "Volleyball", "6"], ["Water polo", "Water polo", "7"], ["Baseball", "Baseball", "9"], ["Netball", "Netball", "7"],
  ["Handball", "Handball", "7"], ["Polo", "Polo", "4"],
];

const SPORT_ORIGINS = [
  ["Sumo wrestling", "Sumo", "Japan"], ["Judo", "Judo", "Japan"], ["Karate", "Karate", "Japan"], ["Taekwondo", "Taekwondo", "Korea"],
  ["Kung fu", "Chinese martial arts", "China"], ["Table tennis", "Table tennis", "England"], ["Badminton", "Badminton", "England"],
  ["Cricket", "Cricket", "England"], ["Rugby football", "Rugby football", "England"], ["Golf", "Golf", "Scotland"],
  ["Curling", "Curling", "Scotland"], ["Basketball", "Basketball", "The United States"], ["Baseball", "Baseball", "The United States"],
  ["American football", "American football", "The United States"], ["Ice hockey", "Ice hockey", "Canada"], ["Lacrosse", "Lacrosse", "North America"],
  ["Capoeira", "Capoeira", "Brazil"], ["Muay Thai", "Muay Thai", "Thailand"], ["Pelota", "Basque pelota", "The Basque Country"], ["Hurling", "Hurling", "Ireland"],
];

const SPORT_TERMS = [
  ["Three strikes in a row in bowling", "Turkey (bowling)", "A turkey"], ["A score of one under par in golf", "Birdie (golf)", "A birdie"],
  ["A score of two under par in golf", "Eagle (golf)", "An eagle"], ["A score of one over par in golf", "Bogey (golf)", "A bogey"],
  ["Three goals by one player in football", "Hat-trick", "A hat-trick"], ["A zero score in tennis", "Tennis scoring system", "Love"],
  ["A tie at 40-40 in tennis", "Tennis scoring system", "Deuce"], ["A serve the receiver cannot touch in tennis", "Ace", "An ace"],
  ["A dismissal of three batters on consecutive balls in cricket", "Hat-trick", "A hat-trick"], ["The 26.2-mile race", "Marathon", "The marathon"],
  ["A race combining swimming, cycling and running", "Triathlon", "The triathlon"], ["The ten-event athletics contest", "Decathlon", "The decathlon"],
  ["The seven-event athletics contest for women", "Heptathlon", "The heptathlon"], ["A checkmate in two moves in chess", "Fool's mate", "Fool's mate"],
  ["The opening move privilege in chess", "White and Black in chess", "White moves first"], ["A draw by repeated position in chess", "Threefold repetition", "Threefold repetition"],
];

const SPORT_VENUES = [
  ["Wimbledon", "Wimbledon Championships", "Tennis"], ["The Tour de France", "Tour de France", "Cycling"], ["The Masters", "Masters Tournament", "Golf"],
  ["The Ryder Cup", "Ryder Cup", "Golf"], ["The Ashes", "The Ashes", "Cricket"], ["The Six Nations", "Six Nations Championship", "Rugby union"],
  ["The Super Bowl", "Super Bowl", "American football"], ["The Stanley Cup", "Stanley Cup", "Ice hockey"], ["The America's Cup", "America's Cup", "Sailing"],
  ["The Kentucky Derby", "Kentucky Derby", "Horse racing"], ["The Indianapolis 500", "Indianapolis 500", "Motor racing"], ["The Iditarod", "Iditarod Trail Sled Dog Race", "Sled dog racing"],
];

const BOARD_GAMES = [
  ["Chess", "Chess", "64"], ["Draughts", "Draughts", "64"], ["Go", "Go (game)", "361"], ["Backgammon", "Backgammon", "24"],
];

const CHESS_PIECES = [
  ["The knight", "Knight (chess)", "An L-shaped move"], ["The bishop", "Bishop (chess)", "Diagonal movement"],
  ["The rook", "Rook (chess)", "Movement along ranks and files"], ["The queen", "Queen (chess)", "Movement in any straight line"],
  ["The king", "King (chess)", "One square in any direction"], ["The pawn", "Pawn (chess)", "One square forward, capturing diagonally"],
];

export const SPORTS_FAMILIES = [
  {
    category: "History", levels: [2, 4], facts: SUMMER_OLYMPICS,
    forms: [
      { prompt: (year) => `Which city hosted the ${year} Summer Olympics?`, explain: (year, city) => `${city} hosted the ${year} Summer Olympics.` },
    ],
  },
  {
    category: "History", levels: [3, 4], facts: WINTER_OLYMPICS,
    forms: [
      { prompt: (year) => `Which city hosted the ${year} Winter Olympics?`, explain: (year, city) => `${city} hosted the ${year} Winter Olympics.` },
    ],
  },
  {
    category: "History", levels: [1, 2], facts: TEAM_SIZES,
    forms: [
      { prompt: (sport) => `How many players are on the field per side in ${soft(sport)}?`, explain: (sport, count) => `${sport} fields ${count} players a side.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: SPORT_ORIGINS,
    forms: [
      { prompt: (sport) => `Where did ${soft(sport)} originate?`, explain: (sport, place) => `${sport} originated in ${place}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: SPORT_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `What is the term for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: SPORT_VENUES,
    forms: [
      { prompt: (event) => `${event.replace("The ", "The ")} is a competition in which sport?`, explain: (event, sport) => `${event} belongs to ${soft(sport)}.` },
    ],
  },
  {
    category: "Mathematics", levels: [2, 3], facts: BOARD_GAMES,
    forms: [
      { prompt: (game) => `How many playing spaces does a standard ${soft(game)} board have?`, explain: (game, count) => `${game} uses ${count} playing spaces.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: CHESS_PIECES,
    forms: [
      { prompt: (piece) => `How does ${soft(piece)} move in chess?`, explain: (piece, move) => `${piece}: ${soft(move)}.` },
      { reverse: true, prompt: (piece, move) => `Which chess piece is defined by ${soft(move)}?`, explain: (piece, move) => `That is ${soft(piece)}.` },
    ],
  },
];
