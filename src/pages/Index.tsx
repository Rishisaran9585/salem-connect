import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import FloatingSearch from "@/components/home/FloatingSearch";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import AZCategorySection from "@/components/home/AZCategorySection";
import WhyListSection from "@/components/home/WhyListSection";
import HowItWorks from "@/components/home/HowItWorks";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroCarousel />
        <FloatingSearch />
        
        <div className="my-20">
          <FeaturedGrid />
        </div>

        <StatsCounter />
        
        <div className="bg-gray-50">
          <AZCategorySection />
        </div>

        <WhyListSection />
        
        <div className="py-20 bg-white">
          <HowItWorks />
        </div>
      </main>

      {/* Partners Footer Section (City Directories) */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-center font-display font-bold text-[#1B4332]/40 uppercase tracking-widest text-sm mb-10">
            Our Business Networks Across Tamil Nadu
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
            {["Tiruchirappalli", "Tirupur", "Thoothukudi", "Vellore", "Erode", "Madurai"].map((city) => (
              <a key={city} href="#" className="font-sans font-bold text-[#1B4332]/60 hover:text-[#C9973A] transition-colors">
                {city} Directory
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
