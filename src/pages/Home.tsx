import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShipWheel,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";
import { OrderLocationMenu } from "@/components/OrderLocationMenu";

const MENU_CATEGORIES = [
  {
    name: "Sushi & Rolls",
    note: "Classic rolls, specialty rolls, sauces, crunch, and fresh toppings.",
    to: "/menu?category=Classic%20Rolls",
    image: "/home/category-sushi-rolls.png",
  },
  {
    name: "Nigiri & Sashimi",
    note: "Raw and cooked selections with clear labels for every item.",
    to: "/menu?category=Nigiri%20%26%20Sashimi",
    image: "/home/category-nigiri-sashimi.png",
  },
  {
    name: "Hibachi & Teriyaki",
    note: "Steak, chicken, shrimp, scallop, vegetables, rice, and sauces.",
    to: "/menu?category=Hibachi",
    image: "/home/category-hibachi-teriyaki.png",
  },
  {
    name: "Appetizers",
    note: "Tempura, gyoza, fried dumplings, crab rangoon, and hot starters.",
    to: "/menu?category=Appetizers",
    image: "/home/category-appetizers.png",
  },
  {
    name: "Noodles, Rice & Dessert",
    note: "Yakisoba, fried rice, white rice, and mochi ice cream.",
    to: "/menu?category=Noodles",
    image: "/home/category-noodles-rice-dessert.png",
  },
];

const AYCE_TIERS = [
  {
    name: "Premium",
    price: "$25.99",
    count: "88 items",
    highlight: "Core AYCE",
    description: "Sushi, rolls, appetizers, hibachi, noodles, rice, and dessert.",
  },
  {
    name: "Supreme",
    price: "$39.99",
    count: "110 items",
    highlight: "Upgrade",
    description: "Premium plus extra seafood, specialty rolls, and select hibachi items.",
  },
];

const RULES = [
  "100 minutes, starts with the first order.",
  "Last call is 20 minutes prior to the time limit.",
  "Only 4 items will be served per person at a time.",
  "Whole party must order the same priced AYCE course.",
  "Unfinished food will be charged at menu prices.",
];

