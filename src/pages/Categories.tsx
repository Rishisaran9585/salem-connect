import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { allCategories } from "@/data/categories";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Categories() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="bg-gradient-hero py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-bold md:text-4xl text-primary-foreground">All Categories</h1>
            <p className="mt-2 text-sm font-body text-primary-foreground/70">Browse 300+ business categories in Salem</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {allCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-card transition-all hover:shadow-elevated hover:-translate-y-1"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-accent/20">
                    <cat.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-sm font-sans font-semibold text-foreground">{cat.name}</h3>
                  <span className="mt-1 text-xs font-mono text-muted-foreground">{cat.count} listings</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
