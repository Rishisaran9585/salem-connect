import { useEffect, useState, useRef } from "react";
import { Building2, FolderOpen, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Building2, value: 5000, suffix: "+", label: "Elite Businesses" },
  { icon: FolderOpen, value: 300, suffix: "+", label: "Categories" },
  { icon: MapPin, value: 200, suffix: "+", label: "Areas Covered" },
  { icon: Star, value: 100, suffix: "%", label: "Verified listings" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight mt-4">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-y border-border">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/stats-bg.png" 
          alt="Platform Statistics" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 glass-effect"
            >
              <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <Counter target={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm font-sans font-medium text-white/70 uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
