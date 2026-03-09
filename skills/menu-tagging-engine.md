---
name: menu-tagging-engine
description: Generate structured menu tags and attributes
---

# Menu Tagging Engine Skill

## Purpose
Generate structured tags and attributes for menu items based on their core information.

## Rules
Never hallucinate ingredients.

### Allowed Values

- **Proteins**: salmon, tuna, yellowtail, eel, shrimp, crab, scallop, octopus, squid, crawfish, mackerel, tilapia, white_tuna, filet_mignon, chicken, tofu, egg, roe
- **Cooking Methods**: raw, fried, grilled, seared, assembled, stir_fried, tempura
- **Flavor Profile**: savory, rich, light, spicy, sweet, umami, smoky, fresh
- **Texture**: crispy, creamy, tender, firm, juicy, popping, soft
- **Allergens**: fish, shellfish, soy, wheat, egg, milk, sesame
- **Menu Labels**: RAW, SPICY, VEG, TEMPURA, PREMIUM, SUPREME, LIMITED
- **Experience Tags**: beginner_friendly, chef_recommend, premium_pick, fan_favorite, good_for_sharing, light_dish, rich_dish

## Input Example
You will be provided with a menu item name, category, tier, and known ingredients:
```json
{
  "name": "Spicy Tuna Roll",
  "category": "Classic Rolls",
  "tier": "premium",
  "ingredients_known": ["tuna", "spicy mayo", "nori", "sushi rice"]
}
```

## Output Format
Generate the tags in this exact JSON structure:
```json
{
  "proteins": ["tuna"],
  "vegetables": [],
  "sauces": ["spicy_mayo"],
  "cooking_methods": ["raw", "assembled"],
  "flavor_profile": ["spicy", "savory"],
  "texture": ["soft", "tender"],
  "allergens": ["fish", "egg", "soy"],
  "dietary_flags": [],
  "menu_labels": ["PREMIUM", "RAW", "SPICY"],
  "experience_tags": ["fan_favorite"],
  "spice_level": 2,
  "is_raw": true,
  "beginner_friendly": false
}
```

## How to Call from Prompts
Provide the item details and prompt:
> Use the `menu-tagging-engine` skill to generate structured tags for this menu item.
