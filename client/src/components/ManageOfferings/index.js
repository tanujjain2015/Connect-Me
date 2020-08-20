import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  QUERY_SUBJECTS,
  QUERY_OFFERINGS,
  QUERY_PROFILE,
  QUERY_ME,
} from "../../utils/queries";
import { UPDATE_SUBJECTS, UPDATE_CURRENT_SUBJECT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { ADD_OFFERING } from "../../utils/mutations";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  Redirect,
} from "react-router-dom";
import {} from "../../utils/queries";
import Auth from "../../utils/auth";
import Footer from "../Footer/Footer";
import Button from "../CustomButtons/Button";

//================================================================
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
import { makeStyles } from "@material-ui/core/styles";
import Nav from "../Nav/index";
import Parallax from "../Parallax/Parallax";
import profile from "../../assets/img/faces/avatarimage.jpeg";
import classNames from "classnames";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";


const useStyles = makeStyles(styles);

function ManageOfferings(props) {
  let history = useHistory();

  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);



  const { email: userParam } = useParams();
  const { loading, userData } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
    variables: { email: userParam },
  });
  const user = userData?.me || userData?.user || {};
  console.log(user);
  const [state, setState] = useState({ open: false });


  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    subject: "",
  });
  const [addOffering] = useMutation(ADD_OFFERING);
  console.log(addOffering);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await addOffering({
      variables: {
        name: formState.name,
        description: formState.description,
        price: Number(formState.price),
        quantity: Number(formState.quantity),
        subject: formState.subject,
      },
    });
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
        onSubmit={handleFormSubmit}
      >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Offering Name</label>
            <input
              name="name"
              type="text"
              className="form-control border border-info"
              id="name"
              //  value = {formState.name || ''}
            //   onChange={(event) => {
            //     const { name, value } = event.target;
            //     console.log(event);
            //     console.log(event.target.name);
            //     console.log(event.target.value);
            //     setFormState({
            //       ...formState,
            //       [name]: value,
            //     });
            //   }}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="description">Offering Description</label>
            <textarea
              name="description"
              type="text"
              className="form-control border border-info"
              id="description"
              //  value = {formState.description || ''}
            //   onChange={(event) => {
            //     const { name, value } = event.target;
            //     console.log(event);
            //     console.log(event.target.name);
            //     console.log(event.target.value);
            //     setFormState({
            //       ...formState,
            //       [name]: value,
            //     });
            //   }}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="price">Fee</label>
            <input
              name="price"
              type="number"
              className="form-control border border-info"
              id="price"
              //  value = {formState.price || ''}
            //   onChange={(event) => {
            //     const { name, value } = event.target;
            //     console.log(event);
            //     console.log(event.target.name);
            //     console.log(event.target.value);
            //     setFormState({
            //       ...formState,
            //       [name]: value,
            //     });
            //   }}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="quantity">Quantity</label>
            <input
              name="quantity"
              type="number"
              className="form-control border border-info"
              id="quantity"
              //  value = {formState.quantity || ''}
            //   onChange={(event) => {
            //     const { name, value } = event.target;
            //     console.log(event);
            //     console.log(event.target.name);
            //     console.log(event.target.value);
            //     setFormState({
            //       ...formState,
            //       [name]: value,
            //     });
            //   }}
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              className="form-control border border-info"
              // value = {[formState.subject] || ''}

            //   onChange={(event) => {
            //     const { name, value } = event.target;
            //     console.log(event);
            //     console.log("Subject logs", event.target.name);
            //     console.log("Subject logs", event.target.value);
            //     setFormState({
            //       ...formState,
            //       [name]: value,
            //     });
            //   }}
              onChange={handleChange}
            >
              <option value="5f3ca2bc002bf133b95fb974">Computer Science</option>
              <option value="5f3ca2bc002bf133b95fb975">Science</option>
              <option value="5f3ca2bc002bf133b95fb976">Maths</option>
              <option value="5f3ca2bc002bf133b95fb977">Biology</option>
              <option value="5f3ca2bc002bf133b95fb978">Geography</option>
              <option value="5f3d3d583b77278add543cbc">Foreign Languages</option>
            </select>
          </div>
        </div>


        <Button
          type="submit"
          color="primary"
          round
          style={{ color: "#FFFFFF" }}
        >
          Add Offering
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

export default ManageOfferings;