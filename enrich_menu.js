import fs from 'fs';
import { rawMenu } from './data/raw_menu.js';

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const supremeItems = rawMenu.find(r => r.name === "Supreme Extra Items")?.items.map(i => i.toLowerCase().replace(/ \(\d+\)$/, '').trim()) || [];
const premiumItems = rawMenu.find(r => r.name === "Premium Items")?.items.map(i => i.toLowerCase().replace(/ \(\d+\)$/, '').trim()) || [];

function matchesAyce(name, list) {
  const n = name.toLowerCase().replace(/ \(\d+\)$/, '').trim();
  for (const item of list) {
    if (n.includes(item) || item.includes(n)) return true;
  }
  return false;
}

const itemsArray = rawMenu.filter(item => item.category);
const finalItems = [];

// Base taxonomy terms
const JAP_ALIASES = {
  'sake': 'salmon',
  'tuna': 'tuna',
  'maguro': 'tuna',
  'hamachi': 'yellowtail',
  'unagi': 'eel',
  'kani': 'crab stick',
  'tamago': 'egg',
  'ika': 'squid',
  'tako': 'octopus',
  'saba': 'mackerel',
  'escolar': 'white tuna',
  'ebi': 'shrimp',
  'amaebi': 'sweet shrimp',
  'tai': 'tilapia',
  'ikura': 'salmon roe',
  'tobiko': 'flying fish roe'
};

for (let rawItem of itemsArray) {
    const originalName = rawItem.name.trim();
    if (!originalName) continue;

    // Normalize pieces
    let pieces = rawItem.pieces ?? null;
    const piecesMatch = originalName.match(/\((\d+)\)$/);
    let cleanName = originalName;
    if (pieces === null && piecesMatch) {
        pieces = parseInt(piecesMatch[1], 10);
        cleanName = originalName.replace(/\(\d+\)$/, '').trim();
    }
    
    // Category mapping
    const catMap = mapCategory(rawItem.category, cleanName);
    
    // Generate base ID incorporating type to avoid collisions
    let idBase = slugify(cleanName);
    if(rawItem.category.toLowerCase().includes('lunch')) idBase += '-lunch';
    const id = `${catMap.item_type.replace(/_/g, '-')}-${idBase}`;

    let existingItem = finalItems.find(i => i.id === id);

    if (!existingItem) {
        existingItem = initItem(id, cleanName, rawItem, catMap, pieces);
        finalItems.push(existingItem);
    }

    // Assign Options for variable price items
    if (rawItem.options && rawItem.options.length > 0) {
        for (const opt of rawItem.options) {
            const optProteins = extractProteins(opt.name);
            const optAllergensObj = determineAllergens(optProteins, [], "", false);
            
            existingItem.options.push({
                name: opt.name,
                price: opt.price ?? null,
                price_modifier: null,
                tags: opt.tags || [],
                proteins: optProteins,
                allergens: optAllergensObj.contains
            });
            
            // Merge option proteins into parent
            optProteins.forEach(p => {
                if(!existingItem.tags.proteins.includes(p)) existingItem.tags.proteins.push(p);
            });
        }
    } else {
        // Simple item price
        if (existingItem.price === null && rawItem.price !== null) {
            existingItem.price = rawItem.price;
        }
    }
}

