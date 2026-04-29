import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { rawMenu } from "../data/raw_menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");

const sourcePath = path.join(root, "data", "menu-completed.json");
const outPath = path.join(root, "data", "menu-completed.json");
const auditPath = path.join(root, "data", "menu-audit-report.md");

const norm = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\bw\//g, "with")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const slugify = (value) =>
  norm(value)
    .replace(/\s+/g, "-")
    .replace(/-and-/g, "-and-");

const rawByName = new Map();
for (const entry of rawMenu) {
  if (entry.name) rawByName.set(norm(entry.name), entry);
  if (entry.options) {
    for (const opt of entry.options) {
      rawByName.set(norm(`${entry.name} ${opt.name}`), {
        ...entry,
        ...opt,
        name: `${entry.name} ${opt.name}`,
        baseName: entry.name,
        description: opt.description || entry.description,
        tags: [...(entry.tags || []), ...(opt.tags || [])],
      });
    }
  }
}

const aliasToRawName = {
  "jalapeo yellowtail": "jalapeño yellowtail",
  "gyoza dumplings": "beef gyoza dumplings",
  "sake salmon": "sake",
  "kani crab": "kani crab stick",
  "saba mackerel": "saba mackeral",
  "salmon roll": "sake roll",
  "white tuna roll": "escolar roll",
  "hamachi roll": "hamachi roll",
  "hibachi teriyaki steak": "hibachi or teriyaki steak",
  "hibachi teriyaki vegetable": "hibachi or teriyaki vegetable only",
  "hibachi teriyaki chicken": "hibachi or teriyaki chicken",
  "hibachi teriyaki shrimp": "hibachi or teriyaki shrimp",
  "hibachi teriyaki filet mignon": "hibachi or teriyaki filet mignon",
  "hibachi teriyaki scallop": "hibachi or teriyaki scallop",
  "yakisoba vegetable": "yakisoba vegetable only",
  "yakisoba steak": "yakisoba beef",
  "fried rice": "fried rice vegetable only",
  "ocean samurai roll": "ocean sam roll",
  "big easy roll": "big east roll",
};

