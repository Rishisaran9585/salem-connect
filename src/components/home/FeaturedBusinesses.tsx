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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-black text-[#B8860B] uppercase tracking-[0.3em] mb-4">Elite Selection</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-[#003131] leading-tight italic">Premium Establishment</h3>
            <p className="mt-6 text-slate-500 font-medium leading-relaxed italic">Discover the most trusted and top-rated businesses in Salem, verified for quality and service excellence.</p>
          </div>
          <Link to="/categories" className="text-xs font-black text-[#003131] hover:text-[#B8860B] uppercase tracking-widest transition-all flex items-center gap-3 group border-b-2 border-[#B8860B]/20 pb-2">
            Browse All Businesses <span className="group-hover:translate-x-2 transition-transform">→</span>
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
              <div className="relative h-64">
                <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#003131] backdrop-blur px-4 py-2 rounded-full text-[9px] font-black text-[#B8860B] border border-white/10 uppercase tracking-[0.2em] shadow-2xl">
                    {biz.category}
                  </span>
                </div>
                {biz.rating >= 4.8 && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-[#B8860B] text-white p-3 rounded-2xl shadow-2xl border border-white/20 -rotate-3 hover:rotate-0 transition-transform">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-serif font-black text-[#003131] italic">{biz.name}</h4>
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-black">{biz.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px] font-black uppercase tracking-widest mb-8">
                  <MapPin size={14} className="text-[#B8860B]" />
                  <span>{biz.area}, Salem</span>
                </div>
                <Link 
                  to={`/business/${biz.slug}`}
                  className="w-full inline-flex items-center justify-center h-14 rounded-2xl bg-[#003131] text-white hover:bg-[#B8860B] transition-all text-xs font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl hover:-translate-y-1"
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