// -----------------------------------------------------
// INIT ITEM GENERATOR
// -----------------------------------------------------
function initItem(id, cleanName, rawItem, catMap, pieces) {
    let ayce_available = true;
    let ayce_tiers = [];
    if (matchesAyce(cleanName, supremeItems)) {
        ayce_tiers.push("supreme");
    } else {
        ayce_tiers.push("premium");
    }

    const desc = rawItem.description || '';
    const nameDesc = (cleanName + ' ' + desc).toLowerCase();

    // Determine basic traits
    const is_fried = nameDesc.includes("fried") || nameDesc.includes("tempura") || nameDesc.includes("katsu") || nameDesc.includes("crisp");
    
    const is_spicy = rawItem.tags?.includes("Spicy") || nameDesc.includes("spicy") || nameDesc.includes("jalapeño") || nameDesc.includes("sriracha");
    const spice_level = is_spicy ? (nameDesc.includes("jalapeño") || nameDesc.includes("sriracha") ? 2 : 1) : 0;
    
    const is_vegetarian = rawItem.tags?.includes("Veg") || cleanName.toLowerCase().includes("vegetable") || cleanName.toLowerCase().includes("sweet potato") || cleanName.toLowerCase().includes("avocado roll") || cleanName.toLowerCase().includes("cucumber roll");

    const proteins = extractProteins(nameDesc);
    const veggies = extractVegetables(nameDesc);
    const sauces = extractSauces(nameDesc);
    const wrappers = catMap.item_type.includes("roll") ? ["nori"] : [];
    if(nameDesc.includes('soy wrap')) wrappers.push('soy_paper');

    // Cooking methods and raw inference
    const cookingMethodsSet = new Set();
    let is_raw = false;
    
    if (is_fried) {
        if(nameDesc.includes("tempura")) cookingMethodsSet.add("tempura_fried");
        else if (nameDesc.includes("katsu") || nameDesc.includes("panko")) cookingMethodsSet.add("panko_fried");
        else cookingMethodsSet.add("deep_fried");
    }
    
    if (nameDesc.includes("grilled") || catMap.item_type.includes("hibachi") || catMap.item_type.includes("teriyaki")) cookingMethodsSet.add("grilled");
    if (nameDesc.includes("stir-fried") || catMap.item_type.includes("noodle") || catMap.item_type.includes("rice_entree")) cookingMethodsSet.add("stir_fried");
    if (nameDesc.includes("seared") || nameDesc.includes("tataki")) cookingMethodsSet.add("seared");
    if (nameDesc.includes("baked")) cookingMethodsSet.add("baked");

    // Raw logic check:
    // If explicitly tagged Raw, or is sashimi.
    if (rawItem.tags?.includes("Raw") || catMap.item_type === "sashimi") {
        is_raw = true;
    } 
    // If it's nigiri, it's raw unless it's explicitly cooked topping
    else if (catMap.item_type === "nigiri") {
        const cookedNigiri = ['eel', 'egg', 'shrimp', 'crab_stick', 'tofu', 'octopus'];
        const hasCooked = proteins.some(p => cookedNigiri.includes(p));
        const hasRaw = proteins.some(p => !cookedNigiri.includes(p));
        if (!hasCooked || hasRaw) is_raw = true; 
    }
    // If it mentions clearly raw fish and isn't indicated as fried/cooked
    else {
        const rawIndicators = ['tuna', 'salmon', 'yellowtail', 'white tuna', 'escolar', 'mackerel', 'ikura', 'sashimi'];
        if (rawIndicators.some(i => nameDesc.includes(i)) && !is_fried && !cookingMethodsSet.has('grilled') && !cookingMethodsSet.has('seared') && !cookingMethodsSet.has('baked')) {
            // Check if it's smoked salmon (cooked)
            if (!nameDesc.includes('smoked salmon')) {
                is_raw = true;
            }
        }
    }

    if (is_raw) {
        cookingMethodsSet.add("raw");
        cookingMethodsSet.add("chilled");
    }

    if (cookingMethodsSet.size === 0) {
        if (catMap.item_type.includes('roll') || catMap.item_type.includes('sushi')) {
            cookingMethodsSet.add("assembled");
            cookingMethodsSet.add("chilled");
        } else {
            cookingMethodsSet.add("hot_served");
        }
    }

    const temperature = Array.from(cookingMethodsSet).some(m => ["raw", "chilled"].includes(m)) || catMap.item_type === "salad" || catMap.item_type === "dessert" && !is_fried ? ["cold"] : ["hot"];

    // Allergens
    const allergensObj = determineAllergens(proteins, sauces, desc, is_fried);

    const beginner_friendly = !is_raw && spice_level === 0 && (catMap.item_type.includes("roll") || is_fried || catMap.item_type.includes("entree"));

    // Aliases
    const aliases = [];
    Object.keys(JAP_ALIASES).forEach(k => {
        if(cleanName.toLowerCase().includes(k)) {
            aliases.push(JAP_ALIASES[k]);
        } else if(cleanName.toLowerCase().includes(JAP_ALIASES[k])) {
            aliases.push(k);
        }
    });

    const ingredients_main = [...proteins, ...veggies];
    const ingredients_sec = catMap.item_type.includes("roll") ? ["rice", "nori"] : [];
    if(catMap.item_type === "nigiri") ingredients_sec.push("rice");

    const search_terms = generateSearchTerms(cleanName, catMap, ingredients_main, aliases);

    const short_desc = generateShortDesc(cleanName, catMap.item_type, ingredients_main, desc);
    const long_desc = generateLongDesc(cleanName, catMap.item_type, ingredients_main, desc, is_fried, is_raw, spice_level);
    
    // Quality & Inference tracking
    let confidence = "high";
    let needs_review = false;
    let review_notes = [];
    let inferred = ["history_note", "preparation_note", "flavor_note"];

    if (allergensObj.notes.length > 0) inferred.push("allergens");
    if (catMap.item_type.includes("roll") && !desc && proteins.length === 0 && !is_vegetarian) {
         needs_review = true;
         review_notes.push("Missing exact roll description/ingredients.");
         confidence = "low";
    }
    if (is_fried && !desc.includes("batter")) {
        review_notes.push("Check exact batter allergens with kitchen if needed.");
    }

    return {
      id,
      slug: slugify(cleanName),
      name: cleanName,
      display_name: cleanName,
      aliases: [...new Set(aliases)],
      category: catMap.category,
      subcategory: catMap.subcategory,
      item_type: catMap.item_type,
      cuisine_style: catMap.cuisine_style,
      service_style: ["a_la_carte", ayce_available ? "ayce" : ""].filter(Boolean),
      price: rawItem.price ?? null,
      price_label: null,
      pieces,
      options: [],
      image: null,
      gallery: [],
      tags: {
        primary: [catMap.category],
        dish_type: [catMap.item_type, catMap.item_type.includes('roll')?'roll':'', catMap.item_type.includes('sushi')?'sushi':''].filter(Boolean),
        ingredients_main: ingredients_main,
        ingredients_secondary: ingredients_sec,
        proteins,
        seafood: proteins.filter(p => ['salmon', 'tuna', 'yellowtail', 'eel', 'white_tuna', 'tilapia', 'mackerel', 'octopus', 'squid', 'shrimp', 'scallop', 'lobster', 'crab_stick', 'crab_salad', 'crawfish', 'soft_shell_crab', 'smoked_salmon'].includes(p)),
        shellfish: proteins.filter(p => ['shrimp', 'scallop', 'lobster', 'crawfish', 'soft_shell_crab'].includes(p)),
        roe: extractRoe(nameDesc),
        vegetables: veggies,
        fruit: nameDesc.includes("mango") ? ["mango"] : [],
        sauces: sauces,
        wrappers: wrappers,
        textures: extractTextures(nameDesc, is_fried),
        flavors: extractFlavors(spice_level),
        cooking_methods: Array.from(cookingMethodsSet),
        temperature,
        dietary_flags: is_vegetarian ? ["vegetarian"] : [],
        caution_flags: is_raw ? ["raw_seafood"] : [],
        search_terms: search_terms
      },
      allergens: allergensObj,
      spice_level,
      is_raw,
      is_fried,
      is_gluten_likely: allergensObj.contains.includes('wheat') || allergensObj.contains.includes('gluten'),
      beginner_friendly,
      short_description: short_desc,
      long_description: long_desc,
      history_note: getHistoryNote(catMap.item_type),
      preparation_note: getPrepNote(catMap.item_type, Array.from(cookingMethodsSet)),
      flavor_note: getFlavorNote(spice_level, is_fried, is_raw),
      source_snapshot: {
        raw_name: rawItem.name.trim(),
        raw_category: rawItem.category,
        raw_description: rawItem.description || null,
        raw_tags: rawItem.tags || []
      },
      data_quality: {
        confidence,
        source: desc ? ["raw_menu_text", "menu_description", "culinary_inference"] : ["raw_menu_text", "culinary_inference"],
        inferred_fields: inferred,
        needs_review,
        review_notes
      },
      ayce: {
        available: ayce_available,
        tiers: ayce_tiers,
        notes: ""
      },
      visibility: {
        active: true,
        lunch_only: rawItem.category.includes('Lunch'),
        dinner_only: false
      }
    };
}

