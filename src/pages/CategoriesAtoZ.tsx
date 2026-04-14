import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, ArrowRight, Grid, List, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { alphabetCategories } from "@/data/categories";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function CategoriesAtoZ() {
  const [activeLetter, setActiveLetter] = useState("A");
  const [search, setSearch] = useState("");

  const filteredCategories = (alphabetCategories[activeLetter] || []).filter(cat => 
    cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-hero pb-12 md:pb-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
              A-Z Category Archive
            </h1>
            <p className="mt-4 text-sm md:text-base font-body text-primary-foreground/70 max-w-2xl mx-auto uppercase tracking-widest font-bold">
              Explore 300+ Business Categories Alphabetically
            </p>
          </div>
        </div>

        {/* Alphabet Navigation */}
        <div className="sticky top-[132px] z-40 bg-white/100 backdrop-blur-md border-b border-gray-100 py-6">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`h-10 w-10 md:h-14 md:w-14 rounded-2xl text-sm md:text-xl font-display font-bold transition-all duration-300 shadow-sm ${activeLetter === letter
                  ? "bg-[#C9973A] text-white scale-110 shadow-xl"
                  : "bg-gray-50 text-[#1B4332]/40 hover:bg-[#1B4332] hover:text-white"
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-20 min-h-[600px]">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar Context */}
            <div className="lg:w-1/4 space-y-10">
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-xl font-display font-bold text-[#1B4332] mb-4">Quick Filter</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search in A..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-14 bg-white border-gray-100 rounded-2xl pl-12 pr-6 text-sm focus:ring-2 focus:ring-[#C9973A] outline-none shadow-sm font-sans"
                  />
                </div>
              </div>

              <div className="bg-[#1B4332] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9973A]/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
                  <LayoutGrid size={20} className="text-[#C9973A]" />
                  Global Stats
                </h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-3xl font-display font-bold">316+</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Verified Categories</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold">5,000+</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Active Businesses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Listing Grid */}
            <div className="lg:w-3/4">
               <div className="mb-10 flex items-end justify-between border-b border-gray-100 pb-6">
                 <div>
                   <h2 className="text-5xl font-display font-bold text-[#1B4332] leading-none mb-2">{activeLetter}</h2>
                   <p className="text-gray-400 font-sans text-sm uppercase tracking-widest font-bold">
                     Found {filteredCategories.length} Categories Starting with {activeLetter}
                   </p>
                 </div>
               </div>

               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeLetter + search}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                 >
                   {filteredCategories.length > 0 ? (
                     filteredCategories.map((cat, idx) => (
                       <Link
                         key={idx}
                         to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                         className="group p-6 bg-white border border-gray-100 rounded-2xl hover:bg-[#1B4332] transition-all duration-300 shadow-sm hover:shadow-2xl flex items-center justify-between"
                       >
                         <span className="font-sans font-bold text-[#1B4332] group-hover:text-white transition-colors">{cat}</span>
                         <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#1B4332]/20 group-hover:bg-[#C9973A] group-hover:text-white transition-all transform group-hover:rotate-45">
                           <ArrowRight size={14} />
                         </div>
                       </Link>
                     ))
                   ) : (
                     <div className="col-span-full py-40 text-center space-y-4">
                       <p className="text-gray-300 font-sans text-lg">No categories found matching your filter.</p>
                     </div>
                   )}
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
