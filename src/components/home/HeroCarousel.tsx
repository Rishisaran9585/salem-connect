import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  "/salem-city-view.png",
  "/yercaud-ghat-road.png",
  "/salem-hero-1.png",
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Carousel Backgrounds */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={slides[current]} 
            alt="Salem Business Directory" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90 backdrop-blur-[1px]"></div>
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 mx-auto px-4 text-center pt-32 pb-20 flex flex-col items-center justify-center">
        
        {/* Sleek Minimalist Typography */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2, duration: 1 }}
           className="relative"
        >
          <span className="mb-4 block text-xs md:text-sm font-sans font-bold uppercase tracking-[0.4em] text-white/50">
            The Elite Directory
          </span>
          <h1 className="text-[12vw] sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-display font-bold leading-[1.1] text-white tracking-tighter whitespace-nowrap">
            Discover{" "}
            <span className="bg-gradient-to-tr from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Salem
            </span>
          </h1>
        </motion.div>

      </div>

      {/* Modern Carousel Controls / Progress */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2.5">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? "w-10 bg-white" : "w-2 bg-white/20 hover:bg-white/40"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
