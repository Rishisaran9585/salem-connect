import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const categoriesByLetter: Record<string, string[]> = {
  A: ["Academies", "AC Dealers", "AC Repair Shops", "AI Course Software", "Accountants", "Advertising Agency", "Advocates", "Almira Shops", "Aluminum Doors", "Ambulance Services", "Architects", "Art Jewellery", "Artists", "Ashram", "Astrologers", "Auto Parts", "Ayurvedic Stores"],
  B: ["Bags & Hardware", "Bakeries", "Bangles Store", "Banks & ATM", "Banquet Halls", "Beauty Parlours", "Belt Shops", "Bhim Stores", "Blood Banks", "Book Bindings", "Book Stores", "Builders", "Boutiques", "Brick Companies"],
  C: ["Car Dealers", "Car Accessories", "Car Bazaar", "Car Wash", "Caterers", "Cement Dealers", "Chemists", "Civil Contractors", "Clothing Stores", "Coaching Centers", "Coffee Shops", "Computer Repair", "Courier Services", "Cyber Cafes"],
  D: ["Dance Studios", "Dental Clinics", "Department Stores", "Diagnostic Centers", "Digital Marketing", "Driving Schools", "Dry Cleaning", "DTH Services"],
  E: ["E-Rickshaw Dealers", "Educational Institutes", "Electrical Shops", "Electronics Dealers", "Event Management", "Eye Hospitals"],
};

export default function AZCategorySection() {
  const [activeLetter, setActiveLetter] = useState("A");

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]"
          >
            Browse by <span className="text-[#C9973A]">Alphabet</span>
          </motion.h2>
          <p className="mt-4 text-[#1B4332]/60 font-sans font-medium text-lg">
            Find services quickly using our A to Z directory of 316 categories
          </p>
        </div>

        {/* Alphabet Tabs */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 py-6 mb-10 rounded-3xl shadow-xl border border-gray-100 flex flex-wrap justify-center gap-1 md:gap-2 px-4 shadow-accent-light/30">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`w-8 h-8 md:w-12 md:h-12 rounded-xl transition-all duration-300 font-sans font-bold text-sm md:text-lg flex items-center justify-center ${activeLetter === letter ? "bg-[#C9973A] text-white shadow-lg scale-110" : "bg-gray-100 text-gray-500 hover:bg-[#1B4332] hover:text-white"}`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Categories List */}
        <div className="min-h-[400px] bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLetter}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {(categoriesByLetter[activeLetter] || ["No categories listed yet"]).map((cat, idx) => (
                <Link 
                  key={idx} 
                  to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 hover:bg-[#1B4332]/5 hover:border-[#1B4332]/10 transition-all group"
                >
                  <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center text-[#C9973A] group-hover:bg-[#C9973A] group-hover:text-white transition-all text-xs font-bold">
                    {activeLetter}
                  </div>
                  <span className="text-[#1B4332] font-sans font-bold group-hover:text-[#C9973A] transition-colors line-clamp-1">
                    {cat}
                  </span>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-20 text-center border-t border-gray-50 pt-10">
            <Link to="/categories">
              <Button size="lg" className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white font-sans font-bold px-12 py-8 text-xl rounded-full shadow-2xl transition-all transform hover:scale-105">
                View All 316 Categories <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
