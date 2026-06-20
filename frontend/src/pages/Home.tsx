import CTABanner from "../components/CTABanner";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";

const Home = () => {
  return (
    <div className="bg-page">
      <Hero />
      <Features />
      <Pricing />
      <CTABanner />
      
    </div>
  );
};

export default Home;