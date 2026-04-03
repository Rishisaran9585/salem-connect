import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Building2, ChevronRight, LayoutGrid, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AtoZ() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("A");

  const fetchAtoZ = async () => {
    try {
      const res = await axios.get("http://localhost/salem-connect/backend/api/v1/businesses.php");
      if (res.data.success) {
        setBusinesses(res.data.data);
      }
    } catch (err) {
      console.error("AtoZ fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtoZ();
  }, []);

  const filtered = businesses.filter(b => 
    b.business_name.startsWith(activeLetter) && 
    b.business_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-32 space-y-12">
        {/* Alphabet Navigation Header */}
        <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10 overflow-hidden relative">
           <div className="absolute top-0 right-0 h-full w-1/2 bg-[#C9973A]/5 -skew-x-12 translate-x-1/2 rounded-full pointer-events-none" />
           
           <div className="z-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332] mb-4">A-Z Directory</h1>
              <p className="text-gray-500 font-sans text-lg max-w-sm">Browse all verified Salem businesses in alphabetical order.</p>
           </div>

           <div className="z-10 w-full md:w-auto relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9973A] w-5 h-5 pointer-events-none" />
              <Input 
                placeholder="Find a specific business..."
                className="pl-14 w-full md:w-80 rounded-full border-gray-100 bg-gray-50/50 p-7 text-lg focus:ring-[#C9973A] shadow-xl group-hover:scale-105 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>

        {/* Sticky Alphabet Tabs */}
        <div className="sticky top-24 z-40 py-6 bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl border border-gray-100 flex flex-wrap justify-center gap-2 px-10">
           {alphabet.map((letter) => (
             <button
               key={letter}
               onClick={() => setActiveLetter(letter)}
               className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl transition-all duration-300 font-sans font-bold text-sm md:text-xl flex items-center justify-center ${
                 activeLetter === letter 
                 ? "bg-[#C9973A] text-white shadow-lg scale-110 rotate-3" 
                 : "bg-[#1B4332]/5 text-[#1B4332]/50 hover:bg-[#1B4332] hover:text-white"
               }`}
             >
                {letter}
             </button>
           ))}
        </div>

        {/* Business Results List */}
        <div className="min-h-[500px] bg-white rounded-[4rem] p-10 lg:p-20 shadow-2xl border border-gray-100">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeLetter}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {loading ? (
                   <p className="col-span-full text-center text-gray-400 p-20 animate-pulse font-sans font-bold uppercase tracking-widest">Searching the directory...</p>
                ) : filtered.length > 0 ? (
                   filtered.map((biz) => (
                     <Link key={biz.id} to={`/business/${biz.slug}`} className="group block">
                        <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:scale-105 hover:border-[#C9973A]/20 transition-all duration-500 flex flex-col h-full grow">
                           <div className="flex justify-between items-start mb-6">
                              <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#C9973A] text-2xl font-bold border border-gray-100">
                                 {biz.business_name[0]}
                              </div>
                              <span className="bg-white/70 px-4 py-1 rounded-full text-[10px] font-bold text-[#1B4332] uppercase tracking-widest border border-white/50">
                                {biz.category_name}
                              </span>
                           </div>
                           <h3 className="text-xl font-display font-bold text-[#1B4332] mb-3 group-hover:text-[#C9973A] transition-colors">{biz.business_name}</h3>
                           <div className="mt-auto pt-6 border-t border-gray-200/50 flex flex-col gap-2">
                              <p className="flex items-center gap-3 text-sm text-gray-400 font-sans"><MapPin size={14} className="text-[#1B4332]/20" /> {biz.area}, {biz.city}</p>
                              <p className="flex items-center gap-3 text-sm font-bold text-[#1B4332]/60 font-sans"><LayoutGrid size={14} className="text-[#C9973A]" /> View Details</p>
                           </div>
                        </div>
                     </Link>
                   ))
                ) : (
                   <div className="col-span-full py-40 text-center space-y-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <Building2 size={40} />
                      </div>
                      <p className="text-gray-400 font-sans text-lg">No businesses found starting with <span className="font-bold text-[#1B4332]">"{activeLetter}"</span> yet.</p>
                      <Button className="bg-[#C9973A] rounded-full px-8 py-6 h-auto font-bold shadow-xl border-none">Browse Categories Instead</Button>
                   </div>
                )}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Global Stats Footer inside page */}
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { label: "Verified Businesses", value: "5,000+", icon: ShieldCheck },
             { label: "Salem Local Hub", value: "Area Specific", icon: MapPin },
             { label: "Updated Regularly", value: "Fresh Data", icon: Clock }
           ].map((stat, idx) => (
             <div key={idx} className="bg-[#1B4332] p-8 rounded-[2rem] flex items-center gap-6 shadow-xl border border-white/5">
                <div className="w-16 h-16 bg-white/10 text-[#C9973A] rounded-2xl flex items-center justify-center shadow-inner">
                   <stat.icon size={32} />
                </div>
                <div>
                   <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                   <p className="text-white/50 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { ShieldCheck, Clock } from "lucide-react";
