import { TrendingUp, Search, DollarSign, Smartphone, Target, Star, Link2, BarChart3, Zap } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: TrendingUp, title: "Increased Exposure", desc: "Get your business in front of thousands of local customers actively searching for services." },
  { icon: Search, title: "Better Search Rankings", desc: "Improve your online visibility with SEO-optimized business listings." },
  { icon: DollarSign, title: "Cost-Effective Marketing", desc: "One-time fee of ₹150 — no monthly subscriptions or hidden charges." },
  { icon: Smartphone, title: "Mobile Optimized", desc: "Your listing looks perfect on every device — phones, tablets, and desktops." },
  { icon: Target, title: "Targeted Audience", desc: "Reach people who are specifically looking for your type of business in Salem." },
  { icon: Star, title: "Build Credibility", desc: "Verified business badge builds trust with potential customers." },
  { icon: Link2, title: "Networking Opportunities", desc: "Connect with other local businesses and create valuable partnerships." },
  { icon: BarChart3, title: "Customer Insights", desc: "Understand how customers find and interact with your business." },
  { icon: Zap, title: "Quick Lead Generation", desc: "Direct calls and inquiries from customers ready to buy." },
];

export default function WhyListSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-display font-bold md:text-3xl text-foreground">
            Why List Your Business?
          </h2>
          <p className="mt-2 text-sm font-body text-muted-foreground">
            Join 5,000+ businesses already growing with Salem Directory
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <b.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-sans font-semibold text-foreground">{b.title}</h3>
                <p className="mt-1 text-xs font-body text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