// -----------------------------------------------------
// MAPPING UTILS
// -----------------------------------------------------

function mapCategory(rawCat, name) {
    let category = rawCat;
    let subcategory = "";
    let item_type = "combo";
    let cuisine_style = ["japanese_american", "sushi"];

    const r = rawCat.toLowerCase();
    const n = name.toLowerCase();

    if (r.includes('soup') || r.includes('salad')) {
        category = "Soup & Salad";
        item_type = r.includes('salad') ? "salad" : "soup";
        if(n.includes('salad')) item_type = "salad";
        if(n.includes('soup')) item_type = "soup";
        cuisine_style = ["japanese_american"];
    } else if (r.includes('kitchen appetizer')) {
        category = "Kitchen Appetizer";
        item_type = "appetizer";
        cuisine_style = ["japanese_american", "hot_kitchen"];
    } else if (r.includes('sushi appetizer') || r.includes('apptizer')) {
        category = "Sushi Appetizer";
        item_type = "sushi_appetizer";
    } else if (r.includes('nigiri') || r.includes('sashimi')) {
        category = "Nigiri & Sashimi";
        item_type = n.includes('sashimi') ? 'sashimi' : 'nigiri';
        if(item_type === 'nigiri') subcategory = "Nigiri Sushi";
        else subcategory = "Sashimi";
        cuisine_style = ["japanese", "sushi"];
    } else if (r.includes('classic maki')) {
        category = "Classic Roll";
        item_type = "classic_roll";
        subcategory = n.includes("tempura") ? "Tempura Fried Roll" : "Classic Sushi Roll";
    } else if (r.includes('specialty maki')) {
        category = "Specialty Roll";
        item_type = "specialty_roll";
        subcategory = n.includes("fried") ? "Fried Specialty Roll" : "Fresh Specialty Roll";
    } else if (r.includes('sushi entree')) {
        category = "Sushi Entree";
        item_type = "sushi_entree";
    } else if (r.includes('kitchen entree') || r.includes('hibachi') || r.includes('teriyaki')) {
        category = "Kitchen Entree";
        item_type = n.includes('hibachi') ? "hibachi_entree" : (n.includes('teriyaki') ? "teriyaki_entree" : (n.includes('katsu') || n.includes('tempura') ? "tempura_entree" : "kitchen_entree"));
        cuisine_style = ["japanese_american", "hot_kitchen"];
    } else if (r.includes('bento')) {
        category = "Bento Box";
        item_type = "bento";
        cuisine_style = ["japanese_american"];
    } else if (r.includes('noodle')) {
        category = "Noodles";
        item_type = "noodle_entree";
        cuisine_style = ["japanese_american", "hot_kitchen"];
    } else if (r.includes('fried rice') || r.includes('yakisoba')) {
        category = r.includes('yakisoba') ? "Noodles" : "Fried Rice";
        item_type = r.includes('yakisoba') ? "noodle_entree" : "rice_entree";
        cuisine_style = ["japanese_american", "hot_kitchen"];
    } else if (r.includes('lunch')) {
        category = "Lunch Special";
        item_type = "lunch_combo";
    } else if (r.includes('dessert')) {
        category = "Dessert";
        item_type = "dessert";
        cuisine_style = ["japanese_style_dessert"];
    }

    return { category, subcategory, item_type, cuisine_style };
}

