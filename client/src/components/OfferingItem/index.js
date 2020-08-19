// import React from "react";
// import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY} from '../../utils/actions';
// import { idbPromise } from "../../utils/helpers";
// import { useDispatch, useSelector } from 'react-redux';

// function OfferingItem(item) {

//   const state = useSelector((state) => {
//     return state
//   });
//   const dispatch = useDispatch();

//   const { cart } = state;


//   const addToCart = () => {
//     const itemInCart = cart.find((cartItem) => cartItem._id === _id)
//     if (itemInCart) {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: _id,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//       idbPromise('cart', 'put', {
//         ...itemInCart,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//     } else {
//       dispatch({
//         type: ADD_TO_CART,
//         offering: { ...item, purchaseQuantity: 1 }
//       });
//       idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
//     }
//   }



//   const {
//     // image,
//     name,
//     _id,
//     price,
//     quantity
//   } = item;




//   return (
//     <div className="card px-1 py-1 mx-2 my-2">
//       <Link to={`/offerings/${_id}`}>
//         {/* <img
//           alt={name}
//           src={image}
//         /> */}
//         <h4>{name}</h4>
//       </Link>
//       <div>
//         <div>{quantity} {pluralize("item", quantity)} in stock</div>
//         <span>${price}</span>
//       </div>
//       <button onClick={addToCart}>Add to cart</button>
//     </div>
//   );
// }

// export default OfferingItem;




import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import Button from "../CustomButtons/Button.js";

import { cardTitle } from "../../assets/jss/material-kit-react"
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { ADD_TO_CART, UPDATE_CART_QUANTITY} from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';

const styles = {
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function OfferingItem(item) {


  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();

  const { cart } = state;


  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        offering: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }
  const {
    // image,
    name,
    _id,
    price,
    quantity
  } = item;

  const classes = useStyles();
  return (
    <Card style={{width: "20rem"}} className="mx-2">
      <CardHeader color="warning">
      <Link to={`/offerings/${_id}`}>
         {/* <img
           alt={name}
           src={image}
         /> */}
         <h4>{name}</h4>
       </Link> 
      </CardHeader>

      <CardBody>
        <h4 className={classes.cardTitle}>{quantity} {pluralize("item", quantity)} in stock</h4>
        <span>${price}</span>
        <br/>

        <Button color="primary" onClick={addToCart} round>Add to cart</Button>
      </CardBody>
    </Card>
  );
}

