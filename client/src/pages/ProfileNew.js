import React, { useState, Component, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import NavPills from "../components/NavPills/NavPills.js";
import Parallax from "../components/Parallax/Parallax.js";

import profile from "../assets/img/faces/avatarimage.jpeg";

import studio1 from "../assets/img/examples/studio-1.jpg";
import studio2 from "../assets/img/examples/studio-2.jpg";
import studio3 from "../assets/img/examples/studio-3.jpg";
import studio4 from "../assets/img/examples/studio-4.jpg";
import studio5 from "../assets/img/examples/studio-5.jpg";
import work1 from "../assets/img/examples/olu-eletu.jpg";
import work2 from "../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "../assets/img/examples/mariya-georgieva.jpg";
import work5 from "../assets/img/examples/clem-onojegaw.jpg";

import styles from "../assets/jss/material-kit-react/views/profilePage.js";

// import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";


import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER, UPDATE_USER } from "../utils/mutations";
import ImageUpload from "../components/ImageUpload";
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { FaEdit, FaHome } from "react-icons/fa";
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Comprehend } from "aws-sdk";


const useStyles = makeStyles(styles);

export default function ProfileNew(props) {

    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);


    const { email: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
        variables: { email : userParam }
    });
    const user = data?.me || data?.user || {};
    console.log(user);
    const [state, setState] = useState({open: false});


    const [updateUser, { newData }] = useMutation(UPDATE_USER)
    console.log(newData )


    //redirect to personal profile page if email is the loggedin user's
    if(Auth.loggedIn() && Auth.getProfile().data.email.toLowerCase() === `${userParam ? userParam.toLowerCase() : ''}`) {
        return <Redirect to="/profile" />
    }
    if(loading) {
        return <div>Loading...</div>;
    }
    //if not loggedin
    if(!user?.email) {
        return(
            <h4>
                You need to be loggedIn to see this page. Use the navigation link to Signup or Login!
            </h4>
        )
    }


  return (
    <div>
      <Header
        color="transparent"
        // brand="Material Kit React"
        // rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("../assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{user.firstName} {user.lastName}</h3>
                    <h6>{user.tutor}</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                {user.bio}
                {" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>

                
              </GridItem>

            </GridContainer>


            <div>
    <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" onSubmit={async event => {event.preventDefault()}}>
               
                         <div className = "form-group col-md-6">
                            <label htmlFor = "firstName">First Name:</label>
                            <p>{user.firstName}</p>


                        </div>
                       <div className = "form-group col-md-6">
                            <label htmlFor = "lastName">Last Name:</label>
                            <p>{user.lastName}</p>
                        </div>


                    <div className = "form-group col-md-6">
                        <label htmlFor="email">Email:</label>
                        <p>{user.email}</p>
                    </div>



                    <div className="form-group col-md-6">
                    <label htmlFor="tutor">Signed up as:</label>
                    <p>{user.tutor}</p>

                    </div>

                    <div className="form-group col-md-6">
                    <label htmlFor="bio">Bio:</label>
                    <p 
                        id="bio"
                        >
                        {user.bio}
                        </p>
                    </div>



                         <div className="form-group col-md-4">
                             <label htmlFor="location">Location:</label>
                             <p>{user.location}</p>
                        </div>


                         <div className="form-group col-md-4">
                             <label htmlFor="subject">Your Subjects:</label>
                            {/* <select id = "subject" name="subject" className = "form-control border border-info" multiple >
                                 <option>{[user.subject]}</option> */}
                                 {/* <option value="Science">Science</option>
                                 <option value="Maths">Maths</option>
                                 <option value="Biology">Biology</option>
                                 <option value="Geography">Geography</option> */}
                             {/* </select> */}
                             <p>{user.subject}</p>
                        </div>
             

                <Button type="submit" color="primary" round onClick={() => {setState({open: !state.open})}}>
                    <Link style={{color: "#FFFFFF"}} to ={{pathname: '/profileupdate',user }}>Edit Profile</Link>
                </Button>

                <Button type="submit" color="default" round simple>
                        <Link to="/">Home</Link>
                </Button>

     </form>
    </div>




          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
