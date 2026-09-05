// More abbreviations, again one-to-one so each row asks in both directions.
import { soft } from "./case.js";
const GENERAL_ABBREVIATIONS = [
  ["SCUBA", "Scuba diving", "Self-Contained Underwater Breathing Apparatus"], ["TASER", "Taser", "Thomas A. Swift's Electric Rifle"],
  ["ZIP code", "ZIP Code", "Zone Improvement Plan"], ["SIM card", "SIM card", "Subscriber Identity Module"],
  ["SPF", "Sun protection factor", "Sun Protection Factor"], ["SPAM in email", "Email spam", "Unsolicited bulk email"],
  ["AWOL", "Desertion", "Absent Without Leave"], ["MIA", "Missing in action", "Missing In Action"],
  ["DIY", "Do it yourself", "Do It Yourself"],
  ["FAQ", "FAQ", "Frequently Asked Questions"], ["RSVP", "RSVP", "Répondez s'il vous plaît"],
  ["VIP", "Very important person", "Very Important Person"], ["PIN in banking", "Personal identification number", "Personal Identification Number"],
  ["OTC medicine", "Over-the-counter drug", "Over The Counter"], ["ICU", "Intensive care unit", "Intensive Care Unit"],
  ["CPR", "Cardiopulmonary resuscitation", "Cardiopulmonary Resuscitation"], ["AED", "Automated external defibrillator", "Automated External Defibrillator"],
  ["GP", "General practitioner", "General Practitioner"], ["NHS", "National Health Service", "National Health Service"],
  ["PPE", "Personal protective equipment", "Personal Protective Equipment"],
  ["SOS", "SOS", "A distress signal in Morse code"], ["MAYDAY", "Mayday", "A spoken distress call"],
  ["ETA", "Estimated time of arrival", "Estimated Time of Arrival"], ["DOB", "Date of birth", "Date Of Birth"],
  ["CV", "Curriculum vitae", "Curriculum Vitae"], ["PhD", "Doctor of Philosophy", "Doctor of Philosophy"],
  ["MBA", "Master of Business Administration", "Master of Business Administration"], ["BSc", "Bachelor of Science", "Bachelor of Science"],
  ["UNESCO's field of work", "UNESCO", "Education, science and culture"],
];

const MOTORING_AND_TRAVEL = [
  ["ABS in cars", "Anti-lock braking system", "Anti-lock Braking System"], ["SUV", "Sport utility vehicle", "Sport Utility Vehicle"],
  ["MPG", "Fuel economy in automobiles", "Miles Per Gallon"], ["EV", "Electric vehicle", "Electric Vehicle"],
  ["GPS in a car", "Global Positioning System", "Global Positioning System"], ["MOT in Britain", "MOT test", "Ministry of Transport test"],
  ["HGV", "Large goods vehicle", "Heavy Goods Vehicle"], ["RV", "Recreational vehicle", "Recreational Vehicle"],
  ["ATC", "Air traffic control", "Air Traffic Control"], ["IATA", "International Air Transport Association", "International Air Transport Association"],
  ["ICAO", "International Civil Aviation Organization", "International Civil Aviation Organization"], ["VTOL", "VTOL", "Vertical Take-Off and Landing"],
  ["SST", "Supersonic transport", "Supersonic Transport"],
];

const MEDIA_ABBREVIATIONS = [
  ["BBC", "BBC", "British Broadcasting Corporation"], ["CNN", "CNN", "Cable News Network"],
  ["MTV", "MTV", "Music Television"], ["PBS", "PBS", "Public Broadcasting Service"],
  ["NPR", "NPR", "National Public Radio"], ["AP", "Associated Press", "Associated Press"],
  ["AFP", "Agence France-Presse", "Agence France-Presse"], ["DVD", "DVD", "Digital Versatile Disc"],
  ["CD", "Compact disc", "Compact Disc"], ["VHS", "VHS", "Video Home System"],
  ["HDTV", "High-definition television", "High-Definition Television"], ["FM radio", "FM broadcasting", "Frequency Modulation"],
  ["AM radio", "AM broadcasting", "Amplitude Modulation"], ["PA system", "Public address system", "Public Address system"],
];

