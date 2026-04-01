import { Link } from "react-router-dom";
import { featuredCategories } from "@/data/categories";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturedCategories() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-display font-bold md:text-3xl text-foreground">
            Featured Categories
          </h2>
          <p className="mt-2 text-sm font-body text-muted-foreground">
            Explore Salem's most popular business categories
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
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
        <div className="mt-8 text-center">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-accent hover:underline"
          >
            View All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
