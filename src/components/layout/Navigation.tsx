import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, MapPin, School } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center border-b border-white/5 bg-background/95 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Logo Image */}
        <img src="/logo.png" alt="Ocean Samurai Logo" className="h-10 w-10 object-contain rounded-full shadow-[0_0_15px_rgba(56,189,248,0.2)]" />
        <h1 className="text-xl font-bold uppercase tracking-wider text-white">
          Ocean Samurai
        </h1>
      </div>
    </header>
  );
}

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Menu", path: "/menu", icon: BookOpen },
    { name: "Locations", path: "/locations", icon: MapPin },
    { name: "Guide", path: "/guide", icon: School },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-background/95 pb-safe pt-2 backdrop-blur-md">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
