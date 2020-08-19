import React, { useState } from "react";
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

import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

const useStyles = makeStyles(styles);



export default function LoginNew(props) {
//   const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
//   setTimeout(function() {
//     setCardAnimation("");
//   }, 700);
  const classes = useStyles();

//   const { ...rest } = props;

  //existing code from Login

  const [formState, setFormState] = useState({ email: '', password: '' })
  console.log(formState);

  const [login, { error }] = useMutation(LOGIN);
  console.log(error);

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(event.target)
    console.log(event.target.value)

    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
    console.log(event.target)
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
            <GridItem xs={12} sm={12} md={4}>
              <Card 
              //className={classes[cardAnimaton]}
              >
                <form className={classes.form} onSubmit={handleFormSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      {/* <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button> */}
                      {/* <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button> */}
                      {/* <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button> */}
                    </div>
                  </CardHeader>
                  {/* <p className={classes.divider}>Or Be Classical</p> */}
                  <CardBody>




                    <CustomInput
                      labelText="Email..."
                      id="email"
                    //   formControlProps={{
                    //     fullWidth: true
                    //   }}
                      htmlFor="email"
                      name="email"
                      type="email"
                    //   value={formState.email}
                    //   onChange={handleChange}
                      

                      inputProps={{
                        name: "email",
                        type: "email",
                        onChange: handleChange,
                        value:formState.email,
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
                    //   formControlProps={{
                    //     fullWidth: true
                    //   }}
                      htmlFor="pwd"
                      name ="password"
                      type="pwd"
                    //   value={formState.password}
                    //   onChange={handleChange}

                      inputProps={{
                        name:"password",
                        type: "password",
                        onChange: handleChange,
                        value:formState.password,
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



                  </CardBody>

                  {
                    error ? <div>
                        <p className="error-text" >The provided credentials are incorrect</p>
                    </div> : null
                    }

                  <CardFooter className={classes.cardFooter}>


                    {/* <Button type="submit" color="primary" size="lg" round >
                            Login
                    </Button> */}
                    {/* </div> */}
                    <Button type="submit" simple color="primary" size="lg" round>
                      Get started
                    </Button>

                    <div>
                    {/* <Button color="default" round simple > */}
                        <Link to="/signup" color="primary"  round>
                            Go to Signup
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
