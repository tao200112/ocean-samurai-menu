import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, MapPin, Globe, ShoppingBag, Users, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/siteLinks";
import { OrderLocationMenu } from "@/components/OrderLocationMenu";

export function TopNav() {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  
  const languages = ["English", "Chinese", "Spanish"];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-ocean-900/10 bg-white/88 px-4 py-3 shadow-sm shadow-ocean-900/5 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        {/* Logo Image */}
        <img src="/logo.png" alt="Ocean Samurai Logo" className="h-10 w-10 rounded-full object-contain shadow-[0_0_18px_rgba(24,167,201,0.2)]" />
        <h1 className="truncate text-xl font-black uppercase tracking-[0.12em] text-ocean-950">
          Ocean Samurai
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "bg-ocean-100 text-ocean-900" : "text-ocean-800 hover:bg-ocean-50 hover:text-ocean-950")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "bg-ocean-100 text-ocean-900" : "text-ocean-800 hover:bg-ocean-50 hover:text-ocean-950")
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/locations"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "bg-ocean-100 text-ocean-900" : "text-ocean-800 hover:bg-ocean-50 hover:text-ocean-950")
            }
          >
            Locations
          </NavLink>
          <NavLink
            to="/guide"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "bg-ocean-100 text-ocean-900" : "text-ocean-800 hover:bg-ocean-50 hover:text-ocean-950")
            }
          >
            AYCE
          </NavLink>
          <NavLink
            to="/hiring"
            className={({ isActive }) =>
              cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", isActive ? "bg-ocean-100 text-ocean-900" : "text-ocean-800 hover:bg-ocean-50 hover:text-ocean-950")
            }
          >
            Hiring
          </NavLink>
        </nav>
        <OrderLocationMenu compact className="hidden sm:block" />
        <div className="relative hidden sm:block">
        <button 
          className="flex h-10 w-10 items-center justify-center rounded-full text-ocean-700 transition-colors hover:bg-ocean-50 hover:text-ocean-950"
          onClick={() => setShowLangMenu(!showLangMenu)}
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
        </button>

        {showLangMenu && (
          <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-lg border border-ocean-900/10 bg-white shadow-xl">
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
                      ? "bg-ocean-100 text-ocean-900 font-bold" 
                      : "text-ocean-700 hover:bg-ocean-50 hover:text-ocean-950"
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
    { name: "Order", path: "order", icon: ShoppingBag },
    { name: "Locations", path: "/locations", icon: MapPin },
    { name: "Jobs", path: "/hiring", icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-ocean-900/10 bg-white/92 pb-safe pt-2 shadow-[0_-12px_32px_rgba(5,35,51,0.08)] backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const classes = cn(
            "flex flex-1 flex-col items-center justify-center gap-1 transition-colors",
            isActive ? "text-ocean-900" : "text-ocean-700 hover:text-ocean-900"
          );

          return (
            item.name === "Order" ? (
              <div key={item.name} className="flex flex-1 justify-center">
                <OrderLocationMenu
                  compact
                  label="Order"
                  menuAlign="center"
                  menuPlacement="top"
                  buttonClassName="h-auto flex-col gap-1 bg-transparent px-0 py-0 text-[10px] text-ocean-700 shadow-none hover:bg-transparent hover:text-ocean-900"
                />
              </div>
            ) : (
              <NavLink key={item.name} to={item.path} className={classes}>
                <Icon className={cn("h-6 w-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              </NavLink>
            )
          );
        })}
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ocean-900/10 bg-ocean-950 px-6 pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl font-extrabold tracking-tight text-white">Ocean Samurai</p>
          <p className="mt-2 text-sm text-cyan-50/70">Japanese Hibachi & Sushi Bar</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={SOCIAL_LINKS.instagramBlacksburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-cyan-50/80 transition hover:border-cyan-200/40 hover:text-cyan-100"
          >
            <Instagram className="h-4 w-4" />
            Blacksburg IG
          </a>
          <a
            href={SOCIAL_LINKS.instagramChristiansburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-cyan-50/80 transition hover:border-cyan-200/40 hover:text-cyan-100"
          >
            <Instagram className="h-4 w-4" />
            Christiansburg IG
          </a>
          <a
            href={SOCIAL_LINKS.facebookBlacksburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-cyan-50/80 transition hover:border-cyan-200/40 hover:text-cyan-100"
          >
            <Facebook className="h-4 w-4" />
            Blacksburg FB
          </a>
          <a
            href={SOCIAL_LINKS.facebookChristiansburg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-cyan-50/80 transition hover:border-cyan-200/40 hover:text-cyan-100"
          >
            <Facebook className="h-4 w-4" />
            Christiansburg FB
          </a>
          <NavLink
            to="/hiring"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-coral px-4 text-sm font-extrabold text-white transition hover:bg-coral/90"
          >
            <Users className="h-4 w-4" />
            Hiring
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
