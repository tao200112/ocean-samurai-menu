export const rawMenu = [
// menu 3
{ name: "Miso Soup", price: 2.50, category: "Soup and Salad", tags: ["Veg"] },
{ name: "Clear Soup", price: 2.50, category: "Soup and Salad", tags: ["Veg"] },
{ name: "Gyoza Dumpling Soup", price: 3.99, category: "Soup and Salad" },
{ name: "House Salad", price: 2.50, category: "Soup and Salad", tags: ["Veg"] },
{ name: "Seaweed Salad", price: 4.99, category: "Soup and Salad", tags: ["Veg"] },
{ name: "Avocado Salad", price: 4.99, category: "Soup and Salad", tags: ["Veg"] },
{ name: "Crab Salad", price: 4.99, category: "Soup and Salad", tags: ["Veg"] },
{ name: "Salmon Skin Salad", price: 5.99, category: "Soup and Salad" },
{ name: "Squid Salad", price: 5.99, category: "Soup and Salad", tags: ["Raw"] },
{ name: "Spicy Crawfish Salad", price: 6.99, category: "Soup and Salad", tags: ["Spicy"] },

{ name: "Spring Roll (2)", price: 2.99, category: "Kitchen Appetizer", tags: ["Veg"] },
{ name: "Edamame Bean", price: 3.99, category: "Kitchen Appetizer", tags: ["Veg"] },
{ name: "Age Tofu", price: 5.29, category: "Kitchen Appetizer", tags: ["Veg"] },
{ name: "Shrimp Shumai Dumplings (6)", price: 4.99, category: "Kitchen Appetizer" },
{ name: "Beef Gyoza Dumplings (6)", price: 5.99, category: "Kitchen Appetizer" },
{ name: "Vegetable Tempura (4)", price: 5.50, category: "Kitchen Appetizer", tags: ["Veg"] },
{ name: "Chicken Tempura (3)", price: 6.50, category: "Kitchen Appetizer" },
{ name: "Shrimp Tempura (3)", price: 6.99, category: "Kitchen Appetizer" },
{ name: "Crab Rangoon (6)", price: 5.99, category: "Kitchen Appetizer" },
{ name: "Takoyaki Ball (6)", price: 6.99, category: "Kitchen Appetizer", description: "Deep-fried octopus ball with bonito flakes" },
{ name: "Fried Calamari", price: 6.99, category: "Kitchen Appetizer" },
{ name: "Wasabi Shrimp (5)", price: 6.99, category: "Kitchen Appetizer" },

{ name: "Tuna Tataki", price: 11.99, category: "Sushi Appetizer", tags: ["Raw"], description: "Lightly seared tuna topped on a bed of cucumber, topped with ponzu sauce and sesame seeds" },
{ name: "Jalapeño Yellowtail", price: 12.99, category: "Sushi Appetizer", tags: ["Spicy", "Raw"], description: "Sliced yellowtail & jalapeño, drizzled with ponzu sauce" },

{ name: "Yakisoba", price: null, category: "Noodle Dishes", description: "Stir-fried thin noodle, served with cabbage, carrot, onion, and green onion", options: [
  { name: "Vegetable Only", price: 12.99, tags: ["Veg"] },
  { name: "Chicken", price: 13.99 },
  { name: "Beef", price: 14.99 },
  { name: "Shrimp", price: 14.99 },
  { name: "Scallop", price: 15.99 },
  { name: "Pick 2 Proteins", price: 16.99 },
  { name: "Pick 3 Proteins", price: 17.99 }
] },
{ name: "Udon Noodle", price: null, category: "Noodle Dishes", description: "Stir-fried thick rice noodle served with cabbage, carrot, onion, and green onion", options: [
  { name: "Vegetable Only", price: 12.99, tags: ["Veg"] },
  { name: "Chicken", price: 13.99 },
  { name: "Beef", price: 14.99 },
  { name: "Shrimp", price: 14.99 },
  { name: "Scallop", price: 15.99 },
  { name: "Pick 2 Proteins", price: 16.99 },
  { name: "Pick 3 Proteins", price: 17.99 }
] },

{ name: "Hibachi or Teriyaki", price: null, category: "Kitchen Entree", description: "Grilled to perfection with our signature sauce, served with broccoli, carrot, zucchini and onion, and a choice of white rice or fried rice", options: [
  { name: "Vegetable Only", price: 14.99, tags: ["Veg"] },
  { name: "Tofu", price: 15.99, tags: ["Veg"] },
  { name: "Chicken", price: 16.99 },
  { name: "Steak", price: 18.99 },
  { name: "Shrimp", price: 19.99 },
  { name: "Salmon", price: 20.99 },
  { name: "Scallop", price: 21.99 },
  { name: "Filet Mignon", price: 23.99 },
  { name: "Double Lobster", price: 45.99 }
] },
{ name: "Combination Hibachi or Teriyaki", price: null, category: "Kitchen Entree", description: "Select UP TO 2 (Base price not listed, additions are extra)", options: [
  { name: "Add Tofu", price: 0.99 },
  { name: "Add Chicken", price: 0.99 },
  { name: "Add Steak", price: 2.99 },
  { name: "Add Shrimp", price: 2.99 },
  { name: "Add Scallop", price: 4.99 },
  { name: "Add Filet Mignon", price: 7.99 },
  { name: "Add Lobster", price: 15.99 }
] },
{ name: "Fried Rice", price: null, category: "Kitchen Entree", description: "Stir-fried rice with egg, cabbage, carrot, onion, green onion & our homemade sauce", options: [
  { name: "Vegetable Only", price: 12.99, tags: ["Veg"] },
  { name: "Chicken", price: 13.99 },
  { name: "Beef", price: 14.99 },
  { name: "Shrimp", price: 14.99 },
  { name: "Scallop", price: 15.99 },
  { name: "Pick 2 Proteins", price: 16.99 },
  { name: "Pick 3 Proteins", price: 17.99 }
] },
{ name: "Katsu Don", price: null, category: "Kitchen Entree", description: "Panko fried steak with sauteed vegetable, topped with a fried egg and sweet and savory katsu sauce, a choice of white rice or fried rice", options: [
  { name: "Chicken", price: 15.99 },
  { name: "Pork", price: 15.99 }
] },
{ name: "Tempura Entree", price: null, category: "Kitchen Entree", description: "Perfectly crispy deep-fried, served with an assortment of vegetable tempura with a side of ginger soy sauce, a choice of white rice or fried rice", options: [
  { name: "Vegetable Only", price: 13.99, tags: ["Veg"] },
  { name: "Chicken", price: 15.99 },
  { name: "Shrimp", price: 17.99 },
  { name: "Coconut Shrimp", price: 17.99 },
  { name: "Seafood", price: 20.99, description: "Shrimp, Scallops, crab sticks & calamari" }
] },

// menu 1
{ name: "Avocado", price: 3.79, category: "Nigiri/Sashimi", tags: ["Veg"], pieces: 2 },
{ name: "Saba (Mackeral)", price: 3.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Kani (Crab Stick)", price: 3.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Tamago (Egg)", price: 3.79, category: "Nigiri/Sashimi", tags: ["Veg"], pieces: 2 },
{ name: "Inari (Tofu Skin)", price: 3.79, category: "Nigiri/Sashimi", tags: ["Veg"], pieces: 2 },
{ name: "Ebi (Shrimp)", price: 4.00, category: "Nigiri/Sashimi", pieces: 2 },
{ name: "Tai (Tilapia)", price: 4.00, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Surf Clam", price: 4.00, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Tako (Octopus)", price: 4.29, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Ika (Squid)", price: 4.29, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Sake (Salmon)", price: 4.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Tuna", price: 4.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Smoked Salmon", price: 4.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Hamachi (Yellowtail)", price: 4.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Escolar (White Tuna)", price: 4.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Unagi (Eel)", price: 4.79, category: "Nigiri/Sashimi", pieces: 2 },
{ name: "Ikura (Salmon Roe)", price: 5.50, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Tobiko (Flying Fish Roe)", price: 5.50, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Wasabi Tobiko (Flying Fish Roe)", price: 6.79, category: "Nigiri/Sashimi", tags: ["Spicy", "Raw"], pieces: 2 },
{ name: "Amaebi (Sweet Shrimp W/ Head)", price: 6.79, category: "Nigiri/Sashimi", tags: ["Raw"], pieces: 2 },
{ name: "Spicy Tuna Nigiri", price: 5.79, category: "Nigiri/Sashimi", tags: ["Spicy", "Raw"], pieces: 2 },

{ name: "Lover's Boat", price: 59.99, category: "Sushi Entree", tags: ["Spicy", "Raw"], description: "Chef's choices of nigiri & sashimi also served with 8 pcs Hokie Roll, and 8 pcs Green Dragon Roll" },
{ name: "Ichiban Combination For Two", price: 45.99, category: "Sushi Entree", tags: ["Raw"], description: "Chef's choices of nigiri & sashimi, also served with 6 pcs tuna rolls & 8 pcs California rolls" },
{ name: "Sushi Deluxe", price: 19.99, category: "Sushi Entree", tags: ["Raw"], description: "Chef's choices of nigiri also served with 6 pcs tuna rolls & 4 pcs California rolls" },
{ name: "Sashimi Deluxe", price: 19.99, category: "Sushi Entree", tags: ["Raw"], description: "A variety of sashimi with a bowl of white rice" },
{ name: "Genki Deluxe", price: 19.99, category: "Sushi Entree", tags: ["Raw"], description: "6 pcs nigiri and a variety of sashimi with a bowl of white rice" },
{ name: "Power Dinner", price: 15.99, category: "Sushi Entree", tags: ["Spicy", "Raw"], description: "Deep-fried rolls with spicy tuna and avocado, and topped with scallions and our spicy sauces" },
{ name: "Unagi Don", price: 21.99, category: "Sushi Entree", description: "Grilled eel over white rice and drizzled with our sweet eel sauce and sprinkled with sesame seed" },
{ name: "Salmon Lover", price: 19.99, category: "Sushi Entree", tags: ["Raw"], description: "4 pcs Nigiri Sushi, 2pc spicy salmon sushi, 6pc rolls" },
{ name: "Tuna Lover", price: 19.99, category: "Sushi Entree", tags: ["Raw"], description: "4 pcs Nigiri Sushi, 2pc spicy salmon sushi, 6pc rolls" },

{ name: "Black Dragon Roll", price: 13.50, category: "Specialty Maki", pieces: 8, description: "Shrimp tempura & cucumber, topped with eel, avocado & eel sauce" },
{ name: "Green Dragon Roll", price: 13.50, category: "Specialty Maki", pieces: 8, description: "Eel & cucumber, topped with avocado, topped with eel sauce" },
{ name: "Motor City Roll", price: 14.99, category: "Specialty Maki", pieces: 8, description: "Crab meat, avocado & cucumber, topped with grilled eel & eel sauce" },
{ name: "Sapporo Roll", price: 9.50, category: "Specialty Maki", tags: ["Raw"], pieces: 8, description: "Salmon, tuna & avocado" },
{ name: "Cowboy Roll", price: 10.99, category: "Specialty Maki", tags: ["Spicy"], pieces: 8, description: "Grilled steak, avocado, & cream cheese, topped with spicy mayo" },
{ name: "Hawaiian Roll", price: 13.50, category: "Specialty Maki", pieces: 8, description: "Coconut shrimp, cream cheese, mango & avocado, topped with white sauce" },
{ name: "Ocean Sam Roll", price: 12.99, category: "Specialty Maki", tags: ["Spicy"], pieces: 8, description: "Shrimp tempura, cream cheese, avocado, topped with crab tempura, spicy mayo, eel sauce & fly fish roe" },
{ name: "Marble Rock & Roll", price: 13.99, category: "Specialty Maki", pieces: 8, description: "Soy wrap with shrimp tempura, crab salad, avocado, cucumber, fish roe, topped with eel sauce" },
{ name: "Lover's Roll", price: 14.99, category: "Specialty Maki", tags: ["Spicy"], pieces: 8, description: "Shrimp tempura, topped with smoked salmon, eel, scallions, fish roe, eel sauce & spicy mayo" },
{ name: "Volcano Roll", price: 8.99, category: "Specialty Maki", tags: ["Spicy"], pieces: 8, description: "Deep-fried roll with salmon, cream cheese & avocado, topped with spicy mayo & sriracha sauce" },
{ name: "Phoenix Tail Roll", price: 11.50, category: "Specialty Maki", tags: ["Raw"], pieces: 6, description: "Deep-fried roll with salmon, tuna, white fish, crab stick, avocado & fish roe, topped with eel sauce" },
{ name: "Fire Cracker Roll", price: 11.50, category: "Specialty Maki", tags: ["Spicy"], pieces: 8, description: "Deep-fried roll with white fish, avocado, crab stick, & crab salad, topped with spicy mayo" },
{ name: "New River Roll", price: 8.99, category: "Specialty Maki", pieces: 8, description: "White tuna tempura, cucumber & cream cheese, topped with eel sauce" },
{ name: "Spider Roll", price: 8.99, category: "Specialty Maki", tags: ["Raw"], pieces: 6, description: "Fried soft shell crab, lettuce, cucumber & mayo, topped with eel sauce" },
{ name: "Gold Point Roll", price: 11.99, category: "Specialty Maki", tags: ["Raw"], pieces: 8, description: "Salmon Tempura, crab meat & fish roe, topped with eel sauce" },
{ name: "Dynamite Roll", price: 11.50, category: "Specialty Maki", tags: ["Spicy"], pieces: 8, description: "Deep-fried roll with spicy octopus, spicy shrimp & spicy tuna, topped with eel sauce" },
{ name: "Wildcat Roll", price: 14.50, category: "Specialty Maki", tags: ["Raw"], pieces: 10, description: "Deep-fried roll with grilled tuna, topped with scallions & fish roe, topped with chef's special sauce" },
{ name: "Christina Roll", price: 12.50, category: "Specialty Maki", tags: ["Raw", "Spicy"], pieces: 8, description: "Minced tuna with crab salad and spicy mixture, topped with avocado and eel sauce" },
{ name: "The Bomb Roll", price: 13.79, category: "Specialty Maki", tags: ["Spicy", "Raw"], pieces: 8, description: "Spicy crawfish & avocado, topped with spicy tuna, crab meat, & wasabi fish roe, topped with eel sauce" },
{ name: "Rainbow Roll", price: 12.50, category: "Specialty Maki", tags: ["Raw"], pieces: 8, description: "Crab salad, avocado, cucumber, topped with salmon, tuna, white fish, white tuna & avocado" },
{ name: "Hokie Roll", price: 12.79, category: "Specialty Maki", tags: ["Spicy", "Raw"], pieces: 8, description: "Salmon, tuna, crab meat, avocado, & cucumber, topped with sweet wasabi" },
{ name: "Big Easy Roll", price: 12.99, category: "Specialty Maki", tags: ["Raw"], pieces: 8, description: "Tuna, salmon, yellowtail, scallions & wasabi fish roe" },
{ name: "Greensboro Roll", price: 14.99, category: "Specialty Maki", tags: ["Raw"], pieces: 8, description: "Yellowtail, eel, scallions & fish roe, topped with scallions & chef's special sauces" },
{ name: "Four Seasons Roll", price: 14.99, category: "Specialty Maki", tags: ["Raw"], pieces: 8, description: "Salmon, tuna, yellowtail, & 4 colorful flying fish roe" },

// menu 2
{ name: "Tuna Roll", price: 5.00, category: "Classic Maki", tags: ["Raw"], pieces: 6 },
{ name: "Sake Roll (Salmon)", price: 5.00, category: "Classic Maki", tags: ["Raw"], pieces: 6 },
{ name: "Escolar Roll (White Tuna)", price: 5.79, category: "Classic Maki", tags: ["Raw"], pieces: 6 },
{ name: "Hamachi Roll (Yellowtail)", price: 5.79, category: "Classic Maki", tags: ["Raw"], pieces: 6 },
{ name: "Unagi Roll (Eel)", price: 6.79, category: "Classic Maki", pieces: 8 },
{ name: "Spicy Tuna Roll", price: 6.79, category: "Classic Maki", tags: ["Spicy", "Raw"], pieces: 8 },
{ name: "Spicy Salmon Roll", price: 6.79, category: "Classic Maki", tags: ["Spicy", "Raw"], pieces: 8 },
{ name: "Tuna Avocado Roll", price: 6.00, category: "Classic Maki", tags: ["Raw"], pieces: 8 },
{ name: "Salmon Avocado Roll", price: 6.00, category: "Classic Maki", tags: ["Raw"], pieces: 8 },
{ name: "California Roll", price: 5.00, category: "Classic Maki", pieces: 8, description: "Crab salad, avocado, cucumber & fish roe" },
{ name: "Spicy California Roll", price: 5.79, category: "Classic Maki", tags: ["Spicy"], pieces: 8 },
{ name: "Avocado Roll", price: 4.00, category: "Classic Maki", tags: ["Veg"], pieces: 6 },
{ name: "Cucumber Roll", price: 4.00, category: "Classic Maki", tags: ["Veg"], pieces: 6 },
{ name: "Sweet Potato Roll", price: 4.00, category: "Classic Maki", tags: ["Veg"], pieces: 8 },
{ name: "Oshinko Pickles Roll", price: 4.00, category: "Classic Maki", tags: ["Veg"], pieces: 6 },
{ name: "Vegetable Roll", price: 5.50, category: "Classic Maki", tags: ["Veg"], pieces: 8, description: "Avocado, cucumber, Oshinko pickles" },
{ name: "Crunch Roll", price: 5.79, category: "Classic Maki", pieces: 8, description: "Crab stick & tempura crisps, w/ eel sauce" },
{ name: "Crab Rangoon Roll", price: 6.50, category: "Classic Maki", pieces: 8, description: "Cream cheese, crab meat & tempura crisps" },
{ name: "Chicken Tempura Roll", price: 6.50, category: "Classic Maki", pieces: 6 },
{ name: "Shrimp Tempura Roll", price: 6.50, category: "Classic Maki", pieces: 8 },
{ name: "Salmon Skin Roll", price: 5.79, category: "Classic Maki", pieces: 8, description: "Fried salmon skin, cucumber, with eel sauce" },
{ name: "Philadelphia Roll", price: 6.99, category: "Classic Maki", tags: ["Raw"], pieces: 8, description: "Smoked salmon & cream cheese" },
{ name: "Alaska Roll", price: 6.99, category: "Classic Maki", tags: ["Raw"], pieces: 8, description: "Salmon, cucumber & avocado" },
{ name: "Blacksburg Roll", price: 6.79, category: "Classic Maki", pieces: 8, description: "Crab stick, cucumber & cream cheese" },

{ name: "Classic Pick 2", price: 10.99, category: "Sushi Special (Lunch Only)", description: "Pick any 2 rolls from the classic sushi rolls" },
{ name: "Classic Pick 3", price: 13.99, category: "Sushi Special (Lunch Only)", description: "Pick any 3 rolls from the classic sushi rolls" },
{ name: "Sushi Special", price: 10.50, category: "Sushi Special (Lunch Only)", description: "4 pcs California roll, 3 pcs fish roll, & chef's choice of 4 pcs sushi" },
{ name: "Power Lunch", price: 10.50, category: "Sushi Special (Lunch Only)", tags: ["Spicy"], description: "Spicy tuna with avocado roll tempura fried, and drizzled with our spicy homemade sauces" },
{ name: "VT Special", price: 11.79, category: "Sushi Special (Lunch Only)", description: "4 pcs California roll, 3 pcs fish roll, 1 pc eel sushi, 1pc spicy tuna sushi & Chef's choice of 2 pcs sushi" },
{ name: "Unagi Don Lunch", price: 11.99, category: "Sushi Special (Lunch Only)", description: "Grilled eel over white rice and drizzled with our sweet eel sauce and sprinkled with sesame seed" },
{ name: "Sashimi Special", price: 12.79, category: "Sushi Special (Lunch Only)", tags: ["Raw"], description: "Chef's choice of 3 types of Sashimi & spicy tuna served with a bowl of white rice" },

{ name: "Hibachi Bento", price: null, category: "Bento Box (Lunch Only)", description: "Grilled to perfection with our savory soy sauce, served w/ broccoli, carrot, zucchini & onion, a choice of white rice OR fried rice, fresh orange, & 3pcs shrimp dumplings", options: [
  { name: "Vegetable Only", price: 10.29 },
  { name: "Tofu", price: 10.99 },
  { name: "Chicken", price: 10.99 },
  { name: "Beef", price: 11.99 }
] },
{ name: "Teriyaki Bento", price: null, category: "Bento Box (Lunch Only)", description: "Grilled to perfection with our sweet teriyaki sauce, served with broccoli, carrot, zucchini & onion, a choice of white rice OR fried rice, fresh orange, 3pcs shrimp dumplings", options: [
  { name: "Vegetable Only", price: 10.29 },
  { name: "Tofu", price: 10.99 },
  { name: "Chicken", price: 10.99 },
  { name: "Beef", price: 11.99 },
  { name: "Salmon", price: 15.99 }
] },
{ name: "Katsu Don Bento", price: null, category: "Bento Box (Lunch Only)", description: "Panko fried steak with sauteed vegetable, topped with boiled egg and sweet and savory katsu sauce", options: [
  { name: "Chicken", price: 12.99 },
  { name: "Pork", price: 12.99 }
] },

{ name: "Chicken Fried Rice", price: 9.29, category: "Fried Rice" },
{ name: "Beef Fried Rice", price: 9.99, category: "Fried Rice" },
{ name: "Shrimp Fried Rice", price: 10.99, category: "Fried Rice" },
{ name: "Chicken Yakisoba", price: 9.29, category: "Yakisoba" },
{ name: "Beef Yakisoba", price: 9.99, category: "Yakisoba" },
{ name: "Shrimp Yakisoba", price: 10.99, category: "Yakisoba" },

{ name: "Mochi Ice Cream (2)", price: 3.50, category: "Dessert", description: "Strawberry, Chocolate or Green Tea" },
{ name: "Ice Cream Tempura", price: 4.99, category: "Dessert" },
{ name: "Taiyaki", price: 5.99, category: "Dessert", description: "Fish-shape fried dough with sweet red bean filling" },
{ name: "Crepe Cake", price: 7.99, category: "Dessert", description: "Vanilla or Matcha" },
{ name: "Souffle Cheese Cake", price: 7.99, category: "Dessert" },

// ayce info
{
  name: "Supreme Extra Items",
  items: [
    "Salmon Skin Salad", "Wasabi Shrimp (5)", "Fried Calamari", "Spicy Crawfish Salad", "Jalapeño Yellowtail",
    "Tako (Octopus)", "Surf Clam", "Amaebi (Sweet Shrimp W/ Head)", "Ikura (Salmon Roe)", "Tobiko (Flying Fish Roe)",
    "Motor City Roll", "Lover's Roll", "Four Seasons Roll", "Greensboro Roll", "Wildcat Roll", "Big East Roll",
    "Phoenix Tail Roll", "Black Dragon Roll", "Hibachi/Teriyaki Filet Mignon", "Hibachi/Teriyaki Scallop"
  ]
},
{
  name: "Premium Items",
  items: [
    "Miso Soup", "Seaweed Salad", "Avocado Salad", "House Salad", "Squid Salad", "Crab Salad", "Edamame Bean", "Tuna Tataki", "Spring Roll (2)", "Age Tofu",
    "Shrimp Shumai Dumplings (6)", "Gyoza Dumplings", "Vegetable Tempura (4)", "Chicken Tempura (3)", "Shrimp Tempura (3)", "Crab Rangoon (6)", "Takoyaki Ball (6)",
    "Avocado", "Saba (Mackeral)", "Tamago (Egg)", "Kani (Crab Stick)", "Inari (Tofu Skin)", "Ebi (Shrimp)", "Sake (Salmon)", "Tai (Tilapia)", "Tuna", "Escolar (White Tuna)",
    "Smoked Salmon", "Hamachi", "Unagi (Eel)", "California Roll", "Spicy California Roll", "Tuna Roll", "Tuna Avocado Roll", "Salmon Roll", "Salmon Avocado Roll", "Sweet Potato Roll",
    "Spicy Salmon Roll", "Spicy Tuna Roll", "Philadelphia Roll", "Alaska Roll", "Salmon Skin Roll", "Oshinko Pickles Roll", "Cucumber Roll", "Vegetable Roll", "Avocado Roll",
    "Shrimp Tempura Roll", "Chicken Tempura Roll", "Spider Roll", "White Tuna Roll", "Hamachi Roll", "Blacksburg Roll", "Crab Rangoon Roll", "Crunch Roll",
    "Marble Rock & Roll", "New River Roll", "Rainbow Roll", "Volcano Roll", "Fire Cracker Roll", "Hawaiian Roll", "Green Dragon Roll", "Ocean Sam Roll", "Christina Roll", "The Bomb Roll",
    "Hokie Roll", "Dynamite Roll", "Cowboy Roll",
    "Yakisoba Vegetable", "Yakisoba Steak", "Yakisoba Chicken", "Yakisoba Shrimp",
    "Hibachi/Teriyaki Steak", "Hibachi/Teriyaki Vegetable", "Hibachi/Teriyaki Chicken", "Hibachi/Teriyaki Shrimp",
    "Katsu Chicken", "Fried Rice", "White Rice",
    "Mochi Ice Cream"
  ]
}
];