const itemOverrides = {
  "alaska-roll": {
    description: "Salmon, cucumber, and avocado rolled into a fresh, clean classic.",
  },
  "spicy-california-roll": {
    description: "A California roll with a spicy kick from creamy chili mayo.",
    ingredients: ["crab salad", "avocado", "cucumber", "fish roe"],
    sauces: ["spicy mayo"],
  },
  "shrimp-tempura-roll": {
    description: "Crispy shrimp tempura rolled with cucumber and finished with savory sauce.",
    ingredients: ["shrimp tempura", "cucumber"],
    sauces: ["eel sauce"],
  },
  "chicken-tempura-roll": {
    description: "Crispy chicken tempura wrapped in sushi rice for a warm, savory bite.",
    ingredients: ["chicken tempura"],
    sauces: ["eel sauce"],
  },
  "sweet-potato-roll": {
    description: "A vegetarian roll with crisp sweet potato tempura and a naturally sweet finish.",
    ingredients: ["sweet potato"],
    sauces: ["eel sauce"],
  },
  "spring-roll": {
    description: "Crisp vegetable spring rolls served with a light dipping sauce.",
    ingredients: ["vegetables", "spring roll wrapper"],
    sauces: ["sweet chili sauce"],
  },
  "house-salad": {
    description: "Fresh lettuce, cucumber, and carrot served with ginger dressing.",
    ingredients: ["lettuce", "cucumber", "carrot"],
    sauces: ["ginger dressing"],
  },
  "crab-rangoon": {
    description: "Crispy wontons filled with crab and cream cheese.",
    ingredients: ["crab", "cream cheese", "wonton wrapper"],
  },
  "gyoza-dumplings": {
    description: "Pan-fried beef dumplings with a savory dipping sauce.",
    ingredients: ["beef", "dumpling wrapper"],
    sauces: ["gyoza sauce"],
  },
  "inari-tofu-skin": {
    description: "Sweet tofu skin over seasoned sushi rice.",
    ingredients: ["tofu skin", "sushi rice"],
  },
  "tamago-egg": {
    description: "Sweet Japanese egg omelet served over seasoned sushi rice.",
    ingredients: ["egg", "sushi rice"],
  },
  "tobiko-flying-fish-roe": {
    description: "Flying fish roe with a bright briny pop.",
    ingredients: ["flying fish roe"],
  },
  "crab-rangoon-roll": {
    description: "Cream cheese, crab, and tempura crunch rolled into a rich, crispy bite.",
    ingredients: ["cream cheese", "crab meat", "tempura crisps"],
  },
  "mochi-ice-cream": {
    description: "Soft mochi wrapped around sweet ice cream in assorted flavors.",
    ingredients: ["mochi", "ice cream"],
  },
  "soy-sauce": {
    description: "Classic soy sauce with a salty, savory finish.",
    ingredients: ["soy sauce"],
    sauces: ["soy sauce"],
  },
  "low-sodium-soy-sauce": {
    description: "A lighter soy sauce option with a salty, savory finish.",
    ingredients: ["low sodium soy sauce"],
    sauces: ["low sodium soy sauce"],
  },
  "gluten-free-soy-sauce": {
    description: "A gluten-free soy sauce option for dipping sushi and rolls.",
    ingredients: ["gluten-free soy sauce"],
    sauces: ["gluten-free soy sauce"],
  },
  "sriracha": {
    description: "A bright red chili sauce with bold spicy heat.",
    ingredients: ["sriracha"],
    sauces: ["sriracha"],
  },
  "spicy-mayo": {
    description: "Creamy spicy mayo for a rich chili finish.",
    ingredients: ["spicy mayo"],
    sauces: ["spicy mayo"],
  },
  "yum-yum-sauce": {
    description: "A creamy, lightly sweet hibachi-style dipping sauce.",
    ingredients: ["yum yum sauce"],
    sauces: ["yum yum sauce"],
  },
  "crunch-roll": {
    description: "Crab stick and tempura crisps with a sweet-savory eel sauce finish.",
  },
  "fried-rice": {
    description: "Stir-fried rice with egg, vegetables, and house savory sauce.",
    ingredients: ["rice", "egg", "cabbage", "carrot", "onion", "green onion"],
    sauces: ["house sauce"],
  },
  "white-rice": {
    description: "Steamed white rice, simple and soft for pairing with hibachi and rolls.",
    ingredients: ["white rice"],
  },
};

const addOns = [
  ["Cream Cheese", "Add-ons", "cream-cheese", ["cream cheese"], [], "A creamy add-on for richer, softer rolls."],
  ["Cucumber", "Add-ons", "cucumber-add-on", ["cucumber"], [], "A crisp cucumber add-on for a fresh crunch."],
  ["Avocado", "Add-ons", "avocado-add-on", ["avocado"], [], "A creamy avocado add-on for rolls and sushi."],
  ["Mango", "Add-ons", "mango-add-on", ["mango"], [], "A sweet mango add-on for a bright tropical note."],
  ["Green Onion", "Add-ons", "green-onion-add-on", ["green onion"], [], "A fresh green onion add-on with a sharp savory bite."],
  ["Oshinko", "Add-ons", "oshinko-add-on", ["oshinko pickles"], [], "A tangy pickled radish add-on for crunch and acidity."],
  ["Crunch", "Add-ons", "crunch-add-on", ["tempura crisps"], [], "Crispy tempura crunch for extra texture."],
  ["Fish Roe", "Add-ons", "fish-roe-add-on", ["fish roe"], [], "A briny fish roe add-on with a tiny pop of texture."],
  ["Soy Wrap", "Add-ons", "soy-wrap-add-on", ["soy wrap"], [], "A mild soy wrap substitute for seaweed."],
  ["Ponzu Sauce", "Condiments", "ponzu-sauce", ["ponzu sauce"], ["ponzu sauce"], "A citrusy soy-based sauce with a clean savory finish."],
  ["Honey Wasabi", "Condiments", "honey-wasabi", ["wasabi", "honey"], ["honey wasabi"], "A sweet and spicy wasabi condiment."],
  ["Ginger Dressing", "Condiments", "ginger-dressing", ["ginger"], ["ginger dressing"], "A bright ginger dressing with a lightly sweet tang."],
];

