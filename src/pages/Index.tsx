import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import TravelSection from "@/components/TravelSection";
import PhotoGrid from "@/components/PhotoGrid";
import RegistrySection from "@/components/RegistrySection";
import FooterRSVP from "@/components/FooterRSVP";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <HeroSection />
    <EventDetails />
    <TravelSection />
    <PhotoGrid />
    <RegistrySection />
    <FooterRSVP />
  </div>
);

export default Index;
