// import React, { useState } from 'react'
// //Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Carousel, Item, Caption } from 'react-bootstrap';




// function ControlledCarousel() {
//     const [index, setIndex] = useState([]);
//     // const state = useSelector((state) => {
//     //     return state
//     //   });
  
//     const handleSelect = (selectedIndex, e) => {
//       setIndex(selectedIndex);
//     };
  
//     return (
//       <Carousel activeIndex={index} onSelect={handleSelect}>
//         <Carousel.Item>
//           <img
//             className="d-block w-100"
//             src="https://3playmedia-wpengine.netdna-ssl.com/wp-content/uploads/elearning-hero-1400x600-1-1400x600.jpg"
//             alt="First slide"
//           />
//           <Carousel.Caption>
//             <h3>First slide label</h3>
//             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item>
//           <img
//             className="d-block w-100"
//             src="https://3playmedia-wpengine.netdna-ssl.com/wp-content/uploads/elearning-hero-1400x600-1-1400x600.jpg"
//             alt="Second slide"
//           />
  
//           <Carousel.Caption>
//             <h3>Second slide label</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item>
//           <img
//             className="d-block w-100"
//             src="https://3playmedia-wpengine.netdna-ssl.com/wp-content/uploads/elearning-hero-1400x600-1-1400x600.jpg"
//             alt="Third slide"
//           />
  
//           <Carousel.Caption>
//             <h3>Third slide label</h3>
//             <p>
//               Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//             </p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>
//     );
//   }
  
//   //render(<ControlledCarousel />);

//    export default ControlledCarousel;

import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button }  from '@material-ui/core'
import { Link } from "react-router-dom";


function Item(props)
{
    return (
        <Paper style={{textAlign: 'center' , width:'74rem'}} className="my-5">
            <h2><strong>{props.item.name}</strong></h2>
            <hr/>
            <p>{props.item.description}</p>
            <img style = {{width: '74rem', height: '600px'}}src ={props.item.image} />
 
            <Button className="CheckButton">
                <Link to ="/signup">Sign up now for Free!</Link>
            </Button>
        </Paper>
    )
}
 
function CarouselNav(props)
{
    var items = [
        {
            name: "Explore Our Offerings Today!!!",
            description: "Where learning is fun!",
            image: "https://3playmedia-wpengine.netdna-ssl.com/wp-content/uploads/elearning-hero-1400x600-1-1400x600.jpg" 
        },
        {
            name: "Explore Our Offerings Today!!!",
            description: "Take the world's best courses, online!",
            image: "https://belitsoft.com/uploads/images/blog/posts/previews/image_155436637661.png"
        }
    ]
 
    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

export default CarouselNav;
 
// function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>
 
//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }
 