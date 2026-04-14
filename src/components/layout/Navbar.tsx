import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/categories", label: "Category" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className={`w-full py-3 transition-all duration-300 ${scrolled ? "bg-slate-950/95 shadow-2xl backdrop-blur-md" : "bg-slate-950"}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-tighter text-white leading-none">SalemBusiness</span>
              <span className="text-[10px] font-sans font-bold text-white/30 uppercase tracking-widest leading-none">The Elite Network</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`text-sm font-sans font-black tracking-tight transition-all duration-300 ${
                      location.pathname === l.to
                      ? "text-[#45b1a9]"
                      : "text-white/70 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/register">
              <Button className="rounded-full font-sans font-black shadow-xl hover:-translate-y-0.5 transition-all duration-500 px-8 py-5 h-auto border-none bg-[#45b1a9] hover:bg-[#38918a] text-white">
                Register Now
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 md:hidden bg-slate-950 absolute w-full top-full shadow-2xl"
          >
            <nav className="flex flex-col gap-1 p-6">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-4 text-base font-sans font-black transition-colors ${location.pathname === l.to
                    ? "bg-[#45b1a9]/10 text-[#45b1a9]"
                    : "text-white/60 hover:bg-white/5"
                    }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/register" onClick={() => setOpen(false)} className="mt-4">
                <Button className="w-full rounded-2xl bg-[#45b1a9] font-sans font-black text-white py-6 h-auto text-base">
                  <Plus className="mr-2 h-5 w-5" /> Register Business
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
