import { TrendingUp, Search, DollarSign, Smartphone, Target, Star, Link2, BarChart3, Zap } from "lucide-react";
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
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-elevated aspect-[4/5] lg:aspect-square">
              <img 
                src="/why-list.png" 
                alt="Business Growth" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-black/5 rounded-[2.5rem] pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <h2 className="text-4xl font-display font-semibold md:text-5xl text-foreground tracking-tight leading-tight">
                Why Elite Businesses Choose Us
              </h2>
              <p className="mt-4 text-lg font-body text-muted-foreground/90 max-w-lg">
                Join Salem's most exclusive network. We provide the tools, visibility, and credibility you need to scale your local presence.
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-sans font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-2 text-sm font-body text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
