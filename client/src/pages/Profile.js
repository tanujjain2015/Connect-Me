// import React, { useState, Component, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from '@apollo/react-hooks';
// import Auth from "../utils/auth";
// import { ADD_USER, UPDATE_USER } from "../utils/mutations";
// import ImageUpload from "../components/ImageUpload";
// import { Redirect, useParams } from 'react-router-dom';
// import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
// //import Preview from '../assets/preview.jpg'
// import { useQuery } from '@apollo/react-hooks';
// // //Icons
// import { FaEdit, FaHome } from "react-icons/fa";
// //Bootstarp imports
// import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Comprehend } from "aws-sdk";
// // import { Button, Box } from '@material-ui/core';
// import Footer from '../components/Footer/Footer';
// import Button from '../components/CustomButtons/Button';


// function Profile(props) {
//     const { email: userParam } = useParams();
//     const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
//         variables: { email : userParam }
//     });
//     const user = data?.me || data?.user || {};
//     console.log(user);
//     const [state, setState] = useState({open: false});


//     const [updateUser, { newData }] = useMutation(UPDATE_USER)
//     console.log(newData )


//     //redirect to personal profile page if email is the loggedin user's
//     if(Auth.loggedIn() && Auth.getProfile().data.email.toLowerCase() === `${userParam ? userParam.toLowerCase() : ''}`) {
//         return <Redirect to="/profile" />
//     }
//     if(loading) {
//         return <div>Loading...</div>;
//     }
//     //if not loggedin
//     if(!user?.email) {
//         return(
//             <h4>
//                 You need to be loggedIn to see this page. Use the navigation link to Signup or Login!
//             </h4>
//         )
//     }



//   return(
//       <div>
//     <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" onSubmit={async event => {event.preventDefault()}}>
               
//                          <div className = "form-group col-md-6">
//                             <label htmlFor = "firstName">First Name:</label>
//                             <p>{user.firstName}</p>


//                         </div>
//                        <div className = "form-group col-md-6">
//                             <label htmlFor = "lastName">Last Name:</label>
//                             <p>{user.lastName}</p>
//                         </div>


//                     <div className = "form-group col-md-6">
//                         <label htmlFor="email">Email:</label>
//                         <p>{user.email}</p>
//                     </div>



//                     <div className="form-group col-md-6">
//                     <label htmlFor="tutor">Signed up as:</label>
//                     <p>{user.tutor}</p>

//                     </div>

//                     <div className="form-group col-md-6">
//                     <label htmlFor="bio">Bio:</label>
//                     <p 
//                         id="bio"
//                         >
//                         {user.bio}
//                         </p>
//                     </div>



//                          <div className="form-group col-md-4">
//                              <label htmlFor="location">Location:</label>
//                              <p>{user.location}</p>
//                         </div>


//                          <div className="form-group col-md-4">
//                              <label htmlFor="subject">Your Subjects:</label>
//                             {/* <select id = "subject" name="subject" className = "form-control border border-info" multiple >
//                                  <option>{[user.subject]}</option> */}
//                                  {/* <option value="Science">Science</option>
//                                  <option value="Maths">Maths</option>
//                                  <option value="Biology">Biology</option>
//                                  <option value="Geography">Geography</option> */}
//                              {/* </select> */}
//                              <p>{user.subject}</p>
//                         </div>


             

//                     <Button type="submit" color="primary" round onClick={() => {setState({open: !state.open})}}>
//                             <Link style={{color: "#FFFFFF"}} to ={{pathname: '/profileupdate',user }}>Edit Profile</Link>
//                     </Button>

//                     <Button type="submit" color="default" round simple>
//                             <Link to="/">Home</Link>
//                     </Button>

//      </form>
//     //     

//     <Footer />
//     </div>

    
//   )
  
// }
// export default Profile;