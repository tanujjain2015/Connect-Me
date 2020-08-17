import React, { useState } from "react";
import OfferingList from "../components/OfferingList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import Nav from '../components/Nav'
import HPImage from '../assets/HPimage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';



const Home = () => {

    // create state for holding returned subject data
    const [searchedSubjects, setSearchedSubjects] = useState([]);

      // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="container">
      {/* <Nav /> */}
      <div class="position-relative d-inline-block">
        
      <img class="h-50" src={HPImage} alt="Home Page Tutor Image" />

      <form class="form-inline my-lg-0 position-absolute fixed-top mt-10 pl-5">
      <input class="form-control mr-sm-2 w-75" type="search" placeholder="Enter A Subject" aria-label="Search" />
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
       </form>
      </div>
      {/* <CategoryMenu />
      <OfferingList /> */}
      <Cart />
    </div>
  );
};

export default Home;
