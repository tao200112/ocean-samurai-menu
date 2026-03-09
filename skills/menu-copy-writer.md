---
name: menu-copy-writer
description: Generate high-quality menu descriptions for restaurant dishes
---

# Menu Copy Writer Skill

## Purpose
Generate high-quality menu descriptions for restaurant dishes based on structured menu data.

## Rules
1. Tone must be professional, concise, and suitable for a premium restaurant menu.
2. Avoid generic AI filler phrases such as: 
   - “specially crafted”
   - “delightful”
   - “amazing”
   - “delicious”
3. Focus on:
    - what the dish is
    - its flavor profile
    - texture
    - who might enjoy it
4. Never hallucinate unknown ingredients.
5. If roll composition is unclear:
    - write a conservative description
    - avoid listing ingredients
6. Supreme items should emphasize premium ingredients and a richer experience.
7. Short description: one sentence length.
8. Long description: 2–4 sentences length.
9. Cultural note: short educational note about Japanese cuisine or ingredient origin.
10. Chef note: practical guidance for diners.

## Input Example
You will be provided with structured menu data, such as:
```json
{
  "name": "Amaebi",
  "category": "Sashimi",
  "tier": "supreme",
  "ingredients_known": ["sweet shrimp"]
}
```

## Output Format
Generate the output in the following JSON format:
```json
{
  "description_short": "Raw sweet shrimp served with its head.",
  "description_long": "This premium raw shrimp is prized for its soft, sweet profile. It is served fresh to highlight its delicate, natural taste. The presentation often incorporates the shrimp head.",
  "cultural_note": "Amaebi is prized in Japanese sushi for its delicate sweetness.",
  "chef_note": "A solid choice for diners looking to experience traditional specialty sashimi.",
  "search_keywords": ["amaebi", "sweet shrimp sushi", "raw shrimp sushi"]
}
```

## How to Call from Prompts
Provide the structured data of a menu item and prompt:
> Use the `menu-copy-writer` skill to generate copy for this item.
