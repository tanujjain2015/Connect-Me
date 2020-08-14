import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import Preview from '../assets/preview.jpg'
import { useQuery } from '@apollo/react-hooks';

//Icons
import { FaEdit, FaSave } from "react-icons/fa";

//Bootstarp imports
//import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const { email: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
        variables: { email : userParam }
    });

    const user = data?.me || data?.user || {};

    //redirect to personal profile page if email is the loggedin user's
    if(Auth.loggedIn() && Auth.getProfile().data.email.toLowerCase() === `${userParam ? userParam.toLowerCase() : ''}`) {
        return <Redirect to="/profile" />
    }

    if(loading) {
        return <div>Loading...</div>;
    }

    //if not loggedin
    if(!user?.email) {
        return(
            <h4>
                You need to be loggedIn to see this page. Use the navigation link to Signup or Login!
            </h4>
        )
    }

    return (
     <>
        <div className ="card mx-auto my-5" style={{width: '18rem'}}>
            <img className = "card-img-top" src = "../assets/preview1.jpg"  alt ="Card Image Top" />
            <div className = "card-body">
                <h5 className = "card-title"> Viweing Your Profile </h5>
                <p className = "card-text">About Me {user.bio}</p>
            </div>

            <ul className = "list-group list-group-flush">
                <li className = "list-group-item">First Name : {user.firstName}</li>
                <li className = "list-group-item">Last Name: {user.lastName}</li>
                <li className = "list-group-item">Email: {user.email}</li>
            </ul>

            <div className = "card-body">
                <a href ="#" className="card-link"> <FaEdit/></a>
                <a href="#" className ="card-link"><FaSave/></a>
            </div>
 
            
            {/* <Card style={{ width: '18rem' }}>
             <Card.Img variant="top" src="#" />
                 <Card.Body>
                    <Card.Title>Viewing {userParam ? `${user.firstName}'s` : 'your'} profile </Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                     the card's content.
                     </Card.Text>
                 </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                 <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
             </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                 <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
         </Card> */}
        </div>
    </>
    
       
   
    )
}

export default Profile;