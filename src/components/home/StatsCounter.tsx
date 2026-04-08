import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building2, FolderOpen, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Building2, value: 500, suffix: "+", label: "Registered Businesses" },
  { icon: FolderOpen, value: 316, suffix: "+", label: "Categories" },
  { icon: MapPin, value: 100, suffix: "+", label: "Salem Areas" },
  { icon: Star, value: 8, suffix: "+", label: "Years of Excellence" },
];

interface CounterProps {
  target: number;
  suffix?: string;
}

const Counter = ({ target, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight mt-4">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

export default function StatsCounter() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden border-y border-border">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
          alt="Platform Statistics"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl bg-white/5 border border-white/10 glass-effect"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <Counter target={s.value} suffix={s.suffix} />
              <p className="mt-2 text-[10px] font-sans font-bold text-white/50 uppercase tracking-[0.2em]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
