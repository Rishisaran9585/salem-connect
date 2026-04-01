import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { partnerCities } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Partner Cities */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <h3 className="mb-4 text-lg font-display">Business Directories of Other Cities</h3>
          <div className="flex flex-wrap gap-2">
            {partnerCities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-sans text-primary-foreground/70 hover:bg-primary-foreground/10 transition-colors cursor-pointer"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 mb-3">
              <span className="text-xl font-bold font-sans">Salem</span>
              <span className="text-xl font-display italic text-gold">Directory</span>
            </Link>
            <p className="text-sm font-body text-primary-foreground/70 leading-relaxed">
              India's #1 Local Business Network — Salem. Find every business in Salem District, Tamil Nadu.
            </p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-sans font-semibold uppercase tracking-wider text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "All Categories", to: "/categories" },
                { label: "A-Z Business List", to: "/a-z" },
                { label: "About Us", to: "/about" },
                { label: "Contact Us", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm font-body text-primary-foreground/70 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="mb-3 text-sm font-sans font-semibold uppercase tracking-wider text-gold">Top Categories</h4>
            <ul className="space-y-2">
              {["Restaurants", "Hospitals", "Schools", "Hotels", "Advocates", "Salons"].map((c) => (
                <li key={c}>
                  <Link to={`/category/${c.toLowerCase()}`} className="text-sm font-body text-primary-foreground/70 hover:text-gold transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-sans font-semibold uppercase tracking-wider text-gold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm font-body text-primary-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Salem District, Tamil Nadu, India
              </li>
              <li className="flex items-center gap-2 text-sm font-body text-primary-foreground/70">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                +91 94422 XXXXX
              </li>
              <li className="flex items-center gap-2 text-sm font-body text-primary-foreground/70">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                info@salemdirectory.in
              </li>
            </ul>
            <Link to="/register">
              <button className="mt-4 w-full rounded-md bg-gradient-gold px-4 py-2.5 text-sm font-sans font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
                List Your Business — ₹150
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-xs font-sans text-primary-foreground/50">
            © {new Date().getFullYear()} Salem Directory — Find Every Business in Salem. Built for Salem District, Tamil Nadu, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
