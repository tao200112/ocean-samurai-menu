import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Utensils, Timer, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import menuData from "../../data/menu-completed.json";
import categoriesData from "../../data/menu-categories.json";

const AYCE_TIERS = [
  {
    id: "premium",
    name: "Premium",
    price: "$25.99",
    description: "A broad AYCE selection with sushi, rolls, appetizers, and hot dishes."
  },
  {
    id: "supreme",
    name: "Supreme",
    price: "$35.99",
    description: "The full AYCE experience with premium seafood and specialty selections.",
    highlight: true
  }
];

const AYCE_STEPS = [
  {
    title: "Two AYCE Tiers",
    description: "Choose Premium or Supreme before ordering.",
    icon: Utensils
  },
  {
    title: "100-Minute Dining",
    description: "Your AYCE time starts with your first order.",
    icon: Timer
  },
  {
    title: "4 Items at a Time",
    description: "Each guest may order up to 4 items per round.",
    icon: CheckCircle2
  },
  {
    title: "Finish What You Order",
    description: "Unfinished food may be charged at menu price.",
    icon: AlertCircle
  }
];

const DINING_POLICIES = [
  "Last call is 20 minutes before the time limit ends.",
  "Whole table must choose the same AYCE course.",
  "Some substitutions may have an extra charge.",
  "Last seating is 90 minutes before closing.",
  "18% gratuity added to parties of 5 or more.",
  "Please inform staff of allergies or dietary restrictions.",
  "Raw or undercooked items may increase the risk of foodborne illness."
];

