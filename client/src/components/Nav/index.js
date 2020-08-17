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
          <div className="my-2 text-center">

<button class="btn text-light my-2 my-sm-0" type="submit">Find A Tutor</button>
<button class="btn text-light my-2 my-sm-0" type="submit">About Us</button>
        
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
      <nav class="w-75">
        {showNavigation()}
        <Cart />
      </nav>
      
    </header>
  );
}

export default Nav;
