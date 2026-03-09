import fs from 'fs';
import { rawMenu } from './data/raw_menu.js';

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const finalItems = [];
const categories = new Set();
const defaultTags = {
  allergens: new Set(),
  dietary_tags: new Set(),
  feature_tags: new Set(),
  protein_tags: new Set(),
  texture_tags: new Set(),
  flavor_tags: new Set(),
  cooking_method: new Set()
};
const reviewReport = [];

const supremeItems = rawMenu.find(r => r.name === "Supreme Extra Items")?.items.map(i => i.toLowerCase().replace(/ \(\d+\)$/, '').trim()) || [];
const premiumItems = rawMenu.find(r => r.name === "Premium Items")?.items.map(i => i.toLowerCase().replace(/ \(\d+\)$/, '').trim()) || [];

// specific matching
function matchesAyce(name, list) {
  const n = name.toLowerCase().replace(/ \(\d+\)$/, '').trim();
  for (const item of list) {
    if (n.includes(item) || item.includes(n)) return true;
  }
  return false;
}

const itemsArray = rawMenu.filter(item => item.category); 

for (let item of itemsArray) {
    if (item.options) {
        for (let opt of item.options) {
            processItem({
                name: `${item.name} - ${opt.name}`,
                price: opt.price,
                category: item.category,
                tags: [...(item.tags || []), ...(opt.tags || [])],
                description: item.description || ''
            });
        }
    } else {
        processItem(item);
    }
}

