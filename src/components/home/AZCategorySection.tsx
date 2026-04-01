import { useState } from "react";
import { Link } from "react-router-dom";
import { alphabetCategories } from "@/data/categories";
import { motion } from "framer-motion";

const letters = Object.keys(alphabetCategories);

export default function AZCategorySection() {
  const [activeLetter, setActiveLetter] = useState("A");

  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-display font-bold md:text-3xl text-foreground">
            Browse All Services
          </h2>
          <p className="mt-2 text-sm font-body text-muted-foreground">
            316 total categories from A to Z
          </p>
        </div>

        {/* Alphabet Tabs */}
        <div className="mb-6 flex flex-wrap justify-center gap-1">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`h-8 w-8 rounded-md text-xs font-sans font-semibold transition-colors ${
                activeLetter === letter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <motion.div
          key={activeLetter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {alphabetCategories[activeLetter]?.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-sans text-foreground hover:border-accent hover:bg-accent/5 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            to="/a-z"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-sans font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Show All 316 Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
