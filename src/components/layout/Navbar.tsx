import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Category', path: '/categories' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-[60] bg-[#001F3F]/95 backdrop-blur-md border-b border-white/5 py-3 md:py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <svg width="140" height="70" viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-105 md:w-[180px] md:h-[90px]">
              {/* Background Speech Bubble */}
              <path d="M30 20 h260 a30 30 0 0 1 30 30 v60 a30 30 0 0 1 -30 30 h-170 l-30 35 v-35 h-60 a30 30 0 0 1 -30 -30 v-60 a30 30 0 0 1 30 -30 z" fill="#E50914" />
              <text x="65" y="95" fontFamily="Georgia, serif" fontSize="64" fill="white" fontWeight="bold">Salem</text>
              <text x="50" y="210" fontFamily="Arial, sans-serif" fontSize="64" fill="#B8860B" fontWeight="900" letterSpacing="4">BUSINESS</text>
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-[#B8860B] transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/register">
              <Button className="bg-[#B8860B] hover:bg-white text-[#001F3F] text-[9px] md:text-[11px] font-black uppercase tracking-widest px-4 md:px-8 rounded-lg md:rounded-xl h-9 md:h-11 transition-all shadow-2xl hover:scale-105 active:scale-95">
                Register <span className="hidden sm:inline">Now</span>
              </Button>
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Simplified Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-[100] flex-col bg-[#001F3F] ${isOpen ? 'flex' : 'hidden'}`}
          style={{ backgroundColor: '#001F3F', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
           {/* Top Bar (Clean) */}
           <div className="px-6 py-8 flex items-center justify-between shrink-0 bg-[#001F3F]">
              <span className="text-xl font-display font-black text-white/70 tracking-tighter">Salem Business</span>
              <button 
                className="text-white p-2"
                onClick={() => setIsOpen(false)}
              >
                <X size={28} />
              </button>
           </div>
           
           <div className="flex-grow flex flex-col items-center justify-center p-6 space-y-12 bg-[#001F3F]">
             {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-black text-white hover:text-[#B8860B] transition-all text-center tracking-[0.2em] uppercase"
                >
                  {item.name}
                </Link>
              ))}

             <div className="w-full max-w-[280px] pt-10">
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="bg-[#B8860B] text-white text-sm font-black w-full py-8 rounded-full shadow-2xl uppercase tracking-widest">
                    Register Business - ₹4999
                  </Button>
                </Link>
             </div>
           </div>
        </div>
      </nav>
    </>
  );
}
