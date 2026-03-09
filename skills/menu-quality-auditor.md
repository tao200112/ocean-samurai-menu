---
name: menu-quality-auditor
description: Audit menu entries for quality issues
---

# Menu Quality Auditor Skill

## Purpose
Audit generated menu entries and detect weak content or quality issues.

## Checks
1. Detect generic filler descriptions (e.g., “specially crafted”, “delightful”, “amazing”, “delicious”).
2. Detect empty ingredient fields when the dish name clearly indicates ingredients.
3. Detect missing allergens.
4. Detect missing proteins.
5. Detect incorrect cooking methods.
6. Detect missing menu_labels for tier (`PREMIUM` or `SUPREME`).
7. Flag items requiring manual verification.
8. Recommend improvements when descriptions are too generic.

## Input Example
You will be provided with a generated menu entry:
```json
{
  "name": "California Roll (8)",
  "description_short": "An amazing classic roll.",
  "ingredients_known": [],
  "proteins": [],
  "allergens": ["soy"],
  "menu_labels": []
}
```

## Output Format
Return your findings matching this structure:
```json
{
  "confidence": "low",
  "needs_review": true,
  "review_notes": [
    "Detected generic filler 'amazing' in description_short.",
    "Missing 'crab' and 'avocado' from ingredients when dish name implies California roll.",
    "Missing proteins for crab.",
    "Missing shellfish allergen.",
    "Missing menu_labels for tier (PREMIUM)."
  ]
}
```

## How to Call from Prompts
Provide the generated menu item data and prompt:
> Run the `menu-quality-auditor` skill on this menu item.
