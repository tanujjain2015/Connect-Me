import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Cart from '../Cart';



function Nav() {

  function showNavigation() {
    
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/myschedule">
              My Schedule
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/profile">
              My Profile
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        // <ul className="flex-row">
        //   <li className="mx-1">
        //     {/* <Link to="/tutorsignup">
        //       Tutor on Connnect Me
        //     </Link> */}
        //   </li>
        //   <li className="mx-1">
        //     <Link to="/signup">
        //       Signup
        //     </Link>
        //   </li>
        //   <li className="mx-1">
        //     <Link to="/login">
        //       Login
        //     </Link>
        //   </li>
        // </ul>
        <div class="my-2 justify-content-end">
          <Link to="/login">
          <button class="btn text-light my-2 my-sm-0" type="submit">Login</button>
          </Link>
        <Link to="/signup">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Join For Free</button>
        </Link>
        </div>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          {/* <span role="img" aria-label="shopping bag">🛍</span> */}
          Connect Me
        </Link>
      </h1>

      <form class="form-inline my-2 my-lg-0 justify-content-center">
      <input class="form-control mr-sm-2" type="search" placeholder="Enter A Subject" aria-label="Search" />
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
       </form>
      <nav>
        {showNavigation()}
        <Cart />
      </nav>
      
    </header>
  );
}

export default Nav;
