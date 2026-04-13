import { ClipboardList, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  { icon: ClipboardList, step: "01", title: "Apply for Listing", desc: "Submit your business details through our seamless application portal." },
  { icon: ShieldCheck, step: "02", title: "Fast Verification", desc: "Our team verifies your credentials to maintain directory exclusivity." },
  { icon: Users, step: "03", title: "Connect & Grow", desc: "Your profile goes live, connecting you instantly with elite clientele." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Column - Steps */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <h2 className="text-sm font-sans font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4">The Process</h2>
              <h3 className="heading-lg leading-tight">
                Luxury Onboarding <br/> Experience
              </h3>
              <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
                We've simplified integration. Elevate your presence in three meticulously crafted steps designed for Salem's finest.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group relative flex gap-6"
                >
                  <div className="shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/20">
                      <s.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-slate-900 mb-1">{s.title}</h4>
                    <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-14">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-10 py-5 text-sm font-sans font-bold text-white shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-500"
              >
                Join the Network
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
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] md:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
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
