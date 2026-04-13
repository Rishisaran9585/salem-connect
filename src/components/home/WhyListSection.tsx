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
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Right Column - Content */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <div className="mb-14">
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Value Proposition</span>
              <h2 className="text-4xl font-display font-bold md:text-6xl text-white tracking-tight leading-[1.1]">
                Master the <br className="hidden md:block" /> <span className="text-indigo-400">Salem Ecosystem.</span>
              </h2>
              <p className="mt-8 text-lg font-sans text-slate-400 max-w-xl leading-relaxed">
                Join Salem's most exclusive network. We provide the elite exposure and digital authority you need to outpace the competition.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="flex flex-col gap-5 rounded-[2rem] border border-white/5 bg-white/[0.03] p-8 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.07] hover:border-indigo-500/30 group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl group-hover:rotate-12 transition-transform duration-500">
                    <b.icon size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-2 tracking-wide font-display">{b.title}</h3>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-2/5 order-1 lg:order-2"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                alt="Business Elite"
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 border-2 border-white/10 rounded-[3rem] pointer-events-none"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
