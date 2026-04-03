import { 
  Car, GraduationCap, Utensils, HeartPulse, Cpu, 
  Landmark, ShoppingBag, Briefcase, HardHat, 
  Shirt, PartyPopper, Laptop 
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { name: "Automotive", icon: Car, count: "450+", slug: "automotive", color: "bg-blue-500" },
  { name: "Education", icon: GraduationCap, count: "320+", slug: "education", color: "bg-emerald-500" },
  { name: "Food & Drinks", icon: Utensils, count: "580+", slug: "food-and-beverages", color: "bg-orange-500" },
  { name: "Health", icon: HeartPulse, count: "210+", slug: "health-and-medical", color: "bg-rose-500" },
  { name: "Electronics", icon: Cpu, count: "150+", slug: "electronics-and-tech", color: "bg-indigo-500" },
  { name: "Finance", icon: Landmark, count: "180+", slug: "finance-and-banking", color: "bg-cyan-500" },
  { name: "Retail Stores", icon: ShoppingBag, count: "900+", slug: "retail-and-general-stores", color: "bg-pink-500" },
  { name: "Business", icon: Briefcase, count: "240+", slug: "professional-services", color: "bg-slate-600" },
  { name: "Construction", icon: HardHat, count: "110+", slug: "construction", color: "bg-amber-600" },
  { name: "Fashion", icon: Shirt, count: "340+", slug: "clothing-and-fashion", color: "bg-purple-500" },
  { name: "Events", icon: PartyPopper, count: "95+", slug: "events-and-entertainment", color: "bg-fuchsia-500" },
  { name: "Technology", icon: Laptop, count: "135+", slug: "technology", color: "bg-sky-600" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function FeaturedGrid() {
  return (
    <section className="py-20 bg-[var(--accent-light)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#C9973A] font-sans font-bold uppercase tracking-widest text-xs"
          >
            Explore Popular
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-2 text-[#1B4332]"
          >
            Browse Top Categories
          </motion.h2>
          <div className="w-24 h-1 bg-[#C9973A] mx-auto mt-6 rounded-full" />
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
              <Link to={`/category/${cat.slug}`} className="group block">
                <div className="bg-white rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 group-hover:border-[#C9973A]/20">
                  <div className={`w-16 h-16 ${cat.color} text-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1B4332] group-hover:text-[#C9973A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm font-sans text-gray-500 mt-2 font-medium">
                    {cat.count} listings
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link to="/categories">
            <Button size="lg" className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white font-sans font-bold px-10 py-7 text-lg rounded-full shadow-xl">
              Show All 316 Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
