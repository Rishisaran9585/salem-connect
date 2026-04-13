import { Star, ShieldCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const featured = [
  {
    id: 1,
    name: "Sri Saravana Bhavan",
    category: "Food & Beverages",
    area: "Five Roads",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7ed9d42177?auto=format&fit=crop&q=80&w=400",
    slug: "sri-saravana-bhavan"
  },
  {
    id: 2,
    name: "AVR Swarna Mahal",
    category: "Jewellery",
    area: "Swarnapuri",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1573408302185-06ff511ad66b?auto=format&fit=crop&q=80&w=400",
    slug: "avr-swarna-mahal"
  },
  {
    id: 3,
    name: "Knowledge Institute",
    category: "Education",
    area: "Kakapalayam",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523050338863-91375d65dd52?auto=format&fit=crop&q=80&w=400",
    slug: "knowledge-institute"
  }
];

export default function FeaturedBusinesses() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-sans font-bold text-indigo-600 uppercase tracking-widest mb-3">Elite Selection</h2>
            <h3 className="heading-lg">Premium Establishments</h3>
            <p className="mt-4 text-slate-600">Discover the most trusted and top-rated businesses in Salem, verified for quality and service excellence.</p>
          </div>
          <Link to="/categories" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2 group">
            Browse All Businesses <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((biz, i) => (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100 group hover:shadow-elevated transition-all"
            >
              <div className="relative h-56">
                <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 border border-indigo-100 uppercase tracking-wider">
                    {biz.category}
                  </span>
                </div>
                {biz.rating >= 4.8 && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-display font-bold text-slate-900">{biz.name}</h4>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-sans font-bold">{biz.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <MapPin className="h-4 w-4" />
                  <span>{biz.area}, Salem</span>
                </div>
                <Link 
                  to={`/business/${biz.slug}`}
                  className="w-full inline-flex items-center justify-center h-12 rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all text-sm font-bold text-indigo-600"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
