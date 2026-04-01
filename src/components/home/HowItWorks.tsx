import { ClipboardList, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { icon: ClipboardList, step: "01", title: "Register", desc: "Fill in your business details in our simple registration form." },
  { icon: ShieldCheck, step: "02", title: "Verify", desc: "Pay the one-time ₹150 verification fee to confirm your listing." },
  { icon: Users, step: "03", title: "Get Found", desc: "Your business goes live and starts receiving customers instantly." },
];

export default function HowItWorks() {
  return (
    <section className="py-14 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-display font-bold md:text-3xl text-primary-foreground">
            How It Works
          </h2>
          <p className="mt-2 text-sm font-body text-primary-foreground/70">
            Get your business listed in 3 simple steps
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center rounded-xl bg-primary-foreground/5 p-8 text-center backdrop-blur-sm border border-primary-foreground/10"
            >
              <span className="mb-3 text-4xl font-display font-bold text-accent/50">{s.step}</span>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
                <s.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-sans font-semibold text-primary-foreground">{s.title}</h3>
              <p className="mt-2 text-sm font-body text-primary-foreground/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-6 py-3 text-sm font-sans font-semibold text-accent-foreground shadow-md hover:opacity-90 transition-opacity"
          >
            Register Your Business — ₹150
          </Link>
        </div>
      </div>
    </section>
  );
}
