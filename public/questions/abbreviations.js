// Abbreviations across every field. These are one-to-one, so each row carries a
// question in both directions.
import { soft } from "./case.js";
const ORGANISATIONS = [
  ["NATO", "NATO", "North Atlantic Treaty Organization"], ["UNESCO", "UNESCO", "United Nations Educational, Scientific and Cultural Organization"],
  ["UNICEF", "UNICEF", "United Nations Children's Fund"], ["WHO", "World Health Organization", "World Health Organization"],
  ["OPEC", "OPEC", "Organization of the Petroleum Exporting Countries"], ["ASEAN", "ASEAN", "Association of Southeast Asian Nations"],
  ["NAFTA", "North American Free Trade Agreement", "North American Free Trade Agreement"], ["IMF", "International Monetary Fund", "International Monetary Fund"],
  ["WTO", "World Trade Organization", "World Trade Organization"], ["ILO", "International Labour Organization", "International Labour Organization"],
  ["FAO", "Food and Agriculture Organization", "Food and Agriculture Organization"], ["IAEA", "International Atomic Energy Agency", "International Atomic Energy Agency"],
  ["ICRC", "International Committee of the Red Cross", "International Committee of the Red Cross"], ["WWF", "World Wide Fund for Nature", "World Wide Fund for Nature"],
  ["NASA", "NASA", "National Aeronautics and Space Administration"], ["ESA", "European Space Agency", "European Space Agency"],
  ["CERN", "CERN", "European Organization for Nuclear Research"], ["FBI", "Federal Bureau of Investigation", "Federal Bureau of Investigation"],
  ["CIA", "Central Intelligence Agency", "Central Intelligence Agency"], ["NSA", "National Security Agency", "National Security Agency"],
  ["FIFA", "FIFA", "Fédération Internationale de Football Association"], ["IOC", "International Olympic Committee", "International Olympic Committee"],
  ["EU", "European Union", "European Union"], ["UN", "United Nations", "United Nations"],
  ["OECD", "OECD", "Organisation for Economic Co-operation and Development"], ["ISO", "International Organization for Standardization", "International Organization for Standardization"],
  ["IEEE", "Institute of Electrical and Electronics Engineers", "Institute of Electrical and Electronics Engineers"], ["NGO", "Non-governmental organization", "Non-governmental organisation"],
];

const SCIENCE_ABBREVIATIONS = [
  ["DNA", "DNA", "Deoxyribonucleic acid"], ["RNA", "RNA", "Ribonucleic acid"], ["ATP", "Adenosine triphosphate", "Adenosine triphosphate"],
  ["PCR", "Polymerase chain reaction", "Polymerase chain reaction"], ["MRI", "Magnetic resonance imaging", "Magnetic resonance imaging"],
  ["CT scan", "CT scan", "Computed tomography"], ["ECG", "Electrocardiography", "Electrocardiogram"], ["EEG", "Electroencephalography", "Electroencephalogram"],
  ["LASER", "Laser", "Light Amplification by Stimulated Emission of Radiation"], ["RADAR", "Radar", "Radio Detection and Ranging"],
  ["SONAR", "Sonar", "Sound Navigation and Ranging"], ["LED", "Light-emitting diode", "Light-emitting diode"],
  ["pH", "PH", "Potential of hydrogen"], ["UV", "Ultraviolet", "Ultraviolet"], ["IR", "Infrared", "Infrared"],
  ["GPS", "Global Positioning System", "Global Positioning System"], ["SI", "International System of Units", "International System of Units"],
  ["STP", "Standard temperature and pressure", "Standard temperature and pressure"], ["BMI", "Body mass index", "Body mass index"],
  ["IVF", "In vitro fertilisation", "In vitro fertilisation"], ["CFC", "Chlorofluorocarbon", "Chlorofluorocarbon"],
  ["LDL", "Low-density lipoprotein", "Low-density lipoprotein"], ["HDL", "High-density lipoprotein", "High-density lipoprotein"],
  ["CNS", "Central nervous system", "Central nervous system"], ["REM sleep", "Rapid eye movement sleep", "Rapid eye movement sleep"],
];

