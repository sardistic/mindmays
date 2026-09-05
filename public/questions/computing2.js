// More computing: machines, milestones, networks and the vocabulary of the trade.
import { soft } from "./case.js";
const MILESTONES = [
  ["ENIAC", "ENIAC", "One of the first general-purpose electronic computers"], ["Colossus", "Colossus computer", "The wartime codebreaking computer at Bletchley Park"],
  ["The Difference Engine", "Difference engine", "Babbage's mechanical calculating machine"], ["The Analytical Engine", "Analytical Engine", "Babbage's proposed programmable machine"],
  ["The Altair 8800", "Altair 8800", "The microcomputer that launched the hobbyist era"], ["The Apple II", "Apple II", "An early mass-market home computer"],
  ["The IBM PC", "IBM Personal Computer", "The machine that set the personal computer standard"], ["The Xerox Alto", "Xerox Alto", "The first computer with a graphical desktop"],
  ["The Commodore 64", "Commodore 64", "The best-selling home computer of its era"], ["Deep Blue", "Deep Blue (chess computer)", "The machine that beat a reigning chess world champion"],
  ["ARPANET", "ARPANET", "The packet-switching network that preceded the internet"], ["The Mosaic browser", "Mosaic (web browser)", "The browser that popularised the web"],
  ["Unix", "Unix", "The operating system that shaped modern systems"], ["Linux", "Linux", "The free Unix-like kernel begun in 1991"],
  ["The transistor", "Transistor", "The switching device that replaced the vacuum tube"], ["The integrated circuit", "Integrated circuit", "Many transistors on a single chip"],
];

const TECH_TERMS = [
  ["A program that copies itself into other programs", "Computer virus", "A virus"], ["A self-propagating program that needs no host", "Computer worm", "A worm"],
  ["A program disguised as something harmless", "Trojan horse (computing)", "A Trojan horse"], ["Software that demands payment to restore access", "Ransomware", "Ransomware"],
  ["A barrier controlling network traffic", "Firewall (computing)", "A firewall"], ["Turning readable data into an unreadable form", "Encryption", "Encryption"],
  ["A fixed-length fingerprint of data", "Hash function", "A hash"], ["An error in a program", "Software bug", "A bug"],
  ["Finding and fixing errors", "Debugging", "Debugging"], ["Storing data close by for faster access", "Cache (computing)", "A cache"],
  ["The delay before data begins to transfer", "Latency (engineering)", "Latency"], ["The volume of data a link can carry", "Bandwidth (computing)", "Bandwidth"],
  ["A copy kept in case the original is lost", "Backup", "A backup"], ["Software released with its source code", "Open-source software", "Open-source software"],
  ["A small file a website stores in your browser", "HTTP cookie", "A cookie"], ["The practice of tricking people into revealing secrets", "Phishing", "Phishing"],
  ["Running many isolated systems on one machine", "Virtualization", "Virtualisation"], ["A lightweight isolated software package", "Containerization (computing)", "A container"],
  ["Software that runs the computer's basic operations", "Operating system", "The operating system"], ["A repeated block of instructions", "Control flow", "A loop"],
];

const BINARY = [
  ["8", "Byte", "One byte"], ["1024 bytes", "Kilobyte", "One kibibyte"], ["Base 2", "Binary number", "Binary"],
  ["Base 8", "Octal", "Octal"], ["Base 16", "Hexadecimal", "Hexadecimal"], ["Base 10", "Decimal", "Decimal"],
];

const LOGIC_GATES = [
  ["The gate that outputs true only if both inputs are true", "AND gate", "AND"], ["The gate that outputs true if either input is true", "OR gate", "OR"],
  ["The gate that inverts its input", "Inverter (logic gate)", "NOT"], ["The gate that outputs true if exactly one input is true", "XOR gate", "XOR"],
  ["The gate that outputs false only if both inputs are true", "NAND gate", "NAND"], ["The gate that outputs true only if both inputs are false", "NOR gate", "NOR"],
];

