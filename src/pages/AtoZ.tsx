import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Building2, ChevronRight, LayoutGrid, Info, ShieldCheck, Clock, List, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { alphabetCategories, sampleBusinesses } from "@/data/categories";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface BusinessData {
  id: number;
  slug: string;
  business_name: string;
  category_name: string;
  area: string;
  city: string;
}

export default function AtoZ() {
  const [mode, setMode] = useState<"businesses" | "categories">("businesses");
  const [businesses, setBusinesses] = useState<BusinessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("A");

  const fetchAtoZ = async () => {
    try {
      const res = await axios.get("/backend/api/v1/businesses.php");
      if (res.data.success && res.data.data.length > 0) {
        setBusinesses(res.data.data);
      } else {
        // Fallback to sample data for demo purposes
        const fallbackData = sampleBusinesses.map(b => ({
          id: b.id,
          slug: b.slug,
          business_name: b.businessName,
          category_name: b.categoryName,
          area: b.area,
          city: b.city
        }));
        setBusinesses(fallbackData);
      }
    } catch (err) {
      console.error("AtoZ fetch failed, using fallback data");
      const fallbackData = sampleBusinesses.map(b => ({
        id: b.id,
        slug: b.slug,
        business_name: b.businessName,
        category_name: b.categoryName,
        area: b.area,
        city: b.city
      }));
      setBusinesses(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtoZ();
  }, []);

  const filteredBusinesses = businesses.filter(b =>
    (b.business_name || "").toUpperCase().startsWith(activeLetter) &&
    (b.business_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredCategories = (alphabetCategories[activeLetter] || []).filter(cat =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <div className="bg-gradient-hero pb-12 md:pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-bold md:text-5xl text-primary-foreground mb-6">
              A-Z {mode === "businesses" ? "Business" : "Category"} Directory
            </h1>
            
            {/* Mode Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setMode("businesses")}
                className={`px-8 py-3 rounded-full font-sans font-bold transition-all duration-300 flex items-center gap-2 ${
                  mode === "businesses" 
                  ? "bg-[#C9973A] text-white shadow-xl scale-105" 
                  : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                <Briefcase size={18} /> Businesses
              </button>
              <button
                onClick={() => setMode("categories")}
                className={`px-8 py-3 rounded-full font-sans font-bold transition-all duration-300 flex items-center gap-2 ${
                  mode === "categories" 
                  ? "bg-[#C9973A] text-white shadow-xl scale-105" 
                  : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                <List size={18} /> Categories
              </button>
            </div>

            <p className="mt-8 text-[11px] font-sans font-black text-[#C9973A] bg-white/10 px-6 py-2.5 rounded-full inline-block uppercase tracking-[0.2em] border border-white/20 backdrop-blur-md">
               Found {mode === "businesses" ? filteredBusinesses.length : filteredCategories.length} results starting with {activeLetter}
            </p>
          </div>
        </div>

        {/* Sticky Alphabet Tabs */}
        <div className="sticky top-[132px] z-40 py-6 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-wrap justify-center gap-2 px-10 container mx-auto mb-12">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl transition-all duration-300 font-sans font-bold text-sm md:text-xl flex items-center justify-center ${activeLetter === letter
                ? "bg-[#C9973A] text-white shadow-lg scale-110 rotate-3"
                : "bg-[#1B4332]/5 text-[#1B4332]/50 hover:bg-[#1B4332] hover:text-white"
                }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Search Bar inside content area */}
        <div className="container mx-auto px-4 mb-8 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#C9973A] transition-colors" size={20} />
            <input
              type="text"
              placeholder={`Search in ${activeLetter} ${mode}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 bg-white border border-gray-100 rounded-3xl pl-16 pr-8 text-lg focus:ring-4 focus:ring-[#C9973A]/10 outline-none shadow-sm transition-all font-sans"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="container mx-auto px-4 mb-20 min-h-[500px]">
          <div className="bg-white rounded-[4rem] p-10 lg:p-20 shadow-2xl border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLetter + mode + search}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {loading ? (
                  <p className="col-span-full text-center text-gray-400 p-20 animate-pulse font-sans font-bold uppercase tracking-widest">Searching the directory...</p>
                ) : mode === "businesses" ? (
                  filteredBusinesses.length > 0 ? (
                    filteredBusinesses.map((biz) => (
                      <Link key={biz.id} to={`/business/${biz.slug}`} className="group block">
                        <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:scale-105 hover:border-[#C9973A]/20 transition-all duration-500 flex flex-col h-full grow">
                          <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#C9973A] text-2xl font-bold border border-gray-100">
                              {(biz.business_name || "?")[0]}
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
                      <Button onClick={() => setMode("categories")} className="bg-[#C9973A] rounded-full px-8 py-6 h-auto font-bold shadow-xl border-none">Browse Categories Instead</Button>
                    </div>
                  )
                ) : (
                  filteredCategories.length > 0 ? (
                    filteredCategories.map((cat, idx) => (
                      <Link 
                        key={idx} 
                        to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} 
                        className="group p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 flex items-center justify-between"
                      >
                        <div>
                          <span className="block text-xs uppercase tracking-widest font-bold text-gray-300 mb-1">Category</span>
                          <span className="font-display font-bold text-[#1B4332] text-lg group-hover:text-[#C9973A] transition-colors">{cat}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#C9973A] shadow-md group-hover:rotate-45 transition-transform">
                          <ChevronRight size={20} />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full py-40 text-center space-y-6">
                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <List size={40} />
                      </div>
                      <p className="text-gray-400 font-sans text-lg">No categories found starting with <span className="font-bold text-[#1B4332]">"{activeLetter}"</span>.</p>
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global Stats Footer inside page */}
        <div className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-3 gap-8 ">
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
                  <p className="text-[#C9973A] text-[10px] font-bold uppercase tracking-[0.1em]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
