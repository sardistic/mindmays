// Mathematics: named results, constants, shapes and notation.
import { soft } from "./case.js";
const THEOREMS = [
  ["The Pythagorean theorem", "Pythagorean theorem", "Pythagoras"], ["Euclid's theorem on primes", "Euclid's theorem", "Euclid"],
  ["Fermat's Last Theorem", "Fermat's Last Theorem", "Pierre de Fermat"], ["Gödel's incompleteness theorems", "Gödel's incompleteness theorems", "Kurt Gödel"],
  ["The fundamental theorem of calculus", "Fundamental theorem of calculus", "Isaac Newton"], ["Cantor's diagonal argument", "Cantor's diagonal argument", "Georg Cantor"],
  ["Bayes' theorem", "Bayes' theorem", "Thomas Bayes"], ["Euler's identity", "Euler's identity", "Leonhard Euler"],
  ["The binomial theorem", "Binomial theorem", "Isaac Newton"], ["Noether's theorem", "Noether's theorem", "Emmy Noether"],
  ["The four colour theorem", "Four color theorem", "Kenneth Appel"], ["Gauss's law", "Gauss's law", "Carl Friedrich Gauss"],
  ["The central limit theorem", "Central limit theorem", "Abraham de Moivre"], ["Descartes' coordinate system", "Cartesian coordinate system", "René Descartes"],
  ["Fourier analysis", "Fourier analysis", "Joseph Fourier"], ["Boolean algebra", "Boolean algebra", "George Boole"],
  ["Non-Euclidean geometry", "Non-Euclidean geometry", "Nikolai Lobachevsky"], ["The Riemann hypothesis", "Riemann hypothesis", "Bernhard Riemann"],
  ["Group theory's early results", "Évariste Galois", "Évariste Galois"], ["The Fibonacci sequence", "Fibonacci sequence", "Fibonacci"],
  ["Pascal's triangle", "Pascal's triangle", "Blaise Pascal"], ["Venn diagrams", "Venn diagram", "John Venn"],
  ["The Turing machine", "Turing machine", "Alan Turing"], ["Hilbert's problems", "Hilbert's problems", "David Hilbert"],
];

const CONSTANTS = [
  ["Pi", "Pi", "3.14159"], ["Euler's number", "E (mathematical constant)", "2.71828"], ["The golden ratio", "Golden ratio", "1.61803"], ["The square root of two", "Square root of 2", "1.41421"],
];

const POLYGONS = [
  ["A triangle", "Triangle", "3"], ["A quadrilateral", "Quadrilateral", "4"], ["A pentagon", "Pentagon", "5"], ["A hexagon", "Hexagon", "6"],
  ["A heptagon", "Heptagon", "7"], ["An octagon", "Octagon", "8"], ["A nonagon", "Nonagon", "9"], ["A decagon", "Decagon", "10"],
  ["A hendecagon", "Hendecagon", "11"], ["A dodecagon", "Dodecagon", "12"], ["A pentadecagon", "Pentadecagon", "15"], ["An icosagon", "Icosagon", "20"],
];

const POLYHEDRA = [
  ["The tetrahedron", "Tetrahedron", "4"], ["The cube", "Cube", "6"], ["The octahedron", "Octahedron", "8"], ["The dodecahedron", "Regular dodecahedron", "12"], ["The icosahedron", "Regular icosahedron", "20"],
];

const NUMBER_TYPES = [
  ["A number divisible only by itself and one", "Prime number", "A prime number"], ["A number equal to the sum of its proper divisors", "Perfect number", "A perfect number"],
  ["A number that cannot be written as a ratio of integers", "Irrational number", "An irrational number"], ["A number of the form a + bi", "Complex number", "A complex number"],
  ["A number that is the square of an integer", "Square number", "A square number"], ["A whole number and its negatives together with zero", "Integer", "An integer"],
  ["A number that is not the root of any polynomial with rational coefficients", "Transcendental number", "A transcendental number"], ["A number expressible as a ratio of two integers", "Rational number", "A rational number"],
  ["A number with exactly two distinct prime factors counted with multiplicity", "Semiprime", "A semiprime"], ["A number equal to the sum of the cubes of its digits in some bases", "Narcissistic number", "A narcissistic number"],
];