const proteinTerms = [
  "salmon skin",
  "spicy tuna",
  "spicy salmon",
  "spicy shrimp",
  "spicy octopus",
  "white tuna",
  "fish roe",
  "flying fish roe",
  "salmon roe",
  "sweet shrimp",
  "shrimp tempura",
  "chicken tempura",
  "crab tempura",
  "crab salad",
  "crab stick",
  "crab meat",
  "soft shell crab",
  "filet mignon",
  "yellowtail",
  "crawfish",
  "calamari",
  "octopus",
  "scallop",
  "shrimp",
  "salmon",
  "tuna",
  "tilapia",
  "mackerel",
  "escolar",
  "hamachi",
  "unagi",
  "eel",
  "kani",
  "tako",
  "saba",
  "sake",
  "tai",
  "ebi",
  "squid",
  "clam",
  "steak",
  "chicken",
  "tofu",
  "egg",
];

const vegetableTerms = [
  "avocado",
  "cucumber",
  "scallions",
  "green onion",
  "jalapeño",
  "jalapeno",
  "lettuce",
  "mango",
  "oshinko",
  "pickles",
  "sweet potato",
  "carrot",
  "cabbage",
  "onion",
  "zucchini",
  "broccoli",
  "seaweed",
  "edamame",
  "vegetables",
];

const sauceTerms = [
  "eel sauce",
  "spicy mayo",
  "sriracha",
  "ponzu sauce",
  "ponzu",
  "white sauce",
  "sweet wasabi",
  "chef's special sauce",
  "special sauce",
  "teriyaki sauce",
  "yum yum sauce",
  "soy sauce",
  "low sodium soy sauce",
  "gluten-free soy sauce",
  "ginger dressing",
  "honey wasabi",
  "mayo",
  "house sauce",
  "sweet chili sauce",
];

function includesTerm(text, term) {
  return norm(text).includes(norm(term));
}

function pickTerms(text, terms) {
  return [...new Set(terms.filter((term) => includesTerm(text, term)).map((term) => term.replace("jalapeno", "jalapeño")))];
}

function findRaw(item) {
  const key = norm(item.name);
  return rawByName.get(key) || rawByName.get(aliasToRawName[key]) || rawByName.get(norm(item.display_name));
}

function normalizeCategory(item, raw) {
  if (item.category === "Condiments" || item.category === "Add-ons") return item.category;
  const rawCategory = raw?.category || "";
  if (rawCategory === "Classic Maki") return "Classic Rolls";
  if (rawCategory === "Specialty Maki") return "Special Rolls";
  if (rawCategory === "Kitchen Appetizer" || rawCategory === "Sushi Appetizer") return "Appetizers";
  if (rawCategory === "Noodle Dishes") return "Noodles";
  if (rawCategory === "Kitchen Entree") {
    if (norm(item.name).includes("fried rice") || norm(item.name) === "white rice") return "Rice";
    return "Hibachi";
  }
  if (rawCategory === "Soup and Salad") {
    return norm(item.name).includes("soup") ? "Soup" : "Salads";
  }
  return item.category;
}

function inferAllergens(item, proteins, ingredients, sauces, methods) {
  const text = norm([...proteins, ...ingredients, ...sauces, item.name].join(" "));
  const allergens = new Set();
  if (/(salmon|tuna|yellowtail|hamachi|eel|unagi|mackerel|saba|tilapia|tai|escolar|white tuna|fish roe|roe|tobiko|ikura|sake)/.test(text)) allergens.add("fish");
  if (/(shrimp|crab|kani|scallop|clam|crawfish|calamari|squid|octopus|tako)/.test(text)) allergens.add("shellfish");
  if (/(cream cheese|ice cream|cheese)/.test(text)) allergens.add("milk");
  if (/(egg|tamago|mayo|spicy mayo|yum yum)/.test(text)) allergens.add("egg");
  if (/(soy|tofu|edamame|miso|soy wrap)/.test(text)) allergens.add("soy");
  if (/(tempura|crunch|panko|katsu|gyoza|dumpling|spring roll|rangoon|noodle|yakisoba|soy sauce)/.test(text) || methods.includes("fried")) allergens.add("wheat");
  return [...allergens];
}

