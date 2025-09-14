import ContactUs from "../../components/LandingPage/ContactUs";
import FeaturesPage from "../../components/LandingPage/Feature";
import Hero from "../../components/LandingPage/Hero";
import MenuPage from "../../components/LandingPage/Menu";
import Navbar from "../../components/ui/Navbar";

const LandingPages = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MenuPage />
      <FeaturesPage />
      <ContactUs />
    </>
  );
};

export default LandingPages;