const FILE_FORMATS = [
  ["MP3", "MP3", "Audio"], ["WAV", "WAV", "Audio"], ["FLAC", "FLAC", "Audio"], ["MP4", "MPEG-4 Part 14", "Video"],
  ["AVI", "Audio Video Interleave", "Video"], ["MOV", "QuickTime File Format", "Video"], ["JPEG", "JPEG", "Image"],
  ["PNG", "PNG", "Image"], ["SVG", "SVG", "Image"], ["TIFF", "TIFF", "Image"], ["ZIP", "ZIP (file format)", "Archive"],
  ["TAR", "Tar (computing)", "Archive"], ["CSV", "Comma-separated values", "Data"], ["EPUB", "EPUB", "Books"],
];

const COMPANIES_FOUNDERS = [
  ["Apple", "Apple Inc.", "Steve Jobs"], ["Microsoft", "Microsoft", "Bill Gates"], ["Amazon", "Amazon (company)", "Jeff Bezos"],
  ["Tesla", "Tesla, Inc.", "Elon Musk"], ["Ford", "Ford Motor Company", "Henry Ford"], ["Sony", "Sony", "Masaru Ibuka"],
  ["Honda", "Honda", "Soichiro Honda"], ["IKEA", "IKEA", "Ingvar Kamprad"], ["Nintendo", "Nintendo", "Fusajiro Yamauchi"],
  ["Virgin", "Virgin Group", "Richard Branson"], ["Alibaba", "Alibaba Group", "Jack Ma"], ["Siemens", "Siemens", "Werner von Siemens"],
  ["Nestlé", "Nestlé", "Henri Nestlé"], ["Rolls-Royce", "Rolls-Royce Limited", "Charles Rolls"],
];

const INTERNET_HISTORY = [
  ["The first message sent over ARPANET", "ARPANET", "1969"], ["The invention of the World Wide Web", "World Wide Web", "1989"],
  ["The first web browser released to the public", "WorldWideWeb", "1991"], ["The founding of Google", "Google", "1998"],
  ["The first iPhone", "IPhone (1st generation)", "2007"], ["The release of the first Linux kernel", "Linux kernel", "1991"],
  ["The first email sent between computers", "Email", "1971"], ["The launch of Wikipedia", "Wikipedia", "2001"],
];

export const COMPUTING2_FAMILIES = [
  {
    category: "Computing", levels: [2, 4], facts: MILESTONES,
    forms: [
      { prompt: (thing) => `What was ${thing.replace("The ", "the ")}?`, explain: (thing, description) => `${thing}: ${soft(description)}.` },
      { reverse: true, prompt: (thing, description) => `Which machine or system is described as ${soft(description)}?`, explain: (thing, description) => `That is ${thing}.` },
    ],
  },
  {
    category: "Computing", levels: [1, 3], facts: TECH_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `In computing, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Computing", levels: [1, 3], facts: BINARY,
    forms: [
      { prompt: (clue) => `In computing, what is ${clue} bits or what does it denote?`.replace(" bits or what does it denote", ""), explain: (clue, answer) => `${clue}: ${soft(answer)}.` },
    ],
  },
  {
    category: "Computing", levels: [2, 4], facts: LOGIC_GATES, describe: true,
    forms: [
      { prompt: (definition) => `Which logic gate is ${soft(definition)}?`, explain: (definition, gate) => `That is the ${gate} gate.` },
    ],
  },
  {
    category: "Computing", levels: [1, 2], facts: FILE_FORMATS,
    forms: [
      { prompt: (format) => `What kind of file is ${format}?`, explain: (format, kind) => `${format} is ${/^[aeiou]/i.test(kind) ? "an" : "a"} ${soft(kind)} format.` },
    ],
  },
  {
    category: "Technology", levels: [2, 4], facts: COMPANIES_FOUNDERS,
    forms: [
      { prompt: (company) => `Who founded or co-founded ${company}?`, explain: (company, person) => `${person} founded ${company}.` },
      { reverse: true, prompt: (company, person) => `${person} founded which company?`, explain: (company, person) => `${person} founded ${company}.` },
    ],
  },
  {
    category: "Computing", levels: [2, 4], facts: INTERNET_HISTORY,
    forms: [
      { prompt: (event) => `In which year did ${event.toLowerCase().replace("the ", "")} happen?`, explain: (event, year) => `${event}: ${year}.` },
    ],
  },
];
