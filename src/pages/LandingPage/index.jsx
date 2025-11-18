import Checkout from "../../components/LandingPage/Checkout";
import ContactUs from "../../components/LandingPage/ContactUs";
import FeaturesPage from "../../components/LandingPage/Feature";
import Footer from "../../components/LandingPage/Footer";
import Hero from "../../components/LandingPage/Hero";
import MenuPage from "../../components/LandingPage/Menu";
import Navbar from "../../components/ui/Navbar";


const LandingPages = () => {
  return (
    <>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <MenuPage />
      <section id="about">
        <FeaturesPage />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <Footer/>
      {/* <Checkout/> */}
    </>
  );
};


export default LandingPages;