function inferMethods(text, itemType) {
  const methods = new Set();
  if (/deep.?fried|fried|tempura|crunch|katsu|rangoon|spring roll/i.test(text)) methods.add("fried");
  if (/grilled|hibachi|teriyaki|seared|tataki/i.test(text)) methods.add("grilled");
  if (/stir.?fried|yakisoba|fried rice/i.test(text)) methods.add("stir_fried");
  if (itemType === "roll" || itemType === "nigiri" || itemType === "sashimi" || methods.size === 0) methods.add("assembled");
  return [...methods];
}

function inferFlavor(item, ingredients, sauces, methods, tags) {
  const text = norm([...ingredients, ...sauces, item.name, ...(tags || [])].join(" "));
  const flavors = new Set(["savory"]);
  if (text.includes("spicy") || text.includes("sriracha") || text.includes("jalape")) flavors.add("spicy");
  if (text.includes("sweet") || text.includes("mango") || text.includes("honey") || text.includes("eel sauce") || text.includes("mochi")) flavors.add("sweet");
  if (text.includes("cream cheese") || text.includes("mayo") || text.includes("avocado") || text.includes("ice cream")) flavors.add("creamy");
  if (methods.includes("fried") || text.includes("crunch")) flavors.add("crispy");
  if (item.category === "Nigiri" || item.category === "Sashimi" || item.category === "Salads") flavors.add("fresh");
  return [...flavors];
}

function inferItemType(category, name) {
  const n = norm(name);
  if (n.includes("roll")) return "roll";
  if (category === "Nigiri") return "nigiri";
  if (category === "Sashimi") return "sashimi";
  if (category === "Hibachi") return "hibachi";
  if (category === "Noodles") return "noodle";
  if (category === "Rice") return "rice";
  if (category === "Condiments") return "sauce";
  if (category === "Add-ons") return "add_on";
  if (category === "Dessert") return "dessert";
  return "dish";
}

function folderFor(category) {
  return {
    "Special Rolls": "rolls",
    "Classic Rolls": "rolls",
    Appetizers: "appetizers",
    Salads: "salads",
    Soup: "soup",
    Nigiri: "nigiri",
    Sashimi: "sashimi",
    Hibachi: "hibachi",
    Noodles: "noodles",
    Rice: "rice",
    Dessert: "dessert",
    Condiments: "condiments",
    "Add-ons": "add-ons",
  }[category] || "misc";
}

function shortIntro(item, ingredients, sauces, flavors) {
  const sauceText = sauces.length ? ` with ${sauces.slice(0, 2).join(" and ")}` : "";
  if (item.category === "Condiments") return item.description_short || `${item.name} adds a ${flavors.includes("spicy") ? "spicy" : flavors.includes("sweet") ? "sweet" : "savory"} finishing touch.`;
  if (item.category === "Add-ons") return item.description_short || `${item.name} is an add-on for customizing rolls and sushi.`;
  if (item.category === "Nigiri") return `${item.name} served over seasoned sushi rice for a clean, focused bite.`;
  if (item.category === "Sashimi") return `${item.name} served simply to highlight its clean seafood flavor.`;
  if (item.item_type === "roll") {
    const core = ingredients.slice(0, 3).join(", ");
    return core ? `${item.name} combines ${core}${sauceText} in a balanced sushi roll.` : `${item.name} is a balanced sushi roll with a savory finish.`;
  }
  if (item.category === "Hibachi") return `${item.name} is grilled hibachi-style for a warm, savory entree.`;
  if (item.category === "Noodles") return `${item.name} features stir-fried noodles with vegetables and savory sauce.`;
  if (item.category === "Rice") return `${item.name} is a simple, comforting side for sushi and hibachi.`;
  return item.description_short || `${item.name} is a flavorful ${item.category.toLowerCase()} selection.`;
}

