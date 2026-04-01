import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    bg: "bg-gradient-hero",
    headline: "Find Every Business in Salem",
    subtext: "5,000+ verified businesses across 300+ categories in Salem District",
    cta: { label: "Search Businesses", to: "/categories" },
    cta2: { label: "Register Free", to: "/register" },
    stats: [
      { value: "5,000+", label: "Businesses" },
      { value: "300+", label: "Categories" },
      { value: "200+", label: "Areas" },
      { value: "All", label: "Verified" },
    ],
  },
  {
    bg: "bg-gradient-gold",
    headline: "Browse 300+ Business Categories",
    subtext: "From Restaurants to Real Estate — find any service you need in Salem",
    cta: { label: "View Categories", to: "/categories" },
  },
  {
    bg: "bg-gradient-hero",
    headline: "List Your Business Today",
    subtext: "One-time fee of just ₹150. Reach thousands of local customers.",
    cta: { label: "Register Now", to: "/register" },
  },
  {
    bg: "bg-gradient-gold",
    headline: "Find Any Business A to Z",
    subtext: "Browse the complete alphabetical directory of Salem businesses",
    cta: { label: "Browse A-Z", to: "/a-z" },
  },
  {
    bg: "bg-gradient-hero",
    headline: "Salem's Most Trusted Directory",
    subtext: "Serving local businesses and customers since 2024 — India's #1 Local Business Network",
    cta: { label: "Learn More", to: "/about" },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`${slide.bg} py-16 md:py-24 lg:py-32`}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mx-auto max-w-3xl text-3xl font-display font-bold md:text-5xl lg:text-6xl text-primary-foreground"
            >
              {slide.headline}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mx-auto mt-4 max-w-xl text-base font-body md:text-lg text-primary-foreground/80"
            >
              {slide.subtext}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link to={slide.cta.to}>
                <Button size="lg" className="bg-accent text-accent-foreground font-sans shadow-md hover:opacity-90">
                  {slide.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {slide.cta2 && (
                <Link to={slide.cta2.to}>
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground font-sans hover:bg-primary-foreground/10">
                    {slide.cta2.label}
                  </Button>
                </Link>
              )}
            </motion.div>

            {slide.stats && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4"
              >
                {slide.stats.map((s) => (
                  <div key={s.label} className="rounded-lg bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm">
                    <div className="text-2xl font-sans font-bold text-primary-foreground">{s.value}</div>
                    <div className="text-xs font-sans text-primary-foreground/70">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/20 p-2 backdrop-blur-sm transition-colors hover:bg-primary-foreground/30" aria-label="Previous slide">
        <ChevronLeft className="h-5 w-5 text-primary-foreground" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/20 p-2 backdrop-blur-sm transition-colors hover:bg-primary-foreground/30" aria-label="Next slide">
        <ChevronRight className="h-5 w-5 text-primary-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-accent" : "w-2 bg-primary-foreground/40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
