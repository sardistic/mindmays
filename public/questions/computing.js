// Computing: acronyms, languages, protocols and the people who built the field.
import { soft } from "./case.js";
const ACRONYMS = [
  ["CPU", "Central processing unit", "Central processing unit"], ["GPU", "Graphics processing unit", "Graphics processing unit"], ["RAM", "Random-access memory", "Random-access memory"],
  ["ROM", "Read-only memory", "Read-only memory"], ["SSD", "Solid-state drive", "Solid-state drive"], ["HDD", "Hard disk drive", "Hard disk drive"],
  ["USB", "USB", "Universal Serial Bus"], ["HTML", "HTML", "HyperText Markup Language"], ["CSS", "CSS", "Cascading Style Sheets"],
  ["HTTP", "HTTP", "Hypertext Transfer Protocol"], ["FTP", "File Transfer Protocol", "File Transfer Protocol"], ["SMTP", "Simple Mail Transfer Protocol", "Simple Mail Transfer Protocol"],
  ["TCP", "Transmission Control Protocol", "Transmission Control Protocol"], ["IP", "Internet Protocol", "Internet Protocol"], ["DNS", "Domain Name System", "Domain Name System"],
  ["URL", "URL", "Uniform Resource Locator"], ["API", "API", "Application Programming Interface"], ["SQL", "SQL", "Structured Query Language"],
  ["XML", "XML", "Extensible Markup Language"], ["JSON", "JSON", "JavaScript Object Notation"], ["PDF", "PDF", "Portable Document Format"],
  ["GIF", "GIF", "Graphics Interchange Format"], ["PNG", "PNG", "Portable Network Graphics"], ["JPEG", "JPEG", "Joint Photographic Experts Group"],
  ["ASCII", "ASCII", "American Standard Code for Information Interchange"], ["BIOS", "BIOS", "Basic Input/Output System"], ["LAN", "Local area network", "Local area network"],
  ["WAN", "Wide area network", "Wide area network"], ["VPN", "Virtual private network", "Virtual private network"], ["DHCP", "Dynamic Host Configuration Protocol", "Dynamic Host Configuration Protocol"],
  ["SSH", "Secure Shell", "Secure Shell"], ["SSL", "Transport Layer Security", "Secure Sockets Layer"], ["TLS", "Transport Layer Security", "Transport Layer Security"],
  ["GUI", "Graphical user interface", "Graphical user interface"], ["CLI", "Command-line interface", "Command-line interface"], ["OS", "Operating system", "Operating system"],
  ["IDE", "Integrated development environment", "Integrated development environment"], ["SDK", "Software development kit", "Software development kit"], ["VM", "Virtual machine", "Virtual machine"],
  ["AI", "Artificial intelligence", "Artificial intelligence"], ["ML", "Machine learning", "Machine learning"], ["IoT", "Internet of things", "Internet of things"],
  ["RAID", "RAID", "Redundant Array of Independent Disks"], ["ALU", "Arithmetic logic unit", "Arithmetic logic unit"], ["DMA", "Direct memory access", "Direct memory access"],
  ["FIFO", "FIFO (computing and electronics)", "First In, First Out"], ["LIFO", "Stack (abstract data type)", "Last In, First Out"], ["OOP", "Object-oriented programming", "Object-oriented programming"],
  ["CRUD", "Create, read, update and delete", "Create, Read, Update, Delete"], ["MIME", "MIME", "Multipurpose Internet Mail Extensions"], ["UUID", "Universally unique identifier", "Universally unique identifier"],
  ["CDN", "Content delivery network", "Content delivery network"], ["ORM", "Object–relational mapping", "Object-relational mapping"], ["REST", "REST", "Representational State Transfer"],
  ["CRT", "Cathode-ray tube", "Cathode-ray tube"], ["LCD", "Liquid-crystal display", "Liquid-crystal display"], ["LED", "Light-emitting diode", "Light-emitting diode"],
  ["PDA", "Personal digital assistant", "Personal digital assistant"], ["MIDI", "MIDI", "Musical Instrument Digital Interface"], ["OCR", "Optical character recognition", "Optical character recognition"],
  ["POP3", "Post Office Protocol", "Post Office Protocol"], ["IMAP", "Internet Message Access Protocol", "Internet Message Access Protocol"], ["NAT", "Network address translation", "Network address translation"],
  ["ISP", "Internet service provider", "Internet service provider"], ["MAC address", "MAC address", "Media Access Control address"], ["BIT", "Bit", "Binary digit"],
];

