import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, MapPin, Globe, ShoppingBag, Users, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDER_SELECTION_PATH } from "@/lib/onlineOrder";
import { SOCIAL_LINKS } from "@/lib/siteLinks";

export function TopNav() {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  
  const languages = ["English", "Chinese", "Spanish"];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-white/5 bg-[#18170f]/95 px-4 py-3 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        {/* Logo Image */}
        <img src="/logo.png" alt="Ocean Samurai Logo" className="h-10 w-10 object-contain rounded-full shadow-[0_0_15px_rgba(56,189,248,0.2)]" />
        <h1 className="truncate text-xl font-black uppercase tracking-[0.12em] text-white">
          Ocean Samurai
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "text-primary" : "text-slate-300 hover:text-primary")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "text-primary" : "text-slate-300 hover:text-primary")
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/locations"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "text-primary" : "text-slate-300 hover:text-primary")
            }
          >
            Locations
          </NavLink>
          <NavLink
            to="/guide"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "text-primary" : "text-slate-300 hover:text-primary")
            }
          >
            AYCE
          </NavLink>
          <NavLink
            to="/hiring"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "text-primary" : "text-slate-300 hover:text-primary")
            }
          >
            Hiring
          </NavLink>
        </nav>
        <NavLink
          to={ORDER_SELECTION_PATH}
          className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-black shadow-lg shadow-primary/20 transition hover:bg-primary/90 sm:inline-flex"
        >
          <ShoppingBag className="h-4 w-4" />
          Order Online
        </NavLink>
        <div className="relative hidden sm:block">
        <button 
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-white/5 hover:text-primary transition-colors"
          onClick={() => setShowLangMenu(!showLangMenu)}
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
        </button>

        {showLangMenu && (
          <div className="absolute right-0 top-full mt-2 w-32 rounded-lg border border-white/10 bg-[#2a261a] shadow-xl overflow-hidden z-50">
            <div className="py-1">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    setShowLangMenu(false);
                  }}
                  className={cn(
                    "block w-full text-left px-4 py-2.5 text-sm transition-colors",
                    currentLang === lang 
                      ? "bg-primary/20 text-primary font-bold" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Menu", path: "/menu", icon: BookOpen },
    { name: "Order", path: ORDER_SELECTION_PATH, icon: ShoppingBag },
    { name: "Locations", path: "/locations", icon: MapPin },
    { name: "Jobs", path: "/hiring", icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-background/95 pb-safe pt-2 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.name === "Order" && location.pathname === "/locations");
          const Icon = item.icon;
          const classes = cn(
            "flex flex-1 flex-col items-center justify-center gap-1 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
          );

          return (
            <NavLink key={item.name} to={item.path} className={classes}>
              <Icon className={cn("h-6 w-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#18170f] px-6 pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl font-extrabold tracking-tight text-white">Ocean Samurai</p>
          <p className="mt-2 text-sm text-slate-400">Japanese Hibachi & Sushi Bar</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={SOCIAL_LINKS.instagramBlacksburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-slate-200 transition hover:border-primary/40 hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
            Blacksburg IG
          </a>
          <a
            href={SOCIAL_LINKS.instagramChristiansburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-slate-200 transition hover:border-primary/40 hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
            Christiansburg IG
          </a>
          <a
            href={SOCIAL_LINKS.facebookBlacksburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-slate-200 transition hover:border-primary/40 hover:text-primary"
          >
            <Facebook className="h-4 w-4" />
            Blacksburg FB
          </a>
          <a
            href={SOCIAL_LINKS.facebookChristiansburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-slate-200 transition hover:border-primary/40 hover:text-primary"
          >
            <Facebook className="h-4 w-4" />
            Christiansburg FB
          </a>
          <NavLink
            to="/hiring"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-extrabold text-black transition hover:bg-primary/90"
          >
            <Users className="h-4 w-4" />
            Hiring
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
