import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Info } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import menuData from "../../data/menu-completed.json";
import { cn } from "@/lib/utils";

export default function ItemDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = menuData.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f6fcfd] p-8 text-center">
        <h2 className="text-2xl font-black text-ocean-950">Item Not Found</h2>
        <p className="mt-2 text-ocean-700">This menu item doesn't exist or may have been removed.</p>
        <Button onClick={() => navigate("/menu")} className="mt-5 rounded-full bg-ocean-900 text-white">Return to Menu</Button>
      </div>
    );
  }

  const getFallbackImage = (menuItem: any) => {
    if (menuItem.image?.main) return menuItem.image.main;
    if (menuItem.category.includes("Roll")) return "/home/category-sushi-rolls.png";
    if (menuItem.category.includes("Sushi") || menuItem.category.includes("Sashimi")) return "/home/category-nigiri-sashimi.png";
    if (menuItem.category.includes("Hibachi") || menuItem.category.includes("Teriyaki")) return "/home/category-hibachi-teriyaki.png";
    if (menuItem.category.includes("Soup") || menuItem.category.includes("Salad")) return "/home/category-appetizers.png";
    return "/home/ayce-premium-supreme.png";
  };

  const displayTags = [];
  if (item.beginner_friendly) displayTags.push("Beginner Friendly");
  if (item.is_raw) displayTags.push("Raw");
  if ((item.spice_level || 0) > 0) displayTags.push("Spicy");
  if (item.dietary_flags?.includes("vegetarian")) displayTags.push("Vegetarian");

  const tierLabel = item.tier?.includes("supreme")
    ? "Supreme Menu"
    : item.tier?.includes("add_on")
      ? item.category === "Condiments" ? "Condiment" : "Add-on"
      : "Premium Menu";

  return (
    <div className="bg-[#f6fcfd] px-5 py-6 text-ocean-950 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <Button variant="ghost" className="mb-5 rounded-full text-ocean-800 hover:bg-cyan-50" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-ocean-900/10 ring-1 ring-ocean-900/10">
            <img src={getFallbackImage(item)} alt={item.name} className="aspect-square w-full object-cover" />
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-ocean-900/10 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-ocean-800">
                {item.category}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                  item.tier?.includes("supreme")
                    ? "border-coral/40 bg-coral/10 text-coral"
                    : item.tier?.includes("add_on")
                      ? "border-cyan-600/40 bg-cyan-50 text-cyan-700"
                      : "border-ocean-900/20 bg-ocean-900 text-white"
                )}
              >
                {tierLabel}
              </span>
            </div>

            <h1 className="font-serif text-5xl font-black leading-tight tracking-[-0.035em] text-ocean-950">{item.name}</h1>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-ocean-800">
              {item.description_long || item.description_short}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {displayTags.map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-700/20 bg-white px-4 py-1.5 text-xs font-black text-cyan-800">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              <section className="rounded-[2rem] border border-ocean-900/10 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Information</h3>
                {item.cultural_note && (
                  <p className="mt-3 text-base font-bold italic leading-relaxed text-ocean-900">"{item.cultural_note}"</p>
                )}
                {item.chef_note && (
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-ocean-700">{item.chef_note}</p>
                )}
              </section>

              {(item.proteins?.length > 0 || item.sauces?.length > 0) && (
                <section className="rounded-[2rem] border border-ocean-900/10 bg-white p-5 shadow-sm">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Ingredients & Sauces</h3>
                  {item.proteins?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.proteins.map((ing: string) => (
                        <span key={ing} className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-bold capitalize text-ocean-800">
                          {ing.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.sauces?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-ocean-900/10 pt-4">
                      {item.sauces.map((sauce: string) => (
                        <span key={sauce} className="rounded-full bg-coral/10 px-3 py-1 text-sm font-bold capitalize text-coral">
                          {sauce.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {item.allergens?.length > 0 && (
                <section className="rounded-[2rem] border border-coral/20 bg-coral/8 p-5">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                    <div>
                      <h4 className="text-sm font-black text-ocean-950">Allergen Notice</h4>
                      <p className="mt-1 text-sm font-semibold leading-relaxed text-ocean-700">
                        Contains: {item.allergens.map((a: string) => a.replace(/_/g, " ")).join(", ")}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <Button variant="outline" className="mt-6 w-full gap-2 rounded-full border-ocean-700/20 bg-white text-ocean-900 hover:bg-cyan-50" asChild>
              <Link to="/menu">
                <BookOpen className="h-5 w-5" />
                Return to Menu
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
