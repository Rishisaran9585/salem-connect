import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { alphabetCategories } from "@/data/categories";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";
import { Link } from "react-router-dom";

export default function Categories() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  useEffect(() => {
    const hash = window.location.pathname.split('/').pop();
    if (hash && hash.length === 1 && /^[A-Z]$/.test(hash)) {
      setTimeout(() => scrollToLetter(hash), 500);
    }
  }, []);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      const offset = 120; // Navbar + alphabet buffer
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="bg-[#001F3F] pt-10 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-[#B8860B] text-xs font-black uppercase tracking-widest border border-white/10 mb-6"
            >
              <Hash size={14} /> 320 Categories Available
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-black text-white tracking-tight mb-4 italic"
            >
              Browse All Services <span className="text-[#B8860B]">in Salem</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 font-medium max-w-2xl mx-auto"
            >
              Explore our comprehensive directory of local businesses, services, and professionals across the city.
            </motion.p>
          </div>
        </div>

        {/* Alphabet Navigation */}
        <div className="sticky top-[132px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 overflow-x-auto no-scrollbar">
          <div className="container mx-auto px-4 flex justify-between gap-2 min-w-max">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-indigo-600 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 py-20 space-y-24">
          {letters.map((letter, i) => {
            const categories = alphabetCategories[letter];
            if (!categories || categories.length === 0) return null;

            return (
              <motion.section
                id={`letter-${letter}`}
                key={letter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-8"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#001F3F] rounded-[1.25rem] flex items-center justify-center text-[#B8860B] text-3xl font-serif font-black shadow-xl italic border border-white/10">
                    {letter}
                  </div>
                  <div className="h-px flex-grow bg-slate-200" />
                  <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{categories.length} Categories</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((cat, idx) => {
                    const slug = cat.split(' ').slice(1).join(' ').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                    return (
                      <Link
                        key={`${letter}-${idx}`}
                        to={`/category/${slug}`}
                        className="group p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex items-center gap-4 hover:-translate-y-1"
                      >
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300">
                          {cat.split(' ')[0].length <= 3 ? cat.split(' ')[0] : '📂'}
                        </div>
                        <span className="font-black text-slate-700 text-sm group-hover:text-[#001F3F] transition-colors leading-tight">
                          {cat.split(' ').slice(1).join(' ') || cat}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
