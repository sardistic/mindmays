// Medicine and the human body: systems, treatments, nutrition and history.
import { soft } from "./case.js";
const BODY_FACTS = [
  ["The largest organ of the human body", "Human skin", "The skin"], ["The largest internal organ", "Liver", "The liver"],
  ["The longest bone in the body", "Femur", "The femur"], ["The smallest bone in the body", "Stapes", "The stapes"],
  ["The strongest muscle by weight", "Masseter muscle", "The masseter"], ["The largest muscle in the body", "Gluteus maximus muscle", "The gluteus maximus"],
  ["The hardest substance in the body", "Tooth enamel", "Tooth enamel"], ["The longest nerve in the body", "Sciatic nerve", "The sciatic nerve"],
  ["The organ that filters the blood", "Kidney", "The kidneys"], ["The gland called the master gland", "Pituitary gland", "The pituitary gland"],
  ["The number of chambers in the human heart", "Heart", "Four"], ["The number of bones in an adult human", "Human skeleton", "206"],
  ["The number of pairs of ribs in most humans", "Rib cage", "Twelve"], ["The number of teeth in a full adult set", "Human tooth", "32"],
  ["The number of chromosomes in a human cell", "Human genome", "46"], ["The number of vertebrae in the human spine", "Vertebral column", "33"],
];

const BLOOD_TYPES = [
  ["The universal red-cell donor type", "Blood type", "O negative"], ["The universal plasma donor type", "Blood type", "AB"],
  ["The protein whose presence makes a blood type positive", "Rh blood group system", "The Rh factor"],
  ["The system dividing blood into A, B, AB and O", "ABO blood group system", "The ABO system"],
];

const TREATMENTS = [
  ["A substance that kills or inhibits bacteria", "Antibiotic", "An antibiotic"], ["A preparation that trains immunity against a disease", "Vaccine", "A vaccine"],
  ["A drug that relieves pain", "Analgesic", "An analgesic"], ["A drug that reduces fever", "Antipyretic", "An antipyretic"],
  ["A substance that prevents blood clotting", "Anticoagulant", "An anticoagulant"], ["An inactive treatment given for comparison", "Placebo", "A placebo"],
  ["The removal of tissue for examination", "Biopsy", "A biopsy"], ["Treatment using X-rays against tumours", "Radiation therapy", "Radiotherapy"],
  ["Treatment using drugs against cancer cells", "Chemotherapy", "Chemotherapy"], ["A drug that induces loss of sensation", "Anesthesia", "An anaesthetic"],
  ["The transfer of an organ from one body to another", "Organ transplantation", "A transplant"], ["Restarting a stopped heart with an electric shock", "Defibrillation", "Defibrillation"],
];

const NUTRIENTS = [
  ["The nutrient class providing the body's main fuel", "Carbohydrate", "Carbohydrates"], ["The nutrient class building and repairing tissue", "Protein", "Proteins"],
  ["The nutrient class storing energy and insulating", "Fat", "Fats"], ["The building blocks of proteins", "Amino acid", "Amino acids"],
  ["The indigestible plant material that aids digestion", "Dietary fiber", "Dietary fibre"], ["The mineral needed for strong bones and teeth", "Calcium", "Calcium"],
  ["The mineral carried by haemoglobin", "Iron", "Iron"], ["The mineral needed for thyroid hormones", "Iodine", "Iodine"],
  ["The element regulating fluid balance as a salt", "Sodium", "Sodium"], ["The nutrient the body cannot store and needs daily", "Vitamin C", "Vitamin C"],
];

const MEDICAL_HISTORY = [
  ["The oath traditionally taken by physicians", "Hippocratic Oath", "The Hippocratic Oath"],
  ["The first vaccine, against smallpox", "Smallpox vaccine", "Edward Jenner's vaccine"],
  ["The discovery of penicillin", "Penicillin", "Alexander Fleming"],
  ["The first successful heart transplant", "Christiaan Barnard", "Christiaan Barnard"],
  ["The introduction of antiseptic surgery", "Joseph Lister", "Joseph Lister"],
  ["The demonstration of germ theory", "Germ theory of disease", "Louis Pasteur"],
  ["The mapping of the human genome", "Human Genome Project", "The Human Genome Project"],
  ["The identification of the cause of cholera in London", "John Snow", "John Snow"],
  ["The founding of modern nursing", "Florence Nightingale", "Florence Nightingale"],
  ["The discovery of insulin", "Insulin", "Frederick Banting"],
];