function extractProteins(str) {
    if (!str) return [];
    str = str.toLowerCase();
    const list = [];
    if (str.includes('salmon') && !str.includes('smoked salmon')) list.push('salmon');
    if (str.includes('smoked salmon')) list.push('smoked_salmon');
    if (str.includes('tuna') && !str.includes('white tuna') && !str.includes('escolar')) list.push('tuna');
    if (str.includes('white tuna') || str.includes('escolar')) list.push('white_tuna');
    if (str.includes('yellowtail') || str.includes('hamachi')) list.push('yellowtail');
    if (str.includes('eel') || str.includes('unagi')) list.push('eel');
    if (str.includes('tilapia') || str.includes('tai')) list.push('tilapia');
    if (str.includes('mackerel') || str.includes('saba')) list.push('mackerel');
    if (str.includes('octopus') || str.includes('tako')) list.push('octopus');
    if (str.includes('squid') || str.includes('ika') || str.includes('calamari')) list.push('squid');
    if (str.includes('shrimp') || str.includes('ebi')) list.push('shrimp');
    if (str.includes('sweet shrimp') || str.includes('amaebi')) list.push('sweet_shrimp');
    if (str.includes('scallop')) list.push('scallop');
    if (str.includes('lobster')) list.push('lobster');
    if (str.includes('crab stick') || str.includes('kani')) {
        list.push('crab_stick');
    } else if (str.includes('crab salad')) {
        list.push('crab_salad');
    } else if (str.includes('soft shell crab')) {
        list.push('soft_shell_crab');
    } else if (str.includes('crab') || str.includes('crab meat')) {
        list.push('crab_salad'); // Default inferred to salad/stick in cheap sushi setting
    }
    if (str.includes('crawfish')) list.push('crawfish');
    
    if (str.includes('chicken') || str.includes('katsu don')) list.push('chicken');
    if (str.includes('pork')) list.push('pork');
    if (str.includes('beef') || str.includes('steak')) list.push('steak');
    if (str.includes('filet mignon')) list.push('filet_mignon');
    if (str.includes('tofu')) list.push('tofu');
    if (str.includes('egg ') || str.includes('tamago') || str.includes('fried egg')) list.push('egg');
    return [...new Set(list)];
}

