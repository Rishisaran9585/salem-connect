import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessCard from "@/components/business/BusinessCard";
import { sampleBusinesses } from "@/data/categories";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const results = sampleBusinesses.filter(
    (b) =>
      b.businessName.toLowerCase().includes(query.toLowerCase()) ||
      b.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      b.description.toLowerCase().includes(query.toLowerCase()) ||
      b.area.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="bg-gradient-hero py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-display font-bold text-primary-foreground">
              Search Results for "{query}"
            </h1>
            <p className="mt-1 text-sm font-body text-primary-foreground/70">{results.length} results found</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-sans text-muted-foreground">No businesses found matching "{query}"</p>
              <p className="mt-2 text-sm font-body text-muted-foreground">Try different keywords or browse our categories</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
