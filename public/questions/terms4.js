// The last dictionary: sport, games, the garden and the road.
import { soft } from "./case.js";
const GAME_TERMS = [
  ["The opening moves of a chess game", "Chess opening", "The opening"],
  ["The final phase of a chess game with few pieces", "Chess endgame", "The endgame"],
  ["A position where a player has no legal move but is not in check", "Stalemate", "Stalemate"],
  ["A move putting the king under immediate attack", "Check (chess)", "Check"],
  ["A pawn reaching the far rank and becoming another piece", "Promotion (chess)", "Promotion"],
  ["The move where king and rook change places", "Castling", "Castling"],
  ["A sacrifice offered early for position", "Gambit", "A gambit"],
  ["The pack of cards used in most Western games", "Standard 52-card deck", "A 52-card deck"],
  ["The four suits of a standard deck", "Suit (cards)", "Hearts, diamonds, clubs and spades"],
  ["A hand of five cards in sequence and one suit", "List of poker hands", "A straight flush"],
  ["A hand of three of one rank and two of another", "List of poker hands", "A full house"],
  ["Two dice showing the same number", "Dice", "A double"],
];

const GARDEN_TERMS = [
  ["Cutting back a plant to shape it", "Pruning", "Pruning"],
  ["Removing spent flowers to encourage more", "Deadheading", "Deadheading"],
  ["Covering soil to retain moisture and suppress weeds", "Mulch", "Mulching"],
  ["Joining a shoot of one plant onto another's stock", "Grafting", "Grafting"],
  ["Growing a new plant from a piece of a parent", "Plant propagation", "Taking a cutting"],
  ["Rotted plant matter used to enrich soil", "Compost", "Compost"],
  ["A frame or structure for climbing plants", "Trellis (architecture)", "A trellis"],
  ["A glass building for growing plants", "Greenhouse", "A greenhouse"],
  ["A shallow covered frame for young plants", "Cold frame", "A cold frame"],
  ["A plant grown for one season and then replaced", "Annual plant", "An annual"],
  ["The art of growing miniature trees in containers", "Bonsai", "Bonsai"],
  ["The clipping of shrubs into ornamental shapes", "Topiary", "Topiary"],
];

const ROAD_AND_RAIL = [
  ["A road junction where traffic circles an island", "Roundabout", "A roundabout"],
  ["A road crossing over another without joining", "Overpass", "An overpass"],
  ["A road built to bypass a town centre", "Bypass (road)", "A bypass"],
  ["A raised road across low or wet ground", "Causeway", "A causeway"],
  ["The strip at the side of a motorway for emergencies", "Shoulder (road)", "The hard shoulder"],
  ["The distance between the rails of a railway", "Track gauge", "The gauge"],
  ["A place where a railway line divides", "Railroad switch", "A points or switch"],
  ["A vehicle drawing a train without carrying a load", "Locomotive", "A locomotive"],
  ["A rail line laid in a city street", "Tram", "A tramway"],
  ["An underground urban railway", "Rapid transit", "A metro"],
  ["A cable-drawn railway climbing a steep slope", "Funicular", "A funicular"],
  ["A railway using a toothed rail for steep gradients", "Rack railway", "A rack railway"],
];

const SPORT_ROLES = [
  ["The player who defends the goal in football", "Goalkeeper", "The goalkeeper"],
  ["The official who enforces the rules in football", "Referee", "The referee"],
  ["The player who bowls in cricket", "Bowler (cricket)", "The bowler"],
  ["The player who keeps behind the stumps in cricket", "Wicket-keeper", "The wicket-keeper"],
  ["The official who judges in cricket and tennis", "Umpire", "The umpire"],
  ["The person who steers a rowing eight", "Coxswain (rowing)", "The cox"],
  ["The rider of a racehorse", "Jockey", "The jockey"],
  ["The person who leads a boxing match", "Referee", "The referee"],
  ["The player who quarterbacks an American football offence", "Quarterback", "The quarterback"],
];

const CLIMBING_AND_OUTDOORS = [
  ["A rope loop used to secure a climber", "Climbing harness", "A harness"],
  ["A metal loop with a spring gate", "Carabiner", "A carabiner"],
  ["A spike hammered into rock for protection", "Piton", "A piton"],
  ["Controlled descent on a rope", "Abseiling", "Abseiling"],
  ["Climbing short routes without a rope", "Bouldering", "Bouldering"],
  ["A shelter of fabric supported by poles", "Tent", "A tent"],
  ["A compass and map race across country", "Orienteering", "Orienteering"],
  ["A deep crack in a glacier", "Crevasse", "A crevasse"],
  ["Spiked frames strapped to boots for ice", "Crampons", "Crampons"],
  ["Sickness caused by thin air at height", "Altitude sickness", "Altitude sickness"],
];

const MUSIC_MAKING = [
  ["The person who leads an orchestra in performance", "Conducting", "The conductor"],
  ["The leading violinist of an orchestra", "Concertmaster", "The leader"],
  ["A group of singers performing together", "Choir", "A choir"],
  ["A group of four players or singers", "String quartet", "A quartet"],
  ["The written music for all the parts of a piece", "Sheet music", "The score"],
  ["The part written for a single player", "Part (music)", "A part"],
  ["A short passage for a soloist to display skill", "Cadenza", "A cadenza"],
  ["The repeated section of a song between verses", "Refrain", "The refrain"],
  ["A performance without prepared material", "Musical improvisation", "Improvisation"],
  ["The adjusting of an instrument's pitch", "Musical tuning", "Tuning"],
];

export const TERMS4_FAMILIES = [
  {
    category: "Mathematics", levels: [2, 4], facts: GAME_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In games, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Biology", levels: [1, 3], facts: GARDEN_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In gardening, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Technology", levels: [2, 4], facts: ROAD_AND_RAIL, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [1, 2], facts: SPORT_ROLES, describe: true,
    forms: [{ prompt: (definition) => `Who is ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Geography", levels: [2, 4], facts: CLIMBING_AND_OUTDOORS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Music", levels: [1, 3], facts: MUSIC_MAKING, describe: true,
    forms: [{ prompt: (definition) => `In music, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
];
