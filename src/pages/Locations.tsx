import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, Clock, ChevronDown, ShoppingBag, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { ONLINE_ORDER_LINKS } from "@/lib/onlineOrder";
import { SOCIAL_LINKS } from "@/lib/siteLinks";

type Location = {
  id: string;
  name: string;
  shortName: string;
  address: string;
  phone: string;
  mapUrl: string;
  callUrl: string;
  orderUrl: string;
  ayceStatus: string;
  ayceTone: "available" | "paused";
  note?: string;
  hours: { day: string; time: string }[];
};

const LOCATIONS: Location[] = [
  {
    id: "christiansburg",
    name: "Ocean Samurai Christiansburg",
    shortName: "Christiansburg",
    address: "1635 N Franklin St, Christiansburg, VA 24073",
    phone: "+1 (540) 757-0888",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1635+N+Franklin+St,+Christiansburg,+VA+24073",
    callUrl: "tel:+15407570888",
    orderUrl: ONLINE_ORDER_LINKS.christiansburg,
    ayceStatus: "AYCE Available",
    ayceTone: "available",
    hours: [
      { day: "Sunday", time: "12:00 PM - 9:30 PM" },
      { day: "Monday", time: "11:00 AM - 3:00 PM, 4:30 PM - 9:30 PM" },
      { day: "Tuesday", time: "Closed" },
      { day: "Wednesday", time: "11:00 AM - 3:00 PM, 4:30 PM - 9:30 PM" },
      { day: "Thursday", time: "11:00 AM - 3:00 PM, 4:30 PM - 9:30 PM" },
      { day: "Friday", time: "11:00 AM - 3:00 PM, 4:30 PM - 10:00 PM" },
      { day: "Saturday", time: "12:00 PM - 10:00 PM" },
    ],
  },
  {
    id: "blacksburg",
    name: "Ocean Samurai Blacksburg",
    shortName: "Blacksburg",
    address: "1560 S Main St #116, Blacksburg, VA 24060",
    phone: "+1 (540) 951-0068",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1560+S+Main+St+%23116,+Blacksburg,+VA+24060",
    callUrl: "tel:+15409510068",
    orderUrl: ONLINE_ORDER_LINKS.blacksburg,
    ayceStatus: "AYCE Temporarily Unavailable",
    ayceTone: "paused",
    note: "Regular online ordering is available. AYCE is temporarily unavailable at this location.",
    hours: [
      { day: "Sunday", time: "12:00 PM - 9:30 PM" },
      { day: "Monday", time: "Closed" },
      { day: "Tuesday", time: "11:00 AM - 3:00 PM, 4:30 PM - 9:30 PM" },
      { day: "Wednesday", time: "11:00 AM - 3:00 PM, 4:30 PM - 9:30 PM" },
      { day: "Thursday", time: "11:00 AM - 3:00 PM, 4:30 PM - 9:30 PM" },
      { day: "Friday", time: "11:00 AM - 3:00 PM, 4:30 PM - 10:00 PM" },
      { day: "Saturday", time: "12:00 PM - 10:00 PM" },
    ],
  },
];

const LocationCard: React.FC<{ loc: Location }> = ({ loc }) => {
  const [hoursOpen, setHoursOpen] = useState(false);
  const isPaused = loc.ayceTone === "paused";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-ocean-900/10 bg-white shadow-xl shadow-ocean-900/8">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white",
                isPaused ? "bg-ocean-700" : "bg-coral"
              )}
            >
              {loc.ayceStatus}
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ocean-950">{loc.shortName}</h2>
          </div>
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-ocean-800">
            Online Order
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <p className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-ocean-800">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
            <span>{loc.address}</span>
          </p>
          <p className="flex items-center gap-3 text-sm font-semibold text-ocean-800">
            <Phone className="h-4 w-4 shrink-0 text-cyan-700" />
            <span>{loc.phone}</span>
          </p>
        </div>

        {loc.note && (
          <div className="mt-5 rounded-2xl border border-ocean-700/15 bg-cyan-50 p-4 text-sm font-semibold leading-relaxed text-ocean-800">
            {loc.note}
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Button asChild className="w-full gap-2 rounded-full bg-ocean-900 text-white hover:bg-ocean-800 sm:col-span-3">
            <a href={loc.orderUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="h-4 w-4" />
              Order Online
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full gap-2 rounded-full border-ocean-700/20 text-ocean-900 sm:col-span-2">
            <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </Button>
          <Button asChild variant="secondary" className="w-full gap-2 rounded-full bg-cyan-50 text-ocean-900 hover:bg-cyan-100">
            <a href={loc.callUrl}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
        </div>

        <div className="mt-5 rounded-2xl border border-ocean-900/10 bg-[#f6fcfd]">
          <button
            onClick={() => setHoursOpen(!hoursOpen)}
            className="flex w-full items-center justify-between p-4 text-sm font-black text-ocean-950"
          >
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-700" />
              Store Hours
            </span>
            <ChevronDown className={cn("h-4 w-4 text-ocean-700 transition-transform", hoursOpen && "rotate-180")} />
          </button>

          {hoursOpen && (
            <div className="space-y-2 border-t border-ocean-900/10 p-4 pt-3">
              {loc.hours.map((h) => (
                <div key={h.day} className="grid grid-cols-[88px_1fr] gap-3 text-sm">
                  <span className="font-bold text-ocean-700">{h.day}</span>
                  <span className={cn("text-right font-semibold", h.time === "Closed" ? "text-coral" : "text-ocean-900")}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function LocationsPage() {
  return (
    <div id="order" className="relative overflow-hidden bg-[#eaf8fb] px-5 py-10 sm:px-8 lg:py-14">
      <div className="wave-field opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">Order Online</p>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl font-black leading-tight tracking-[-0.035em] text-ocean-950 sm:text-6xl">
              Pick your location before you order.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-ocean-800">
              Choose Christiansburg or Blacksburg first, then continue to online ordering, directions, phone, and hours.
            </p>
          </div>
          <img
            src="/home/location-order-table.png"
            alt="Ocean Samurai sushi and hibachi table setting for online ordering"
            className="h-72 w-full rounded-[2rem] object-cover shadow-2xl shadow-ocean-900/15 ring-1 ring-white/80 lg:h-96"
          />
        </section>

        <section className="mt-8 grid items-start gap-5 lg:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} loc={loc} />
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] bg-ocean-950 p-5 text-white shadow-xl shadow-ocean-900/15 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black">Follow both Ocean Samurai locations.</h2>
              <p className="mt-1 text-sm font-semibold text-cyan-50/75">Updates, photos, specials, and announcements for each store.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <a href={SOCIAL_LINKS.instagramBlacksburg} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-cyan-50/85 hover:bg-white/10">
                <Instagram className="h-4 w-4" />
                Blacksburg IG
              </a>
              <a href={SOCIAL_LINKS.instagramChristiansburg} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-cyan-50/85 hover:bg-white/10">
                <Instagram className="h-4 w-4" />
                Christiansburg IG
              </a>
              <a href={SOCIAL_LINKS.facebookBlacksburg} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-cyan-50/85 hover:bg-white/10">
                <Facebook className="h-4 w-4" />
                Blacksburg FB
              </a>
              <a href={SOCIAL_LINKS.facebookChristiansburg} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-cyan-50/85 hover:bg-white/10">
                <Facebook className="h-4 w-4" />
                Christiansburg FB
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
