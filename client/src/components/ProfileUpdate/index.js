import React, { useState, Component, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import OfferingItem from "../OfferingItem";
import {
  QUERY_OFFERINGS,
  QUERY_ALL_OFFERINGS,
  QUERY_PROFILE,
  QUERY_ME,
} from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import { UPDATE_OFFERINGS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
// import { off } from '../../../../server/models/User';
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  Redirect,
} from "react-router-dom";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER, UPDATE_USER } from "../../utils/mutations";
import Footer from "../Footer/Footer";
import Button from "../CustomButtons/Button.js";
import "../../assets/jss/material-kit-react/components/customInputStyle.js";
import CustomInput from "../CustomInput/CustomInput";
//============import from profile
import ImageUpload from "../ImageUpload";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "../Header/Header.js";
import HeaderLinks from "../Header/HeaderLinks.js";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import CardFooter from "../Card/CardFooter.js";
// import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/bg7.jpg";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Nav from "../Nav/index";
import Parallax from "../Parallax/Parallax";
import profile from "../../assets/img/faces/avatarimage.jpeg";
import classNames from "classnames";

//================================================

// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import NavPills from "../NavPills/NavPills.js";
import studio1 from "../../assets/img/examples/studio-1.jpg";
import studio2 from "../../assets/img/examples/studio-2.jpg";
import studio3 from "../../assets/img/examples/studio-3.jpg";
import studio4 from "../../assets/img/examples/studio-4.jpg";
import studio5 from "../../assets/img/examples/studio-5.jpg";
import work1 from "../../assets/img/examples/olu-eletu.jpg";
import work2 from "../../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "../../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "../../assets/img/examples/mariya-georgieva.jpg";
import work5 from "../../assets/img/examples/clem-onojegaw.jpg";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import { FaEdit, FaHome } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Comprehend } from "aws-sdk";

const useStyles = makeStyles(styles);

function ProfileUpdate(props) {
  let history = useHistory();

  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  //changes
  const { email: userParam } = useParams();
  const { loading, userData } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
    variables: { email: userParam },
  });
  const user = userData?.me || userData?.user || {};
  console.log(user);
  const [state, setState] = useState({ open: false });

  // const state = useSelector((state) => {
  //     return state
  //   });
  const dispatch = useDispatch();

  //   const { users } = state;
  //   const { loading, data: userData } = useQuery(QUERY_USER);

  //changes
  let location = useLocation();
  console.log(location);

  const [formState, setFormState] = useState({
    firstName: location.user.firstName,
    lastName: location.user.lastName,
    email: location.user.email,
    password: location.user.password,
    location: location.user.location,
    tutor: location.user.tutor,
    bio: location.user.bio,
    subject: location.user.subject,
  });
  // const [state, formState] = useState({ email: props.user.email , firstName: props.user.firstName});
  const [updateUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await updateUser({
      variables: {
        input: { ...formState },
      },
    });

    // console.log(mutationResponse)
    // const token = mutationResponse.data.updateUser.token;
    // Auth.login(token);

    history.push("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event);
    console.log(event.target.name);
    console.log(event.target.value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <Nav {...rest} />

      <Parallax
        small
        filter
        image={require("../../assets/img/profile-bg.jpg")}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={5} lg={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>{user.bio} </p>
            </div>
            <GridContainer justify="center">
              <GridItem
                xs={12}
                sm={12}
                md={8}
                lg={6}
                className={classes.navWrapper}
              >
                <form
                  className="mx-auto my-5 p-3 mb-2 bg-light text-dark"
                  onSubmit={async (event) => {
                    event.preventDefault();
                  }}
                  onSubmit={handleFormSubmit}
                >
                  <div className="form-group ">
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
                        value: formState.firstName,
                      }}
                    />
                  </div>

                  <div className="form-group ">
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
                        value: formState.lastName,
                      }}
                    />
                  </div>

                  <div className="form-group ">
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
                        value: formState.email,
                      }}
                    />
                  </div>

                  <div className="flex-row space-between my-2">
                    <label htmlFor="tutor">Signed up as:</label>
                    <select
                      id="tutor"
                      name="tutor"
                      className="form-control border border-info"
                      value={formState.tutor || ""}
                      onChange={handleChange}
                    >
                      <option value="tutor">Tutor </option>
                      <option value="student">Student</option>
                    </select>
                  </div>

                  <div className="flex-row space-between my-2">
                    <label htmlFor="location">Location:</label>
                    <select
                      id="location"
                      name="location"
                      className="form-control border border-info"
                      value={formState.location || ""}
                      onChange={handleChange}
                    >
                      <option value="AMER">AMER </option>
                      <option value="EMEA">EMEA</option>
                      <option value="APAC">APAC</option>
                    </select>
                  </div>

                  <div>
                    <CustomInput
                      labelText="Bio"
                      id="bio"
                      htmlFor="bio"
                      name="bio"
                      type="bio"
                      inputProps={{
                        name: "bio",
                        type: "bio",
                        onChange: handleChange,
                        value: formState.bio,
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    color="primary"
                    round
                    style={{ color: "#FFFFFF" }}
                  >
                    Update
                  </Button>

                  <Button type="submit" color="default" round simple>
                    <Link to="/">Home</Link>
                  </Button>
                </form>
              </GridItem>
            </GridContainer>
            <div></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileUpdate;