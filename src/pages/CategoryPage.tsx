import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessCard from "@/components/business/BusinessCard";
import { allCategories, sampleBusinesses } from "@/data/categories";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = allCategories.find((c) => c.slug === slug);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/backend/api/v1/businesses.php?category=${slug}`);
        if (response.data.success) {
          // Normalize API data to match BusinessCard props
          const normalized = response.data.data.map((b: any) => ({
            id: b.id,
            businessName: b.business_name,
            ownerName: b.owner_name,
            categoryName: b.category_name,
            description: b.description,
            address: b.address,
            area: b.area,
            city: b.city,
            state: b.state,
            pincode: b.pincode,
            mobile: b.mobile,
            email: b.email,
            website: b.website,
            verified: b.is_verified == 1,
            slug: b.slug
          }));
          
          // Combine with sample data for demonstration if empty or as a fallback
          if (normalized.length === 0) {
            const filteredSamples = sampleBusinesses.filter(sb => sb.categoryId === category?.id);
            setBusinesses(filteredSamples);
          } else {
            setBusinesses(normalized);
          }
        }
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
        // Fallback to sample data on error
        const filteredSamples = sampleBusinesses.filter(sb => sb.categoryId === category?.id);
        setBusinesses(filteredSamples);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [slug, category?.id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <div className="bg-slate-900 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-sans font-black text-white/40 mb-6 uppercase tracking-[0.2em]">
              <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-indigo-400" />
              <Link to="/categories" className="hover:text-indigo-400 transition-colors">Categories</Link>
              <ChevronRight className="h-3 w-3 text-indigo-400" />
              <span className="text-white">{category?.name || slug}</span>
            </div>
            
            <h1 className="text-4xl font-display font-bold md:text-6xl text-white tracking-tight leading-tight">
              {category?.name || "Services"} <span className="text-indigo-400 italic">in Salem</span>
            </h1>
            <p className="mt-6 text-lg font-sans text-slate-400 max-w-2xl leading-relaxed">
              {category?.description || `Explore our verified network of premium ${slug} providers across the Salem district.`}
            </p>
            
            <div className="mt-10 flex items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2 text-xs font-bold text-white uppercase tracking-widest shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {businesses.length} Premium Listings
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
              <p className="font-sans font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing Directory...</p>
            </div>
          ) : businesses.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white rounded-[3rem] shadow-xl border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                <ChevronRight size={40} className="rotate-90" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">Establishing Connectivity...</h3>
              <p className="text-lg font-sans text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">No businesses have claimed this territory yet. Be the first to establish your digital presence.</p>
              <Link to="/register">
                <Button className="bg-indigo-600 hover:bg-slate-900 text-white font-sans font-bold px-12 py-8 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 text-lg">
                  Claim This Category →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