function processItem(item) {
    const name = item.name.trim();
    if(!name) return;
    
    // Normalize pieces
    let pieces = null;
    const piecesMatch = name.match(/\((\d+)\)$/);
    let cleanName = name;
    if (item.pieces) {
        pieces = item.pieces;
    } else if (piecesMatch) {
        pieces = parseInt(piecesMatch[1], 10);
        cleanName = name.replace(/\(\d+\)$/, '').trim();
    }
    
    // Determine AYCE
    let ayce_available = false;
    let ayce_tiers = [];
    if (matchesAyce(cleanName, premiumItems)) {
        ayce_available = true;
        ayce_tiers = ['premium', 'supreme'];
    } else if (matchesAyce(cleanName, supremeItems)) {
        ayce_available = true;
        ayce_tiers = ['supreme'];
    }
    
    // Category normalization
    let category = item.category.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
    let subcategory = null;
    if (category === 'soup_and_salad') category = 'soup_salad';
    if (category === 'kitchen_appetizer' || category === 'sushi_appetizer') {
        subcategory = category;
        category = 'appetizer';
    }
    if (category === 'classic_maki' || category === 'specialty_maki') {
        subcategory = category;
        category = category === 'classic_maki' ? 'classic_roll' : 'specialty_roll';
    }
    if (category === 'noodledishes' || category === 'yakisoba' || category === 'udon') {
        category = 'noodle_dish';
        if(cleanName.toLowerCase().includes('yakisoba')) subcategory = 'yakisoba';
        if(cleanName.toLowerCase().includes('udon')) subcategory = 'udon';
    }
    if (category === 'fried_rice') {
        category = 'rice_dish';
        subcategory = 'fried_rice';
    }
    if (category === 'sushi_special_lunch_only' || category === 'bento_box_lunch_only') {
        subcategory = 'lunch_only';
        category = 'lunch_special';
    }
    
    categories.add(category);
    
    // Tags
    const tags = item.tags || [];
    const is_raw = tags.includes("Raw") || cleanName.toLowerCase().includes("sashimi") || cleanName.toLowerCase().includes("nigiri");
    const is_spicy = tags.includes("Spicy") || cleanName.toLowerCase().includes("spicy");
    const is_vegetarian = tags.includes("Veg") || cleanName.toLowerCase().includes("vegetable") || cleanName.toLowerCase().includes("sweet potato");
    const is_gluten_free = null; // Conservative
    
    const dietary_tags = [];
    if (is_vegetarian) dietary_tags.push("vegetarian");
    if (is_raw) dietary_tags.push("contains_raw");
    else dietary_tags.push("cooked_only");
    
    // Description inference
    const desc = item.description || '';
    
    // Allergen inference
    const allergens = [];
    const descLower = desc.toLowerCase() + " " + cleanName.toLowerCase();
    if (descLower.includes("crab") || descLower.includes("shrimp") || descLower.includes("crawfish") || descLower.includes("scallop") || descLower.includes("calamari") || descLower.includes("squid")) allergens.push("shellfish");
    // Conservative: most rolls have possible soy and wheat
    allergens.push("soy_possible");
    if (descLower.includes("cheese")) allergens.push("dairy");
    if (descLower.includes("salmon") || descLower.includes("tuna") || descLower.includes("yellowtail") || descLower.includes("fish") || descLower.includes("eel") || descLower.includes("tilapia")) allergens.push("fish");
    
    // Ingredients inference
    const ingredients = [];
    const inferred = [];
    
    if (descLower.includes("salmon") && !descLower.includes("salmon skin")) ingredients.push("salmon");
    if (descLower.includes("tuna")) ingredients.push("tuna");
    if (descLower.includes("avocado")) ingredients.push("avocado");
    if (descLower.includes("cucumber")) ingredients.push("cucumber");
    if (descLower.includes("cream cheese")) ingredients.push("cream cheese");
    if (descLower.includes("crab")) ingredients.push("crab stick/salad");
    if (descLower.includes("tempura")) inferred.push("tempura batter");
    if (category.includes("roll")) inferred.push("sushi rice", "nori");
    
    // Check if review needed
    let needs_review = false;
    let review_notes = "";
    if (item.price === null) {
        needs_review = true;
        review_notes += "Price is null. ";
    }
    if (ingredients.length === 0 && !cleanName.includes("Soup") && !cleanName.includes("Edamame") && !cleanName.includes("Salad")) {
        needs_review = true;
        review_notes += "No direct ingredients found. ";
    }
    
    const id = slugify(cleanName);
    
    // Deduplication check
    const existingIndex = finalItems.findIndex(i => i.id === id);
    if (existingIndex > -1) {
        needs_review = true;
        review_notes += "Possible duplicate with ID " + id + ". ";
    }
    
    const finalItem = {
        id,
        name: cleanName,
        slug: id,
        category,
        subcategory,
        pieces,
        single_order_price: item.price,
        currency: "USD",
        ayce_available,
        ayce_tiers,
        ayce_note: ayce_available ? (ayce_tiers.includes('supreme') && !ayce_tiers.includes('premium') ? "Included in Supreme AYCE" : "Included in all-you-can-eat unless otherwise noted") : "",
        description_raw: desc,
        short_description: desc ? `A ${cleanName.toLowerCase()} with ${desc.split(',')[0].toLowerCase()}` : "",
        ingredients,
        inferred_ingredients: inferred,
        sauces: descLower.includes("eel sauce") ? ["eel sauce"] : descLower.includes("spicy mayo") ? ["spicy mayo"] : [],
        allergens: [...new Set(allergens)],
        dietary_tags,
        feature_tags: ayce_available ? (ayce_tiers.includes('supreme') && !ayce_tiers.includes('premium') ? ["ayce_supreme"] : ["ayce_premium", "ayce_supreme"]) : [],
        protein_tags: ingredients.filter(i => ["salmon", "tuna", "crab stick/salad", "shrimp", "chicken", "beef"].includes(i)),
        texture_tags: descLower.includes("crispy") || descLower.includes("tempura") ? ["crispy"] : [],
        flavor_tags: is_spicy ? ["spicy"] : [],
        cooking_method: is_raw ? "raw" : descLower.includes("tempura") || descLower.includes("fried") ? "fried" : descLower.includes("grilled") ? "grilled" : "",
        is_raw,
        is_spicy,
        is_vegetarian,
        is_gluten_free: null,
        beginner_friendly: (!is_raw && !is_spicy),
        recommendation: is_raw ? "Great for sashimi lovers." : "A good choice if you prefer cooked options.",
        history_note: category.includes('roll') ? "A widely popular sushi roll." : "",
        image: "",
        source_refs: [],
        confidence: "high",
        needs_review,
        review_notes: review_notes.trim()
    };
    
    // Add to tags sets
    finalItem.allergens.forEach(t => defaultTags.allergens.add(t));
    finalItem.dietary_tags.forEach(t => defaultTags.dietary_tags.add(t));
    finalItem.feature_tags.forEach(t => defaultTags.feature_tags.add(t));
    finalItem.protein_tags.forEach(t => defaultTags.protein_tags.add(t));
    finalItem.texture_tags.forEach(t => defaultTags.texture_tags.add(t));
    finalItem.flavor_tags.forEach(t => defaultTags.flavor_tags.add(t));
    if(finalItem.cooking_method) defaultTags.cooking_method.add(finalItem.cooking_method);

    if (existingIndex > -1) {
        // Merge
        if(finalItems[existingIndex].single_order_price === null) finalItems[existingIndex].single_order_price = finalItem.single_order_price;
    } else {
        finalItems.push(finalItem);
    }
}

const setsToJson = (obj) => {
    const res = {};
    for(let key in obj) {
        res[key] = Array.from(obj[key]);
    }
    return res;
};

// WRITE OUTPUT files
fs.writeFileSync('data/menu-items.json', JSON.stringify(finalItems, null, 2));
fs.writeFileSync('data/menu-categories.json', JSON.stringify(Array.from(categories).map(c => ({id: c, display: c.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())})), null, 2));
fs.writeFileSync('data/menu-tags.json', JSON.stringify(setsToJson(defaultTags), null, 2));

// Generate review report
let report = "# Menu Review Report\n\n";
report += `Total items extracted: ${finalItems.length}\n`;
const needsReview = finalItems.filter(i => i.needs_review);
report += `Items needing review: ${needsReview.length}\n\n`;

for(const item of needsReview) {
    report += `### ${item.name} (${item.id})\n`;
    report += `- Reason: ${item.review_notes}\n`;
    report += `- Price: ${item.single_order_price}\n`;
    report += `- Category: ${item.category}\n\n`;
}
fs.writeFileSync('data/menu-review-report.md', report);

// Schema example
fs.writeFileSync('data/menu-schema-example.json', JSON.stringify(finalItems.slice(0, 2), null, 2));

console.log('Build complete.');
