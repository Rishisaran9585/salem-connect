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
    <section className="relative py-16 md:py-24 overflow-hidden border-y border-white/5 bg-slate-950">
      {/* Background with slight grid or overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                <s.icon className="h-6 w-6 text-indigo-400" />
              </div>
              <Counter target={s.value} suffix={s.suffix} />
              <p className="mt-3 text-[11px] font-sans font-bold text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
