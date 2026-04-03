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
    <div className="relative -mt-10 md:-mt-16 z-30 container mx-auto px-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-2 md:grid md:grid-cols-12 flex flex-col gap-2 border border-[#C9973A]/10"
      >
        {/* Search Field */}
        <div className="col-span-6 flex items-center gap-3 px-4 py-3 md:border-r border-gray-100">
          <Search className="w-5 h-5 text-[#C9973A]" />
          <input 
            type="text" 
            placeholder="Search businesses, categories, services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-[#1B4332] font-sans font-medium placeholder:text-gray-400"
          />
        </div>

        {/* Category Dropdown */}
        <div className="col-span-3 flex items-center gap-3 px-4 py-3 md:border-r border-gray-100 group cursor-pointer relative">
          <ChevronDown className="w-5 h-5 text-[#C9973A] group-hover:rotate-180 transition-transform" />
          <span className="text-[#1B4332] font-sans font-medium whitespace-nowrap overflow-hidden text-ellipsis">
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
        <div className="col-span-2 flex items-center gap-3 px-4 py-3 bg-gray-50/50 rounded-xl">
          <MapPin className="w-5 h-5 text-[#1B4332]/50" />
          <span className="text-[#1B4332]/50 font-sans font-bold">Salem</span>
        </div>

        {/* Search Button */}
        <div className="col-span-1 flex p-1">
          <Button className="w-full h-full bg-[#C9973A] hover:bg-[#C9973A]/90 text-white rounded-xl shadow-lg border-none transform active:scale-95 transition-all">
            <span className="hidden lg:inline mr-2">Search</span>
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Quick Links / Trending */}
      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
        <span className="text-[#1B4332]/60 font-sans font-medium">Trending searches:</span>
        {["Hospitals", "Real Estate", "Silk Sarees", "Best Cafes"].map((tag) => (
          <button key={tag} className="text-[#1B4332] font-sans font-bold hover:text-[#C9973A] transition-colors decoration-[#C9973A]/30 underline underline-offset-4">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
