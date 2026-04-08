import { motion } from "framer-motion";
import {
  ShieldCheck, MapPin, CheckCircle2, TrendingUp, Users, 
  Target, Zap, Rocket, Star, History, Building2, ChevronRight,
  ArrowRight, Landmark, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const stats = [
  { label: "Verified Businesses", value: "500+", icon: ShieldCheck },
  { label: "Active Categories", value: "316+", icon: TrendingUp },
  { label: "Daily Visitors", value: "1,000+", icon: Users },
  { label: "Local Areas", value: "100+", icon: MapPin }
];

const coreValues = [
  { icon: Target, title: "Precision Search", desc: "Our engine maps businesses down to the specific street, ensuring hyper-local accuracy for Salemites." },
  { icon: ShieldCheck, title: "Owner Verification", desc: "Every premium listing is manually vetted to eliminate ghost businesses and build absolute trust." },
  { icon: Zap, title: "Direct Connect", desc: "We are not a middleman. We provide direct pathways for customers to call or WhatsApp you instantly." },
  { icon: Rocket, title: "SEO Authority", desc: "Our platform is engineered for search engines, giving your business high-rank visibility in Googl Search results." }
];

const roadmap = [
  { year: "2024", title: "Launch Phase", desc: "Inaugural launch of the digital directory focusing on Core Salem town businesses." },
  { year: "2025", title: "District Expansion", desc: "Expanding coverage to include integrated maps for Mettur, Attur, and Omalur regional hubs." },
  { year: "2026", title: "Elite Network", desc: "Introducing AI-powered business matching and lead generation for premium members." }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="overflow-hidden">
        {/* Cinematic Hero */}
        <section className="bg-gradient-hero pt-24 pb-24 md:pt-32 md:pb-32 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9973A]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-[#C9973A] font-sans font-black uppercase tracking-[0.3em] text-[10px] mb-8 block shadow-2xl">
                The Elite Directory Interface
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-7xl font-display font-black text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl"
            >
              Beyond the <br className="hidden lg:block" /> <span className="text-[#C9973A] italic">Yellow Pages.</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-3xl mx-auto text-lg md:text-xl font-sans text-white/70 leading-relaxed font-medium drop-shadow-lg"
            >
              We are not just a list. We are the digital heartbeat of Salem District, transforming local commerce into a high-performance network for the modern age.
            </motion.p>
          </div>
        </section>

        {/* Floating Stats - Overlapping Hero */}
        <section className="container mx-auto px-4 -mt-16 mb-20 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group p-6 md:p-8 rounded-[2rem] bg-white border border-gray-100 transition-all duration-500 shadow-xl hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center text-[#1B4332] mb-6 group-hover:bg-[#C9973A] group-hover:text-white transition-all transform group-hover:rotate-6">
                  <s.icon size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1B4332] mb-1">{s.value}</h3>
                <p className="text-gray-400 font-sans font-black uppercase tracking-[0.2em] text-[8px]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Narrative: The Heritage Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#C9973A]/10 rounded-full blur-[60px]" />
              <span className="text-[#C9973A] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Our Origin Story</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332] mb-6 leading-tight">
                Roots in <span className="italic">Steel</span> & Silk.
              </h2>
              <p className="text-gray-500 text-base font-sans leading-relaxed mb-6">
                Salem has always been a city of commerce. From the historic weaving sheds of Shevapet to the modern steel plants that define our horizon.
              </p>
              <p className="text-[#1B4332] text-lg font-display font-bold leading-relaxed border-l-4 border-[#C9973A] pl-6 italic">
                In 2024, we realized that while Salem's businesses were strong, their digital presence was scattered. Salem Connect was built to unify our local economy.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 pt-8">
                 <div className="rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl group relative">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] to-transparent opacity-40"></div>
                 </div>
                 <div className="bg-[#C9973A] rounded-[2rem] p-6 text-white flex flex-col justify-end aspect-square shadow-lg">
                    <Star size={32} className="mb-4 animate-pulse" />
                    <h4 className="text-xl font-display font-bold tracking-tight">Salem's First Digital Index.</h4>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="bg-[#1B4332] rounded-[2rem] p-8 text-white aspect-square flex flex-col justify-center items-center text-center shadow-lg">
                    <Landmark size={40} className="text-[#C9973A] mb-4" />
                    <p className="font-display font-bold text-base">Honoring 150+ Years of Local Trade</p>
                 </div>
                 <div className="rounded-[2rem] overflow-hidden aspect-[4/6] shadow-xl group relative border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale" />
                    <div className="absolute inset-0 border-4 border-white/20 rounded-[2rem] m-2 pointer-events-none"></div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Digital Transformation Section */}
        <section className="bg-[#1B4332] py-20 relative overflow-hidden mt-10">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C9973A]/20 rounded-full blur-[80px]" />
           <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                 <span className="text-[#C9973A] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Digital Advantage</span>
                 <h2 className="text-4xl font-display font-bold text-white mb-6">Modernizing Marketability.</h2>
                 <p className="text-white/60 font-sans text-base">We provide the technical infrastructure that allows your local business to compete with global brands in search rankings.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {coreValues.map((value, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500"
                    >
                       <div className="w-12 h-12 bg-[#C9973A] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                          <value.icon size={24} />
                       </div>
                       <h4 className="text-xl font-display font-bold text-white mb-3 tracking-tight">{value.title}</h4>
                       <p className="text-white/40 text-xs font-sans leading-relaxed">{value.desc}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Growth Roadmap */}
        <section className="py-20 container mx-auto px-4">
           <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                 <h2 className="text-4xl font-display font-bold text-[#1B4332] mb-8 leading-tight">
                    Our Commitment to the <span className="text-[#C9973A]">Salem Future.</span>
                 </h2>
                 <div className="space-y-8">
                   {roadmap.map((item, idx) => (
                      <div key={idx} className="flex gap-6 group">
                         <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-[#1B4332] transition-colors group-hover:border-[#1B4332]">
                               <span className="text-[10px] font-bold text-[#C9973A] uppercase tracking-widest">{item.year}</span>
                            </div>
                            {idx < roadmap.length - 1 && <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200" />}
                         </div>
                         <div>
                            <h4 className="text-xl font-display font-bold text-[#1B4332] mb-1">{item.title}</h4>
                            <p className="text-gray-500 text-sm font-sans leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                   ))}
                 </div>
              </div>

              <div className="lg:w-1/2 w-full">
                 <div className="relative bg-gray-50 rounded-[3rem] p-10 overflow-hidden shadow-xl group">
                    <div className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] bg-[#C9973A]/10 rounded-full blur-[60px]" />
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1B4332] shadow-lg">
                             <Briefcase size={24} />
                          </div>
                          <h3 className="text-2xl font-display font-bold text-[#1B4332]">Join the 5K+ Network</h3>
                       </div>
                       <p className="text-gray-500 text-base leading-relaxed italic">
                          "Salem Connect isn't just about business listings; it's about building a digital community that feeds back into our local growth."
                       </p>
                       <div className="flex gap-4">
                          <Link to="/register" className="w-full">
                            <Button className="w-full bg-[#1B4332] hover:bg-[#1B4332]/90 rounded-[1rem] py-6 h-auto shadow-xl text-base font-sans font-black flex items-center justify-center gap-3 border-none group">
                               List Your Enterprise <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Button>
                          </Link>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Call to Action Final */}
        <section className="container mx-auto px-4 mb-20 text-center">
          <div className="bg-gradient-gold p-12 md:p-20 rounded-[3.5rem] text-white overflow-hidden relative shadow-xl group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 relative z-10 tracking-tighter leading-[1]">Be Part of Salem's <br /> #1 Network</h2>
            <p className="text-white/80 font-sans text-base md:text-lg mb-10 relative z-10 max-w-2xl mx-auto font-medium">Verify your business today for a one-time fee of ₹150 and secure your position in the local digital hierarchy.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <Link to="/register">
                <button className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white font-sans font-black px-12 py-6 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 text-xl flex items-center gap-3">
                  Register Now <ChevronRight size={24} />
                </button>
              </Link>
              <Link to="/contact" className="text-white font-black uppercase tracking-[0.3em] text-[10px] hover:text-white/80 transition-colors">
                Speak to Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