function determineAllergens(proteins, sauces, descStr, is_fried) {
    const contains = new Set();
    const may_contain = new Set();
    const notes = new Set();
    
    const dLower = descStr.toLowerCase();

    // Seafood
    const isFish = proteins.some(p => ['salmon', 'tuna', 'yellowtail', 'eel', 'white_tuna', 'tilapia', 'mackerel', 'smoked_salmon'].includes(p));
    const isShellfish = proteins.some(p => ['shrimp', 'scallop', 'lobster', 'crawfish', 'soft_shell_crab', 'sweet_shrimp'].includes(p));
    const isCrabImitation = proteins.some(p => ['crab_stick', 'crab_salad'].includes(p));
    const isCephalopod = proteins.some(p => ['octopus', 'squid'].includes(p));
    
    if (isFish) contains.add("fish");
    if (isShellfish) contains.add("shellfish");
    
    if (isCrabImitation) {
        contains.add("fish");
        may_contain.add("shellfish");
        notes.add("Imitation crab mixtures commonly contain fish and may contain trace shellfish depending on supplier.");
    }
    
    if (isCephalopod) {
        may_contain.add("shellfish");
        notes.add("Squid and octopus are mollusks, which may trigger severe shellfish allergies in some individuals.");
    }
    
    if (proteins.includes('egg') || dLower.includes('mayo') || sauces.includes('spicy_mayo') || sauces.includes('katsu sauce')) contains.add("egg");
    if (dLower.includes('cream cheese') || dLower.includes('cheese')) contains.add("milk");
    
    if (is_fried || dLower.includes('noodle') || dLower.includes('udon') || dLower.includes('yakisoba')) {
        contains.add("wheat");
        contains.add("gluten");
        contains.add("soy");
        notes.add("Fried items and noodles commonly contain wheat/gluten and soy.");
    }
    
    if (sauces.includes('eel_sauce') || sauces.includes('teriyaki_sauce') || sauces.includes('ponzu') || dLower.includes('soy sauce')) {
        contains.add("soy");
        may_contain.add("wheat");
        may_contain.add("gluten");
        notes.add("House soy-based sauces (eel, teriyaki, ponzu) contain soy and very likely contain wheat/gluten unless explicitly gluten-free.");
    }

    if (dLower.includes('sesame')) contains.add("sesame");
    if (dLower.includes('roe') || dLower.includes('tobiko') || dLower.includes('ikura')) contains.add("fish");

    return {
        contains: Array.from(contains),
        may_contain: Array.from(may_contain),
        notes: Array.from(notes)
    };
}

