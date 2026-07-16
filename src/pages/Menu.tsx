import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
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
  { label: "Spicy", key: "spicy" },
  { label: "Gluten Free", key: "gluten_free" },
];

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.includes(initialCategory) ? initialCategory : "All");
  const initialFilters = (searchParams.get("filters") || "")
    .split(",")
    .filter((filter) => FILTERS.some((item) => item.key === filter));
  const [activeFilters, setActiveFilters] = useState<string[]>(initialFilters);

  useEffect(() => {
    const nextParams = new URLSearchParams();
    if (activeCategory !== "All") nextParams.set("category", activeCategory);
    if (searchQuery.trim()) nextParams.set("q", searchQuery.trim());
    if (activeFilters.length > 0) nextParams.set("filters", activeFilters.join(","));
    setSearchParams(nextParams, { replace: true });
  }, [activeCategory, activeFilters, searchQuery, setSearchParams]);

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
      if (activeFilters.includes("gluten_free") && (!item.dietary_flags || !item.dietary_flags.includes("gluten_free"))) return false;

      // Search check
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          item.name,
          item.display_name,
          item.description_short,
          item.description_long,
          ...(item.ingredients_known || []),
          ...(item.ingredients_inferred || []),
          ...(item.proteins || []),
          ...(item.vegetables || []),
          ...(item.sauces || []),
          ...(item.allergens || []),
          ...(item.search_keywords || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const searchMatch = searchableText.includes(query);
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
    <div className="flex h-full min-w-0 flex-col overflow-x-hidden bg-[#f6fcfd] text-ocean-950">
      {/* Category Tabs */}
      <div className="border-b border-ocean-900/10 bg-white/92 shadow-sm shadow-ocean-900/5 backdrop-blur-md">
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
                    ? "border-ocean-700 text-ocean-900"
                    : "border-transparent text-ocean-700 hover:text-ocean-950"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
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
              className="h-12 w-full rounded-full border border-ocean-900/10 bg-white pl-11 pr-4 text-sm font-semibold text-ocean-950 shadow-sm transition-all placeholder:text-ocean-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>
          <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-700">
            <SlidersHorizontal className="h-4 w-4" />
            <h2>Find by dish, ingredient, or preference</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTERS.map((filter) => {
              const isActive = activeFilters.includes(filter.key);
              return (
                <button
                  key={filter.key}
                  onClick={() => toggleFilter(filter.key)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex h-8 shrink-0 items-center justify-center rounded-full border px-4 text-xs font-semibold transition-colors",
                    isActive
                      ? "border-ocean-900 bg-ocean-900 text-white"
                      : "border-ocean-900/10 bg-white text-ocean-700 hover:bg-cyan-50 hover:text-ocean-950"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-ocean-700" aria-live="polite">
              Showing <span className="text-ocean-950">{filteredItems.length}</span> of {menuData.length} menu items
            </p>
            {(searchQuery.trim() || activeFilters.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilters([]);
                }}
                className="inline-flex items-center gap-1.5 text-sm font-black text-cyan-700 hover:text-ocean-950"
              >
                <X className="h-4 w-4" />
                Clear search and filters
              </button>
            )}
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
                <Card className="min-w-0 overflow-hidden border-ocean-900/10 bg-white shadow-sm shadow-ocean-900/5 transition-all hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-ocean-900/10">
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
                            tag === "Supreme" ? "bg-coral text-white border border-coral" :
                            tag === "Premium" ? "bg-ocean-900 text-white border border-ocean-900" :
                            tag === "Add-on" || tag === "Condiment" ? "bg-cyan-600 text-white border border-cyan-600" :
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
                      <h3 className="min-w-0 break-words text-xl font-black text-ocean-950 transition-colors group-hover:text-cyan-700">{item.name}</h3>
                      <span className="w-fit shrink-0 whitespace-nowrap rounded-md bg-cyan-50 px-2 py-1 text-sm font-black text-ocean-800">
                        {getTierLabel(item)}
                      </span>
                    </div>
                    <p className="break-words text-sm font-semibold leading-relaxed text-ocean-700">
                      {item.description_short}
                    </p>
                    {item.proteins && item.proteins.length > 0 && (
                      <p className="break-words text-xs font-semibold italic text-ocean-600">
                        {item.proteins.map((i: string) => i.replace(/_/g, ' ')).join(', ')}
                      </p>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-black uppercase tracking-wider text-cyan-700">
                        {item.category}
                      </span>
                      <span className="inline-flex h-9 items-center rounded-full bg-ocean-900 px-4 text-xs font-black text-white transition-colors group-hover:bg-ocean-800">
                        Details
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-ocean-700">
              <p>No items found matching your filters.</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilters([]);
                }}
                className="mt-2 text-ocean-900"
              >
                Clear Search and Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
