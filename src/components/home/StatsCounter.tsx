import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building2, FolderKanban, MapPin, BadgeCheck } from "lucide-react";

interface StatProps {
  icon: any;
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

const StatItem = ({ icon: Icon, value, label, suffix = "", delay }: StatProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
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
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 bg-[#1B4332]/5 rounded-3xl border border-[#1B4332]/10 hover:bg-[#1B4332]/10 transition-colors"
    >
      <div className="w-16 h-16 bg-[#C9973A] text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-sm font-sans font-bold text-[#1B4332]/60 uppercase tracking-widest mt-2 text-center">
        {label}
      </p>
    </motion.div>
  );
};

export default function StatsCounter() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C9973A]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1B4332]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem icon={Building2} value={5000} suffix="+" label="Businesses" delay={0.1} />
          <StatItem icon={FolderKanban} value={300} suffix="+" label="Categories" delay={0.2} />
          <StatItem icon={MapPin} value={200} suffix="+" label="Cities" delay={0.3} />
          <StatItem icon={BadgeCheck} value={100} suffix="%" label="Verified" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
