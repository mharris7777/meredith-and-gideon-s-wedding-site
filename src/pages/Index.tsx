import "./Homepage.css";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TravelSection from "@/components/TravelSection";
import PhotoGrid from "@/components/PhotoGrid";
import RegistrySection from "@/components/RegistrySection";
import FooterRSVP from "@/components/FooterRSVP";

const Index = () => (
  <div className="min-h-screen bg-background homepage-gradient homepage-compact">
    <Navigation />
    <HeroSection />
    <PhotoGrid />
    <div className="homepage-details">
      <TravelSection />
      <RegistrySection />
    </div>
    <FooterRSVP />
  </div>
);

export default Index;
