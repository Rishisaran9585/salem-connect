import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  image_url: string;
  title?: string;
  subtitle?: string;
}

const defaultSlides: Slide[] = [
  { id: 101, image_url: "/salem-city-view.png" },
  { id: 102, image_url: "/yercaud-ghat-road.png" },
  { id: 103, image_url: "/salem-hero-1.png" },
];

export default function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/backend/api/v1/hero.php");
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setSlides(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Fixed aspect ratio container for carousel */}
      <div className="relative w-full" style={{ aspectRatio: "16 / 9", minHeight: "400px", maxHeight: "100vh" }}>
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
              src={slides[current].image_url}
              alt="Salem Business Directory"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90 backdrop-blur-[1px]"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 container mx-auto px-4 flex items-center justify-center">
          {/* Sleek Minimalist Typography */}
          <motion.div
             key={slides[current].id + "-text"}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2, duration: 1 }}
             className="relative text-center"
          >
            <span className="mb-4 block text-[10px] md:text-[0.6rem] font-sans font-black uppercase tracking-[0.5em] text-white/90 drop-shadow-md">
              {slides[current].subtitle || "The Elite Business Network"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight text-white tracking-tighter drop-shadow-2xl">
              {slides[current].title || "Discover Salem"}
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 font-sans font-medium tracking-wide max-w-xl mx-auto drop-shadow-lg">
              Connecting commerce, culture, and community in the heart of Tamil Nadu.
            </p>
          </motion.div>
        </div>

        {/* Carousel Controls - positioned at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
          <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
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
      </div>
    </section>
  );
}

