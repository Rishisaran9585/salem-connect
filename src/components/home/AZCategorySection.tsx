import { useState } from "react";
import { Link } from "react-router-dom";
import { alphabetCategories } from "@/data/categories";
import { motion } from "framer-motion";

const letters = Object.keys(alphabetCategories);

export default function AZCategorySection() {
  const [activeLetter, setActiveLetter] = useState("A");

  return (
    <section className="py-20 md:py-32 bg-card border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Column - Image & Context */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-semibold md:text-4xl text-foreground tracking-tight">
                Comprehensive Directory
              </h2>
              <p className="mt-4 text-lg font-body text-muted-foreground/80">
                Browse our meticulously organized archive of 316 curated business categories.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex-grow rounded-[2rem] overflow-hidden shadow-elevated min-h-[300px]"
            >
              <img 
                src="/a-z-bg.png" 
                alt="Directory Archive" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
            </motion.div>
          </div>

          {/* Right Column - Alphabet Tabs & Grid */}
          <div className="w-full lg:w-2/3 flex flex-col">
            
            {/* Alphabet Tabs */}
            <div className="mb-10 flex flex-wrap gap-2">
              {letters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`h-10 w-10 md:h-12 md:w-12 rounded-xl text-base font-sans font-semibold transition-all duration-300 ${
                    activeLetter === letter
                      ? "bg-primary text-primary-foreground shadow-md scale-110"
                      : "bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-primary"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Categories Grid */}
            <div className="flex-grow">
              <motion.div
                key={activeLetter}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              >
                {alphabetCategories[activeLetter]?.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="flex items-center rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm font-sans font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm transition-all duration-200 group"
                  >
                    <span className="truncate group-hover:text-primary transition-colors">{cat}</span>
                  </Link>
                ))}
              </motion.div>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50 flex">
              <Link
                to="/a-z"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3.5 text-sm font-sans font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                View Full A-Z Archive
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
