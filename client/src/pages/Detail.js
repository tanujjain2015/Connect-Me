import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_OFFERINGS } from "../utils/queries";
import spinner from '../assets/spinner.gif'
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../components/Cart';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_OFFERINGS,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';


function Detail() {


  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();



  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_OFFERINGS);

  const { offerings, cart } = state;

  useEffect(() => {
    // already in global store
    if (offerings.length) {
      setCurrentProduct(offerings.find(product => product._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_OFFERINGS,
        offerings: data.offerings
      });
  
      data.offerings.forEach((product) => {
        idbPromise('offerings', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('offerings', 'get').then((indexedOfferings) => {
        dispatch({
          type: UPDATE_OFFERINGS,
          offerings: indexedOfferings
        });
      });
    }
  }, [offerings, data, loading, dispatch, id]);



  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  }


  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
  
    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };



  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Home
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to cart
            </button>

            <button 
            disabled={!cart.find(p => p._id === currentProduct._id)} 
            onClick={removeFromCart}
          >
            Remove from Cart
          </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
