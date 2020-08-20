// import React, { useState } from "react";
// import { useMutation } from '@apollo/react-hooks';
// import Auth from "../utils/auth";
// import { ADD_USER } from "../utils/mutations";
// import ImageUpload from "../components/ImageUpload";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// // core components
// import Header from "../components/Header/Header.js";
// import HeaderLinks from "../components/Header/HeaderLinks.js";
// import Footer from "../components/Footer/Footer.js";
// import GridContainer from "../components/Grid/GridContainer.js";
// import GridItem from "../components/Grid/GridItem.js";
// import Button from "../components/CustomButtons/Button.js";
// import Card from "../components/Card/Card.js";
// import CardBody from "../components/Card/CardBody.js";
// import CardHeader from "../components/Card/CardHeader.js";
// import CardFooter from "../components/Card/CardFooter.js";
// import CustomInput from "../components/CustomInput/CustomInput.js";
// import styles from "../assets/jss/material-kit-react/views/loginPage.js";
// import image from "../assets/img/bg7.jpg";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles(styles);


// function Signup(props) {

//   const classes = useStyles();

//   const [formState, setFormState] = useState({ 
//     email: '', 
//     password: '', 
//     firstName: '', 
//     lastName: '', 
//     location: '', 
//     tutor: '', 
//     bio: ''
//   });
//   const [addUser] = useMutation(ADD_USER);
//   //console.log(addUser);
//   const handleFormSubmit = async event => {
//     event.preventDefault();
//     const mutationResponse = await addUser({
//       variables: {
//         firstName: formState.firstName, 
//         lastName: formState.lastName,
//         email: formState.email, 
//         password: formState.password,
//         location: formState.location,
//         tutor: formState.tutor,
//         bio: formState.bio
//       }
//     });
//     const token = mutationResponse.data.addUser.token;
//     Auth.login(token);
//   };
//   const handleChange = event => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value
//     });
//   };

//   return (
//     <div className="container my-1">

//     <Header
//         absolute
//         color="transparent"
//         // brand="Material Kit React"
//         // rightLinks={<HeaderLinks />}
//         // {...rest}
//       />

      
//       <Link to="/login">
//         ← Go to Login
//       </Link>
//       <h2>Signup</h2>
//       <form onSubmit={handleFormSubmit}>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             placeholder="First Name"
//             name="firstName"
//             type="text"
//             id="firstName"
//             onChange={handleChange}
//             // value={formState.firstName}
//           />
//         </div>

//         <div className="flex-row space-between my-2">
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             placeholder="Last Name"
//             name="lastName"
//             type="lastName"
//             id="lastName"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="email">Email:</label>
//           <input
//             placeholder="youremail@test.com"
//             name="email"
//             type="email"
//             id="email"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="pwd">Password:</label>
//           <input
//             placeholder="******"
//             name="password"
//             type="password"
//             id="pwd"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="tutor">Signing up as?</label>
//           <select 
//             id="tutor" 
//             name ="tutor" 
//             onChange={handleChange}>
//             <option value="Student">Student</option>
//             <option value="Tutor">Tutor</option>
//           </select>
//         </div>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="location">Choose a location</label>
//           <select 
//             id="location" 
//             name ="location" 
//             onChange={handleChange}>
//             <option value="AMER">AMER</option>
//             <option value="EMEA">EMEA</option>
//             <option value="APAC">APAC</option>
//           </select>
//         </div>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="bio">Bio:</label>
//           <textarea
//             placeholder="Provide some description about you and your skill set and what are you looking for..."
//             name="bio"
//             type="text"
//             id="bio"
//             rows = "6" 
//             onChange={handleChange}
//           />
//         </div>



//         <div className="">
//           <ImageUpload>
//           </ImageUpload>
//         </div>

//         <Button type="submit" color="primary" round>
//             Signup
//         </Button>

//       </form>
//       <Footer />
//       </div>
//   );
// }
// export default Signup;