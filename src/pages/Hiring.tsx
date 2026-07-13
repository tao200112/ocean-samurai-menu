import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, MapPin, Sparkles, Users } from "lucide-react";
import { HIRING_FORM_URL } from "@/lib/siteLinks";

const OPENINGS = [
  "Front of house team members",
  "Servers and hosts",
  "Kitchen and sushi bar support",
  "Part-time and flexible schedule applicants",
];

export default function HiringPage() {
  return (
    <div className="bg-[#0f0f13] px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-4 w-4" />
              Join Ocean Samurai
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
                We are hiring.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                Ocean Samurai is looking for friendly, dependable team members who enjoy fast-paced restaurant service and a welcoming guest experience.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 text-black" asChild>
                <a href={HIRING_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-black/20 text-white hover:bg-white/10" asChild>
                <a href="/locations">View Locations</a>
              </Button>
            </div>
          </div>

          <Card className="border-white/5 bg-surface p-6 shadow-2xl">
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-extrabold text-white">Open Roles</h2>
            </div>
            <div className="space-y-3">
              {OPENINGS.map((opening) => (
                <div key={opening} className="rounded-xl border border-white/5 bg-black/20 p-4 text-sm font-semibold text-slate-200">
                  {opening}
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <Card className="border-white/5 bg-surface/70 p-6">
            <MapPin className="mb-5 h-7 w-7 text-primary" />
            <h3 className="text-xl font-bold text-white">Two Locations</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Opportunities may be available in Christiansburg and Blacksburg.
            </p>
          </Card>
          <Card className="border-white/5 bg-surface/70 p-6">
            <Clock className="mb-5 h-7 w-7 text-primary" />
            <h3 className="text-xl font-bold text-white">Flexible Shifts</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Apply with your availability and preferred role.
            </p>
          </Card>
          <Card className="border-white/5 bg-surface/70 p-6">
            <Users className="mb-5 h-7 w-7 text-primary" />
            <h3 className="text-xl font-bold text-white">Team Culture</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Join a growing local restaurant team focused on service, speed, and hospitality.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
