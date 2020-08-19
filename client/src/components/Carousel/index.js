import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button }  from '@material-ui/core'
import { Link } from "react-router-dom";
import Header from "../Header/Header";


function Item(props)
{
    return (
        <Paper style={{textAlign: 'center' , width:'74rem'}} className="my-5">
            <Header><strong>{props.item.name}</strong></Header>
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
 