function extractVegetables(str) {
    if (!str) return [];
    str = str.toLowerCase();
    const list = [];
    if (str.includes('avocado')) list.push('avocado');
    if (str.includes('cucumber')) list.push('cucumber');
    if (str.includes('lettuce')) list.push('lettuce');
    if (str.includes('jalapeño')) list.push('jalapeno');
    if (str.includes('scallion') || str.includes('green onion') || str.includes('onion')) list.push('scallion');
    if (str.includes('oshinko') || str.includes('pickles')) list.push('oshinko');
    if (str.includes('broccoli')) list.push('broccoli');
    if (str.includes('carrot')) list.push('carrot');
    if (str.includes('zucchini')) list.push('zucchini');
    if (str.includes('cabbage')) list.push('cabbage');
    if (str.includes('sweet potato')) list.push('sweet_potato');
    return list;
}

function extractSauces(str) {
    if (!str) return [];
    str = str.toLowerCase();
    const list = [];
    if (str.includes('eel sauce')) list.push('eel_sauce');
    if (str.includes('spicy mayo')) list.push('spicy_mayo');
    if (str.includes('ponzu')) list.push('ponzu');
    if (str.includes('sriracha')) list.push('sriracha');
    if (str.includes('teriyaki')) list.push('teriyaki_sauce');
    if (str.includes('white sauce')) list.push('white_sauce');
    if (str.includes('katsu sauce')) list.push('katsu_sauce');
    if (str.includes('ginger soy sauce')) list.push('ginger_soy_sauce');
    return list;
}

function extractRoe(str) {
    if (!str) return [];
    str = str.toLowerCase();
    const list = [];
    if (str.includes('tobiko') || str.includes('flying fish roe') || str.includes('fish roe')) list.push('tobiko');
    if (str.includes('ikura') || str.includes('salmon roe')) list.push('ikura');
    return list;
}

function extractTextures(str, is_fried) {
    if (!str) return [];
    str = str.toLowerCase();
    const list = [];
    if (is_fried || str.includes('tempura') || str.includes('crispy') || str.includes('crunch') || str.includes('crisps')) list.push('crispy');
    if (str.includes('cream cheese') || str.includes('mayo') || str.includes('avocado')) list.push('creamy');
    if (str.includes('fresh')) list.push('fresh');
    return list;
}

function extractFlavors(spice) {
    const f = ["savory"];
    if (spice > 0) f.push("spicy");
    return f;
}

function generateSearchTerms(name, mapObj, ing, aliases) {
    const terms = [name.toLowerCase(), mapObj.item_type.replace(/_/g, ' ')];
    if (mapObj.item_type.includes('roll')) terms.push("sushi roll");
    ing.forEach(i => terms.push(i.replace(/_/g, ' ')));
    aliases.forEach(a => terms.push(a));
    // Synonyms
    if (ing.includes('crab_salad') || ing.includes('crab_stick')) terms.push("cooked sushi", "crab");
    if (name.toLowerCase().includes('vegetarian') || ing.includes('sweet_potato') || ing.includes('avocado')) terms.push("vegetarian sushi");
    if (name.toLowerCase().includes('fried')) terms.push("fried sushi");
    return [...new Set(terms)];
}

function generateShortDesc(name, type, mainIng, desc) {
    if (desc) return desc;
    if (type.includes("roll")) {
        const ingText = mainIng.length > 0 ? ` made with ${mainIng.join(', ').replace(/_/g, ' ')}` : "";
        return `A classic sushi roll${ingText}.`;
    }
    return `Prepared fresh to order.`;
}

function generateLongDesc(name, type, ing, desc, is_fried, is_raw, spice) {
    let p1 = `${name} is a flavorful and satisfying choice. `;
    if (desc) p1 += desc + ". ";
    
    let p2 = "";
    if (type.includes("roll")) {
        p2 = is_fried 
            ? "This roll features a crispy outside texture that complements the rich and savory interior." 
            : "This roll combines soft textures and delicate notes to create an approachable sushi experience.";
    } else if (type.includes("hibachi") || type.includes("teriyaki")) {
        p2 = "Grilled to perfection on a hot iron plate, giving the ingredients a deliciously savory and lightly smoky flavor profile.";
    } else if (is_raw && type.includes("sashimi")) {
        p2 = "Focusing on the purest fresh flavors, this dish highlights the clean, delicate quality of raw seafood.";
    } else if (is_raw && type.includes("nigiri")) {
        p2 = "Thinly sliced raw seafood served delicately over seasoned sushi rice.";
    }

    let p3 = "";
    if (spice > 0) p3 = "It has a noticeable spicy kick, perfect for those who enjoy heat.";
    
    return [p1, p2, p3].filter(Boolean).join(" ");
}

