import { motion } from "framer-motion";
import { 
  Target, Users, ShieldCheck, HeartPulse, 
  MapPin, CheckCircle2, Star, TrendingUp, Info 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function About() {
  const stats = [
    { label: "Founded In", value: "2024", icon: Info },
    { label: "Target Businesses", value: "10,000+", icon: Target },
    { label: "Salem Localities", value: "200+", icon: MapPin },
    { label: "Visitor Trust Score", value: "99%", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="py-32">
        {/* Cinematic Hero */}
        <section className="container mx-auto px-4 text-center mb-32">
           <motion.span 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-[#C9973A] font-sans font-bold uppercase tracking-widest text-xs mb-4 block"
           >
             Connecting Salem Since 2024
           </motion.span>
           <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="text-5xl md:text-7xl font-display font-bold text-[#1B4332] mb-8 leading-tight"
           >
             Salem's Most <span className="text-[#C9973A]">Trusted</span><br className="hidden md:block" /> Business Directory
           </motion.h1>
           <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="max-w-2xl mx-auto text-xl font-body text-gray-500 leading-relaxed"
           >
             We are building India's #1 local business network, starting right here in Salem District. 
             Connecting thousands of business owners with loyal local customers.
           </motion.p>
        </section>

        {/* Stats Grid Overlaying Imagine */}
        <section className="bg-[#1B4332] py-24 relative overflow-hidden">
           <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {stats.map((s, idx) => (
                <div key={idx} className="text-center group p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#C9973A] transition-all duration-500 shadow-2xl">
                   <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      <s.icon size={32} />
                   </div>
                   <h3 className="text-4xl font-display font-bold text-white mb-2">{s.value}</h3>
                   <p className="text-white/40 group-hover:text-white/70 font-sans font-bold uppercase tracking-widest text-xs">{s.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Narrative Section */}
        <section className="py-32 container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="relative p-10"
              >
                 <div className="absolute top-0 left-0 w-32 h-32 bg-[#C9973A]/10 rounded-full blur-3xl" />
                 <div className="bg-gray-100 rounded-[3rem] h-[500px] overflow-hidden shadow-2xl relative border-8 border-white">
                    <img src="https://images.unsplash.com/photo-1590050752117-23a9d7fc244d?auto=format&fit=crop&q=80&w=1080" className="w-full h-full object-cover" />
                    <div className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/20">
                       <p className="text-[#1B4332] font-display font-bold text-xl italic italic">"Our mission is simple: To provide every small business in Salem a digital home where they can be found by everyone."</p>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                 <div>
                    <h2 className="text-4xl font-display font-bold text-[#1B4332] mb-6">Our Vision</h2>
                    <p className="text-gray-500 font-sans leading-relaxed text-lg italic italic">
                       Salem Directory was founded with the aim of digitizing the local economy of Salem District. We believe that whether it's a small local silk shop in Shevapet or a major hospital, everyone deserves to be found quickly and easily by the community.
                    </p>
                 </div>
                 
                 <div className="space-y-6">
                    {[
                      { title: "Trust First", desc: "Every business listed undergoes manual verification of details." },
                      { title: "Salem Focused", desc: "Tailored categories specifically for Salem's unique industries like Silks, Steel, and Agriculture." },
                      { title: "Direct Contact", desc: "No hidden middleman. Customers call you directly on your phone." },
                      { title: "Modern Directory", desc: "Clean, fast, and optimized for both search engines and mobile users." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100 items-start group hover:border-[#C9973A] transition-all">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#22C55E] shadow-sm shrink-0 border border-gray-100">
                            <CheckCircle2 size={24} />
                         </div>
                         <div>
                            <h4 className="text-xl font-display font-bold text-[#1B4332] group-hover:text-[#C9973A] transition-colors">{item.title}</h4>
                            <p className="text-gray-400 font-sans text-sm">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
           </div>
        </section>

        {/* Join Us Section */}
        <section className="container mx-auto px-4 text-center mt-20">
           <div className="bg-[#C9973A] p-24 rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-5xl font-display font-bold mb-8 relative z-10">Be Part of Salem's #1 Network</h2>
              <p className="text-white/80 font-sans text-xl mb-12 relative z-10 max-w-2xl mx-auto">Register your business today for a one-time fee of ₹150 and start your digital journey with us.</p>
              <button className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white font-sans font-bold px-16 py-8 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 text-xl relative z-10">
                 Register Your Business Now →
              </button>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