const LANGUAGE_DESIGNERS = [
  ["C", "C (programming language)", "Dennis Ritchie"], ["C++", "C++", "Bjarne Stroustrup"], ["Python", "Python (programming language)", "Guido van Rossum"],
  ["Java", "Java (programming language)", "James Gosling"], ["JavaScript", "JavaScript", "Brendan Eich"], ["Ruby", "Ruby (programming language)", "Yukihiro Matsumoto"],
  ["Perl", "Perl", "Larry Wall"], ["PHP", "PHP", "Rasmus Lerdorf"], ["Lisp", "Lisp (programming language)", "John McCarthy"],
  ["Pascal", "Pascal (programming language)", "Niklaus Wirth"], ["Fortran", "Fortran", "John Backus"], ["COBOL", "COBOL", "Grace Hopper"],
  ["Smalltalk", "Smalltalk", "Alan Kay"], ["Erlang", "Erlang (programming language)", "Joe Armstrong"], ["Haskell", "Haskell", "Simon Peyton Jones"],
  ["Rust", "Rust (programming language)", "Graydon Hoare"], ["Go", "Go (programming language)", "Rob Pike"], ["Swift", "Swift (programming language)", "Chris Lattner"],
  ["Lua", "Lua (programming language)", "Roberto Ierusalimschy"], ["Prolog", "Prolog", "Alain Colmerauer"], ["ML", "ML (programming language)", "Robin Milner"],
  ["APL", "APL (programming language)", "Kenneth E. Iverson"], ["BASIC", "BASIC", "John G. Kemeny"], ["Objective-C", "Objective-C", "Brad Cox"],
];

const PIONEERS = [
  ["Ada Lovelace", "Ada Lovelace", "Writing the first published algorithm for a machine"], ["Charles Babbage", "Charles Babbage", "Designing the analytical engine"],
  ["Alan Turing", "Alan Turing", "Formalising computation and breaking wartime ciphers"], ["John von Neumann", "John von Neumann", "The stored-program computer architecture"],
  ["Grace Hopper", "Grace Hopper", "The first compiler and the popularising of COBOL"], ["Claude Shannon", "Claude Shannon", "Founding information theory"],
  ["Tim Berners-Lee", "Tim Berners-Lee", "Inventing the World Wide Web"], ["Vint Cerf", "Vint Cerf", "Co-designing the TCP/IP protocols"],
  ["Douglas Engelbart", "Douglas Engelbart", "The computer mouse and the first hypertext demonstration"], ["Ken Thompson", "Ken Thompson", "Creating the Unix operating system"],
  ["Linus Torvalds", "Linus Torvalds", "Starting the Linux kernel"], ["Richard Stallman", "Richard Stallman", "Founding the free software movement"],
  ["Edsger Dijkstra", "Edsger W. Dijkstra", "A shortest-path algorithm and structured programming"], ["Donald Knuth", "Donald Knuth", "The Art of Computer Programming and TeX"],
  ["Barbara Liskov", "Barbara Liskov", "Data abstraction and a substitution principle"], ["Margaret Hamilton", "Margaret Hamilton (software engineer)", "The Apollo onboard flight software"],
  ["Katherine Johnson", "Katherine Johnson", "Orbital mechanics calculations for NASA"], ["John McCarthy", "John McCarthy (computer scientist)", "Coining the term artificial intelligence"],
  ["Dennis Ritchie", "Dennis Ritchie", "The C language and much of Unix"], ["Frances Allen", "Frances Allen", "Pioneering compiler optimisation"],
];

const ALGORITHMS = [
  ["Quicksort", "Quicksort", "Sorting"], ["Merge sort", "Merge sort", "Sorting"], ["Bubble sort", "Bubble sort", "Sorting"], ["Heapsort", "Heapsort", "Sorting"],
  ["Binary search", "Binary search", "Searching"], ["Dijkstra's algorithm", "Dijkstra's algorithm", "Shortest paths"], ["The A* algorithm", "A* search algorithm", "Shortest paths"],
  ["Breadth-first search", "Breadth-first search", "Graph traversal"], ["Depth-first search", "Depth-first search", "Graph traversal"], ["Kruskal's algorithm", "Kruskal's algorithm", "Minimum spanning trees"],
  ["The Euclidean algorithm", "Euclidean algorithm", "Greatest common divisors"], ["The sieve of Eratosthenes", "Sieve of Eratosthenes", "Finding prime numbers"],
  ["RSA", "RSA cryptosystem", "Public-key cryptography"], ["Huffman coding", "Huffman coding", "Data compression"], ["The fast Fourier transform", "Fast Fourier transform", "Signal analysis"],
  ["PageRank", "PageRank", "Ranking web pages"],
];

