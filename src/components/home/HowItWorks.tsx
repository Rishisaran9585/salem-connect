import { UserPlus, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  { 
    icon: UserPlus, 
    title: "1. Register Business", 
    desc: "Fill in your basic details, choose proper categories and submit your application." 
  },
  { 
    icon: Star, 
    title: "2. Simple Verification", 
    desc: "A small one-time processing fee of ₹150 ensures your listing is verified and trustworthy." 
  },
  { 
    icon: Users, 
    title: "3. Start Getting Customers", 
    desc: "Once approved, your business goes live. Start receiving calls and inquiries instantly." 
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]"
          >
            How it <span className="text-[#C9973A]">Works</span>
          </motion.h2>
          <div className="w-24 h-1 bg-[#C9973A] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28%] left-[20%] right-[20%] h-0.5 bg-gray-100 -z-10" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#1B4332]/5 hover:bg-[#1B4332]/10 transition-colors border border-dashed border-[#1B4332]/20 shadow-xl"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#C9973A] shadow-xl mb-8 relative border-4 border-[#1B4332]/10">
                <step.icon className="w-10 h-10" />
                <span className="absolute -top-2 -right-2 w-10 h-10 bg-[#1B4332] text-white rounded-full flex items-center justify-center font-sans font-bold shadow-lg">
                  {idx + 1}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-[#1B4332]">
                {step.title}
              </h3>
              <p className="font-body text-gray-500 leading-relaxed mb-6">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/register">
            <Button size="lg" className="bg-[#C9973A] hover:bg-[#C9973A]/90 text-white font-sans font-bold px-12 py-8 text-xl rounded-full shadow-2xl transition-all transform hover:scale-105">
              Start Your Free Registration →
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-400 font-sans italic">
            * ₹150 One-time verification fee applies after step 1
          </p>
        </div>
      </div>
    </section>
  );
}
