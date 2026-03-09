import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Location = {
  id: string;
  name: string;
  subtitle?: string;
  address: string;
  phone: string;
  mapUrl: string;
  callUrl: string;
  status: string;
  statusColor: string;
  note?: string;
  image: string;
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
    status: "All You Can Eat Available",
    statusColor: "bg-primary text-black",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    hours: [
      { day: "Sunday", time: "12:00 PM – 9:30 PM" },
      { day: "Monday", time: "11:00 AM – 3:00 PM, 4:30 PM – 9:30 PM" },
      { day: "Tuesday", time: "Closed" },
      { day: "Wednesday", time: "11:00 AM – 3:00 PM, 4:30 PM – 9:30 PM" },
      { day: "Thursday", time: "11:00 AM – 3:00 PM, 4:30 PM – 9:30 PM" },
      { day: "Friday", time: "11:00 AM – 3:00 PM, 4:30 PM – 10:00 PM" },
      { day: "Saturday", time: "12:00 PM – 10:00 PM" },
    ]
  },
  {
    id: "blacksburg",
    name: "Ocean Samurai Blacksburg",
    subtitle: "Japanese Sushi & Hibachi | 海の侍 日本料理",
    address: "1560 S Main St #116, Blacksburg, VA 24060",
    phone: "+1 (540) 951-0068",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1560+S+Main+St+%23116,+Blacksburg,+VA+24060",
    callUrl: "tel:+15409510068",
    status: "All You Can Eat Coming Soon",
    statusColor: "bg-surface border border-primary/50 text-primary",
    note: "AYCE is currently in preparation at this location.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
    hours: [
      { day: "Sunday", time: "12:00 PM – 9:30 PM" },
      { day: "Monday", time: "Closed" },
      { day: "Tuesday", time: "11:00 AM – 3:00 PM, 4:30 PM – 9:30 PM" },
      { day: "Wednesday", time: "11:00 AM – 3:00 PM, 4:30 PM – 9:30 PM" },
      { day: "Thursday", time: "11:00 AM – 3:00 PM, 4:30 PM – 9:30 PM" },
      { day: "Friday", time: "11:00 AM – 3:00 PM, 4:30 PM – 10:00 PM" },
      { day: "Saturday", time: "12:00 PM – 10:00 PM" },
    ]
  }
];

const LocationCard: React.FC<{ loc: Location }> = ({ loc }) => {
  const [hoursOpen, setHoursOpen] = useState(false);

  return (
    <div className="group overflow-hidden rounded-xl border border-white/5 bg-surface shadow-xl">
      <div className="relative h-56 w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${loc.image}')` }}
        />
      </div>
      
      <div className="p-5 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">{loc.name}</h2>
          {loc.subtitle && (
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {loc.subtitle}
            </p>
          )}
        </div>

        <div className={cn("inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider", loc.statusColor)}>
          {loc.status}
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

        <div className="grid grid-cols-2 gap-3">
          <Button asChild className="w-full gap-2 text-xs h-12">
            <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>
          </Button>
          <Button asChild variant="secondary" className="w-full gap-2 text-xs h-12">
            <a href={loc.callUrl}>
              <Phone className="h-4 w-4" />
              Call Store
            </a>
          </Button>
        </div>

        {loc.note && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
            {loc.note}
          </div>
        )}

        <div className="rounded-lg border border-white/5 bg-black/20">
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
            <div className="border-t border-white/5 p-4 pt-3 space-y-2.5">
              {loc.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
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
}

export default function LocationsPage() {
  return (
    <div className="space-y-8 p-4">
      {LOCATIONS.map((loc) => (
        <LocationCard key={loc.id} loc={loc} />
      ))}
    </div>
  );
}
