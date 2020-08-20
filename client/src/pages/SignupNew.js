import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import ImageUpload from "../components/ImageUpload";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import image from "../assets/img/bg7.jpg";
import { Link } from "react-router-dom";
import CustomDropdown from '../components/CustomDropdown/CustomDropdown.js';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(styles);



export default function SignupNew(props) {


//   const [formState, setFormState] = useState({ email: '', password: '' })
//   console.log(formState);

//   const [login, { error }] = useMutation(LOGIN);
//   console.log(error);

//   const handleFormSubmit = async event => {
//     event.preventDefault();
//     console.log(event.target)
//     console.log(event.target.value)

//     try {
//       const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
//       const token = mutationResponse.data.login.token;
//       Auth.login(token);
//     } catch (e) {
//       console.log(e);
//     }
//   };




  //==================

  const classes = useStyles();

  const [formState, setFormState] = useState({ 
    email: '', 
    password: '', 
    firstName: '', 
    lastName: '', 
    location: '', 
    tutor: '', 
    bio: ''
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  //console.log(addUser);
  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        firstName: formState.firstName, 
        lastName: formState.lastName,
        email: formState.email, 
        password: formState.password,
        location: formState.location,
        tutor: formState.tutor,
        bio: formState.bio
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        // brand="Material Kit React"
        // rightLinks={<HeaderLinks />}
        // {...rest}
      />



      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >


        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5} lg={6}>
              <Card 
              //className={classes[cardAnimaton]}
              >
                <form className={classes.form} onSubmit={handleFormSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Signup</h4>

                  </CardHeader>
                  {/* <p className={classes.divider}>Or Be Classical</p> */}
                  <CardBody >

                    <div>
                    <CustomInput 
                      labelText="First Name"
                      id="firstName"
                      htmlFor="firstName"
                      name="firstName"
                      type="firstName"

                      inputProps={{
                        name: "firstName",
                        type: "firstName",
                        onChange: handleChange,
                        // value:formState.firstName,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                    <CustomInput
                      labelText="Last Name"
                      id="lastName"
                      htmlFor="lastName"
                      name="lastName"
                      type="lastName"

                      inputProps={{
                        name: "lastName",
                        type: "lastName",
                        onChange: handleChange,
                        // value:formState.lastName,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                </div>

                <div>


                    <CustomInput
                      labelText="Email"
                      id="email"
                      htmlFor="email"
                      name="email"
                      type="email"

                      inputProps={{
                        name: "email",
                        type: "email",
                        onChange: handleChange,
                        // value:formState.email,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />


                    <CustomInput
                      labelText="Password"
                      id="password"
                      htmlFor="pwd"
                      name ="password"
                      type="pwd"
                      inputProps={{
                        name:"password",
                        type: "password",
                        onChange: handleChange,
                        // value:formState.password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
        </div>


        <div className="flex-row space-between my-2">
                <label htmlFor="tutor">Signing up as?</label>
                <select 
                    id="tutor" 
                    name ="tutor" 
                    onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Tutor">Tutor</option>
                </select>
                </div>


                <div className="flex-row space-between my-2"> 
                 <label htmlFor="location">Choose a location</label>
                <select 
                    id="location" 
                    name ="location" 
                    onChange={handleChange}>
                    <option value="AMER">AMER</option>
                    <option value="EMEA">EMEA</option>
                    <option value="APAC">APAC</option>
                </select>


            {/* <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //   value="AMER"
                    onChange={handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="AMER">AMER</MenuItem>
                    <MenuItem value="EMEA">EMEA</MenuItem>
                    <MenuItem value="APAC">APAC</MenuItem>
                    </Select>
                </FormControl> */}


                </div>




{/* 
                <CustomDropdown
                        id="tutor"
                        htmlFor="tutor"
                        name ="tutor"
                        type="text"
                        buttonText="Signing up as?"
                        dropdownList={[
                        "Student",
                        "Tutor",
                        ]}
                        buttonProps={{
                            name:"tutor",
                            type: "text",
                            onChange: handleChange,
                            // value:formState.tutor,
                          }}
                    /> */}

                    {/* <CustomDropdown
                        id="location"
                        htmlFor="location"
                        name ="location"
                        type="location"
                        buttonText="Choose a location"
                        dropdownList={[
                        "AMER",
                        "EMEA",
                        "APAC",
                        ]}
                        buttonProps={{
                            name:"location",
                            type: "text",                           
                            onChange: handleChange,
                            // value:formState.location,
                          }}
                    /> */}


<div >


                    <CustomInput
                      labelText="Bio..."
                    //   placeholder="Placeholder bio"
                      id="bio"
                      htmlFor="bio"
                      name="bio"
                      type="bio"
                      rows = "6" 

                      inputProps={{
                        name: "bio",
                        type: "bio",
                        onChange: handleChange,
            
                        // value:formState.bio,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     {/* <Email className={classes.inputIconsColor} /> */}
                        //   </InputAdornment>
                        // )
                      }}
                    />
                    </div>

                  </CardBody>

                  <CardFooter className={classes.cardFooter}>



                    <Button type="submit" simple color="primary" size="lg" round>
                      Signup
                    </Button>

                    <div>
                    {/* <Button color="default" round simple > */}
                        <Link to="/login" color="primary"  round>
                            Go to Login
                        </Link>
                    {/* </Button> */}

                    </div>


                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}