const MEASUREMENT_ABBREVIATIONS = [
  ["km", "Kilometre", "Kilometre"], ["kg", "Kilogram", "Kilogram"], ["mL", "Litre", "Millilitre"], ["Hz", "Hertz", "Hertz"],
  ["kWh", "Kilowatt-hour", "Kilowatt-hour"], ["mph", "Miles per hour", "Miles per hour"], ["rpm", "Revolutions per minute", "Revolutions per minute"],
  ["psi", "Pounds per square inch", "Pounds per square inch"], ["dB", "Decibel", "Decibel"], ["AU", "Astronomical unit", "Astronomical unit"],
  ["ly", "Light-year", "Light-year"], ["nm", "Nanometre", "Nanometre"],
];

const SI_PREFIXES = [
  ["Kilo", "Metric prefix", "One thousand"], ["Mega", "Metric prefix", "One million"], ["Giga", "Metric prefix", "One billion"], ["Tera", "Metric prefix", "One trillion"],
  ["Milli", "Metric prefix", "One thousandth"], ["Micro", "Metric prefix", "One millionth"], ["Nano", "Metric prefix", "One billionth"], ["Pico", "Metric prefix", "One trillionth"],
  ["Centi", "Metric prefix", "One hundredth"], ["Deci", "Metric prefix", "One tenth"], ["Hecto", "Metric prefix", "One hundred"], ["Deca", "Metric prefix", "Ten"],
];

const ROMAN_NUMERALS = [
  ["I", "Roman numerals", "1"], ["V", "Roman numerals", "5"], ["X", "Roman numerals", "10"], ["L", "Roman numerals", "50"],
  ["C", "Roman numerals", "100"], ["D", "Roman numerals", "500"], ["M", "Roman numerals", "1000"], ["IV", "Roman numerals", "4"],
  ["IX", "Roman numerals", "9"], ["XL", "Roman numerals", "40"], ["XC", "Roman numerals", "90"], ["CD", "Roman numerals", "400"],
  ["CM", "Roman numerals", "900"], ["XII", "Roman numerals", "12"], ["XIX", "Roman numerals", "19"], ];

const BUSINESS_ABBREVIATIONS = [
  ["GDP", "Gross domestic product", "Gross domestic product"], ["GNP", "Gross national product", "Gross national product"],
  ["CEO", "Chief executive officer", "Chief executive officer"], ["CFO", "Chief financial officer", "Chief financial officer"],
  ["IPO", "Initial public offering", "Initial public offering"], ["ROI", "Return on investment", "Return on investment"],
  ["VAT", "Value-added tax", "Value-added tax"], ["ATM", "Automated teller machine", "Automated teller machine"],
  ["PIN", "Personal identification number", "Personal identification number"], ["APR", "Annual percentage rate", "Annual percentage rate"],
  ["B2B", "Business-to-business", "Business-to-business"], ["R&D", "Research and development", "Research and development"],
  ["HR", "Human resources", "Human resources"], ["NDA", "Non-disclosure agreement", "Non-disclosure agreement"],
];

const LATIN_ABBREVIATIONS = [
  ["e.g.", "Exempli gratia", "For example"], ["i.e.", "Id est", "That is"], ["etc.", "Et cetera", "And the rest"],
  ["et al.", "Et alia", "And others"], ["N.B.", "Nota bene", "Note well"], ["cf.", "List of Latin phrases (C)", "Compare"],
  ["vs.", "Versus", "Against"], ["AD", "Anno Domini", "In the year of the Lord"], ["a.m.", "12-hour clock", "Before midday"],
  ["p.m.", "12-hour clock", "After midday"], ["P.S.", "Postscript", "Written after"], ["R.I.P.", "Rest in peace", "Rest in peace"],
];

