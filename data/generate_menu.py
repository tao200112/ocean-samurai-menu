import json
import re

items = []

def sluggify(text):
    text = text.lower()
    text = text.replace(' ', '-').replace('&', 'and').replace('/', '-')
    text = re.sub(r'[^a-z0-9\-]', '', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')

def add_item(tier, category, item_type, name, subcategory=None, **kwargs):
    pieces = None
    original_name = name
    match = re.search(r'\s*\((\d+)\)$', name)
    if match:
        pieces = int(match.group(1))
        name = name[:match.start()].strip()
    
    slug = sluggify(original_name if not original_name.endswith(')') else name)
    
    tier_lower = tier.lower()
    
    labels = kwargs.get('menu_labels', [])
    if tier.upper() not in labels:
        labels.append(tier.upper())
    
    if kwargs.get('is_raw') and 'RAW' not in labels:
        labels.append('RAW')
    if kwargs.get('spice_level', 0) > 0 and 'SPICY' not in labels:
        labels.append('SPICY')
    if kwargs.get('limit_per_person', None) is not None or kwargs.get('sashimi_surcharge', None) is not None:
        if 'LIMITED' not in labels:
            labels.append('LIMITED')
    if 'tempura' in kwargs.get('cooking_methods', []) or 'Tempura' in name:
         if 'TEMPURA' not in labels:
            labels.append('TEMPURA')
    if 'vegetarian' in kwargs.get('dietary_flags', []):
         if 'VEG' not in labels:
            labels.append('VEG')

    labels = list(set(labels))
        
    item = {
        "id": slug,
        "slug": slug,
        "name": name,
        "display_name": name,
        "chinese_name": kwargs.get('chinese_name', None),
        "aliases": kwargs.get('aliases', []),
        "tier": [tier_lower],
        "category": category,
        "subcategory": subcategory,
        "item_type": item_type,
        "pieces": pieces if pieces is not None else kwargs.get('pieces', None),
        "image": {
            "main": None,
            "gallery": []
        },
        "description_short": kwargs.get('description_short', f"A {tier_lower} {name.lower()}."),
        "description_long": kwargs.get('description_long', f"This {name.lower()} offers a balanced and fresh profile. It highlights quality ingredients carefully prepared. Ideal for guests looking for a savory experience."),
        "ingredients_known": kwargs.get('ingredients_known', []),
        "ingredients_inferred": kwargs.get('ingredients_inferred', []),
        "proteins": kwargs.get('proteins', []),
        "vegetables": kwargs.get('vegetables', []),
        "sauces": kwargs.get('sauces', []),
        "cooking_methods": kwargs.get('cooking_methods', []),
        "flavor_profile": kwargs.get('flavor_profile', []),
        "texture": kwargs.get('texture', []),
        "allergens": kwargs.get('allergens', []),
        "dietary_flags": kwargs.get('dietary_flags', []),
        "menu_labels": labels,
        "experience_tags": kwargs.get('experience_tags', []),
        "spice_level": kwargs.get('spice_level', 0),
        "is_raw": kwargs.get('is_raw', False),
        "beginner_friendly": kwargs.get('beginner_friendly', False),
        "limit_per_person": kwargs.get('limit_per_person', None),
        "sashimi_surcharge": kwargs.get('sashimi_surcharge', None),
        "cultural_note": kwargs.get('cultural_note', ""),
        "chef_note": kwargs.get('chef_note', ""),
        "search_keywords": kwargs.get('search_keywords', [slug.replace('-', ' ')]),
        "data_quality": {
            "confidence": kwargs.get('confidence', 'high'),
            "needs_review": kwargs.get('needs_review', False),
            "review_notes": kwargs.get('review_notes', [])
        }
    }
    items.append(item)

# SUPREME ITEMS
# Salads & Appetizers
add_item("supreme", "Salads", "salad", "Salmon Skin Salad", 
    description_short="A savory salad featuring crispy salmon skin.",
    description_long="This salad provides a crisp and savory experience with its toasted salmon skin. It offers a balance of textures and fresh greens. A light yet flavorful start to the meal.",
    ingredients_known=["salmon skin", "mixed greens"], ingredients_inferred=["ponzu", "sesame seeds"],
    proteins=["salmon"], vegetables=["mixed_greens"], cooking_methods=["fried", "assembled"],
    flavor_profile=["savory", "crispy", "light"], texture=["crispy", "fresh"],
    allergens=["fish", "soy"]
)
add_item("supreme", "Appetizers", "appetizer", "Wasabi Shrimp (5)", 
    description_short="Fried shrimp with a kick of wasabi.",
    description_long="These shrimp are lightly fried and paired with a subtle wasabi heat. They offer a rich and crispy texture with a spicy undertone. Ideal for sharing.",
    ingredients_known=["shrimp", "wasabi"], ingredients_inferred=["tempura batter"],
    proteins=["shrimp"], cooking_methods=["fried"], flavor_profile=["spicy", "savory"],
    texture=["crispy", "tender"], allergens=["shellfish", "wheat"], spice_level=1
)
add_item("supreme", "Appetizers", "appetizer", "Fried Calamari", 
    description_short="Crispy fried squid rings.",
    description_long="Tender squid is coated and fried until golden brown. This dish highlights a satisfying crunch with a savory finish. A familiar favorite for all guests.",
    ingredients_known=["squid"], ingredients_inferred=["batter"], proteins=["squid"],
    cooking_methods=["fried"], flavor_profile=["savory"], texture=["crispy", "tender"],
    allergens=["shellfish", "wheat"], beginner_friendly=True
)
add_item("supreme", "Salads", "salad", "Spicy Crawfish Salad", 
    description_short="A vibrant salad mixed with spicy crawfish.",
    description_long="This salad features seasoned crawfish combined with crisp greens. It provides a savory flavor paired with a noticeable spicy kick. Suited for those seeking robust flavors.",
    ingredients_known=["crawfish"], ingredients_inferred=["mixed greens", "spicy mayo"],
    proteins=["crawfish"], vegetables=["mixed_greens"], sauces=["spicy_mayo"],
    cooking_methods=["assembled"], flavor_profile=["spicy", "savory", "creamy"],
    texture=["soft", "crispy"], allergens=["shellfish", "egg", "soy"], spice_level=2
)
add_item("supreme", "Appetizers", "appetizer", "Jalapeño Yellowtail", 
    description_short="Fresh yellowtail topped with sliced jalapeño.",
    description_long="Delicate slices of raw yellowtail are brightened by the heat of jalapeño. This dish highlights the rich texture of the fish with a sharp, fresh bite. A balanced and premium appetizer.",
    ingredients_known=["yellowtail", "jalapeno"], ingredients_inferred=["ponzu"],
    proteins=["yellowtail"], vegetables=["jalapeno"], sauces=["ponzu"],
    cooking_methods=["raw", "assembled"], flavor_profile=["spicy", "savory", "fresh"],
    texture=["tender"], allergens=["fish", "soy"], spice_level=1, is_raw=True
)

# Sashimi & Sushi
add_item("supreme", "Sashimi", "sashimi", "Tako (Octopus)", 
    aliases=["Octopus"], description_short="Firm and mildly sweet slices of cooked octopus.",
    description_long="This offering highlights the unique, firm texture of octopus. It provides a mild, clean seafood flavor. Often enjoyed by guests who appreciate traditional varied textures.",
    ingredients_known=["octopus"], proteins=["octopus"], cooking_methods=["assembled"],
    flavor_profile=["light", "umami"], texture=["firm"], allergens=["shellfish"], is_raw=False,
    sashimi_surcharge=1
)
add_item("supreme", "Sashimi", "sashimi", "Surf Clam", 
    description_short="Sliced surf clam with a firm, chewy texture.",
    description_long="Surf clam offers a distinct visual appeal with its red and white coloring. It brings a mild, sweet flavor and a firm bite. A staple in varied sashimi selections.",
    ingredients_known=["surf clam"], proteins=["scallop"], cooking_methods=["assembled"],
    flavor_profile=["light", "sweet"], texture=["firm"], allergens=["shellfish"], is_raw=False,
    sashimi_surcharge=1, review_notes=["Kept scallop as closest protein per taxonomy rules."]
)
add_item("supreme", "Sashimi", "sashimi", "Amaebi (Sweet Shrimp w/ Head)", 
    aliases=["Sweet Shrimp"], description_short="Raw sweet shrimp served with its head.",
    description_long="This premium raw shrimp is prized for its soft, sweet profile. It is served fresh to highlight its delicate, natural taste. The presentation often incorporates the shrimp head.",
    ingredients_known=["sweet shrimp"], proteins=["shrimp"], cooking_methods=["raw"],
    flavor_profile=["sweet", "light"], texture=["soft"], allergens=["shellfish"], is_raw=True, limit_per_person=1
)
add_item("supreme", "Sashimi", "sashimi", "Ikura (Salmon Roe)", 
    aliases=["Salmon Roe"], description_short="Delicate, briny salmon roe.",
    description_long="These vibrant orange pearls provide a satisfying pop of umami and brine. Ikura offers a rich, oceanic flavor profile. It pairs perfectly with the subtle sweetness of sushi rice.",
    ingredients_known=["salmon roe"], proteins=["roe"], cooking_methods=["raw"],
    flavor_profile=["savory", "umami"], texture=["popping"], allergens=["fish"], is_raw=True, limit_per_person=1
)
add_item("supreme", "Sashimi", "sashimi", "Tobiko (Flying Fish Roe)", 
    aliases=["Flying Fish Roe"], description_short="Crunchy and colorful flying fish roe.",
    description_long="Tobiko adds a bright, crunchy texture to sushi. It offers a mild, smoky, and salty flavor that complements various dishes. A visually striking ingredient.",
    ingredients_known=["flying fish roe"], proteins=["roe"], cooking_methods=["raw"],
    flavor_profile=["smoky", "umami", "light"], texture=["popping", "crispy"], allergens=["fish"], is_raw=True
)

# Special Rolls
for roll_name in ["Motor City Roll (8)", "Lover's Roll (8)", "Four Seasons Roll (8)", "Greensboro Roll (8)", "Wildcat Roll (10)", "Big Easy Roll (8)", "Phoenix Tail Roll (6)"]:
    add_item("supreme", "Special Rolls", "roll", roll_name,
        description_short="A specialty roll with a sophisticated flavor profile.",
        description_long="This specialty roll offers a layered combination of ingredients, carefully balanced for depth of flavor. It is a hearty option for those who enjoy modern sushi creations.",
        confidence="low", needs_review=True, review_notes=["Exact roll ingredients need confirmation"], flavor_profile=["savory"]
    )
add_item("supreme", "Special Rolls", "roll", "Black Dragon Roll (8)",
    description_short="A rich and savory specialty eel roll.",
    description_long="This premium signature roll presents a decadent harmony of savory and sweet elements, traditionally incorporating rich eel and fresh avocado. An excellent choice for a robust meal.",
    confidence="low", needs_review=True, review_notes=["Exact roll ingredients need confirmation. Likely has eel and avocado."],
    flavor_profile=["savory", "rich", "sweet"]
)

# Hibachi
add_item("supreme", "Hibachi", "hibachi", "Hibachi Teriyaki Filet Mignon",
    description_short="Grilled filet mignon served with a flavorful hibachi finish.",
    description_long="This dish features tender filet mignon seared to perfection. It is complemented by classic savory teriyaki notes. A supreme option for meat lovers.",
    ingredients_known=["filet mignon"], ingredients_inferred=["teriyaki sauce", "vegetables"],
    proteins=["filet_mignon"], cooking_methods=["grilled"], flavor_profile=["savory", "rich", "umami"],
    texture=["tender", "juicy"], sauces=["teriyaki_sauce"], limit_per_person=1, beginner_friendly=True
)
add_item("supreme", "Hibachi", "hibachi", "Hibachi Teriyaki Scallop",
    description_short="Seared scallops with a rich teriyaki glaze.",
    description_long="These scallops are grilled to achieve a tender, satisfying bite. They offer a sweet, subtle seafood flavor enhanced by a savory glaze. A balanced and premium entrée.",
    ingredients_known=["scallop"], ingredients_inferred=["teriyaki sauce", "vegetables"],
    proteins=["scallop"], cooking_methods=["grilled"], flavor_profile=["savory", "sweet", "rich"],
    texture=["tender", "soft"], sauces=["teriyaki_sauce"], allergens=["shellfish"], beginner_friendly=True
)

print('Supreme complete')
