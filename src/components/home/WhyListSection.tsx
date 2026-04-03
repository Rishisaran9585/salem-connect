import { 
  TrendingUp, Search, DollarSign, Smartphone, 
  Target, Star, Share2, BarChart3, Zap 
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: TrendingUp, title: "Increased Exposure", desc: "Get seen by thousands of local customers daily searching for your services." },
  { icon: Search, title: "Better Search Rankings", desc: "Optimized for Google search to ensure your business appears at the top." },
  { icon: DollarSign, title: "Cost-Effective Marketing", desc: "Pay once, benefit forever. The most affordable way to promote your business." },
  { icon: Smartphone, title: "Mobile Optimized", desc: "Your listing looks great and works perfectly on all devices, from phones to desktops." },
  { icon: Target, title: "Targeted Audience", desc: "Reach customers in Salem specifically looking for businesses like yours." },
  { icon: Star, title: "Build Credibility", desc: "Verified badges and detailed profiles build trust with potential customers." },
  { icon: Share2, title: "Networking Opportunities", desc: "Connect with other business owners and expand your professional reach." },
  { icon: BarChart3, title: "Customer Insights", desc: "Track how many people view your profile and contact you." },
  { icon: Zap, title: "Quick Lead Generation", desc: "Get direct calls and inquiries from ready-to-buy customers." },
];

export default function WhyListSection() {
  return (
    <section className="py-24 bg-[#1B4332] text-white overflow-hidden relative">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-x-0 bottom-0 top-0 opacity-10 pointer-events-none">
        <svg fill="none" viewBox="0 0 100 100" className="w-full h-full">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Why List Your <span className="text-[#C9973A]">Business?</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg md:text-xl font-body text-white/70"
          >
            Join the fastest-growing local business network in Salem and start growing your digital presence today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-6 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="w-16 h-16 shrink-0 bg-[#C9973A]/10 text-[#C9973A] rounded-2xl flex items-center justify-center group-hover:bg-[#C9973A] group-hover:text-white transition-all duration-300">
                <benefit.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-3">
                  {benefit.title}
                </h3>
                <p className="font-body text-white/60 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
