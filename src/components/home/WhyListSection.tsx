import {
  TrendingUp, Search, DollarSign, Smartphone,
  Target, Star, Share2, BarChart3, Zap
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: TrendingUp, title: "Increased Exposure", desc: "Get your business in front of thousands of local customers actively searching for services." },
  { icon: Search, title: "Better Search Rankings", desc: "Improve your online visibility with SEO-optimized business listings." },
  { icon: DollarSign, title: "Cost-Effective Marketing", desc: "One-time fee of ₹150 — no monthly subscriptions or hidden charges." },
  { icon: Smartphone, title: "Mobile Optimized", desc: "Your listing looks perfect on every device — phones, tablets, and desktops." },
  { icon: Target, title: "Targeted Audience", desc: "Reach people who are specifically looking for your type of business in Salem." },
  { icon: Star, title: "Build Credibility", desc: "Verified business badge builds trust with potential customers." },
];

export default function WhyListSection() {
  return (
    <section className="py-16 md:py-24 bg-[#1B4332] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9973A]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Right Column - Content (Order swapped for better flow on dark) */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <div className="mb-10">
              <span className="text-[#C9973A] text-[10px] font-black uppercase tracking-[0.4em] mb-3 block drop-shadow-sm">Why Partner With Us?</span>
              <h2 className="text-3xl font-display font-bold md:text-5xl text-white tracking-tight leading-tight italic">
                Dominate the <span className="text-[#C9973A] not-italic">Salem Local Market.</span>
              </h2>
              <p className="mt-4 text-base font-sans text-white/70 max-w-xl leading-relaxed">
                Join Salem's most exclusive network. We provide the elite exposure and digital credibility you need to leave competitors in the rearview.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9973A] text-white shadow-lg group-hover:scale-110 transition-transform">
                    <b.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-2 tracking-wide">{b.title}</h3>
                    <p className="text-xs font-sans font-medium text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-2/5 order-1 lg:order-2"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                alt="Business Elite"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 border-2 border-white/10 rounded-[3rem] pointer-events-none"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
