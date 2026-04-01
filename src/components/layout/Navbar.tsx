import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "A-Z List", to: "/a-z" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-xl font-bold font-sans text-primary">Salem</span>
          <span className="text-xl font-display italic text-gold">Directory</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-3 py-2 text-sm font-sans font-medium transition-colors hover:bg-secondary ${
                location.pathname === l.to
                  ? "bg-secondary text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/register">
            <Button className="bg-gradient-gold font-sans text-accent-foreground shadow-md hover:opacity-90">
              <Plus className="mr-1.5 h-4 w-4" /> Register Business
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-foreground"
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
            className="overflow-hidden border-t border-border md:hidden bg-card"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-sans font-medium transition-colors ${
                    location.pathname === l.to
                      ? "bg-secondary text-primary font-semibold"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/register" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full bg-gradient-gold font-sans text-accent-foreground">
                  <Plus className="mr-1.5 h-4 w-4" /> Register Business
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
