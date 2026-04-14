import { motion } from "framer-motion";
import {
  ShieldCheck, MapPin, CheckCircle2, TrendingUp, Users, 
  Target, Zap, Rocket, ChevronRight,
  ArrowRight, Briefcase, Info, CreditCard, BarChart3,
  AlertTriangle, Megaphone, Search
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

const operationalGuidelines = [
  {
    icon: Search,
    title: "Business Information",
    desc: "We collect and index publicly available business details across Salem. While we verify information, users should confirm details directly before making decisions."
  },
  {
    icon: ShieldCheck,
    title: "Verification Process",
    desc: "To maintain database integrity, owners may be requested to provide location photographs or visiting cards for manual vetting."
  },
  {
    icon: CreditCard,
    title: "Registration & Fees",
    desc: "A processing fee of ₹4999 is charged per year for new business registrations to support platform maintenance and premium visibility."
  },
  {
    icon: Info,
    title: "Data Collection",
    desc: "We only store business metadata (Name, Address, Contact, Email, Website). We do not collect or process personal or confidential user data."
  },
  {
    icon: BarChart3,
    title: "Analytics & Order",
    desc: "Businesses are displayed alphabetically within categories. We collect anonymous traffic data (IP, browser) for analytical purposes."
  },
  {
    icon: AlertTriangle,
    title: "Fraud Prevention",
    desc: "Exercising caution during transactions is advised. We do not endorse specific listings and are not responsible for financial interactions."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="overflow-hidden">
        {/* Standard Immersive Hero Section */}
        <section className="bg-slate-900 pt-10 pb-12 md:pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-2xl backdrop-blur-sm">
                Official Directory • Salem District
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 leading-[1] tracking-tighter">
                Our Story. <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-white italic">Your Success.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-sans leading-relaxed font-medium">
                Pioneering the digital transformation of Salem's local commerce since 2016. We bridge local heritage with high-performance modern technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section - Floating Overlap */}
        <section className="container mx-auto px-4 -mt-20 mb-10 relative z-20">
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
                <div className="w-12 h-12 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                  <s.icon size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-indigo-600 mb-1">{s.value}</h3>
                <p className="text-gray-400 font-sans font-black uppercase tracking-[0.2em] text-[8px]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Digital Transformation Section */}
        <section className="bg-slate-900 py-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px]" />
           <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                 <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Digital Advantage</span>
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
                       <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
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
                 <h2 className="text-4xl font-display font-bold text-indigo-600 mb-8 leading-tight">
                    Our Commitment to the <span className="text-indigo-400">Salem Future.</span>
                 </h2>
                 <div className="space-y-8">
                   {roadmap.map((item, idx) => (
                      <div key={idx} className="flex gap-6 group">
                         <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-slate-900 transition-colors group-hover:border-[#1B4332]">
                               <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{item.year}</span>
                            </div>
                            {idx < roadmap.length - 1 && <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200" />}
                         </div>
                         <div>
                            <h4 className="text-xl font-display font-bold text-indigo-600 mb-1">{item.title}</h4>
                            <p className="text-gray-500 text-sm font-sans leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                   ))}
                 </div>
              </div>

              <div className="lg:w-1/2 w-full">
                 <div className="relative bg-gray-50 rounded-[3rem] p-10 overflow-hidden shadow-xl group">
                    <div className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] bg-indigo-600/10 rounded-full blur-[60px]" />
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-lg">
                             <Briefcase size={24} />
                          </div>
                          <h3 className="text-2xl font-display font-bold text-indigo-600">Join the 5K+ Network</h3>
                       </div>
                       <p className="text-gray-500 text-base leading-relaxed italic">
                          "Salem Business isn't just about business listings; it's about building a digital community that feeds back into our local growth."
                       </p>
                       <div className="flex gap-4">
                          <Link to="/register" className="w-full">
                            <Button className="w-full bg-slate-900 hover:bg-slate-900/90 rounded-[1rem] py-6 h-auto shadow-xl text-base font-sans font-black flex items-center justify-center gap-3 border-none group">
                               List Your Enterprise <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Button>
                          </Link>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Operational Transparency Section */}
        <section className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Transparency First</span>
              <h2 className="text-4xl font-display font-bold text-indigo-600 mb-6">Connecting Businesses, Empowering Growth.</h2>
              <p className="text-gray-500 font-sans text-base">
                Salem Connect (Salem Business) is a premium directory platform designed to bridge the gap between local enterprise and the digital consumer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {operationalGuidelines.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <item.icon size={26} />
                  </div>
                  <h4 className="text-lg font-display font-bold text-indigo-900 mb-3">{item.title}</h4>
                  <p className="text-gray-500 text-sm font-sans leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex-shrink-0 flex items-center justify-center text-indigo-400">
                    <Megaphone size={32} />
                </div>
                <div className="flex-grow">
                    <h5 className="text-xl font-display font-bold text-indigo-900 mb-1">Advertising & Listings</h5>
                    <p className="text-gray-500 text-sm font-sans">To support our technical infrastructure and growth, we display verified advertisements across the platform. Data collection for the Salem directory has been active since 2016.</p>
                </div>
                <div className="flex-shrink-0 text-right">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-2">Need Support?</p>
                    <Link to="/contact" className="text-indigo-600 font-display font-bold flex items-center justify-end gap-2 hover:gap-3 transition-all">
                        Contact Verification Team <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="container mx-auto px-4 mb-20 text-center">
          <div className="bg-gradient-accent p-12 md:p-20 rounded-[3.5rem] text-white overflow-hidden relative shadow-xl group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 relative z-10 tracking-tighter leading-[1]">Be Part of Salem's <br /> #1 Network</h2>
            <p className="text-white/80 font-sans text-base md:text-lg mb-10 relative z-10 max-w-2xl mx-auto font-medium">Verify your business today for a fee of ₹4999 per year and secure your position in the local digital hierarchy.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <Link to="/register">
                <button className="bg-slate-900 hover:bg-slate-900/90 text-white font-sans font-black px-12 py-6 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 text-xl flex items-center gap-3">
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
