// import React from "react";
// import { Link } from "react-router-dom";

// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_USER } from "../utils/queries";

// function OrderHistory() {
//   const { data } = useQuery(QUERY_USER);
//   let user;

//   if (data) {
//     user = data.user;
//   }

//   return (
//     <>
//       <div className="container my-1">
//         <Link to="/">
//           ← Back to Products
//           </Link>

//         {user ? (
//           <>
//             <h2>Order History for {user.firstName} {user.lastName}</h2>
//             {user.orders.map((order) => (
//               <div key={order._id} className="my-2">
//                 <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
//                 <div className="flex-row">
//                   {order.products.map(({ _id, image, name, price }, index) => (
//                     <div key={index} className="card px-1 py-1">
//                       <Link to={`/products/${_id}`}>
//                         <img
//                           alt={name}
//                           src={`/images/${image}`}
//                         />
//                         <p>{name}</p>
//                       </Link>
//                       <div>
//                         <span>${price}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </>
//         ) : null}

//       </div>

//     </>)

// };

// export default OrderHistory;

//==================
import React from "react";
// import { Link } from "react-router-dom";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  Redirect,
} from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from "../utils/queries";

//
import { makeStyles } from "@material-ui/core/styles";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import Button from "../components/CustomButtons/Button.js";

import { cardTitle } from "../assets/jss/material-kit-react.js";

function OrderHistory() {

  const styles = {
    cardTitle,
    textCenter: {
      textAlign: "center",
      // margin: "auto",
      margin:"10px"
    
    },
    textMuted: {
      color: "#6c757d",
    },
  };
  
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  //=============================================================
  const { data } = useQuery(QUERY_ME);
  let user;

  if (data) {
    user = data.me;
    //console.log(user);
    //console.log(user.firstName);
    //console.log(user.lastName);
  }
  
  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Home
          </Link>

        {user ? (
          <>
            <h2>Booked classes for {user.firstName} {user.lastName}</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <br/>
                <div className="flex-row">
                  {order.offerings.map(({ _id, image, name, price }, index) => (
                    // <div key={index} className="card px-1 py-1">
                      // <Link to={`/offerings/${_id}`}>
                      //   {/* <img
                      //     alt={name}
                      //     src={`/images/${image}`}
                      //   /> */}
                      //   <p>{name}</p>
                      // </Link>
                    //   <div>
                    //     <span>${price}</span>
                    //   </div>
                    // </div>
                    <div>
                    <Card className={classes.textCenter} style={{ width: 20 + "em" }} key={index}>
                      <CardHeader color="warning">
                      <Link to={`/offerings/${_id}`}>
                        {/* <img
                          alt={name}
                          src={`/images/${image}`}
                        /> */}
                        <p>{name}</p>
                      </Link>
                      </CardHeader>
                      <CardBody>
                        <h4 className={classes.cardTitle}>
                          ${price}
                        </h4>
    
                      </CardBody>
                    
                    </Card>
                  </div>
              
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}

      </div>

    </>)

};

export default OrderHistory;