const RAIL_IMAGES = [
  "/home/category-sushi-rolls.png",
  "/home/category-nigiri-sashimi.png",
  "/home/category-hibachi-teriyaki.png",
  "/home/category-appetizers.png",
  "/home/category-noodles-rice-dessert.png",
  "/home/ayce-premium-supreme.png",
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#eaf8fb] text-[#07384e]">
      <section className="ocean-hero relative isolate min-h-[calc(100vh-72px)] overflow-hidden">
        <div className="wave-field" />
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-ocean-800 shadow-sm backdrop-blur">
                <Waves className="h-4 w-4 text-cyan-600" />
                Ocean Samurai
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-coral/25">
                <Sparkles className="h-4 w-4" />
                AYCE Christiansburg
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-[clamp(4rem,12vw,9.2rem)] font-black leading-[0.82] tracking-[-0.055em] text-ocean-950">
              Fresh rolls.
              <span className="block text-ocean-600">Blue tide.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-ocean-800 sm:text-2xl">
              Japanese hibachi, sushi, and all-you-can-eat favorites served with a bright ocean-blue restaurant experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OrderLocationMenu fullWidth className="sm:w-auto" />
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-ocean-700/20 bg-white/70 px-8 text-ocean-900 hover:bg-white"
                asChild
              >
                <Link to="/menu">View Menu</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-ocean-700/20 bg-white/70 px-8 text-ocean-900 hover:bg-white"
                asChild
              >
                <Link to="/locations">Locations</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/60 bg-white/65 p-4 shadow-sm backdrop-blur">
                <Clock className="h-5 w-5 text-cyan-600" />
                <p className="mt-3 text-sm font-black text-ocean-950">AYCE Dining</p>
                <p className="mt-1 text-xs font-semibold text-ocean-700">Premium course with Supreme upgrade.</p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/65 p-4 shadow-sm backdrop-blur">
                <ShipWheel className="h-5 w-5 text-cyan-600" />
                <p className="mt-3 text-sm font-black text-ocean-950">Fresh Sushi</p>
                <p className="mt-1 text-xs font-semibold text-ocean-700">Rolls, nigiri, sashimi, and appetizers.</p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/65 p-4 shadow-sm backdrop-blur">
                <CheckCircle2 className="h-5 w-5 text-cyan-600" />
                <p className="mt-3 text-sm font-black text-ocean-950">Hibachi</p>
                <p className="mt-1 text-xs font-semibold text-ocean-700">Steak, chicken, shrimp, and rice plates.</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[480px] lg:min-h-[680px]">
            <div className="absolute inset-x-4 bottom-2 top-10 rounded-[3rem] bg-ocean-900/10 blur-3xl" />
            <img
              src="/home/hero-ocean-samurai.png"
              alt="Ocean Samurai sushi, hibachi, tempura, and rice spread on ocean blue plates"
              className="hero-food-float absolute right-0 top-0 h-full w-full rounded-[2.5rem] object-cover shadow-2xl shadow-ocean-900/25 ring-1 ring-white/70"
            />
            <div className="absolute -bottom-6 left-5 right-5 rounded-[2rem] border border-white/60 bg-white/85 p-5 shadow-xl shadow-ocean-900/10 backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Ocean Samurai</p>
                  <p className="mt-1 text-lg font-black text-ocean-950">Sushi, hibachi, rolls, and pickup ordering.</p>
                </div>
                <Link to="/locations" className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-black text-ocean-900 hover:bg-cyan-100">
                  Two Locations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">Menu</p>
              <h2 className="mt-3 max-w-2xl font-serif text-5xl font-black leading-tight tracking-[-0.035em] text-ocean-950 sm:text-6xl">
                Browse by craving, not by tiny menu text.
              </h2>
            </div>
            <Button variant="outline" className="w-fit rounded-full border-ocean-700/20 px-6 text-ocean-900 hover:bg-cyan-50" asChild>
              <Link to="/menu">
                Full Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            {MENU_CATEGORIES.map((item, index) => (
              <Link
                key={item.name}
                to={item.to}
                className={index === 0 ? "menu-tide-card group lg:col-span-2 lg:row-span-2" : "menu-tide-card group"}
              >
                <img src={item.image} alt={`${item.name} category`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/20 to-transparent" />
                <div className="relative z-10 flex h-full min-h-72 flex-col justify-end p-5 text-white">
                  <span className="mb-3 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] backdrop-blur">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight">{item.name}</h3>
                  <p className="mt-2 max-w-sm text-sm font-semibold leading-relaxed text-white/82">{item.note}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#d8f4fa] px-5 py-20 sm:px-8">
        <div className="wave-field opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">AYCE</p>
            <h2 className="mt-3 max-w-xl font-serif text-5xl font-black leading-tight tracking-[-0.035em] text-ocean-950 sm:text-6xl">
              Premium first, Supreme when you want more.
            </h2>
            <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-ocean-800">
              All You Can Eat is available at Christiansburg. Blacksburg currently offers regular online ordering while AYCE is paused.
            </p>
            <div className="mt-7 grid gap-3">
              {RULES.map((rule) => (
                <div key={rule} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm font-bold text-ocean-900 shadow-sm backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/home/ayce-premium-supreme.png"
              alt="All you can eat sushi and hibachi spread"
              className="rounded-[2.5rem] object-cover shadow-2xl shadow-ocean-900/20 ring-1 ring-white/70"
            />
            <div className="absolute -bottom-8 left-6 right-6 grid gap-3 rounded-[2rem] bg-white/90 p-4 shadow-xl shadow-ocean-900/10 backdrop-blur sm:grid-cols-2">
              {AYCE_TIERS.map((tier) => (
                <div key={tier.name} className={tier.name === "Premium" ? "rounded-2xl bg-ocean-900 p-5 text-white" : "rounded-2xl bg-cyan-50 p-5 text-ocean-950"}>
                  <p className="text-xs font-black uppercase tracking-[0.18em] opacity-75">{tier.highlight}</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <h3 className="text-3xl font-black">{tier.name}</h3>
                    <p className="text-3xl font-black">{tier.price}</p>
                  </div>
                  <p className="mt-3 text-sm font-semibold opacity-80">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ocean-950 py-16 text-white">
        <div className="mb-8 px-5 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Ocean Rail</p>
              <h2 className="mt-3 font-serif text-5xl font-black tracking-[-0.035em]">A quick look before you dive in.</h2>
            </div>
            <p className="max-w-lg text-sm font-semibold leading-relaxed text-cyan-50/75">
              A lighter nod to conveyor-sushi energy: moving plates, real food imagery, and a calmer blue brand system.
            </p>
          </div>
        </div>

        <div className="sushi-rail overflow-hidden">
          <div className="sushi-rail-track flex w-max gap-5 px-5 sm:px-8">
            {[...RAIL_IMAGES, ...RAIL_IMAGES].map((image, index) => (
              <div key={`${image}-${index}`} className="h-64 w-80 shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl shadow-black/20">
                <img src={image} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d8f4fa] px-5 py-16 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] bg-white/80 p-6 shadow-xl shadow-ocean-900/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-700">
              <Users className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.22em]">Now Hiring</p>
            </div>
            <h2 className="mt-3 text-3xl font-black text-ocean-950">Join the Ocean Samurai team.</h2>
          </div>
          <Button variant="outline" size="lg" className="gap-2 rounded-full border-ocean-700/20 bg-white text-ocean-900 hover:bg-cyan-50" asChild>
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