const MEDICAL_TERMS = [
  ["Inflammation of the appendix", "Appendicitis", "Appendicitis"], ["Inflammation of the liver", "Hepatitis", "Hepatitis"],
  ["Inflammation of the meninges", "Meningitis", "Meningitis"], ["Inflammation of the joints", "Arthritis", "Arthritis"],
  ["Inflammation of the bronchi", "Bronchitis", "Bronchitis"], ["Inflammation of the stomach lining", "Gastritis", "Gastritis"],
  ["High blood pressure", "Hypertension", "Hypertension"], ["Low blood sugar", "Hypoglycemia", "Hypoglycaemia"],
  ["An abnormally slow heart rate", "Bradycardia", "Bradycardia"], ["An abnormally fast heart rate", "Tachycardia", "Tachycardia"],
  ["Difficulty breathing", "Shortness of breath", "Dyspnoea"], ["Loss of the ability to speak or understand language", "Aphasia", "Aphasia"],
  ["Loss of memory", "Amnesia", "Amnesia"], ["Loss of the sense of smell", "Anosmia", "Anosmia"],
  ["The study of the heart", "Cardiology", "Cardiology"], ["The study of the nervous system", "Neurology", "Neurology"],
  ["The study of the skin", "Dermatology", "Dermatology"], ["The study of the eyes", "Ophthalmology", "Ophthalmology"],
  ["The study of children's medicine", "Pediatrics", "Paediatrics"], ["The study of the kidneys", "Nephrology", "Nephrology"],
  ["The study of tumours", "Oncology", "Oncology"], ["The study of the endocrine glands", "Endocrinology", "Endocrinology"],
  ["The study of blood", "Hematology", "Haematology"], ["The study of ageing", "Gerontology", "Gerontology"],
];

const OLOGIES = [
  ["The study of birds", "Ornithology", "Ornithology"], ["The study of insects", "Entomology", "Entomology"],
  ["The study of fish", "Ichthyology", "Ichthyology"], ["The study of reptiles and amphibians", "Herpetology", "Herpetology"],
  ["The study of fungi", "Mycology", "Mycology"], ["The study of plants", "Botany", "Botany"],
  ["The study of fossils", "Paleontology", "Palaeontology"], ["The study of rocks and the Earth", "Geology", "Geology"],
  ["The study of earthquakes", "Seismology", "Seismology"], ["The study of weather", "Meteorology", "Meteorology"],
  ["The study of the oceans", "Oceanography", "Oceanography"], ["The study of caves", "Speleology", "Speleology"],
  ["The study of glaciers", "Glaciology", "Glaciology"], ["The study of soil", "Soil science", "Pedology"],
  ["The study of human societies", "Sociology", "Sociology"], ["The study of humankind and its cultures", "Anthropology", "Anthropology"],
  ["The study of word origins", "Etymology", "Etymology"], ["The study of coins", "Numismatics", "Numismatics"],
  ["The study of stamps", "Philately", "Philately"], ["The study of flags", "Vexillology", "Vexillology"],
  ["The study of handwriting", "Graphology", "Graphology"], ["The study of wine", "Oenology", "Oenology"],
  ["The study of bells", "Campanology", "Campanology"], ["The study of dreams", "Oneirology", "Oneirology"],
];

const PHOBIAS = [
  ["Fear of spiders", "Arachnophobia", "Arachnophobia"], ["Fear of enclosed spaces", "Claustrophobia", "Claustrophobia"],
  ["Fear of open or crowded spaces", "Agoraphobia", "Agoraphobia"], ["Fear of heights", "Acrophobia", "Acrophobia"],
  ["Fear of water", "Aquaphobia", "Aquaphobia"], ["Fear of the number thirteen", "Triskaidekaphobia", "Triskaidekaphobia"],
  ["Fear of foreigners or strangers", "Xenophobia", "Xenophobia"], ["Fear of blood", "Blood-injection-injury type phobia", "Haemophobia"],
  ["Fear of fire", "Pyrophobia", "Pyrophobia"], ["Fear of animals", "Zoophobia", "Zoophobia"],
  ["Fear of night or darkness", "Nyctophobia", "Nyctophobia"], ["Fear of public speaking", "Glossophobia", "Glossophobia"],
];

