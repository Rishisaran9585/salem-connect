import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import HowItWorks from "@/components/home/HowItWorks";
import FloatingSearch from "@/components/home/FloatingSearch";
import FeaturedBusinesses from "@/components/home/FeaturedBusinesses";


export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroCarousel />
        <StatsCounter />


        <div className="py-20 bg-white">
          <HowItWorks />
        </div>
      </main>


      <Footer />
    </div>
  );
}
