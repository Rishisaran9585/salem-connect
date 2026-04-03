import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Building2, Users, ShieldCheck, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="bg-gradient-hero pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-bold md:text-4xl text-primary-foreground">About Salem Directory</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm font-body text-primary-foreground/70 leading-relaxed">
              India's #1 Local Business Network for Salem District, Tamil Nadu
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-xl font-display font-bold text-foreground mb-3">Our Mission</h2>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                Salem Directory is a comprehensive local business listing platform dedicated to connecting businesses with customers in Salem District, Tamil Nadu. We believe every local business deserves online visibility, and we make it affordable and accessible for all.
              </p>
              <p className="mt-3 text-sm font-body text-muted-foreground leading-relaxed">
                With over 5,000 verified businesses across 300+ categories, we are the most trusted and complete business directory serving Salem and surrounding areas.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Building2, title: "5,000+ Businesses", desc: "Comprehensive listings covering every industry and service in Salem." },
                { icon: Users, title: "Thousands of Users", desc: "Serving local customers who actively search for businesses daily." },
                { icon: ShieldCheck, title: "Verified Listings", desc: "Every business is manually verified to ensure accuracy and trust." },
                { icon: Target, title: "Local Focus", desc: "Built specifically for Salem District — not a generic national directory." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <item.icon className="mb-2 h-8 w-8 text-accent" />
                  <h3 className="text-sm font-sans font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs font-body text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-6 py-3 text-sm font-sans font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
                List Your Business Today — ₹150
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
