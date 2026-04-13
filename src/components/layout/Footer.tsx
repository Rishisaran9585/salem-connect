import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col items-start leading-tight">
                <span className="text-2xl font-display font-black text-white italic tracking-tighter uppercase">
                    Salem <span className="text-indigo-400">Business</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">
                    SALEMBUSINESS.IN
                </span>
            </Link>
            <p className="text-white/40 text-[13px] leading-relaxed font-medium">
              Salem Business is the premier business directory for Salem, connecting local businesses with customers. Find verified professionals and services effortlessly.
            </p>
            <div className="space-y-3 text-[13px] text-white/50 font-bold">

               <div className="flex items-center gap-3">
                  <span className="text-indigo-400 bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center">📞</span> +91 96550 20304
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-indigo-400 bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center">✉</span> Salembusiness37@gmail.com
               </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-white/20 border-b border-white/5 pb-4">Navigation</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/40">
              <li><Link to="/" className="hover:text-indigo-400 transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Home</Link></li>
              <li><Link to="/categories" className="hover:text-indigo-400 transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> All Categories</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> List Business</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Reach Out</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-white/20 border-b border-white/5 pb-4">Top Verticals</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/40">
              {["Professional Services", "Real Estate", "Healthcare", "Education", "Lifestyle"].map((cat, i) => (
                <li key={i}>
                  <Link to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="hover:text-indigo-400 transition-all flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="space-y-8 p-10 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-[40px] -translate-x-1/2 -translate-y-1/2" />
             <h4 className="text-xl text-white font-display font-black leading-tight italic">Partner With The <span className="text-indigo-400">Elite</span></h4>
             <p className="text-white/70 text-[12px] leading-relaxed font-medium">
               Join our growing network of premium establishments in Salem.
             </p>
             <Link to="/register" className="block">
               <button className="bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest w-full py-5 px-6 rounded-2xl transition-all shadow-xl hover:bg-indigo-600 hover:text-white group-hover:-translate-y-1 flex items-center justify-center gap-3">
                 + Add Your Enterprise
               </button>
             </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-black uppercase tracking-[0.2em] gap-6">
           <p>© {currentYear} <span className="text-white/40 tracking-normal">Salem Business</span>. All Rights Reserved.</p>
           <p className="text-white/10 italic">Engineered for Excellence</p>
        </div>
      </div>
    </footer>
  );
}
