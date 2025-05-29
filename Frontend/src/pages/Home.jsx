import { AboutSection } from "../components/AboutSection";
import Hero from "../components/Hero";
import MastersSection from "../components/MastersSection";
import Testimonial from "../components/Testimonial";
import VideoSection from "../components/VideoSection";
import HowItWorks from "../components/HowItWorks"
import FAQs from "../components/FAQs";
import JoinUs from "../components/JoinUs";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div className="flex flex-col ">
      <Hero />
      <AboutSection/>
      <MastersSection />
      <VideoSection/>
      <Testimonial/>
      <HowItWorks/>
      <FAQs/>
      <JoinUs/>
      <Footer/>
    </div>
  );
};

export default Home;
