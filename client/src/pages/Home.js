import React from "react";
import OfferingList from "../components/OfferingList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import Example from '../components/Carousel'
import Nav from '../components/Nav';
import ManageOfferings from '../components/ManageOfferings';


const Home = () => {
  return (
    <div className="container">
      {/* <Nav /> */}
      {/* <ManageOfferings /> */}
      <Example />
      <CategoryMenu />
      <OfferingList />
      <Cart />

    </div>

  );
};

export default Home;
