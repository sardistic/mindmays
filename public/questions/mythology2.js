// More myth and legend: heroes, places, monsters and the stories attached to them.
import { soft } from "./case.js";
const GREEK_HEROES = [
  ["Achilles", "Achilles", "The greatest Greek warrior at Troy"], ["Hector", "Hector", "The greatest Trojan warrior"],
  ["Agamemnon", "Agamemnon", "The commander of the Greek forces at Troy"], ["Paris", "Paris (mythology)", "The Trojan prince who took Helen"],
  ["Helen", "Helen of Troy", "The woman whose flight began the Trojan War"], ["Cassandra", "Cassandra", "The prophet whom nobody believed"],
  ["Aeneas", "Aeneas", "The Trojan who founded the Roman line"], ["Penelope", "Penelope", "Odysseus's patient wife"],
  ["Telemachus", "Telemachus", "Odysseus's son"], ["Circe", "Circe", "The enchantress who turned men into swine"],
  ["Calypso", "Calypso (mythology)", "The nymph who held Odysseus seven years"], ["Ariadne", "Ariadne", "The princess who gave Theseus the thread"],
  ["Daedalus", "Daedalus", "The craftsman who built the labyrinth"], ["Atalanta", "Atalanta", "The huntress beaten only by golden apples"],
  ["Antigone", "Antigone", "The daughter of Oedipus who defied the king"], ["Tantalus", "Tantalus", "Punished with food and water forever out of reach"],
  ["Narcissus", "Narcissus (mythology)", "The youth who fell in love with his reflection"],
  ["Echo", "Echo (mythology)", "The nymph who could only repeat others"], ["Arachne", "Arachne", "The weaver turned into a spider"],
  ["Pygmalion", "Pygmalion (mythology)", "The sculptor whose statue came to life"],
];

const MYTHIC_PLACES = [
  ["Olympus", "Mount Olympus", "The home of the Greek gods"], ["The Elysian Fields", "Elysium", "The blessed afterlife of Greek myth"],
  ["Tartarus", "Tartarus", "The deep abyss of punishment"], ["The River Styx", "Styx", "The river bounding the underworld"],
  ["Atlantis", "Atlantis", "The island said to have sunk beneath the sea"], ["Avalon", "Avalon", "The island where Arthur's sword was forged"],
  ["Camelot", "Camelot", "The court of King Arthur"], ["Shangri-La", "Shangri-La", "A hidden earthly paradise in the mountains"],
  ["El Dorado", "El Dorado", "The legendary city of gold"], ["Valhalla", "Valhalla", "Odin's hall for the slain"],
  ["Niflheim", "Niflheim", "The Norse world of mist and cold"], ["Muspelheim", "Muspelheim", "The Norse world of fire"],
  ["The Garden of the Hesperides", "Hesperides", "The garden of the golden apples"], ["The Labyrinth", "Labyrinth", "The maze built to hold the Minotaur"],
];

const ARTHURIAN = [
  ["King Arthur", "King Arthur", "The legendary king of the Britons"], ["Merlin", "Merlin", "Arthur's wizard and counsellor"],
  ["Guinevere", "Guinevere", "Arthur's queen"], ["Lancelot", "Lancelot", "The foremost knight of the Round Table"],
  ["Galahad", "Galahad", "The knight who achieved the Grail"], ["Morgan le Fay", "Morgan le Fay", "Arthur's enchantress half-sister"],
  ["Mordred", "Mordred", "The traitor who fought Arthur at Camlann"], ["Excalibur", "Excalibur", "Arthur's sword"],
  ["The Holy Grail", "Holy Grail", "The vessel sought by Arthur's knights"], ["The Round Table", "Round Table", "The table at which no knight sat above another"],
];

