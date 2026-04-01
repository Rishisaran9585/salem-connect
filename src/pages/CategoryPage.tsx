import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessCard from "@/components/business/BusinessCard";
import { allCategories, sampleBusinesses } from "@/data/categories";
import { ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = allCategories.find((c) => c.slug === slug);
  const businesses = sampleBusinesses.filter((b) =>
    category ? b.categoryId === category.id : false
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="bg-gradient-hero py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1.5 text-xs font-sans text-primary-foreground/60 mb-3">
              <Link to="/" className="hover:text-primary-foreground">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/categories" className="hover:text-primary-foreground">Categories</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary-foreground">{category?.name || slug}</span>
            </div>
            <h1 className="text-2xl font-display font-bold md:text-3xl text-primary-foreground">
              {category?.name || "Category"}
            </h1>
            <p className="mt-1 text-sm font-body text-primary-foreground/70">
              {category?.description || `Browse businesses in ${slug}`}
            </p>
            <span className="mt-2 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-mono text-primary-foreground">
              {businesses.length} listings found
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {businesses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-sans text-muted-foreground">No businesses found in this category yet.</p>
              <Link to="/register" className="mt-4 inline-block text-sm font-sans text-accent hover:underline">
                Be the first to register →
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
