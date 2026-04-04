import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/a-z", label: "A-Z Directory" },
  { to: "/about", label: "About" },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-effect py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <span className={`text-2xl font-display font-bold tracking-tight transition-colors duration-500 ${scrolled ? 'text-[#1B4332]' : 'text-white'}`}>Salem</span>
          <span className={`text-2xl font-display font-light transition-colors duration-500 ${scrolled ? 'text-[#C9973A]' : 'text-[#C9973A]'}`}>Connect</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          <div className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 shadow-sm border transition-all duration-500 ${
            scrolled 
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-gray-100' 
            : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-5 py-2 text-sm font-sans font-bold tracking-tight transition-all duration-300 ${
                  location.pathname === l.to
                  ? scrolled ? "bg-[#1B4332] text-white shadow-lg" : "bg-[#C9973A] text-white shadow-lg"
                  : scrolled ? "text-[#4B5563] hover:text-[#1B4332]" : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/register">
            <Button className={`rounded-full font-sans font-bold shadow-elevated hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500 px-8 py-6 h-auto border-none ${
              scrolled ? 'bg-[#1B4332] text-white' : 'bg-[#C9973A] text-white'
            }`}>
              <Plus className="mr-2 h-5 w-5" /> Register Business
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full bg-white/50 backdrop-blur-md border border-border/50 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50 md:hidden glass-effect absolute w-full top-full"
          >
            <nav className="flex flex-col gap-1 p-6">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-sans font-medium transition-colors ${location.pathname === l.to
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-secondary"
                    }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/register" onClick={() => setOpen(false)} className="mt-4">
                <Button className="w-full rounded-xl bg-primary font-sans text-primary-foreground py-6 text-base">
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
