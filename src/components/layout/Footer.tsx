import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <footer className="bg-[#00382E] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col items-start leading-tight">
                <span className="text-2xl font-serif font-bold text-white">
                    Salem <span className="text-[#C9973A]">Business</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans">
                    SALEM.IDBF.IN
                </span>
            </Link>
            <p className="text-white/60 font-sans text-[13px] leading-relaxed">
              Salem Business — find verified local businesses, services & shops. Part of India's growing IDBF.in network covering 500+ cities across the country.
            </p>
            <div className="space-y-2 text-[13px] text-white/60">
               <div className="flex items-center gap-2">
                  <span className="text-[#C9973A]">🌐</span> www.idbf.in
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[#C9973A]">📞</span> WhatsApp: 9655030405
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[#C9973A]">✉</span> Contact Us
               </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-white border-b border-white/5 pb-2">Quick Links</h4>
            <ul className="space-y-4 font-sans text-[13px] text-white/60">
              <li><Link to="/" className="hover:text-[#C9973A] transition-colors flex items-center gap-2"><span>›</span> Home</Link></li>
              <li><Link to="/categories" className="hover:text-[#C9973A] transition-colors flex items-center gap-2"><span>›</span> A-Z Categories</Link></li>
              <li><Link to="/register" className="hover:text-[#C9973A] transition-colors flex items-center gap-2"><span>›</span> Register Your Business</Link></li>
              <li><Link to="/about" className="hover:text-[#C9973A] transition-colors flex items-center gap-2"><span>›</span> About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#C9973A] transition-colors flex items-center gap-2"><span>›</span> Contact</Link></li>
              <li><Link to="/disclaimer" className="hover:text-[#C9973A] transition-colors flex items-center gap-2"><span>›</span> Disclaimer</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-white border-b border-white/5 pb-2">Top Categories</h4>
            <ul className="space-y-4 font-sans text-[13px] text-white/60">
              {["Dentist", "Property Dealers", "CA", "Packers And Movers", "Architects", "Physiotherapy"].map((cat, i) => (
                <li key={i}><Link to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#C9973A] transition-colors flex items-center gap-2"><span>›</span> {cat}</Link></li>
              ))}
            </ul>
          </div>

          {/* List Your Business CTA */}
          <div className="space-y-6">
             <h4 className="text-lg font-serif font-bold mb-6 text-white border-b border-white/5 pb-2">List Your Business</h4>
             <p className="text-white/60 font-sans text-[13px] leading-relaxed">
               Get found by thousands of local customers. List your business on Salem Business.
             </p>
             <Link to="/register">
               <button className="bg-[#C9973A] hover:bg-[#B88629] text-[13px] font-bold text-[#00382E] w-full py-4 px-6 rounded-md transition-all shadow-xl text-left flex items-center justify-between group">
                 <span>+ Register Your Business</span>
               </button>
             </Link>
          </div>
        </div>

        {/* A-Z Row */}
        <div className="pt-10 border-t border-white/5 mb-10">
           <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">BROWSE BUSINESSES A — Z</span>
              <div className="flex flex-wrap justify-center gap-2">
                 {letters.map(letter => (
                    <Link 
                       key={letter} 
                       to="/categories" 
                       className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white/60 hover:bg-[#C9973A] hover:text-[#00382E] hover:border-[#C9973A] transition-all"
                    >
                       {letter}
                    </Link>
                 ))}
                 <Link to="/categories" className="px-3 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white/60 hover:bg-[#C9973A] hover:text-[#00382E] transition-all">
                    #
                 </Link>
              </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/40 text-[11px] font-sans font-medium gap-6">
           <p>Copyright © {currentYear} <span className="text-white/60">IDBF.in</span> — India's Business Finder. All Rights Reserved.</p>
           <div className="flex items-center gap-6">
              <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
