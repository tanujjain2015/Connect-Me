// import React from "react";
// import OfferingList from "../components/OfferingList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from '../components/Cart';
// <<<<<<< feature/nirupama
// import Example from '../components/Carousel'
// import Nav from '../components/Nav';
// =======
// import { useQuery } from '@apollo/react-hooks';
// import Nav from '../components/Nav'
// import HPImage from '../assets/HPimage.jpg';
// import { QUERY_ALL_OFFERINGS } from "../utils/queries";
// import spinner from '../assets/spinner.gif'
// import 'bootstrap/dist/css/bootstrap.min.css';
// >>>>>>> develop
// import ManageOfferings from '../components/ManageOfferings';


// const Home = () => {

//     // create state for holding returned subject data
//     const [searchedSubjects, setSearchedSubjects] = useState({
//       visible: false
//     });

//       // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState('');

//   const { loading, data } = useQuery(QUERY_ALL_OFFERINGS);
//   const offerings = data?.offerings || [];

//   // const {allOfferings} = useQuery(QUERY_ALL_OFFERINGS);
//   // console.log(allOfferings, 'josh')


//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     if(searchedSubjects.visible == false) {
//       setSearchedSubjects({
//         visible: true
//       })
//     }
      
//     // try {
//     //   // await allOfferings({
//     //   //   // variables: { id: user._id }
//     //   // })
//     //   await allOfferings
//     //   console.log(offerings, 'help')
//     //   const setSearchedSubjects = (searchedSubjects + 1);
//     // } catch (e) {
//     //   console.error(e);
//     // }
//   };

//   return (
//     <>
//     {searchedSubjects.visible == false
//             ? //`Viewing ${searchedBooks.length} results:`
            
//     <div className="container">
// <<<<<<< feature/nirupama
//       {/* <Nav /> */}
//       {/* <ManageOfferings /> */}
//       <Example />
//       <CategoryMenu />
//       <OfferingList />
// =======
//       <div className="position-relative d-inline-block">
        
//       <img className="h-50" src={HPImage} alt="Home Page Tutor Image" />

//       <form className="form-inline my-lg-0 position-absolute fixed-top mt-10 pl-5" onSubmit={handleFormSubmit}>
//       {/* <form className="form-inline my-lg-0 position-absolute fixed-top mt-10 pl-5" onSubmit={async (event) => {
//         event.preventDefault();
//         await allOfferings;
//         console.log("hit")
//         setSearchedSubjects(searchedSubjects == 1);
//         console.log(setSearchedSubjects)
//       }}> */}
//       <input className="form-control mr-sm-2 w-75" type="search" placeholder="Enter A Subject" aria-label="Search" />
//       <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
//        </form>
//       </div>
//       {/* <CategoryMenu />
//       <OfferingList /> */}
// >>>>>>> develop
//       <Cart />

//     </div>
//     : 
//     <div>
//     {offerings &&
//       offerings.map(thought => (
//         <div key={thought._id} className="card mb-3 container">
//           <div className="row">
//           <p className="card-header">
//             {thought.username}
//             Price: {thought.price}
//           </p>
//           <div className="card-body">
//             <p>{thought.thoughtText}</p>
//             <p className="mb-0">
//               <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick="">Search</button>
//             </p>
//           </div>
//           </div>
//         </div>
//       ))}
//       </div>


//   //   <div className="container my-1">

//   //   <h2>{currentOffering.name}</h2>

//   //   <p>
//   //     {currentOffering.description}
//   //   </p>

//   //   <p>
//   //     <strong>Price:</strong>
//   //     ${currentOffering.price}
//   //     {" "}
//   //     <button onClick={addToCart}>
//   //       Add to cart
//   //     </button>

//   //     <button 
//   //     disabled={!cart.find(p => p._id === currentOffering._id)} 
//   //     onClick={removeFromCart}
//   //   >
//   //     Remove from Cart
//   //   </button>
//   //   </p>

//   //   <img
//   //     src={`/images/${currentOffering.image}`}
//   //     alt={currentOffering.name}
//   //   />
//   // </div>
  
// //  : null
// }
// {/* {
// loading ? <img src={spinner} alt="loading" /> : null
// } */}
//       <CategoryMenu />
//       <OfferingList />
//     </>
    
//   );
// };

// export default Home;


import React from "react";
import OfferingList from "../components/OfferingList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import Example from '../components/Carousel'
import Nav from '../components/Nav';
import ManageOfferings from '../components/ManageOfferings';
const Home = () => {
  return (
    <div className="container">
      {/* <Nav /> */}
      {/* <ManageOfferings /> */}
      <Example />
      <CategoryMenu />
      <OfferingList />
      <Cart />
    </div>
  );
};
export default Home;