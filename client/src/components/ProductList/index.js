import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ProductItem from "../ProductItem";
import { QUERY_OFFERINGS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"
import { UPDATE_OFFERINGS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
// import { off } from '../../../../server/models/User';


function ProductList() {


  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();

  const { currentCategory } = state;
  
  const { loading, data } = useQuery(QUERY_OFFERINGS);

  const offerings = data?.offerings || [];
  
  useEffect(() => {
    //if there is data to be stored
    if (data) {
      dispatch({
        type: UPDATE_OFFERINGS,
        offerings: data.offerings
      });
      // but let's also take each product and save it to IndexedDB using the helper function
      data.offerings.forEach((product) => {
        idbPromise('offerings', 'put', product)
      });

      // add else if to check if `loading` is undefined in `useQuery()` Hook
  
    } else if (!loading) {
      //since we are offline, get all if the data from the offerings store

      idbPromise('offerings', 'get').then((offerings) => {
        //use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_OFFERINGS,
          offerings: offerings
        })
      })
    }
  }, [data, loading, dispatch]);

  
  function filterOfferings() {
    if (!currentCategory) {
      return state.offerings;
    }
  
    return state.offerings.filter(product => product.category._id === currentCategory);
  }


  return (
    <div className="my-2">
      <h2>Our Offerings:</h2>
      {offerings.length ? (
        <div className="flex-row">
            {filterOfferings().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any offerings yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