const BRANCHES = [
  ["The study of change and rates", "Calculus", "Calculus"], ["The study of shape and space", "Geometry", "Geometry"],
  ["The study of symbols and the rules for manipulating them", "Algebra", "Algebra"], ["The study of triangles and their ratios", "Trigonometry", "Trigonometry"],
  ["The study of whole numbers", "Number theory", "Number theory"], ["The study of counting and arrangement", "Combinatorics", "Combinatorics"],
  ["The study of chance", "Probability theory", "Probability theory"], ["The study of continuous deformation of shapes", "Topology", "Topology"],
  ["The study of vectors and matrices", "Linear algebra", "Linear algebra"], ["The study of data collection and inference", "Statistics", "Statistics"],
];

const NOTATION = [
  ["The summation sign", "Summation", "Sigma"], ["The product sign", "Multiplication", "Pi"], ["The symbol for the empty set", "Empty set", "A slashed zero"],
  ["The symbol for infinity", "Infinity symbol", "A sideways figure eight"], ["The symbol for a partial derivative", "Partial derivative", "A curly d"],
  ["The symbol for an integral", "Integral symbol", "An elongated S"], ["The symbol for the change in a quantity", "Delta (letter)", "Delta"],
  ["The symbol for the ratio of a circle's circumference to its diameter", "Pi", "Pi"],
];

const TRIG = [
  ["Sine", "Sine and cosine", "Opposite over hypotenuse"], ["Cosine", "Sine and cosine", "Adjacent over hypotenuse"], ["Tangent", "Trigonometric functions", "Opposite over adjacent"],
];

export const MATHEMATICS_FAMILIES = [
  {
    category: "Mathematics", levels: [2, 4], facts: THEOREMS,
    forms: [
      { prompt: (result) => `${result} is associated with which mathematician?`, explain: (result, person) => `${result} is associated with ${person}.` },
      { reverse: true, prompt: (result, person) => `Which result is associated with ${person}?`, explain: (result, person) => `${person} is associated with ${soft(result)}.` },
    ],
  },
  {
    category: "Mathematics", levels: [2, 3], facts: CONSTANTS,
    forms: [
      { prompt: (constant) => `To five decimal places, what is the value of ${soft(constant)}?`, explain: (constant, value) => `${constant} is approximately ${value}.` },
    ],
  },
  {
    category: "Mathematics", levels: [1, 3], facts: POLYGONS,
    forms: [
      { prompt: (shape) => `How many sides does ${soft(shape)} have?`, explain: (shape, sides) => `${shape} has ${sides} sides.` },
      { reverse: true, prompt: (shape, sides) => `Which polygon has ${sides} sides?`, explain: (shape, sides) => `${shape} has ${sides} sides.` },
    ],
  },
  {
    category: "Mathematics", levels: [3, 4], facts: POLYHEDRA,
    forms: [
      { prompt: (solid) => `How many faces does ${soft(solid)} have?`, explain: (solid, faces) => `${solid} has ${faces} faces.` },
    ],
  },
  {
    category: "Mathematics", levels: [2, 4], facts: NUMBER_TYPES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `${term}: ${soft(definition)}.` },
    ],
  },
  {
    category: "Mathematics", levels: [1, 2], facts: BRANCHES, describe: true,
    forms: [
      { prompt: (definition) => `Which branch of mathematics is ${soft(definition)}?`, explain: (definition, branch) => `${branch} is ${soft(definition)}.` },
    ],
  },
  {
    category: "Mathematics", levels: [3, 4], facts: NOTATION, describe: true,
    forms: [
      { prompt: (definition) => `Which symbol is ${soft(definition)}?`, explain: (definition, symbol) => `${symbol} is used for that.` },
    ],
  },
  {
    category: "Mathematics", levels: [2, 3], facts: TRIG, identify: true,
    forms: [
      { prompt: (ratio) => `In a right triangle, ${soft(ratio)} is which ratio?`, explain: (ratio, definition) => `${ratio} is ${soft(definition)}.` },
    ],
  },
];
