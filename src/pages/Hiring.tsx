import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, MapPin, Sparkles, Users } from "lucide-react";
import { HIRING_FORM_URL } from "@/lib/siteLinks";

const OPENINGS = [
  "Front of house team members",
  "Servers and hosts",
  "Kitchen and sushi bar support",
  "Part-time and flexible schedule applicants",
];

const BENEFITS = [
  { icon: MapPin, title: "Two Locations", desc: "Opportunities may be available in Christiansburg and Blacksburg." },
  { icon: Clock, title: "Flexible Shifts", desc: "Apply with your availability and preferred role." },
  { icon: Users, title: "Team Culture", desc: "Join a growing local restaurant team focused on hospitality and speed." },
];

export default function HiringPage() {
  return (
    <div className="relative overflow-hidden bg-[#eaf8fb] px-5 py-10 sm:px-8 lg:py-14">
      <div className="wave-field opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ocean-700/15 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-ocean-800 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-cyan-700" />
              Join Ocean Samurai
            </div>
            <h1 className="mt-6 max-w-3xl font-serif text-6xl font-black leading-[0.95] tracking-[-0.045em] text-ocean-950 sm:text-7xl">
              Bring good energy to the table.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-ocean-800">
              Ocean Samurai is hiring dependable team members for a fast-paced Japanese hibachi and sushi restaurant environment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 rounded-full bg-ocean-900 px-8 text-white hover:bg-ocean-800" asChild>
                <a href={HIRING_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-ocean-700/20 bg-white/75 px-8 text-ocean-900 hover:bg-white" asChild>
                <a href="/locations">View Locations</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/home/hiring-team-table.png"
              alt="Ocean Samurai dining table and restaurant service setting"
              className="h-80 w-full rounded-[2.5rem] object-cover shadow-2xl shadow-ocean-900/18 ring-1 ring-white/80 lg:h-[520px]"
            />
            <div className="absolute -bottom-6 left-5 right-5 rounded-[2rem] bg-white/90 p-5 shadow-xl shadow-ocean-900/12 backdrop-blur">
              <div className="flex items-center gap-3">
                <Users className="h-7 w-7 text-cyan-700" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Open Roles</p>
                  <p className="text-lg font-black text-ocean-950">Service, host, kitchen, and sushi support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-ocean-950 p-6 text-white shadow-xl shadow-ocean-900/15">
            <h2 className="text-3xl font-black">Current openings</h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-cyan-50/75">
              Submit the form with your preferred position and availability. A manager will review applications.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {OPENINGS.map((opening) => (
              <div key={opening} className="rounded-2xl border border-ocean-900/10 bg-white p-5 text-sm font-black text-ocean-950 shadow-sm">
                {opening}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[2rem] border border-ocean-900/10 bg-white/85 p-6 shadow-sm backdrop-blur">
                <Icon className="mb-5 h-7 w-7 text-cyan-700" />
                <h3 className="text-xl font-black text-ocean-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-ocean-700">{item.desc}</p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
