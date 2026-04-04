import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = ["Restaurants", "Real Estate", "Silk Sarees", "Hospitals", "Automotive", "Education"];

  return (
    <footer className="bg-[#1B4332] text-white pt-32 pb-16 overflow-hidden relative">
      {/* Decorative Branding Ring */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C9973A]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex flex-col items-start">
                <span className="text-3xl font-bold font-['DM_Sans'] text-white">
                    Salem 
                    <span className="italic font-['Playfair_Display'] text-[#C9973A] ml-2">Directory</span>
                </span>
                <span className="text-xs uppercase tracking-widest font-['DM_Mono'] text-white/50 mt-1">
                    salem.idbf.in
                </span>
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed max-w-xs">
              Salem's most trusted local business network. We help businesses grow and customers find exactly what they need in Salem district.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-[#C9973A] transition-all transform hover:-translate-y-1 shadow-lg">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-display font-bold mb-8 border-b border-white/10 pb-4">Explore</h4>
            <ul className="space-y-4 font-sans text-sm font-medium text-white/60">
              <li><Link to="/" className="hover:text-[#C9973A] transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-[#C9973A] transition-colors">All Categories</Link></li>
              <li><Link to="/a-z" className="hover:text-[#C9973A] transition-colors">A-Z Business List</Link></li>
              <li><Link to="/a-z-categories" className="hover:text-[#C9973A] transition-colors">A-Z Category Archive</Link></li>
              <li><Link to="/about" className="hover:text-[#C9973A] transition-colors">About Directory</Link></li>
              <li><Link to="/contact" className="hover:text-[#C9973A] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-xl font-display font-bold mb-8 border-b border-white/10 pb-4">Top Categories</h4>
            <ul className="space-y-4 font-sans text-sm font-medium text-white/60">
              {categories.map((cat, i) => (
                <li key={i}><Link to={`/category/${cat.toLowerCase().replace(' ', '-')}`} className="hover:text-[#C9973A] transition-colors">{cat}</Link></li>
              ))}
            </ul>
          </div>

          {/* List Your Business CTA */}
          <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 text-center relative group">
             <div className="absolute inset-0 bg-[#C9973A]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
             <h4 className="text-2xl font-display font-bold mb-4">List Business</h4>
             <p className="text-white/40 text-xs mb-8 uppercase tracking-widest font-bold">One-time fee ₹150</p>
             <Link to="/register">
               <button className="bg-[#C9973A] hover:bg-white hover:text-[#1B4332] text-white w-full py-4 rounded-2xl font-bold font-sans shadow-2xl transition-all h-auto px-6 whitespace-nowrap">
                 Register Free Now
               </button>
             </Link>
             <p className="mt-6 text-[10px] text-white/30 font-medium">Over 5,000+ businesses joined</p>
          </div>
        </div>


        {/* Copyright */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs font-medium font-sans gap-6 text-center md:text-left">
           <p>© {currentYear} Salem Directory. Owned by salem.idbf.in. All Rights Reserved.</p>
           <div className="flex items-center gap-2">
             <span>Handcrafted with</span>
             <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
             <span>for Salem District</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