export const ABBREVIATION_FAMILIES = [
  {
    category: "History", levels: [1, 3], facts: ORGANISATIONS,
    forms: [
      { prompt: (abbreviation) => `What does ${abbreviation} stand for?`, explain: (abbreviation, meaning) => `${abbreviation} stands for ${meaning}.` },
      { reverse: true, prompt: (abbreviation, meaning) => `Which body is abbreviated from "${meaning}"?`, explain: (abbreviation, meaning) => `That is ${abbreviation}.` },
    ],
  },
  {
    category: "Science", levels: [1, 3], facts: SCIENCE_ABBREVIATIONS,
    forms: [
      { prompt: (abbreviation) => `In science, what does ${abbreviation} stand for?`, explain: (abbreviation, meaning) => `${abbreviation} stands for ${meaning}.` },
      { reverse: true, prompt: (abbreviation, meaning) => `Which abbreviation stands for "${meaning}" in science?`, explain: (abbreviation, meaning) => `That is ${abbreviation}.` },
    ],
  },
  {
    category: "Physics", levels: [1, 2], facts: MEASUREMENT_ABBREVIATIONS,
    forms: [
      { prompt: (abbreviation) => `Which unit is written ${abbreviation}?`, explain: (abbreviation, unit) => `${abbreviation} is the ${soft(unit)}.` },
    ],
  },
  {
    category: "Mathematics", levels: [1, 3], facts: SI_PREFIXES,
    forms: [
      { prompt: (prefix) => `What does the prefix ${soft(prefix)}- mean?`, explain: (prefix, meaning) => `${prefix}- means ${soft(meaning)}.` },
      { reverse: true, prompt: (prefix, meaning) => `Which SI prefix means ${soft(meaning)}?`, explain: (prefix, meaning) => `That is ${soft(prefix)}-.` },
    ],
  },
  {
    category: "Mathematics", levels: [1, 3], facts: ROMAN_NUMERALS,
    forms: [
      { prompt: (numeral) => `What number is the Roman numeral ${numeral}?`, explain: (numeral, value) => `${numeral} is ${value}.` },
      { reverse: true, prompt: (numeral, value) => `Which Roman numeral represents ${value}?`, explain: (numeral, value) => `${value} is written ${numeral}.` },
    ],
  },
  {
    category: "History", levels: [2, 3], facts: BUSINESS_ABBREVIATIONS,
    forms: [
      { prompt: (abbreviation) => `In business, what does ${abbreviation} stand for?`, explain: (abbreviation, meaning) => `${abbreviation} stands for ${meaning}.` },
      { reverse: true, prompt: (abbreviation, meaning) => `Which abbreviation stands for "${meaning}"?`, explain: (abbreviation, meaning) => `That is ${abbreviation}.` },
    ],
  },
  {
    category: "Language", levels: [1, 3], facts: LATIN_ABBREVIATIONS,
    forms: [
      { prompt: (abbreviation) => `What does the abbreviation "${abbreviation}" mean?`, explain: (abbreviation, meaning) => `"${abbreviation}" means ${soft(meaning)}.` },
    ],
  },
  {
    category: "Life Science", levels: [2, 4], facts: MEDICAL_TERMS, describe: true,
    forms: [
      { prompt: (definition) => `What is the medical term for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Language", levels: [2, 4], facts: OLOGIES,
    forms: [
      { prompt: (definition) => `What is the name for ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
      { reverse: true, prompt: (definition, term) => `${term} is the study of what?`, explain: (definition, term) => `${term} is ${soft(definition)}.` },
    ],
  },
  {
    category: "Language", levels: [1, 3], facts: PHOBIAS,
    forms: [
      { prompt: (definition) => `What is the name for the ${soft(definition)}?`, explain: (definition, term) => `That is ${soft(term)}.` },
      { reverse: true, prompt: (definition, term) => `${term} is the fear of what?`, explain: (definition, term) => `${term} is the ${soft(definition)}.` },
    ],
  },
];
