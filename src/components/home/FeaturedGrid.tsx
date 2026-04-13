import { featuredCategories } from "@/data/categories";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = featuredCategories.map(cat => ({
  ...cat,
  count: cat.count + "+",
  color: cat.id % 2 === 0 ? "bg-indigo-600" : "bg-slate-900"
}));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function FeaturedGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-sans font-bold uppercase tracking-widest text-[10px]"
          >
            Elite Selection
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-3 text-slate-900"
          >
            Curated Categories
          </motion.h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full" />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {categories.map((cat, idx) => (
            <motion.div key={idx} variants={item}>
              <Link to={`/category/${cat.slug}`} className="group block h-full">
                <div className="bg-white h-full rounded-[2rem] p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-card border border-slate-100 group-hover:border-indigo-100">
                  <div className={`w-14 h-14 ${cat.color} text-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-all duration-500`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] font-sans text-slate-400 mt-3 font-black uppercase tracking-widest">
                    {cat.count} Listings
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-20">
          <Link to="/categories">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold px-12 py-8 text-sm rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95">
              Explore All {featuredCategories.length * 10}+ Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
