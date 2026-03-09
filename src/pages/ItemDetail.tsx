import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Star, Info, ShoppingCart, BookOpen } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import menuData from "../../data/menu-items.enriched.json";
import { cn } from "@/lib/utils";

export default function ItemDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = menuData.find(i => i.id === id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Item Not Found</h2>
        <p className="text-muted-foreground">This menu item doesn't exist or may have been removed.</p>
        <Button onClick={() => navigate("/menu")}>Return to Menu</Button>
      </div>
    );
  }

  // Determine fallback image for details
  const getFallbackImage = (item: any) => {
    if (item.image) return item.image;
    if (item.category.includes("Roll")) return "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop";
    if (item.category.includes("Sushi")) return "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop";
    if (item.category.includes("Soup") || item.category.includes("Salad")) return "https://images.unsplash.com/photo-1547496614-411a0179f82d?q=80&w=2070&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1617196034096-16408bb58eae?q=80&w=1974&auto=format&fit=crop";
  };

  const displayTags = [];
  if (item.beginner_friendly) displayTags.push("Beginner Friendly");
  if (item.is_raw) displayTags.push("Raw");
  if (item.spice_level > 0) displayTags.push("Spicy");
  if (item.tags.dietary_flags.includes("vegetarian")) displayTags.push("Vegetarian");

  return (
    <div className="flex flex-col space-y-6">
      <section className="px-4 py-4">
        <div className="aspect-square w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-primary/20">
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${getFallbackImage(item)}')` }}
          />
        </div>
      </section>

        <section className="px-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {item.category}
            </span>
            {item.ayce.available && (
              <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider", 
                item.ayce.tiers.includes("supreme") && !item.ayce.tiers.includes("premium")
                  ? "bg-orange-500/10 border-orange-500/50 text-orange-500" 
                  : "bg-primary/10 border-primary/50 text-primary"
              )}>
                {item.ayce.tiers.includes("supreme") && !item.ayce.tiers.includes("premium") ? "Supreme Exclusive" : "AYCE Premium"}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">{item.name}</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-300">
            {item.long_description || item.short_description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span key={tag} className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <div className="mx-6 h-px bg-primary/10" />

        <section className="px-6 py-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Preparation & Flavors</h3>
          <p className="mt-2 text-base italic leading-relaxed text-slate-200">
            "{item.flavor_note}"
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {item.preparation_note}
          </p>
        </section>

        {item.tags.ingredients_main.length > 0 && (
          <section className="bg-primary/5 px-6 py-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Ingredients</h3>
            <div className="mt-4 flex flex-col gap-3">
              {item.tags.ingredients_main.map((ing) => (
                <div key={ing} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-slate-200 capitalize">{ing.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
            {item.tags.sauces.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 pt-2 border-t border-primary/10">
                <span className="text-xs font-bold uppercase tracking-wider text-primary/50">Sauces</span>
                {item.tags.sauces.map((sauce) => (
                  <div key={sauce} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="text-slate-200 capitalize">{sauce.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {(item.allergens.contains.length > 0 || item.allergens.notes.length > 0) && (
          <section className="px-6 py-8">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-4">
              {item.allergens.contains.length > 0 && (
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Allergen Notice</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Contains: {item.allergens.contains.map(a => a.replace(/_/g, ' ')).join(', ')}
                    </p>
                  </div>
                </div>
              )}
              {item.allergens.notes.length > 0 && (
                <div className="flex items-start gap-3 border-t border-primary/10 pt-4">
                  <BookOpen className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Educational Note</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.allergens.notes[0]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="space-y-4 px-6 pb-8">
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link to="/menu">
              <BookOpen className="h-5 w-5" />
              Return to Menu
            </Link>
          </Button>
        </section>
    </div>
  );
}
