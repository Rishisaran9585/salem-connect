import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { alphabetCategories, sampleBusinesses } from "@/data/categories";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AtoZ() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const businessesByLetter: Record<string, typeof sampleBusinesses> = {};
  sampleBusinesses.forEach((b) => {
    const letter = b.businessName.charAt(0).toUpperCase();
    if (!businessesByLetter[letter]) businessesByLetter[letter] = [];
    businessesByLetter[letter].push(b);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="bg-gradient-hero py-10 md:py-14">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-bold md:text-4xl text-primary-foreground">A-Z Business Directory</h1>
            <p className="mt-2 text-sm font-body text-primary-foreground/70">Find any business in Salem alphabetically</p>
          </div>
        </div>

        {/* Sticky Alphabet Nav */}
        <div className="sticky top-16 z-30 border-b border-border bg-card/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-wrap justify-center gap-1">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  onClick={() => setActiveLetter(letter)}
                  className={`h-8 w-8 flex items-center justify-center rounded-md text-xs font-sans font-semibold transition-colors ${
                    activeLetter === letter
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {letters.map((letter) => {
            const biz = businessesByLetter[letter] || [];
            const cats = alphabetCategories[letter] || [];
            if (biz.length === 0 && cats.length === 0) return null;
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-8 scroll-mt-32">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg">
                    {letter}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {biz.length} businesses · {cats.length} categories
                  </span>
                </div>
                {biz.length > 0 && (
                  <div className="mb-3 space-y-1">
                    {biz.map((b) => (
                      <Link
                        key={b.id}
                        to={`/business/${b.slug}`}
                        className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 hover:shadow-card transition-shadow"
                      >
                        <div>
                          <span className="text-sm font-sans font-medium text-foreground">{b.businessName}</span>
                          <span className="ml-2 text-xs font-mono text-muted-foreground">{b.categoryName}</span>
                        </div>
                        <span className="text-xs font-body text-muted-foreground">{b.area}, {b.city}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {cats.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cats.map((c) => (
                      <Link
                        key={c}
                        to={`/category/${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-sans text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
