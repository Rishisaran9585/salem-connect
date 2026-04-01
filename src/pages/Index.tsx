import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import SearchBar from "@/components/home/SearchBar";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import AZCategorySection from "@/components/home/AZCategorySection";
import WhyListSection from "@/components/home/WhyListSection";
import HowItWorks from "@/components/home/HowItWorks";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <SearchBar />
        <StatsCounter />
        <FeaturedCategories />
        <AZCategorySection />
        <WhyListSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
