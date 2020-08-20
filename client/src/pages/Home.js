import React from "react";
import OfferingList from "../components/OfferingList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import CarouselNav from "../components/Carousel";
import Nav from "../components/Nav";
import ManageOfferings from "../components/ManageOfferings";
import Footer from "../components/Footer/Footer";
import Parallax from "../components/Parallax/Parallax";
import SectionCarousel from "../views/Components/Sections/SectionCarousel.js";

const Home = () => {
  return (
    <div className="container">
      {/* <Nav /> */}
      {/* <ManageOfferings /> */}
      {/* <CarouselNav /> */}
      <SectionCarousel />
      <CategoryMenu />
      <OfferingList />
      <Cart />
      <Footer />
    </div>
  );
};
export default Home;