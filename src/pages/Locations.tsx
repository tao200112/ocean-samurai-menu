import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, Clock, ChevronDown, ShoppingBag, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { ONLINE_ORDER_LINKS } from "@/lib/onlineOrder";
import { SOCIAL_LINKS } from "@/lib/siteLinks";

type Location = {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  callUrl: string;
  orderUrl: string;
  status: string;
  statusColor: string;
  ayceStatus: string;
  ayceStatusColor: string;
  note?: string;
  hours: { day: string; time: string }[];
};

const LOCATIONS: Location[] = [
  {
    id: "christiansburg",
    name: "Ocean Samurai Christiansburg",
    address: "1635 N Franklin St, Christiansburg, VA 24073",
    phone: "+1 (540) 757-0888",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1635+N+Franklin+St,+Christiansburg,+VA+24073",
    callUrl: "tel:+15407570888",
    orderUrl: ONLINE_ORDER_LINKS.christiansburg,
    status: "Online Ordering Available",
    statusColor: "bg-primary text-black",
    ayceStatus: "AYCE Available",
    ayceStatusColor: "border-primary/40 bg-primary/10 text-primary",
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
    address: "1560 S Main St #116, Blacksburg, VA 24060",
    phone: "+1 (540) 951-0068",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1560+S+Main+St+%23116,+Blacksburg,+VA+24060",
    callUrl: "tel:+15409510068",
    orderUrl: ONLINE_ORDER_LINKS.blacksburg,
    status: "Online Ordering Available",
    statusColor: "bg-primary text-black",
    ayceStatus: "AYCE Temporarily Unavailable",
    ayceStatusColor: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    note: "All You Can Eat is temporarily unavailable at the Blacksburg location. Regular online ordering is still available.",
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

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-surface shadow-xl">
      <div className="space-y-5 p-6">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <div className={cn("inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider", loc.statusColor)}>
              {loc.status}
            </div>
            <div className={cn("inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider", loc.ayceStatusColor)}>
              {loc.ayceStatus}
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white">{loc.name}</h2>
        </div>

        <div className="space-y-3">
          <p className="flex items-start gap-3 text-sm text-slate-300">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{loc.address}</span>
          </p>
          <p className="flex items-center gap-3 text-sm text-slate-300">
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            <span>{loc.phone}</span>
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Button asChild className="w-full gap-2 text-xs sm:col-span-3">
            <a href={loc.orderUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="h-4 w-4" />
              Order Online
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full gap-2 text-xs sm:col-span-2">
            <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </Button>
          <Button asChild variant="secondary" className="w-full gap-2 text-xs">
            <a href={loc.callUrl}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
        </div>

        {loc.note && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-relaxed text-primary">
            {loc.note}
          </div>
        )}

        <div className="rounded-xl border border-white/5 bg-black/20">
          <button
            onClick={() => setHoursOpen(!hoursOpen)}
            className="flex w-full items-center justify-between p-4 text-sm font-semibold text-white"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Store Hours
            </div>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", hoursOpen && "rotate-180")} />
          </button>

          {hoursOpen && (
            <div className="space-y-2.5 border-t border-white/5 p-4 pt-3">
              {loc.hours.map((h) => (
                <div key={h.day} className="grid grid-cols-[90px_1fr] gap-3 text-sm">
                  <span className="font-medium text-muted-foreground">{h.day}</span>
                  <span className={cn("text-right font-medium", h.time === "Closed" ? "text-red-400" : "text-slate-300")}>
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
    <div id="order" className="bg-[#0f0f13] px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Order Online</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">Choose your Ocean Samurai location.</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Select Christiansburg or Blacksburg to order pickup, get directions, call the store, or check hours.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} loc={loc} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/5 bg-surface p-5">
          <div>
            <h2 className="text-xl font-extrabold text-white">Follow Ocean Samurai</h2>
            <p className="mt-1 text-sm text-slate-400">Find updates, photos, specials, and announcements from each location.</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-black/20 p-4">
              <h3 className="font-bold text-white">Blacksburg</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2" asChild>
                  <a href={SOCIAL_LINKS.instagramBlacksburg} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <a href={SOCIAL_LINKS.facebookBlacksburg} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/20 p-4">
              <h3 className="font-bold text-white">Christiansburg</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2" asChild>
                  <a href={SOCIAL_LINKS.instagramChristiansburg} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <a href={SOCIAL_LINKS.facebookChristiansburg} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
