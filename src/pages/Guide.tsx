import { 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Flame, 
  Leaf, 
  Fish,
  Star,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// DATA ARRAYS
// ------------------------------------------------------------------

const AYCE_RULES = [
  { text: "Time limit: 100 minutes, starting with the first order", bold: "100 minutes" },
  { text: "Last call: 20 minutes prior to the time limit", bold: "20 minutes prior" },
  { text: "Only 4 items will be served per person at a time", bold: "Only 4 items" },
  { text: "Whole party must order the same priced all you can eat course", bold: "same priced" },
  { text: "Unfinished food will be charged at menu prices", bold: "charged at menu prices" },
  { text: "Some substitutions will have a surcharge; please ask your server or manager before making requests", bold: "surcharge" },
  { text: "Last seating is 90 minutes before closing time", bold: "90 minutes before closing" },
  { text: "Other rules and restrictions may apply", bold: "Other rules and restrictions" },
  { text: "18% gratuity will be added to parties of 5 or more", bold: "18% gratuity" },
  { text: "Please advise us of any food allergies or diets", bold: "food allergies or diets" }
];

const AYCE_TIERS = [
  {
    id: "premium",
    name: "Premium",
    price: "$25.99",
    desc: "88 items with sushi, rolls, appetizers, hibachi, noodles, rice, and dessert."
  },
  {
    id: "supreme",
    name: "Supreme",
    price: "$39.99",
    desc: "110 items, including Premium plus extra seafood, specialty rolls, and select hibachi items."
  }
];

const MENU_LABELS = [
  { label: "Raw", desc: "Contains raw fish or seafood.", color: "bg-red-500", icon: Fish },
  { label: "Spicy", desc: "Prepared with chili, sriracha, jalapeno, or spicy sauce.", color: "bg-orange-600", icon: Flame },
  { label: "Veg", desc: "Vegetarian friendly item.", color: "bg-green-700", icon: Leaf },
  { label: "Tempura", desc: "Deep-fried in a light Japanese batter.", color: "bg-yellow-600", icon: Flame },
  { label: "Premium", desc: "Available with the Premium AYCE tier.", color: "bg-primary border border-primary text-black", icon: Star },
  { label: "Supreme", desc: "Exclusive items available only with the Supreme AYCE tier.", color: "bg-orange-500 border border-orange-500 text-black", icon: Star }
];

const ORDERING_STEPS = [
  { step: 1, title: "Choose Your Tier", desc: "The whole party must order the same priced AYCE course." },
  { step: 2, title: "Start Small", desc: "Begin with a few dishes to explore the menu." },
  { step: 3, title: "Order Per Round", desc: "Only 4 items will be served per person at a time." },
  { step: 4, title: "Pace Yourself", desc: "Order additional rounds after finishing your current dishes." },
  { step: 5, title: "Explore", desc: "Try different sushi, hibachi, and appetizers throughout your 100 minutes." }
];

const SUSHI_BASICS = [
  {
    title: "Nigiri",
    desc: "Hand-pressed vinegared rice topped with a prime slice of fresh seafood.",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1932&auto=format&fit=crop"
  },
  {
    title: "Sashimi",
    desc: "Pure, thinly sliced fresh seafood served without rice to highlight natural quality.",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=1926&auto=format&fit=crop"
  },
  {
    title: "Maki Roll",
    desc: "Seaweed wrapped sushi roll with seasoned rice and fillings, sliced into bite-size pieces.",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop"
  },
  {
    title: "Tempura",
    desc: "Seafood or vegetables lightly battered and deep-fried for a signature crunch.",
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1964&auto=format&fit=crop"
  },
  {
    title: "Hibachi",
    desc: "Grilled dishes cooked on a hot iron plate to develop a savory sear and smoky flavor.",
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2080&auto=format&fit=crop"
  }
];

const FISH_GUIDE = [
  { name: "Salmon (Sake)", desc: "Rich flavor and buttery, melt-in-your-mouth texture." },
  { name: "Tuna (Maguro)", desc: "Clean taste, firm texture, and vibrant deep red color." },
  { name: "Yellowtail (Hamachi)", desc: "Mild flavor, slightly sweet, and exceptionally tender." },
  { name: "Eel (Unagi)", desc: "Grilled, rich, and served warmly with a sweet eel sauce glaze." },
  { name: "Shrimp (Ebi)", desc: "Often cooked, slightly sweet, with a satisfying snap." }
];

// ------------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------------

export default function GuidePage() {
  const highlightText = (text: string, boldPart: string) => {
    const parts = text.split(boldPart);
    if (parts.length === 1) return text;
    return (
      <>
        {parts[0]}<strong className="text-white font-bold">{boldPart}</strong>{parts[1]}
      </>
    );
  };

  return (
    <div className="space-y-16 overflow-x-hidden pb-20 bg-[#0f0f13]">
      
      {/* 1. DINING RULES */}
      <section className="pt-12 px-6">
        <div className="text-center mb-8">
          <h1 className="break-words text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            All You Can Eat Dining Guide
          </h1>
          <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed">
            Ocean Samurai offers an All You Can Eat sushi and hibachi experience. Please review the dining rules below to ensure a smooth and enjoyable visit.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
          <ul className="space-y-4">
            {AYCE_RULES.map((rule, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="min-w-0 break-words text-slate-300 text-sm md:text-base leading-relaxed">
                  {highlightText(rule.text, rule.bold)}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-6 border-t border-primary/20 flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
            <p className="text-sm text-red-200/80 leading-relaxed font-medium">
              Important note: Consuming raw or undercooked items may increase the risk of foodborne illness.
            </p>
          </div>
        </div>
      </section>

      {/* 2. AYCE TIERS */}
      <section id="tiers" className="px-6 scroll-mt-24">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Star className="w-6 h-6 text-primary" />
          <h2 className="break-words text-2xl font-bold text-white uppercase tracking-widest text-center">
            Choose Your AYCE Experience
          </h2>
          <Star className="w-6 h-6 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {AYCE_TIERS.map((tier) => (
            <div 
              key={tier.id} 
              id={tier.id}
              className="rounded-2xl border border-white/10 bg-surface p-6 transition-all sm:p-8"
            >
              <div>
                <h3 className="text-3xl font-extrabold text-white mb-2">{tier.name}</h3>
                <p className="text-2xl font-bold text-primary mb-6">{tier.price}</p>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {tier.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-400 mt-6 max-w-lg mx-auto italic">
          The menu clearly marks items available for each tier.
        </p>
      </section>

      {/* 3. MENU LABEL SYSTEM */}
      <section className="px-6">
          <h2 className="break-words text-2xl font-bold text-white uppercase tracking-widest text-center mb-4">
          Understanding Menu Labels
        </h2>
        <p className="text-center text-slate-300 text-base max-w-lg mx-auto leading-relaxed mb-8">
          We use labels to help you identify ingredients and dietary information so you can order with confidence.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {MENU_LABELS.map((item, idx) => (
            <div key={idx} className="bg-surface border border-white/5 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-3 py-1 rounded shadow-sm text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5",
                  item.color
                )}>
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW TO ORDER AYCE */}
      <section className="px-6 py-12 bg-white/[0.02] border-y border-white/5">
        <h2 className="break-words text-2xl font-bold text-white uppercase tracking-widest text-center mb-10">
          How to Enjoy AYCE
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 relative before:absolute before:inset-y-0 before:left-6 before:w-[2px] before:bg-primary/20">
            {ORDERING_STEPS.map((step) => (
              <div key={step.step} className="flex gap-6 relative items-start">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-extrabold text-xl shrink-0 z-10 shadow-lg shadow-primary/20">
                  {step.step}
                </div>
                <div className="min-w-0 pt-2">
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-xl border border-primary/20 bg-primary/5 flex items-start gap-4">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-primary/90 italic leading-relaxed">
              Tip: Ordering gradually helps reduce food waste and ensures the best dining experience. Unfinished food will be charged at menu prices.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SUSHI BASICS */}
      <section className="px-6">
        <h2 className="break-words text-2xl font-bold text-white uppercase tracking-widest text-center mb-10">
          Sushi Basics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SUSHI_BASICS.map((item, idx) => (
            <div key={idx} className="group overflow-hidden rounded-xl border border-white/5 bg-surface shadow-sm hover:border-primary/30 transition-colors">
              <div 
                className="aspect-[16/9] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. POPULAR SUSHI FISH GUIDE */}
      <section className="px-6">
        <h2 className="break-words text-2xl font-bold text-white uppercase tracking-widest text-center mb-10">
          Popular Sushi Fish Guide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {FISH_GUIDE.map((fish, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-surface border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">{fish.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{fish.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 & 8. CULTURE & CHOPSTICKS */}
      <section className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          <div className="p-8 rounded-2xl bg-surface border border-white/5">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              Japanese Dining Culture
            </h2>
            <ul className="space-y-4">
              {['Respect for freshness', 'Balance of flavor and texture', 'Small dishes meant for sharing', 'Appreciation for seasonal ingredients'].map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-300 text-sm">
                  <span className="text-primary">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-surface border border-white/5">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <Utensils className="w-5 h-5 text-primary" />
              How to Use Chopsticks
            </h2>
            <ul className="space-y-4 mb-6">
              <li className="flex gap-4 text-sm text-slate-300">
                <span className="font-bold text-primary">1.</span>
                Hold the first chopstick like a pencil.
              </li>
              <li className="flex gap-4 text-sm text-slate-300">
                <span className="font-bold text-primary">2.</span>
                Rest the second chopstick against your ring finger.
              </li>
              <li className="flex gap-4 text-sm text-slate-300">
                <span className="font-bold text-primary">3.</span>
                Move only the top chopstick to pick up food.
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic mt-auto">
              Chopsticks are traditional, but forks are always available upon request.
            </p>
          </div>

        </div>
      </section>

      {/* 9. OUR STORY */}
      <section className="px-6 pt-8 max-w-3xl mx-auto text-center">
        <div className="mb-4 text-primary">
          <Star className="w-6 h-6 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6">
          Our Story
        </h2>
        <p className="text-base text-slate-400 leading-relaxed italic border-y border-white/5 py-8 px-4">
          "Ocean Samurai was founded to bring a modern Japanese dining experience to our community. Our goal is to combine traditional sushi craftsmanship with a fun and welcoming All You Can Eat format."
        </p>
      </section>
      
    </div>
  );
}
