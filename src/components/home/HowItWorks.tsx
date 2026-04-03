import { ClipboardList, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { icon: ClipboardList, step: "01", title: "Apply for Listing", desc: "Submit your business details through our seamless application portal." },
  { icon: ShieldCheck, step: "02", title: "Fast Verification", desc: "Our team verifies your credentials to maintain directory exclusivity." },
  { icon: Users, step: "03", title: "Connect & Grow", desc: "Your profile goes live, connecting you instantly with elite clientele." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column - Steps */}
          <div className="w-full lg:w-1/2">
            <div className="mb-14">
              <h2 className="text-4xl font-display font-semibold md:text-5xl text-foreground tracking-tight leading-tight">
                Effortless Onboarding
              </h2>
              <p className="mt-4 text-lg font-body text-muted-foreground/90 max-w-lg">
                We've streamlined the process. Get your business listed in three simple steps designed for busy professionals.
              </p>
            </div>
            
            <div className="flex flex-col gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative flex gap-6"
                >
                  <div className="shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-black shadow-elevated border border-border/50">
                      <s.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-sans font-bold text-muted-foreground tracking-widest uppercase">Step {s.step}</span>
                      <div className="h-px w-8 bg-border"></div>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-base font-body text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-sans font-medium text-primary-foreground shadow-elevated hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Your Application
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-t-[3rem] rounded-bl-[3rem] lg:rounded-t-none lg:rounded-l-[4rem] lg:-mr-[20%] overflow-hidden shadow-2xl h-[500px] lg:h-[700px]">
              <img 
                src="/how-it-works.png" 
                alt="Effortless Onboarding" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
