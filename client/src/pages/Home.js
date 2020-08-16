import React, { useState } from "react";
import OfferingList from "../components/OfferingList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import Nav from '../components/Nav'
import HPImage from '../assets/HPimage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';



const Home = () => {
  return (
    <div className="container">
      {/* <Nav /> */}
      <img class="h-50" src={HPImage} alt="Home Page Tutor Image" />;
      <CategoryMenu />
      <OfferingList />
      <Cart />
    </div>
  );
};

export default Home;
