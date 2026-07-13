import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ORDER_SELECTION_PATH } from "@/lib/onlineOrder";

const AYCE_TIERS = [
  {
    name: "Premium",
    price: "$25.99",
    count: "88 items",
    description: "Sushi, rolls, appetizers, hibachi, noodles, rice, and dessert.",
  },
  {
    name: "Supreme",
    price: "$39.99",
    count: "110 items",
    description: "Premium plus extra seafood, specialty rolls, and select hibachi items.",
  },
];

const MENU_LINKS = [
  { name: "Sushi & Rolls", note: "Classic and specialty rolls", to: "/menu?category=Classic%20Rolls" },
  { name: "Nigiri & Sashimi", note: "Raw and cooked selections", to: "/menu?category=Nigiri%20%26%20Sashimi" },
  { name: "Hibachi", note: "Chicken, steak, shrimp, scallop", to: "/menu?category=Hibachi" },
  { name: "Appetizers", note: "Hot starters and salads", to: "/menu?category=Appetizers" },
];

const SERVICE_POINTS = [
  "100-minute AYCE dining",
  "Last call 20 minutes prior",
  "Clear labels for raw, spicy, vegetarian, allergens, ingredients, and sauces",
];

export default function HomePage() {
  return (
    <div className="bg-[#0d0d10] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_18%,rgba(55,139,155,0.18),transparent_24%),radial-gradient(circle_at_20%_18%,rgba(212,175,53,0.13),transparent_32%),linear-gradient(135deg,#0d0d10_0%,#11100d_44%,#211e13_100%)]" />
        <div
          className="absolute right-0 top-0 -z-10 hidden h-full w-[48%] opacity-55 lg:block"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #0d0d10 0%, rgba(13,13,16,0.55) 34%, rgba(13,13,16,0.28) 100%), url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1600&auto=format&fit=crop')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <div className="mx-auto grid min-h-[760px] max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.72fr_0.28fr] lg:py-24">
          <div className="flex max-w-4xl flex-col justify-center">
            <div className="mb-10 grid gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-primary sm:grid-cols-4 sm:items-center">
              <span className="font-mono">AYCE</span>
              <span className="hidden h-px bg-primary/30 sm:block" />
              <span className="font-mono">Sushi</span>
              <span className="font-mono">Hibachi</span>
            </div>

            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-4 w-4" />
              Japanese Hibachi & Sushi Bar
            </p>

            <h1 className="flex max-w-4xl flex-wrap gap-x-5 font-serif text-[clamp(3.8rem,11vw,8.5rem)] font-extrabold leading-[0.85] tracking-[-0.055em] text-white">
              <span>Ocean</span>
              <span>Samurai</span>
            </h1>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.62fr] lg:items-end">
              <p className="max-w-2xl text-xl leading-relaxed text-slate-200 sm:text-2xl">
                All-you-can-eat sushi and hibachi, fresh rolls, hot kitchen favorites, and pickup ordering for two local stores.
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Today</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  AYCE is available in Christiansburg. Temporarily unavailable in Blacksburg; regular online ordering remains available.
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-14 gap-2 rounded-full px-8 text-black" asChild>
                <Link to={ORDER_SELECTION_PATH}>
                  <ShoppingBag className="h-5 w-5" />
                  Order Online
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/20 bg-white/[0.03] px-8 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/menu">View Menu</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/20 bg-white/[0.03] px-8 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/locations">Locations</Link>
              </Button>
            </div>
          </div>

          <aside className="grid content-end gap-4 lg:pb-10">
            {AYCE_TIERS.map((tier) => (
              <div key={tier.name} className="rounded-3xl border border-white/10 bg-[#211f16]/85 p-5 shadow-2xl backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{tier.name}</p>
                    <p className="mt-3 text-4xl font-black text-white">{tier.price}</p>
                  </div>
                  <span className="rounded-full border border-primary/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                    {tier.count}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{tier.description}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="border-b border-white/5 bg-[#15140f] px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 font-mono text-xs uppercase tracking-[0.18em] text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <span>Christiansburg: AYCE Available</span>
          <span className="hidden h-px flex-1 bg-white/10 sm:block" />
          <span>Blacksburg: AYCE Temporarily Unavailable</span>
          <span className="hidden h-px flex-1 bg-white/10 sm:block" />
          <Link to={ORDER_SELECTION_PATH} className="text-primary hover:text-primary/80">
            Choose pickup location
          </Link>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Experience</p>
            <h2 className="mt-4 max-w-xl font-serif text-5xl font-extrabold leading-tight tracking-[-0.035em] text-white">
              A menu built for scanning before you sit down.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400">
              The menu stays functional, but the website now behaves like a restaurant front door: order, visit, browse, or apply in one clear path.
            </p>
            <div className="mt-7 space-y-3">
              {SERVICE_POINTS.map((point) => (
                <div key={point} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {MENU_LINKS.map((item, index) => (
              <Link
                key={item.name}
                to={item.to}
                className="group relative min-h-44 overflow-hidden rounded-3xl border border-white/10 bg-[#211f16] p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-[#292619]"
              >
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <h3 className="mt-8 text-2xl font-extrabold text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.note}</p>
                <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.025] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Visit</p>
            <h2 className="mt-4 font-serif text-5xl font-extrabold leading-tight tracking-[-0.035em] text-white">
              Two locations. One Ocean Samurai.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-400">
              Pick the right store before ordering online, or call ahead before your visit.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-white/5 bg-surface p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-extrabold text-white">Christiansburg</h3>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                  AYCE
                </span>
              </div>
              <p className="text-sm text-slate-400">1635 N Franklin St, Christiansburg, VA 24073</p>
              <div className="mt-6 grid gap-2">
                <Button className="gap-2 text-black" asChild>
                  <Link to={ORDER_SELECTION_PATH}>
                    <ShoppingBag className="h-4 w-4" />
                    Choose Location
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <a href="tel:+15407570888">
                    <Phone className="h-4 w-4" />
                    Call Store
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="border-white/5 bg-surface p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-extrabold text-white">Blacksburg</h3>
                <span className="rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase text-orange-300">
                  No AYCE
                </span>
              </div>
              <p className="text-sm text-slate-400">1560 S Main St #116, Blacksburg, VA 24060</p>
              <div className="mt-6 grid gap-2">
                <Button className="gap-2 text-black" asChild>
                  <Link to={ORDER_SELECTION_PATH}>
                    <ShoppingBag className="h-4 w-4" />
                    Choose Location
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <a href="tel:+15409510068">
                    <Phone className="h-4 w-4" />
                    Call Store
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] border border-white/5 bg-[#211f16] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Users className="h-5 w-5" />
              <p className="font-mono text-xs uppercase tracking-[0.22em]">Now Hiring</p>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-white">Join the Ocean Samurai team.</h2>
          </div>
          <Button variant="outline" size="lg" className="gap-2 rounded-full" asChild>
            <Link to="/hiring">
              View Jobs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