function getHistoryNote(type) {
    if (type.includes('specialty')) return "Specialty rolls reflect the modern Japanese-American sushi movement, often characterized by complex sauces, frying, and creative fusions.";
    if (type.includes('sushi') || type.includes('roll')) return "Sushi is a traditional Japanese dish of prepared vinegared rice accompanying various toppings.";
    if (type.includes('hibachi')) return "Hibachi style has become synonymous in America with teppanyaki iron griddle cooking, popularized in the latter half of the 20th century.";
    if (type.includes('bento')) return "Bento is a traditional Japanese single-portion meal, carefully composed for balance and convenience.";
    if (type.includes('tempura')) return "Tempura is a Japanese frying technique shaped historically by 16th-century Portuguese influence.";
    if (type.includes('tataki')) return "Tataki is a Japanese culinary technique involving brief searing of meat or fish, keeping the center tender.";
    return "A common item in modern Japanese-American dining.";
}

function getPrepNote(type, methods) {
    if (methods.includes("deep_fried") || methods.includes("tempura_fried") || methods.includes("panko_fried")) {
        return "Ingredients are prepared, coated in batter or panko breadcrumbs, and deep-fried until golden and crispy.";
    }
    if (type.includes('roll')) return "The roll is assembled with seasoned rice and nori, filled, rolled, and sliced into bite-size pieces.";
    if (type.includes('nigiri')) return "A slice of topping is delicately placed over a hand-pressed mound of seasoned sushi rice.";
    if (type.includes('hibachi') || type.includes('teriyaki')) return "Cooked over a flat iron griddle at high heat, locking in juices and developing a savory sear.";
    if (methods.includes("seared")) return "Briefly seared on the outside while leaving the center delicate and chilled.";
    return "Prepared fresh to order using standard culinary practices.";
}

function getFlavorNote(spice, is_fried, is_raw) {
    if (is_fried) return "Crispy, rich, and deeply savory.";
    if (is_raw) return "Clean, fresh, and highlights the natural essence of the seafood.";
    if (spice > 0) return "Savory with a distinct, warming spicy finish.";
    return "Mild, well-balanced, and savory.";
}

// -----------------------------------------------------
// WRITE FILES
// -----------------------------------------------------

fs.writeFileSync('data/menu-items.enriched.json', JSON.stringify(finalItems, null, 2));

const cats = [...new Set(finalItems.map(i => i.category))];
const catOut = cats.map(c => ({ id: slugify(c), display_name: c }));
fs.writeFileSync('data/menu-categories.json', JSON.stringify(catOut, null, 2));

const tax = {
    categories: cats,
    item_types: [...new Set(finalItems.map(i => i.item_type))],
    allergens: [...new Set(finalItems.flatMap(i => i.allergens.contains))],
    proteins: [...new Set(finalItems.flatMap(i => i.tags.proteins))],
    cooking_methods: [...new Set(finalItems.flatMap(i => i.tags.cooking_methods))]
};
fs.writeFileSync('data/menu-tags-taxonomy.json', JSON.stringify(tax, null, 2));

// Search Index
const searchIndex = finalItems.map(i => ({
    id: i.id,
    name: i.name,
    category: i.category,
    terms: i.tags.search_terms.join(' ')
}));
fs.writeFileSync('data/menu-search-index.json', JSON.stringify(searchIndex, null, 2));

// Review Report
let report = "# Detailed Review Report\n\n";
report += `Total distinct items generated: ${finalItems.length}\n`;
const needsReview = finalItems.filter(i => i.data_quality.needs_review);
report += `Items flagged for review: ${needsReview.length}\n\n`;

for(const item of needsReview) {
    report += `### ${item.name} (${item.id})\n`;
    report += `- Reason: \n  - ${item.data_quality.review_notes.join('\n  - ')}\n`;
    report += `- Price: ${item.price !== null ? '$' + item.price.toFixed(2) : 'Variable/Unlisted'}\n`;
    report += `- Category: ${item.category}\n\n`;
}

fs.writeFileSync('data/menu-review-report.md', report);

console.log("Transformation completed. Files saved to data/");