const SPORT_ABBREVIATIONS = [
  ["FIFA's sport", "FIFA", "Association football"], ["NBA", "National Basketball Association", "National Basketball Association"],
  ["NFL", "National Football League", "National Football League"], ["MLB", "Major League Baseball", "Major League Baseball"],
  ["NHL", "National Hockey League", "National Hockey League"], ["UEFA", "UEFA", "Union of European Football Associations"],
  ["MMA", "Mixed martial arts", "Mixed Martial Arts"], ["F1", "Formula One", "Formula One"],
  ["PGA", "PGA of America", "Professional Golfers' Association"], ["WADA", "World Anti-Doping Agency", "World Anti-Doping Agency"],
];

const CHEMISTRY_SHORTHAND = [
  ["The formula for table salt", "Sodium chloride", "NaCl"], ["The formula for chalk and limestone", "Calcium carbonate", "CaCO3"],
  ["The formula for baking soda", "Sodium bicarbonate", "NaHCO3"], ["The formula for laughing gas", "Nitrous oxide", "N2O"],
  ["The formula for dry ice", "Carbon dioxide", "CO2"], ["The formula for rubbing alcohol's chief component", "Isopropyl alcohol", "C3H8O"],
  ["The formula for vinegar's acid", "Acetic acid", "CH3COOH"], ["The formula for quicklime", "Calcium oxide", "CaO"],
  ["The formula for lye", "Sodium hydroxide", "NaOH"], ["The formula for ammonia", "Ammonia", "NH3"],
];

export const ABBREVIATIONS2_FAMILIES = [
  {
    category: "Language", levels: [1, 3], facts: GENERAL_ABBREVIATIONS,
    forms: [
      { prompt: (abbreviation) => `What does ${abbreviation} stand for or mean?`, explain: (abbreviation, meaning) => `${abbreviation}: ${meaning}.` },
      { reverse: true, prompt: (abbreviation, meaning) => `Which abbreviation means "${meaning}"?`, explain: (abbreviation, meaning) => `That is ${abbreviation}.` },
    ],
  },
  {
    category: "Technology", levels: [2, 4], facts: MOTORING_AND_TRAVEL,
    forms: [
      { prompt: (abbreviation) => `In transport, what does ${abbreviation} stand for?`, explain: (abbreviation, meaning) => `${abbreviation}: ${meaning}.` },
      { reverse: true, prompt: (abbreviation, meaning) => `Which transport abbreviation stands for "${meaning}"?`, explain: (abbreviation, meaning) => `That is ${abbreviation}.` },
    ],
  },
  {
    category: "Technology", levels: [1, 3], facts: MEDIA_ABBREVIATIONS,
    forms: [
      { prompt: (abbreviation) => `In broadcasting and media, what does ${abbreviation} stand for?`, explain: (abbreviation, meaning) => `${abbreviation}: ${meaning}.` },
      { reverse: true, prompt: (abbreviation, meaning) => `Which media abbreviation stands for "${meaning}"?`, explain: (abbreviation, meaning) => `That is ${abbreviation}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: SPORT_ABBREVIATIONS,
    forms: [
      { prompt: (abbreviation) => `In sport, what does ${abbreviation} stand for?`, explain: (abbreviation, meaning) => `${abbreviation}: ${meaning}.` },
    ],
  },
  {
    category: "Chemistry", levels: [2, 4], facts: CHEMISTRY_SHORTHAND,
    forms: [
      { prompt: (description) => `What is ${soft(description)}?`, explain: (description, formula) => `${description}: ${formula}.` },
    ],
  },
];
