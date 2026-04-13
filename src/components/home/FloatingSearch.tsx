import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FloatingSearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const categories = [
    "Automotive", "Education", "Food & Beverages", "Health & Medical", "Electronics", "Construction", "Finance", "Fashion"
  ];

  return (
    <div className="relative z-30 container mx-auto px-4 py-8">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white rounded-[1.5rem] shadow-2xl p-2 md:grid md:grid-cols-12 flex flex-col gap-2 border border-slate-100"
      >
        {/* Search Field */}
        <div className="col-span-6 flex items-center gap-3 px-6 py-4 md:border-r border-slate-100">
          <Search className="w-5 h-5 text-indigo-600" />
          <input 
            type="text" 
            placeholder="Search businesses, categories, services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-slate-900 font-sans font-bold placeholder:text-slate-300"
          />
        </div>

        {/* Category Dropdown */}
        <div className="col-span-3 flex items-center gap-3 px-6 py-4 md:border-r border-slate-100 group cursor-pointer relative">
          <ChevronDown className="w-5 h-5 text-indigo-600 group-hover:rotate-180 transition-transform" />
          <span className="text-slate-900 font-sans font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {category}
          </span>
          <select 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Location (Fixed to Salem) */}
        <div className="col-span-2 flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-xl">
          <MapPin className="w-5 h-5 text-slate-400" />
          <span className="text-slate-400 font-sans font-black uppercase tracking-widest text-[10px]">Salem</span>
        </div>

        {/* Search Button */}
        <div className="col-span-1 flex p-1">
          <Button className="w-full h-full bg-indigo-600 hover:bg-slate-900 text-white rounded-xl shadow-lg border-none transform active:scale-95 transition-all py-4">
            <span className="hidden lg:inline mr-2 font-black uppercase tracking-tighter text-xs">Search</span>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Quick Links / Trending */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-[10px]">
        <span className="text-slate-400 font-sans font-black uppercase tracking-[0.2em]">Trending now:</span>
        {["Hospitals", "Real Estate", "Silk Sarees", "Best Cafes"].map((tag) => (
          <button key={tag} className="text-slate-900 font-sans font-black uppercase tracking-[0.1em] hover:text-indigo-600 transition-colors border-b-2 border-indigo-600/20 hover:border-indigo-600">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