const FOLKLORE = [
  ["Robin Hood", "Robin Hood", "England"], ["William Tell", "William Tell", "Switzerland"], ["Baba Yaga", "Baba Yaga", "Slavic countries"],
  ["The Pied Piper", "Pied Piper of Hamelin", "Germany"], ["Leprechauns", "Leprechaun", "Ireland"], ["Trolls", "Troll", "Scandinavia"],
  ["The Loch Ness Monster", "Loch Ness Monster", "Scotland"], ["Bigfoot", "Bigfoot", "North America"],
  ["The Chupacabra", "Chupacabra", "Latin America"], ["The Bunyip", "Bunyip", "Australia"],
  ["Anansi the spider", "Anansi", "West Africa"], ["The Monkey King", "Sun Wukong", "China"],
  ["Momotarō", "Momotarō", "Japan"], ["The Golem of Prague", "Golem", "Bohemia"],
];

const EGYPT_AND_MESOPOTAMIA = [
  ["The Book of the Dead", "Book of the Dead", "Egyptian funerary texts"], ["The Epic of Gilgamesh", "Epic of Gilgamesh", "The oldest surviving great epic"],
  ["The Sphinx of Giza", "Great Sphinx of Giza", "A lion-bodied statue with a human head"],
  ["Mummification", "Mummy", "The Egyptian preservation of the dead"],
  ["The Ka", "Ancient Egyptian conception of the soul", "One part of the Egyptian soul"],
  ["The scarab", "Scarab (artifact)", "A beetle amulet symbolising rebirth"],
  ["The ankh", "Ankh", "The Egyptian symbol of life"], ["The Eye of Horus", "Eye of Horus", "A symbol of protection and healing"],
  ["The ziggurat", "Ziggurat", "A stepped temple tower of Mesopotamia"],
  ["Cuneiform tablets", "Cuneiform", "The wedge-written records of Mesopotamia"],
];

const SYMBOLS = [
  ["The caduceus", "Caduceus", "The staff of Hermes with two serpents"],
  ["The Rod of Asclepius", "Rod of Asclepius", "The single-serpent staff of medicine"],
  ["The ouroboros", "Ouroboros", "A serpent devouring its own tail"],
  ["The yin and yang", "Yin and yang", "The Chinese symbol of complementary opposites"],
  ["The swastika before its modern misuse", "Swastika", "An ancient symbol of good fortune in several cultures"],
  ["The fleur-de-lis", "Fleur-de-lis", "A stylised lily used in French heraldry"],
  ["The triquetra", "Triquetra", "A three-lobed interlaced knot"],
  ["The pentagram", "Pentagram", "A five-pointed star drawn in one stroke"],
  ["The crescent and star", "Star and crescent", "A symbol widely associated with Islam"],
  ["The Star of David", "Star of David", "A six-pointed star associated with Judaism"],
];

export const MYTHOLOGY2_FAMILIES = [
  {
    category: "History", levels: [2, 4], facts: GREEK_HEROES, identify: true,
    forms: [
      { prompt: (person) => `Who was ${person} in Greek myth?`, explain: (person, note) => `${person}: ${soft(note)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: MYTHIC_PLACES, identify: true,
    forms: [
      { prompt: (place) => `What is ${place.replace("The ", "the ")}?`, explain: (place, note) => `${place}: ${soft(note)}.` },
    ],
  },
  {
    category: "Literature", levels: [1, 3], facts: ARTHURIAN, identify: true,
    forms: [
      { prompt: (name) => `Who or what is ${name.replace("The ", "the ")} in Arthurian legend?`, explain: (name, note) => `${name}: ${soft(note)}.` },
    ],
  },
  {
    category: "History", levels: [1, 3], facts: FOLKLORE,
    forms: [
      { prompt: (figure) => `${figure.replace("The ", "The ")} belongs to the folklore of where?`, explain: (figure, place) => `${figure} belongs to the folklore of ${place}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: EGYPT_AND_MESOPOTAMIA, identify: true,
    forms: [
      { prompt: (thing) => `What is ${thing.replace("The ", "the ")}?`, explain: (thing, note) => `${thing}: ${soft(note)}.` },
    ],
  },
  {
    category: "Arts", levels: [2, 4], facts: SYMBOLS, identify: true,
    forms: [
      { prompt: (symbol) => `What is ${symbol.replace("The ", "the ")}?`, explain: (symbol, note) => `${symbol}: ${soft(note)}.` },
    ],
  },
];
