import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessCard from "@/components/business/BusinessCard";
import { sampleBusinesses } from "@/data/categories";
import { MapPin, Phone, Mail, Globe, CheckCircle2, ChevronRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BusinessDetail() {
  const { slug } = useParams<{ slug: string }>();
  const business = sampleBusinesses.find((b) => b.slug === slug);
  const related = sampleBusinesses.filter(
    (b) => business && b.categoryId === business.categoryId && b.id !== business.id
  ).slice(0, 3);

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-display text-foreground">Business Not Found</h1>
          <Link to="/" className="mt-4 inline-block text-sm font-sans text-accent hover:underline">← Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="bg-gradient-hero pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1.5 text-xs font-sans text-primary-foreground/60 mb-3">
              <Link to="/" className="hover:text-primary-foreground">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to={`/category/${business.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="hover:text-primary-foreground">
                {business.categoryName}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary-foreground">{business.businessName}</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-bold md:text-3xl text-primary-foreground">
                {business.businessName}
              </h1>
              {business.verified && (
                <span className="flex items-center gap-1 rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-sans text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                </span>
              )}
            </div>
            <span className="mt-2 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-mono text-primary-foreground">
              {business.categoryName}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="text-lg font-sans font-semibold text-foreground mb-3">About</h2>
                <p className="text-sm font-body text-muted-foreground leading-relaxed">{business.description}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="text-lg font-sans font-semibold text-foreground mb-3">Location</h2>
                <div className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{business.address}, {business.area}, {business.city}, {business.state} — {business.pincode}</span>
                </div>
                <div className="mt-4 h-48 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-sm font-sans text-muted-foreground">Google Maps Integration</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
                <h3 className="text-sm font-sans font-semibold text-foreground">Contact Information</h3>
                <div className="space-y-3">
                  <a href={`tel:${business.mobile.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-sm font-body text-foreground hover:text-accent transition-colors">
                    <Phone className="h-4 w-4 text-accent" /> {business.mobile}
                  </a>
                  {business.mobileAlt && (
                    <a href={`tel:${business.mobileAlt.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-sm font-body text-muted-foreground hover:text-accent transition-colors">
                      <Phone className="h-4 w-4 text-muted-foreground" /> {business.mobileAlt}
                    </a>
                  )}
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex items-center gap-2.5 text-sm font-body text-foreground hover:text-accent transition-colors">
                      <Mail className="h-4 w-4 text-accent" /> {business.email}
                    </a>
                  )}
                  {business.website && (
                    <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm font-body text-foreground hover:text-accent transition-colors">
                      <Globe className="h-4 w-4 text-accent" /> {business.website}
                    </a>
                  )}
                </div>
                <a href={`tel:${business.mobile.replace(/\s/g, "")}`}>
                  <Button className="w-full bg-primary text-primary-foreground font-sans">
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </Button>
                </a>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors shadow-card">
                <Share2 className="h-4 w-4" /> Share This Business
              </button>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-display font-bold text-foreground">Related Businesses</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((b) => (
                  <BusinessCard key={b.id} business={b} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
