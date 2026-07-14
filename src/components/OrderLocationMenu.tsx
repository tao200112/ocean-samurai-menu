import { useState } from "react";
import { MapPin, ShoppingBag } from "lucide-react";
import { ONLINE_ORDER_LINKS } from "@/lib/onlineOrder";
import { cn } from "@/lib/utils";

type OrderLocationMenuProps = {
  className?: string;
  buttonClassName?: string;
  compact?: boolean;
  fullWidth?: boolean;
  menuAlign?: "left" | "right" | "center";
  menuPlacement?: "top" | "bottom";
  label?: string;
};

const ORDER_LOCATIONS = [
  {
    name: "Christiansburg",
    address: "1635 N Franklin St",
    note: "AYCE and à la carte options available",
    url: ONLINE_ORDER_LINKS.christiansburg,
  },
  {
    name: "Blacksburg",
    address: "1560 S Main St #116",
    note: "À la carte available, AYCE temporarily unavailable",
    url: ONLINE_ORDER_LINKS.blacksburg,
  },
];

export function OrderLocationMenu({
  className,
  buttonClassName,
  compact = false,
  fullWidth = false,
  menuAlign = "right",
  menuPlacement = "bottom",
  label = "Order Online",
}: OrderLocationMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ocean-900 px-8 text-lg font-black text-white shadow-xl shadow-ocean-900/20 transition hover:bg-ocean-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 active:scale-[0.98]",
          compact && "h-10 px-4 text-sm",
          fullWidth && "w-full",
          buttonClassName
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <ShoppingBag className={compact ? "h-4 w-4" : "h-5 w-5"} />
        {label}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close order location menu"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "absolute z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-ocean-900/10 bg-white p-2 shadow-2xl shadow-ocean-900/18",
              menuPlacement === "top" ? "bottom-full mb-3" : "top-full mt-3",
              menuAlign === "right" && "right-0",
              menuAlign === "left" && "left-0",
              menuAlign === "center" && "left-1/2 -translate-x-1/2"
            )}
            role="menu"
          >
            <p className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">
              Choose pickup location
            </p>
            <div className="grid gap-2">
              {ORDER_LOCATIONS.map((location) => (
                <a
                  key={location.name}
                  href={location.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[1.1rem] border border-ocean-900/10 bg-[#f6fcfd] p-4 transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-cyan-50"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-ocean-950">{location.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-ocean-700">
                        <MapPin className="h-3.5 w-3.5 text-cyan-700" />
                        {location.address}
                      </p>
                    </div>
                    <span className="rounded-full bg-ocean-900 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                      Order
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-bold text-cyan-700">{location.note}</p>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