function polishItem(item) {
  const raw = findRaw(item);
  const override = itemOverrides[item.id] || {};
  const rawDescription = override.description || raw?.description || item.description_long || item.description_short || "";
  const rawTags = [...(raw?.tags || []), ...(item.menu_labels || [])];
  const category = normalizeCategory(item, raw);
  const itemType = inferItemType(category, item.name);
  const baseIngredients = item.ingredients_known || [];
  const overrideIngredients = override.ingredients || [];
  const overrideSauces = override.sauces || [];
  const proteins = pickTerms(`${item.name} ${rawDescription}`, proteinTerms);
  const vegetables = pickTerms(`${item.name} ${rawDescription}`, vegetableTerms);
  const sauces = [...new Set([...overrideSauces, ...pickTerms(`${item.name} ${rawDescription}`, sauceTerms)])];
  const ingredients = [...new Set([...baseIngredients, ...overrideIngredients, ...proteins, ...vegetables])];
  const methods = inferMethods(`${item.name} ${rawDescription}`, itemType);
  const isSpicy = rawTags.some((tag) => /spicy/i.test(tag)) || sauces.some((s) => /spicy|sriracha|wasabi/i.test(s)) || /spicy|jalape/i.test(rawDescription);
  const isVeg = rawTags.some((tag) => /veg/i.test(tag)) || (item.dietary_flags || []).includes("vegetarian");
  const isRaw = rawTags.some((tag) => /raw/i.test(tag)) || (item.is_raw && !methods.includes("fried"));
  const flavor = inferFlavor({ ...item, category }, ingredients, sauces, methods, rawTags);
  const allergens = inferAllergens(item, proteins, ingredients, sauces, methods);
  const slug = item.slug || item.id || slugify(item.name);
  const folder = folderFor(category);
  const imagePath = `/menu/${folder}/${slug}.jpg`;
  const menuLabels = [
    ...(item.tier?.includes("supreme") ? ["SUPREME"] : item.tier?.includes("add_on") ? ["ADD-ON"] : ["PREMIUM"]),
    ...(isRaw ? ["RAW"] : []),
    ...(isSpicy ? ["SPICY"] : []),
    ...(isVeg ? ["VEG"] : []),
    ...(rawTags.some((tag) => /gluten/i.test(tag)) || norm(item.name).includes("gluten free") ? ["GLUTEN FREE"] : []),
  ];

  const updated = {
    ...item,
    slug,
    category,
    item_type: itemType,
    image: { main: imagePath, gallery: [] },
    description_short: shortIntro({ ...item, category, item_type: itemType, description_short: override.description || rawDescription }, ingredients, sauces, flavor),
    description_long: rawDescription || shortIntro({ ...item, category, item_type: itemType }, ingredients, sauces, flavor),
    ingredients_known: ingredients,
    ingredients_inferred: [],
    proteins,
    vegetables,
    sauces,
    cooking_methods: methods,
    flavor_profile: flavor,
    texture: [
      ...(methods.includes("fried") ? ["crispy"] : []),
      ...(flavor.includes("creamy") ? ["creamy"] : []),
      ...(category === "Nigiri" || category === "Sashimi" ? ["tender"] : ["soft"]),
    ],
    allergens,
    dietary_flags: isVeg ? ["vegetarian"] : [],
    menu_labels: [...new Set(menuLabels)],
    spice_level: isSpicy ? Math.max(item.spice_level || 0, 1) : 0,
    is_raw: isRaw,
    beginner_friendly: item.beginner_friendly || (!isRaw && !isSpicy),
    search_keywords: [...new Set([item.name, category, ...ingredients, ...sauces].map(norm).filter(Boolean))],
    data_quality: {
      confidence: ingredients.length || sauces.length || rawDescription ? "high" : "medium",
      needs_review: false,
      review_notes: [],
      sources: [raw ? "raw_menu.js" : "menu_image_or_inferred"],
    },
    image_status: "pending_generation",
    image_prompt: buildPrompt({ ...item, category, item_type: itemType }, ingredients, sauces, flavor, methods),
  };

  return updated;
}

