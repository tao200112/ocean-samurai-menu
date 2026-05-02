import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, useSearchParams } from "react-router-dom";
import menuData from "../../data/menu-completed.json";
import categoriesData from "../../data/menu-categories.json";

const CATEGORIES = ["All", ...categoriesData.map((c) => c.display_name)];
const FILTERS = [
  { label: "Premium Menu", key: "premium" },
  { label: "Supreme Only", key: "supreme" },
  { label: "No Raw Fish", key: "no_raw" },
  { label: "Vegetarian", key: "vegetarian" },
  { label: "Spicy", key: "spicy" }
];

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.includes(initialCategory) ? initialCategory : "All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (key: string) => {
    setActiveFilters(prev => 
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  const filteredItems = useMemo(() => {
    return menuData.filter(item => {
      // Category check
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }
      
      // Filters check
      if (activeFilters.includes("premium") && (!item.tier || !item.tier.includes("premium"))) return false;
      if (activeFilters.includes("supreme") && (!item.tier || !item.tier.includes("supreme"))) return false;
      if (activeFilters.includes("no_raw") && item.is_raw) return false;
      if (activeFilters.includes("vegetarian") && (!item.dietary_flags || !item.dietary_flags.includes("vegetarian"))) return false;
      if (activeFilters.includes("spicy") && (item.spice_level || 0) === 0) return false;

      // Search check
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const searchMatch = item.name.toLowerCase().includes(query);
        if (!searchMatch) return false;
      }

      return true;
    });
  }, [activeCategory, activeFilters, searchQuery]);

  // Provide a generic fallback image based on category or item type
  const getFallbackImage = (item: any) => {
    if (item.image?.main) return item.image.main;
    if (item.category.includes("Roll")) return "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop";
    if (item.category.includes("Sushi")) return "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop";
    if (item.category.includes("Soup") || item.category.includes("Salad")) return "https://images.unsplash.com/photo-1547496614-411a0179f82d?q=80&w=2070&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1617196034096-16408bb58eae?q=80&w=1974&auto=format&fit=crop";
  };

  const getTierLabel = (item: any) => {
    if (item.tier?.includes("supreme")) return "Supreme Menu";
    if (item.tier?.includes("add_on")) return item.category === "Condiments" ? "Condiment" : "Add-on";
    return "Premium Menu";
  };

  return (
    <div className="flex h-full min-w-0 flex-col overflow-x-hidden">
      {/* Category Tabs */}
      <div className="sticky top-[64px] z-40 border-b border-white/5 bg-background/95 backdrop-blur-md">
        <div className="flex overflow-x-auto px-4 pb-0 pt-2 scrollbar-hide">
          <div className="flex gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const newParams = new URLSearchParams(searchParams);
                  if (cat === "All") {
                    newParams.delete("category");
                  } else {
                    newParams.set("category", cat);
                  }
                  setSearchParams(newParams);
                }}
                className={cn(
                  "flex flex-col items-center justify-center whitespace-nowrap border-b-2 pb-3 pt-1 text-sm font-bold tracking-wide transition-colors",
                  activeCategory === cat
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 p-4">
        {/* Search and Filters */}
        <div>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-full bg-surface border border-white/10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-400 shadow-inner"
            />
          </div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
            Find Your Favorites
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTERS.map((filter) => {
              const isActive = activeFilters.includes(filter.key);
              return (
                <button
                  key={filter.key}
                  onClick={() => toggleFilter(filter.key)}
                  className={cn(
                    "flex h-8 shrink-0 items-center justify-center rounded-full border px-4 text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-primary border-primary text-black"
                      : "border-white/10 bg-surface text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-6">
          {filteredItems.map((item: any) => {
            const displayTags = [];
            if (item.tier?.includes("supreme")) displayTags.push("Supreme");
            else if (item.tier?.includes("add_on")) displayTags.push(item.category === "Condiments" ? "Condiment" : "Add-on");
            else if (item.tier?.includes("premium")) displayTags.push("Premium");

            if (item.is_raw) displayTags.push("Raw");
            if ((item.spice_level || 0) > 0) displayTags.push("Spicy");
            if (item.dietary_flags?.includes("vegetarian")) displayTags.push("Veg");
            
            return (
              <Link to={`/menu/${item.id}`} key={item.id} className="block min-w-0 group">
                <Card className="min-w-0 overflow-hidden border-white/5 bg-surface transition-all hover:border-primary/20">
                  <div className="relative h-56 w-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${getFallbackImage(item)}')` }}
                    />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1">
                      {displayTags.map((tag) => (
                        <span 
                          key={tag} 
                          className={cn(
                            "rounded-sm px-2 py-1 text-[10px] font-bold uppercase shadow-sm",
                            tag === "Supreme" ? "bg-orange-500 text-black border border-orange-500" :
                            tag === "Premium" ? "bg-primary text-black border border-primary" :
                            tag === "Add-on" || tag === "Condiment" ? "bg-sky-500 text-black border border-sky-500" :
                            tag === "Raw" ? "bg-red-500 text-white" :
                            tag === "Spicy" ? "bg-orange-600 text-white" :
                            "bg-green-700 text-white"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="min-w-0 p-4 space-y-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="min-w-0 break-words text-xl font-bold text-primary transition-colors group-hover:text-primary/80">{item.name}</h3>
                      <span className="w-fit shrink-0 whitespace-nowrap rounded-md bg-primary/10 px-2 py-1 text-sm font-bold text-primary">
                        {getTierLabel(item)}
                      </span>
                    </div>
                    <p className="break-words text-sm leading-relaxed text-slate-300">
                      {item.description_short}
                    </p>
                    {item.proteins && item.proteins.length > 0 && (
                      <p className="text-xs italic text-muted-foreground break-words">
                        {item.proteins.map((i: string) => i.replace(/_/g, ' ')).join(', ')}
                      </p>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-semibold text-primary/60 tracking-wider uppercase">
                        {item.category}
                      </span>
                      <Button size="sm">Details</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <p>No items found matching your filters.</p>
              <Button variant="link" onClick={() => setActiveFilters([])} className="text-primary mt-2">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
