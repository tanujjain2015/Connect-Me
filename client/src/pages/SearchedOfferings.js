import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USEROFFERINGS } from "../utils/queries";
// import spinner from "../../assets/spinner.gif"
import spinner from "../assets/spinner.gif";
import { idbPromise } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Cart from "../components/Cart";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_OFFERINGS,
} from "../utils/actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import Button from "../components/CustomButtons/Button.js";

import { cardTitle } from "../assets/jss/material-kit-react.js";

function Offerings(props) {
  // const state = useSelector((state) => {
  //     return state
  //   });
  //   const dispatch = useDispatch();

  //   const { id } = useParams();
  //   const [currentOffering, setCurrentOffering] = useState({});

  console.log(props.location.userInput);
  const userInput = props.location.userInput.input;
  console.log(userInput);

  console.log(QUERY_USEROFFERINGS, {
    variables: { name: userInput },
  });
  const { loading, data } = useQuery(QUERY_USEROFFERINGS, {
    variables: { name: userInput },
  });

  console.log(data);

  const userOffering = data?.searchOffering || {};
  // const userOffering = data

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
  };

  console.log(userOffering.length);

  const styles = {
    cardTitle,
    textCenter: {
      textAlign: "center",
      margin: "auto",
    },
    textMuted: {
      color: "#6c757d",
    },
  };
  
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <>
      <div className="my-2 mx-2">
        
        {userOffering.length ? (
          userOffering.map((thought) => (
            <Card className={classes.textCenter} style={{ width: 35 + "em" }} key={thought._id}>
            <CardHeader color="warning"> 
              <Link to={`/offerings/${thought._id}`}><strong>{thought.name}</strong></Link>
              <br />
              <strong>{thought.quantity} item in stock</strong>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                {thought.description}
              </h4>
              <Button color="primary" round simple>
                <Link to="/">Home</Link>
              </Button>
            </CardBody>
          </Card>
          ))
        ) : (
          <h3>No Results Returned! Enter A New Offering</h3>
        )}
        {loading ? <img src={spinner} alt="loading" /> : null}
      </div>
    </>
  );
  
}

export default Offerings;