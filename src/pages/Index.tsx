import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
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
        <StatsCounter />

        <div className="bg-gray-50">
          <AZCategorySection />
        </div>

        <WhyListSection />

        <div className="py-20 bg-white">
          <HowItWorks />
        </div>
      </main>


      <Footer />
    </div>
  );
}
