import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME, QUERY_PROFILE } from "../utils/queries";
import { Redirect, useParams } from 'react-router-dom';

function OrderHistory() {
  // const { data } = useQuery(QUERY_USER);
  // let user;

  // if (data) {
  //   user = data.user;
  // }

  const { email: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
        variables: { email : userParam }
    });
    const user = data?.me || data?.user || {};

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Home
          </Link>

        {/* {user ? ( */}
          <>
            <h2>Schedule for {user.firstName} {user.lastName}</h2>
            {/* {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <div className="flex-row">
                  {order.offerings.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/offerings/${_id}`}>
                        <img
                          alt={name}
                          src={`/images/${image}`}
                        />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </> */}
         {/* : null} */}
          </>
      </div>

    </>)

};

export default OrderHistory;
