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
    <section className="relative w-full bg-black overflow-hidden">
      <div className="mx-auto max-w-[1500px] aspect-[15/7] relative">
        {/* Container for carousel */}
        <div className="relative w-full h-full">
          {/* Carousel Backgrounds */}
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slides[current].image_url}
                alt="Salem Business"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls - positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/70 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-500 ${current === i ? "w-10 bg-white" : "w-2 bg-white/20 hover:bg-white/40"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/70 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

