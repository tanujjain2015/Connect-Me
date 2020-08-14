import React, { useState } from "react";
import ProductList from "../components/OfferingList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import Nav from '../components/Nav'


const Home = () => {
  return (
    <div className="container">
      {/* <Nav /> */}
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