export default function HomePage() {
  const popularPicks = useMemo(() => {
    // Select rolls (Classic Roll, Specialty Roll, etc.)
    const rolls = menuData.filter((item: any) => item.category.toLowerCase().includes("roll") && item.name && item.description_short);
    // Shuffle and pick 3
    const shuffled = [...rolls].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map((item: any) => ({
      id: item.id,
      name: item.name,
      desc: item.description_short,
      image: item.image?.main || "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop",
      tag: (item.spice_level || 0) > 0 ? "SPICY" : item.is_raw ? "RAW" : "CHEF'S PICK",
      tagColor: (item.spice_level || 0) > 0 ? "bg-orange-500 text-white" : item.is_raw ? "bg-red-500 text-white" : "bg-primary text-black"
    }));
  }, []);

  const getCategoryFallbackImage = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes("roll") || name.includes("sushi")) return "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop";
    if (name.includes("nigiri") || name.includes("sashimi")) return "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=1926&auto=format&fit=crop";
    if (name.includes("appetizer") || name.includes("soup") || name.includes("salad")) return "https://images.unsplash.com/photo-1547496614-411a0179f82d?q=80&w=2070&auto=format&fit=crop";
    if (name.includes("hibachi") || name.includes("entree") || name.includes("bento")) return "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2080&auto=format&fit=crop";
    if (name.includes("noodle") || name.includes("rice")) return "https://images.unsplash.com/photo-1552611052-3ba9d739a503?q=80&w=2080&auto=format&fit=crop";
    if (name.includes("dessert")) return "https://images.unsplash.com/photo-1553452118-621e1f860f43?q=80&w=1974&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1617196034096-16408bb58eae?q=80&w=1974&auto=format&fit=crop";
  };

  return (
    <div className="space-y-0 bg-[#0f0f13]">
      {/* Hero Section */}
      <section className="relative h-[560px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to top, #0f0f13 0%, rgba(15, 15, 19, 0.4) 50%, rgba(15, 15, 19, 0.2) 100%), url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop')` 
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6 space-y-5 pb-12 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/80 to-transparent">
          <span className="inline-block rounded-sm bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md border border-primary/20">
            Ocean Samurai
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white max-w-sm">
            All You Can Eat Sushi & Hibachi
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-md leading-relaxed">
            Choose Premium or Supreme, explore your favorites, and enjoy 100 minutes of AYCE dining.
          </p>
          <p className="text-xl sm:text-2xl font-bold tracking-wide text-primary">
            Premium $25.99 <span className="mx-3 text-white/30">•</span> Supreme $35.99
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button className="w-full sm:w-auto h-14 px-8 font-bold text-black text-lg shadow-xl shadow-primary/20" asChild>
              <Link to="/menu">View Menu</Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto h-14 px-8 bg-black/40 border-primary/40 text-white hover:bg-black/60 text-lg backdrop-blur-md" asChild>
              <Link to="/locations">Get Location</Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto h-14 px-8 bg-black/40 border-primary/40 text-white hover:bg-black/60 text-lg backdrop-blur-md" asChild>
              <Link to="/guide">AYCE Guide</Link>
            </Button>
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-widest mt-6">
            * Same table must choose the same AYCE course
          </p>
        </div>
      </section>

      {/* AYCE Tiers */}
      <section className="px-6 py-10">
        <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
          Choose Your Experience
        </h3>
        <div className="flex flex-col sm:flex-row gap-6">
          {AYCE_TIERS.map((tier) => (
            <Card key={tier.id} className={cn("flex-1 overflow-hidden border-white/5 bg-surface/50 backdrop-blur transition-all hover:border-white/20", tier.highlight && "ring-1 ring-primary/40 relative shadow-2xl shadow-primary/5")}>
              {tier.highlight && (
                <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black z-10">
                  Recommended
                </div>
              )}
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-end justify-between mb-4">
                  <h4 className="text-2xl font-bold text-white tracking-tight">{tier.name}</h4>
                  <span className="text-xl font-extrabold text-primary">{tier.price}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-8 flex-grow">
                  {tier.description}
                </p>
                <Button variant={tier.highlight ? "default" : "secondary"} className={cn("w-full gap-2 font-bold", tier.highlight ? "text-black" : "text-white bg-white/5 hover:bg-white/10")} asChild>
                  <Link to={`/guide#${tier.id}`}>
                    Explore {tier.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-10 bg-white/[0.02] border-y border-white/5">
        <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
          How AYCE Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AYCE_STEPS.map((step, i) => (
            <Card key={i} className="flex items-start gap-4 border-white/5 bg-transparent p-5 shadow-none hover:bg-white/[0.02] transition-colors rounded-xl">
              <div className="p-2 rounded-full bg-primary/10 border border-primary/20 shrink-0">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="pt-0.5">
                <h5 className="font-bold text-white mb-1 tracking-wide">{step.title}</h5>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Dining Policies */}
      <section className="px-6 py-12">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <AlertCircle className="w-48 h-48 text-primary" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Info className="h-6 w-6 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-white">
                Important Dining Policies
              </h3>
            </div>
            <ul className="space-y-4">
              {DINING_POLICIES.map((policy, i) => (
                <li key={i} className="flex gap-4 text-sm text-slate-300 leading-relaxed items-start">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  {policy}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Popular Picks */}
      <section className="pt-4 pb-12">
        <div className="mb-8 flex flex-col px-6 space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">Popular Picks</h3>
          <p className="text-sm text-slate-400">Start with guest favorites from our sushi and hibachi menu.</p>
        </div>
        <div className="flex gap-5 overflow-x-auto px-6 pb-6 scrollbar-hide snap-x">
          {popularPicks.map((item, i) => (
            <Link to={`/menu/${item.id}`} key={i} className="group flex-none w-72 space-y-4 snap-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface/50 border border-white/5">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop";
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-white/5">
                    <Utensils className="h-8 w-8 text-white/20" />
                  </div>
                )}
                {item.tag && (
                  <div className={cn("absolute right-3 top-3 rounded-sm px-2 py-1 text-[10px] font-bold tracking-wider shadow-lg", item.tagColor)}>
                    {item.tag}
                  </div>
                )}
              </div>
              <div className="px-1">
                <h5 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{item.name}</h5>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc || ""}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-10 bg-white/[0.02] border-t border-white/5">
        <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
          Browse Categories
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {categoriesData.filter(c => c.display_name !== "Dessert").map((cat) => (
            <Link to={`/menu?category=${encodeURIComponent(cat.display_name)}`} key={cat.id} className="relative flex h-28 sm:h-32 items-center justify-center overflow-hidden rounded-xl bg-surface/50 border border-white/5 group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-500 group-hover:opacity-40 group-hover:scale-105"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${getCategoryFallbackImage(cat.display_name)}')` }}
              />
              <span className="relative text-sm sm:text-base font-bold tracking-widest text-white text-center px-4 group-hover:text-primary transition-colors uppercase z-10">
                {cat.display_name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 sm:py-24 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-50" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Ready to Explore?</h2>
          <p className="text-slate-300 text-base mb-10 leading-relaxed max-w-sm mx-auto">
            Browse our AYCE selections, compare Premium and Supreme, and plan your next visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center">
            <Button size="lg" className="w-full sm:w-auto font-bold text-black px-8 h-14" asChild>
              <Link to="/menu">View Full Menu</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold bg-surface text-white hover:bg-white/5 border-white/10 h-14 px-8" asChild>
              <Link to="/guide">Read AYCE Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