const DATA_STRUCTURES = [
  ["A stack", "Stack (abstract data type)", "Last in, first out"], ["A queue", "Queue (abstract data type)", "First in, first out"],
  ["A hash table", "Hash table", "Key-to-index mapping for near-constant lookup"], ["A linked list", "Linked list", "Nodes each pointing to the next"],
  ["A binary search tree", "Binary search tree", "An ordered tree with two children per node"], ["A heap", "Heap (data structure)", "A tree keeping the extreme value at the root"],
  ["A trie", "Trie", "A tree keyed by the characters of a string"], ["A graph", "Graph (abstract data type)", "Vertices joined by edges"],
];

const PORTS = [
  ["HTTP", "Hypertext Transfer Protocol", "80"], ["HTTPS", "HTTPS", "443"], ["SSH", "Secure Shell", "22"], ["FTP", "File Transfer Protocol", "21"],
  ["SMTP", "Simple Mail Transfer Protocol", "25"], ["DNS", "Domain Name System", "53"], ["Telnet", "Telnet", "23"], ["POP3", "Post Office Protocol", "110"],
];

const COMPANIES = [
  ["Unix", "Unix", "Bell Labs"], ["The transistor", "Transistor", "Bell Labs"], ["The graphical desktop of the Alto", "Xerox Alto", "Xerox PARC"],
  ["Ethernet", "Ethernet", "Xerox PARC"], ["The Macintosh", "Macintosh", "Apple Inc."], ["MS-DOS", "MS-DOS", "Microsoft"],
  ["The World Wide Web", "World Wide Web", "CERN"], ["ARPANET", "ARPANET", "DARPA"],
];

export const COMPUTING_FAMILIES = [
  {
    category: "Computing", levels: [1, 3], facts: ACRONYMS,
    forms: [
      { prompt: (acronym) => `In computing, what does ${acronym} stand for?`, explain: (acronym, meaning) => `${acronym} stands for ${meaning}.` },
      { reverse: true, prompt: (acronym, meaning) => `Which abbreviation stands for "${meaning}"?`, explain: (acronym, meaning) => `${meaning} is abbreviated ${acronym}.` },
    ],
  },
  {
    category: "Computing", levels: [2, 4], facts: LANGUAGE_DESIGNERS,
    forms: [
      { prompt: (language) => `Who created the ${language} programming language?`, explain: (language, person) => `${language} was created by ${person}.` },
      { reverse: true, prompt: (language, person) => `Which programming language did ${person} create?`, explain: (language, person) => `${person} created ${language}.` },
    ],
  },
  {
    category: "Computing", levels: [2, 4], facts: PIONEERS,
    forms: [
      { prompt: (person) => `What is ${person} best known for?`, explain: (person, deed) => `${person}: ${soft(deed)}.` },
      { reverse: true, prompt: (person, deed) => `Who is best known for ${soft(deed)}?`, explain: (person, deed) => `That was ${person}.` },
    ],
  },
  {
    category: "Computing", levels: [2, 4], facts: ALGORITHMS, identify: true,
    forms: [
      { prompt: (algorithm) => `What problem does ${algorithm.replace("The ", "the ")} address?`, explain: (algorithm, problem) => `${algorithm} addresses ${soft(problem)}.` },
    ],
  },
  {
    category: "Computing", levels: [2, 3], facts: DATA_STRUCTURES, identify: true,
    forms: [
      { prompt: (structure) => `How does ${soft(structure)} behave?`, explain: (structure, behaviour) => `${structure}: ${soft(behaviour)}.` },
    ],
  },
  {
    category: "Computing", levels: [3, 4], facts: PORTS,
    forms: [
      { prompt: (protocol) => `Which well-known port number does ${protocol} use by default?`, explain: (protocol, port) => `${protocol} uses port ${port}.` },
      { reverse: true, prompt: (protocol, port) => `Which protocol uses port ${port} by default?`, explain: (protocol, port) => `Port ${port} belongs to ${protocol}.` },
    ],
  },
  {
    category: "Technology", levels: [2, 4], facts: COMPANIES,
    forms: [
      { prompt: (thing) => `Where was ${thing.replace("The ", "the ")} developed?`, explain: (thing, place) => `${thing} came out of ${place}.` },
    ],
  },
];
