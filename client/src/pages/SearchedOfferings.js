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

  return (
    <>
      <div className="my-2 mx-2">
        <h2>Our Offerings:</h2>
        {userOffering.length ? (
          userOffering.map((thought) => (
            <div key={thought._id} className="card mb-3">
              <Link to={`/offerings/${thought._id}`}>
                <p className="card-header">{thought.name}</p>
              </Link>
              <div className="card-body">
                <p>{thought.description}</p>
              </div>
            </div>
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