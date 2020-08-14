import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
//import Preview from '../assets/preview.jpg'
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

//Icons
import { FaEdit, FaHome } from "react-icons/fa";

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
     
        // <form classNameNameNameName = "mx-5 my-5">
        //     <div classNameNameNameName = "form-group row">
        //         <label htmlFor="firstName"classNameNameNameName = "col-sm-2 col-form-label">First Name:</label>
        //         <div classNameNameNameName = "col-sm-10">
        //             <input type="text"  classNameNameNameName="form-control-plaintext" id="firstName" value = {user.firstName}/>
        //         </div>
        //     </div>

        //     <div classNameNameNameName = "form-group row">
        //         <label htmlFor="lastName"classNameNameNameName = "col-sm-2 col-form-label">Last Name:</label>
        //         <div classNameNameNameName = "col-sm-10">
        //             <input htmltype="text"  classNameNameNameName="form-control-plaintext" id="lastName" value = {user.lastName} />
        //         </div>
        //     </div>

        //     <div classNameNameNameName = "form-group row">
        //         <label htmlFor="email"classNameNameNameName = "col-sm-2 col-form-label">Email:</label>
        //         <div classNameNameNameName = "col-sm-10">
        //             <input htmltype="text"  classNameNameNameName="form-control-plaintext" id="email" value = {user.email} />
        //         </div>
        //     </div>

        //     <div classNameNameNameName = "form-group row">
        //         <label htmlFor="firstName"classNameNameNameName = "col-sm-2 col-form-label">About Me:</label>
        //         <div classNameNameNameName = "col-sm-10">
        //             <textarea htmltype="text" classNameNameNameName="md-textarea form-control" rows="3" id="bio">{user.bio}</textarea>
        //         </div>
        //     </div>

        //     <button type="submit" classNameNameNameName = "btn btn-primary"><FaEdit/></button>
        // </form>

            <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark">
                <div className = "form-row">
                    <div className = "form-group col-md-6">
                        <label htmlFor = "firstName">First Name</label>
                        <input type = "text" class="form-control border border-info" id = "firstName" value = {user.firstName} />
                    </div>

                    <div className = "form-group col-md-6">
                        <label htmlFor = "lastName">Last Name</label>
                        <input  type = "text" class="form-control border border-info" id = "lastName" value = {user.lastName} />
                    </div>
                </div>

                <div className = "form-group">
                    <label htmlFor="email">Email</label>
                    <input type = "text" className = "form-control border border-info" id = "email" value = {user.email} />
                </div>

                <div className = "form-group">
                    <label htmlFor="bio">About Me</label>
                    <textarea type = "text" className = "form-control border border-info" id = "bio" value = "This should include the users bio once the user enters information about them" rows = "4" />
                </div>

                <button type="submit" className = "btn btn-light ml-auto"><Link to="/editProfile">Edit</Link> <FaEdit/></button>
                <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Home</Link><FaHome/></button>
            </form>
   
    )
}

export default Profile;