import { useEffect, useState, useRef } from "react";
import { Building2, FolderOpen, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Building2, value: 5000, suffix: "+", label: "Businesses" },
  { icon: FolderOpen, value: 300, suffix: "+", label: "Categories" },
  { icon: MapPin, value: 200, suffix: "+", label: "Areas" },
  { icon: Star, value: 100, suffix: "%", label: "Verified" },
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
    <div ref={ref} className="text-3xl md:text-4xl font-sans font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <Counter target={s.value} suffix={s.suffix} />
              <p className="mt-1 text-sm font-sans text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
