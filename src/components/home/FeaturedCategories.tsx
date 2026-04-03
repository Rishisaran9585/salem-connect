import { Link } from "react-router-dom";
import { featuredCategories } from "@/data/categories";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* Left Column - Image & Title */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated h-[400px] lg:h-full min-h-[400px]">
              <img 
                src="/featured-cats-bg.png" 
                alt="Premium Categories" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10">
                <h2 className="text-3xl font-display font-semibold md:text-5xl text-white tracking-tight leading-tight">
                  Explore <br/> Premium <br/> Categories
                </h2>
                <p className="mt-4 text-lg font-body text-white/80">
                  A curated selection of Salem's finest services and establishments
                </p>
                <div className="mt-8">
                  <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-white/80 transition-colors"
                  >
                    View All Collections <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Grid */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {featuredCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    className="group flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-elevated hover:-translate-y-1.5"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                      <cat.icon className="h-6 w-6 text-zinc-600 dark:text-zinc-300 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-sm font-sans font-semibold text-foreground">{cat.name}</h3>
                    <span className="mt-1.5 text-xs font-sans text-muted-foreground">{cat.count} curated listings</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
