import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001F3F] text-white pt-20 pb-10 font-sans border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col items-start leading-tight">
                <span className="text-2xl font-serif font-black text-white tracking-tight italic">
                    Salem <span className="text-[#B8860B]">Business</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-black">
                    SALEMBUSINESS.IN
                </span>
            </Link>
            <p className="text-white/60 text-[13px] leading-relaxed font-medium max-w-xs">
              Salem's most trusted premium business directory, connecting local elite establishments with thousands of customers since inception.
            </p>
            <div className="space-y-3 text-[13px] text-white/70 font-bold">
               <div className="flex items-center gap-3">
                  <span className="text-[#B8860B] bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center">📞</span> +91 96550 20304
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-[#B8860B] bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center">✉</span> Salembusiness37@gmail.com
               </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-[#B8860B] border-b border-white/5 pb-4">Navigation</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/40">
              <li><Link to="/" className="hover:text-[#B8860B] transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Home</Link></li>
              <li><Link to="/categories" className="hover:text-[#B8860B] transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> All Categories</Link></li>
              <li><Link to="/register" className="hover:text-[#B8860B] transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> List Business</Link></li>
              <li><Link to="/about" className="hover:text-[#B8860B] transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-[#B8860B] transition-all flex items-center gap-3 group"><span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Reach Out</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-[#B8860B] border-b border-white/5 pb-4">Top Verticals</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-white/40">
              {["Professional Services", "Real Estate", "Healthcare", "Education", "Lifestyle"].map((cat, i) => (
                <li key={i}>
                  <Link to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#B8860B] transition-all flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column - Updated to Register Business */}
          <div className="space-y-8 p-10 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-full blur-[40px] -translate-x-1/2 -translate-y-1/2" />
             <h4 className="text-xl text-white font-serif font-black leading-tight italic tracking-tight">Register <span className="text-[#B8860B]">Business</span></h4>
             <p className="text-white/60 text-[12px] leading-relaxed font-medium">
               Join our growing network of premium establishments in Salem.
             </p>
             <Link to="/register" className="block">
               <button className="bg-[#B8860B] text-[#001F3F] text-[10px] font-black uppercase tracking-widest w-full py-5 px-6 rounded-2xl transition-all shadow-xl hover:bg-white hover:text-slate-900 group-hover:-translate-y-1 flex items-center justify-center gap-3">
                 Register Business
               </button>
             </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-black uppercase tracking-[0.2em] gap-6">
           <p>© {currentYear} <span className="text-white/40 tracking-normal">Salem Business</span>. All Rights Reserved.</p>
           <div className="flex flex-wrap justify-center gap-2">
             {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => (
               <Link key={l} to={`/atoz/${l}`} className="hover:text-white transition-colors">
                 {l}
               </Link>
             ))}
           </div>
           <p className="text-[#B8860B] italic opacity-50">Vibrant. Verified. Value.</p>
        </div>
      </div>
    </footer>
  );
}