const IMMUNE = [
  ["A foreign substance that provokes an immune response", "Antigen", "An antigen"],
  ["A protein that binds a specific antigen", "Antibody", "An antibody"],
  ["A white blood cell central to adaptive immunity", "Lymphocyte", "A lymphocyte"],
  ["An overreaction of the immune system to a harmless substance", "Allergy", "An allergy"],
  ["A disease in which the immune system attacks the body", "Autoimmune disease", "An autoimmune disease"],
  ["Protection of a population by widespread immunity", "Herd immunity", "Herd immunity"],
  ["A cell that engulfs and digests pathogens", "Phagocyte", "A phagocyte"],
  ["The body's raised temperature fighting infection", "Fever", "A fever"],
];

const BODY_SYSTEMS_ROLE = [
  ["The circulatory system", "Circulatory system", "Moving blood, nutrients and oxygen"],
  ["The respiratory system", "Respiratory system", "Taking in oxygen and expelling carbon dioxide"],
  ["The digestive system", "Human digestive system", "Breaking food down and absorbing nutrients"],
  ["The nervous system", "Nervous system", "Carrying signals and coordinating the body"],
  ["The endocrine system", "Endocrine system", "Releasing hormones into the blood"],
  ["The skeletal system", "Human skeleton", "Supporting and protecting the body"],
  ["The muscular system", "Muscular system", "Producing movement"],
  ["The lymphatic system", "Lymphatic system", "Draining fluid and supporting immunity"],
  ["The urinary system", "Urinary system", "Filtering waste and producing urine"],
  ["The integumentary system", "Integumentary system", "Covering and protecting the body"],
];

const PSYCHOLOGY = [
  ["Learning by association between two stimuli", "Classical conditioning", "Classical conditioning"],
  ["Learning shaped by reward and punishment", "Operant conditioning", "Operant conditioning"],
  ["The discomfort of holding contradictory beliefs", "Cognitive dissonance", "Cognitive dissonance"],
  ["The tendency to favour information confirming existing beliefs", "Confirmation bias", "Confirmation bias"],
  ["A fixed belief held despite contrary evidence", "Delusion", "A delusion"],
  ["A perception without an external stimulus", "Hallucination", "A hallucination"],
  ["The hierarchy of human needs proposed in 1943", "Maslow's hierarchy of needs", "Maslow's hierarchy of needs"],
  ["The study of behaviour and mental processes", "Psychology", "Psychology"],
  ["The part of the mind Freud held to be outside awareness", "Unconscious mind", "The unconscious"],
  ["The tendency of people to conform to a group", "Conformity", "Conformity"],
];

export const MEDICINE_FAMILIES = [
  {
    category: "Life Science", levels: [1, 3], facts: BODY_FACTS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)}?`, explain: (definition, answer) => `${definition}: ${soft(answer)}.` },
    ],
  },
  {
    category: "Life Science", levels: [3, 4], facts: BLOOD_TYPES, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)}?`, explain: (definition, answer) => `That is ${soft(answer)}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 3], facts: TREATMENTS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 3], facts: NUTRIENTS, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)}?`, explain: (definition, answer) => `That is ${soft(answer)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: MEDICAL_HISTORY,
    forms: [
      { prompt: (event) => `Who or what is associated with ${soft(event)}?`, explain: (event, answer) => `${event}: ${answer}.` },
      { reverse: true, prompt: (event, answer) => `${answer} is associated with which of these?`, explain: (event, answer) => `${answer}: ${soft(event)}.` },
    ],
  },
  {
    category: "Life Science", levels: [2, 4], facts: IMMUNE, describe: true,
    forms: [
      { prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
  {
    category: "Life Science", levels: [1, 2], facts: BODY_SYSTEMS_ROLE, identify: true,
    forms: [
      { prompt: (system) => `What does ${soft(system)} do?`, explain: (system, role) => `${system}: ${soft(role)}.` },
      { reverse: true, prompt: (system, role) => `Which body system is responsible for ${soft(role)}?`, explain: (system, role) => `That is ${soft(system)}.` },
    ],
  },
  {
    category: "Life Science", levels: [2, 4], facts: PSYCHOLOGY, describe: true,
    forms: [
      { prompt: (definition) => `In psychology, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` },
    ],
  },
];
