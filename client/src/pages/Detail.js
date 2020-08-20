import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_OFFERINGS } from "../utils/queries";
import spinner from "../assets/spinner.gif";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../components/Cart";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_OFFERINGS,
} from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import Button from "../components/CustomButtons/Button.js";

import { cardTitle } from "../assets/jss/material-kit-react.js";

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

export default function Detail() {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const { id } = useParams();

  const [currentOffering, setCurrentOffering] = useState({});

  const { loading, data } = useQuery(QUERY_OFFERINGS);

  const { offerings, cart } = state;

  useEffect(() => {
    // already in global store
    if (offerings.length) {
      setCurrentOffering(offerings.find((offering) => offering._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_OFFERINGS,
        offerings: data.offerings,
      });

      data.offerings.forEach((offering) => {
        idbPromise("offerings", "put", offering);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("offerings", "get").then((indexedOfferings) => {
        dispatch({
          type: UPDATE_OFFERINGS,
          offerings: indexedOfferings,
        });
      });
    }
  }, [offerings, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        offering: { ...currentOffering, purchaseQuantity: 1 },
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise("cart", "put", { ...currentOffering, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentOffering._id,
    });

    // upon removal from cart, delete the item from IndexedDB using the `currentOffering._id` to locate what to remove
    idbPromise("cart", "delete", { ...currentOffering });
  };

  const classes = useStyles();

  return (
    <>
      {currentOffering ? (
        <div>
          <Card className={classes.textCenter} style={{ width: 35 + "em" }}>
            <CardHeader color="warning">
              <strong>{currentOffering.name}</strong>
              <br />
              <strong>{currentOffering.quantity} item in stock</strong>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                {currentOffering.description}
              </h4>

              <p>
                <strong>Price:</strong>${currentOffering.price} <br />
                <Button
                  type="submit"
                  color="primary"
                  round
                  style={{ color: "#FFFFFF" }}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  type="submit"
                  color="default"
                  round
                  disabled={!cart.find((p) => p._id === currentOffering._id)}
                  onClick={removeFromCart}
                >
                  Remove from Cart
                </Button>
              </p>

              <Button color="primary" round simple>
                <Link to="/">Home</Link>
              </Button>
            </CardBody>
            <CardFooter className={classes.textMuted}>
              {currentOffering.createdAt}
            </CardFooter>
          </Card>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}
