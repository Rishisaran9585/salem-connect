import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1590050752117-23a9d7fc244d?auto=format&fit=crop&q=80&w=1920", // Salem/India cityscape vibe
    overlay: "bg-[#1B4332]/80",
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
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920",
    overlay: "bg-[#C9973A]/80",
    headline: "Browse 300+ Business Categories",
    subtext: "From Restaurants to Real Estate — find any service you need in Salem district's largest directory",
    cta: { label: "View All Categories", to: "/categories" },
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920",
    overlay: "bg-[#1B4332]/85",
    headline: "List Your Business Today",
    subtext: "One-time fee of just ₹150. Reach thousands of customers across the city.",
    cta: { label: "Register Now →", to: "/register" },
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920",
    overlay: "bg-[#1B4332]/80",
    headline: "Find Any Business A to Z",
    subtext: "Experience the most comprehensive alphabetical directory of Salem businesses",
    cta: { label: "Browse A-Z List", to: "/a-z" },
  },
  {
    image: "https://images.unsplash.com/photo-1454165833767-021901968b3d?auto=format&fit=crop&q=80&w=1920",
    overlay: "bg-[#C9973A]/85",
    headline: "Salem's Most Trusted Network",
    subtext: "Serving local businesses and customers — India's #1 Local Business Network for Salem",
    cta: { label: "About Us", to: "/about" },
    badge: "India's #1 Local Business Network — Salem"
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section 
      className="relative h-[600px] md:h-[700px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] hover:scale-110"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 ${slides[current].overlay} backdrop-blur-[2px]`} />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="container mx-auto">
              {slides[current].badge && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-sans text-sm font-bold uppercase tracking-wider"
                >
                  <CheckCircle className="w-4 h-4 text-[#C9973A]" />
                  {slides[current].badge}
                </motion.div>
              )}

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
              >
                {slides[current].headline}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="max-w-2xl mx-auto text-lg md:text-xl font-body text-white/90 mb-10"
              >
                {slides[current].subtext}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to={slides[current].cta.to}>
                  <Button size="lg" className="bg-[#C9973A] hover:bg-[#C9973A]/90 text-white font-sans font-bold px-8 py-7 text-lg rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-none">
                    {slides[current].cta.label}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                {slides[current].cta2 && (
                  <Link to={slides[current].cta2.to}>
                    <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10 font-sans font-bold px-8 py-7 text-lg rounded-full backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95">
                      {slides[current].cta2.label}
                    </Button>
                  </Link>
                )}
              </motion.div>

              {slides[current].stats && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                  {slides[current].stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-3xl md:text-4xl font-display font-bold text-[#C9973A]">
                        {stat.value}
                      </span>
                      <span className="text-white/70 font-sans uppercase text-xs tracking-widest mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-20 pointer-events-none">
        <button 
          onClick={prev}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#C9973A] transition-all pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#C9973A] transition-all pointer-events-auto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full h-1 ${idx === current ? "w-12 bg-[#C9973A]" : "w-6 bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
