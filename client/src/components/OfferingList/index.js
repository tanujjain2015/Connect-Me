import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import OfferingItem from "../OfferingItem";
import { QUERY_OFFERINGS, QUERY_ALL_OFFERINGS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"
import { UPDATE_OFFERINGS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
// import { off } from '../../../../server/models/User';
import Typography  from "@material-ui/core/Typography";
import Danger from '../Typography/Danger';


function OfferingList() {


  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();

  const { currentSubject } = state;
  
  const { loading, data } = useQuery(QUERY_ALL_OFFERINGS);

  const offerings = data?.offerings || [];
  
  useEffect(() => {
    //if there is data to be stored
    if (data) {
      dispatch({
        type: UPDATE_OFFERINGS,
        offerings: data.offerings
      });
      // but let's also take each offering and save it to IndexedDB using the helper function
      data.offerings.forEach((offering) => {
        idbPromise('offerings', 'put', offering)
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
    if (!currentSubject) {
      return state.offerings;
    }
  
    return state.offerings.filter(offering => offering.subject._id === currentSubject);
  }


  return (
    <div className="my-2">
     <Typography variant="h4" gutterBottom>
       Our Offerings
      </Typography> 
      {offerings.length ? (
        <div className="flex-row">
            {filterOfferings().map(offering => (
                <OfferingItem
                  key= {offering._id}
                  _id={offering._id}
                  // image={offering.image}
                  // name={offering.name}
                  // image={offering.image}
                  name={offering.name}
                  description={offering.description}
                  price={offering.price}
                  quantity={offering.quantity}
                  subject={offering.subject}
                />
            ))}
        </div>
      ) : (
        <Danger>
        <h3>You haven't added any offerings yet!</h3>
        </Danger>

      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default OfferingList;
