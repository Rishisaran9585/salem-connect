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
  { id: 1, image_url: "/hero-1.png", title: "Salem Business Directory", subtitle: "Connecting Commerce & Culture" },
  { id: 2, image_url: "/hero-2.png", title: "Premium Connect", subtitle: "The Elite Business Network" },
  { id: 3, image_url: "/hero-3.png", title: "Discover Local", subtitle: "Heritage & Commerce" },
];

export default function HeroCarousel() {
  const [slides] = useState<Slide[]>(defaultSlides);
  const [current, setCurrent] = useState(0);

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
    <section className="relative w-full aspect-video min-h-[450px] bg-black overflow-hidden">
      {/* Container for carousel */}
      <div className="relative w-full h-full">
        {/* Carousel Backgrounds */}
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 backdrop-blur-[0.5px]"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay removed as requested */}
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
    </section>
  );
}

