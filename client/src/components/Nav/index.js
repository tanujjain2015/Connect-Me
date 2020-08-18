import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchedOfferings from "../../pages/SearchedOfferings"
import Cart from '../Cart';



function Nav() {

  const AppContext = React.createContext({});

  const [searchedSubjects, setSearchedSubjects] = useState({
    visible: false
  });

  const [searchInput, setSearchInput] = useState('');


  const handleFormSubmit = async (event) => {
    event.preventDefault();

  

    // if(searchedSubjects.visible == false) {
    //   setSearchedSubjects({
    //     visible: true
    //   })
    // }
      
    // try {
    //   // await allOfferings({
    //   //   // variables: { id: user._id }
    //   // })
    //   await allOfferings
    //   console.log(offerings, 'help')
    //   const setSearchedSubjects = (searchedSubjects + 1);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  function showNavigation() {
    
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">


          <li className="mx-1">
            <Link to="/orderHistory">
              Booked Lessons
            </Link>
          </li>

          <li className="mx-1">
            <Link to="/manageofferings">
              Manage Offerings
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

<button className="btn text-light my-2 my-sm-0" type="submit">Find A Tutor</button>
<button className="btn text-light my-2 my-sm-0" type="submit">About Us</button>
        
          <Link to="/login">
          <button className="btn text-light my-2 my-sm-0" type="submit">Login</button>
          </Link>
        <Link to="/signup">
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Join For Free</button>
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
        {/* <form className="form-inline ml-3" onSubmit={handleFormSubmit}> */}
        <form className="form-inline ml-3">
      {/* <form className="form-inline my-lg-0 position-absolute fixed-top mt-10 pl-5" onSubmit={async (event) => {
        event.preventDefault();
        await allOfferings;
        console.log("hit")
        setSearchedSubjects(searchedSubjects == 1);
        console.log(setSearchedSubjects)
      }}> */}

{/* onChange={(e) => setSearchInput(e.target.value)} */}
      <input className="form-control mr-sm-2 w-75" type="search" placeholder="Search For An Offering" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)} />
      <Link to={{
        pathname: '/SearchedOfferings',
        userInput:{
          input: searchInput
        }
      }}>

      <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </Link>
       </form>
      <nav className="">
        {showNavigation()}
        <Cart />
      </nav>
      
    </header>
  );
}

export default Nav;