function buildPrompt(item, ingredients, sauces, flavors, methods) {
  const details = [...ingredients, ...sauces].filter(Boolean).join(", ");
  const style =
    item.category === "Condiments"
      ? "small black dipping bowl, sauce visible from a slight overhead angle"
      : item.category === "Add-ons"
        ? "single add-on ingredient arranged cleanly in a small black dish"
        : item.item_type === "roll"
          ? "sushi roll pieces with clear cut surfaces showing the fillings"
          : item.category === "Hibachi"
            ? "hibachi restaurant plating with grilled protein, vegetables, and sauce"
            : "Japanese restaurant menu plating";
  return [
    `Photorealistic Japanese restaurant menu photo of ${item.name}.`,
    details ? `Must visibly include: ${details}.` : "",
    flavors.includes("spicy") ? "Show a subtle spicy visual cue such as red sauce or chili garnish." : "",
    flavors.includes("sweet") ? "Use a warm appetizing finish that suggests a lightly sweet flavor." : "",
    methods.includes("fried") ? "Show crisp fried texture clearly." : "",
    `Composition: ${style}, appetizing, clean plating, square crop.`,
    "Lighting: soft studio restaurant lighting, realistic food photography.",
    "Avoid: text, logo, watermark, hands, menu board, price, labels.",
  ]
    .filter(Boolean)
    .join(" ");
}

const addOnIds = new Set(addOns.map(([, , id]) => id));
const base = JSON.parse(fs.readFileSync(sourcePath, "utf8")).filter((item) => !addOnIds.has(item.id));
let items = base.map(polishItem);

for (const [name, category, id, ingredients, sauces, intro] of addOns) {
  if (items.some((item) => item.id === id)) continue;
  const tier = category === "Add-ons" || category === "Condiments" ? ["add_on"] : ["premium"];
  items.push(
    polishItem({
      id,
      slug: id,
      name,
      display_name: name,
      aliases: [],
      tier,
      category,
      subcategory: null,
      pieces: null,
      image: { main: `/menu/${folderFor(category)}/${id}.jpg`, gallery: [] },
      description_short: intro,
      description_long: intro,
      ingredients_known: ingredients,
      ingredients_inferred: [],
      proteins: [],
      vegetables: [],
      sauces,
      cooking_methods: ["assembled"],
      flavor_profile: [],
      texture: [],
      allergens: [],
      dietary_flags: [],
      menu_labels: [category === "Add-ons" ? "ADD-ON" : "CONDIMENT"],
      spice_level: /spicy|wasabi/i.test(name) ? 1 : 0,
      is_raw: false,
      beginner_friendly: true,
      limit_per_person: null,
      sashimi_surcharge: null,
      cultural_note: "An optional menu component used to customize rolls and sauces.",
      chef_note: "Use it to tailor flavor and texture to your preference.",
      search_keywords: [],
      data_quality: { confidence: "high", needs_review: false, review_notes: [] },
      image_status: "pending_generation",
    })
  );
}

items = items.sort((a, b) => {
  const categoryOrder = [
    "Soup",
    "Salads",
    "Appetizers",
    "Nigiri",
    "Sashimi",
    "Classic Rolls",
    "Special Rolls",
    "Hibachi",
    "Noodles",
    "Rice",
    "Dessert",
    "Add-ons",
    "Condiments",
  ];
  const ca = categoryOrder.indexOf(a.category);
  const cb = categoryOrder.indexOf(b.category);
  return (ca === -1 ? 999 : ca) - (cb === -1 ? 999 : cb) || a.name.localeCompare(b.name);
});

for (const item of items) {
  const fullPath = path.join(root, "public", item.image.main.replace(/^\//, ""));
  item.image_status = fs.existsSync(fullPath) ? "generated" : "pending_generation";
}

fs.writeFileSync(outPath, `${JSON.stringify(items, null, 2)}\n`);

const missingImages = items.filter((item) => item.image_status !== "generated");
const weak = items.filter((item) => item.data_quality?.needs_review || item.ingredients_known.length === 0);
const categoryCounts = items.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});

const audit = [
  "# Menu Audit Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  `Total menu records: ${items.length}`,
  `Pending images: ${missingImages.length}`,
  `Records with empty ingredients: ${weak.length}`,
  "",
  "## Category Counts",
  "",
  ...Object.entries(categoryCounts).map(([category, count]) => `- ${category}: ${count}`),
  "",
  "## Still Worth Owner Review",
  "",
  ...weak.slice(0, 80).map((item) => `- ${item.name}: missing explicit ingredient detail`),
  "",
];

fs.writeFileSync(auditPath, audit.join("\n"));

console.log(`Wrote ${items.length} records to ${path.relative(root, outPath)}`);
console.log(`Wrote audit to ${path.relative(root, auditPath)}`);
