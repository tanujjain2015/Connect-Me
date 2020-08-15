import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER, UPDATE_USER } from "../utils/mutations";
import ImageUpload from "../components/ImageUpload";
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
//import Preview from '../assets/preview.jpg'
import { useQuery } from '@apollo/react-hooks';
// //Icons
import { FaEdit, FaHome } from "react-icons/fa";
//Bootstarp imports
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Profile(props) {
    const [formState, setFormState] = useState({ email: '', password: ''});
  const [updateUser] = useMutation(UPDATE_USER);
  //console.log(addUser);
  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await updateUser({
      variables: {
        firstName: formState.firstName, 
        lastName: formState.lastName,
        email: formState.email, 
        password: formState.password,
        location: formState.location,
        tutor: formState.tutor,
        bio: formState.bio
      }
    });
    const token = mutationResponse.data.updateUser.token;
    Auth.login(token);
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
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
  //Image upload ===============================================================
  return(
    <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" onSubmit = {handleFormSubmit}>
                     <div className = "form-row">
                         <div className = "form-group col-md-6">
                            <label htmlFor = "firstName">First Name</label>
                         <input name={user.firstName} type = "text" className="form-control border border-info" id = "firstName" value = {user.firstName} onChange={handleChange}/>
                         </div>
                       <div className = "form-group col-md-6">
                            <label htmlFor = "lastName">Last Name</label>
                            <input name={user.lastName} type = "text" className="form-control border border-info" id = "lastName" value = {user.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="email">Email</label>
                        <input type = "text" name={user.email} className = "form-control border border-info" id = "email" value = {user.email} onChange={handleChange}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="bio">About Me</label>
                        <textarea type = "text" name = {user.bio} className = "form-control border border-info" id = "bio" value = {user.bio} rows = "4"  onChange={handleChange}/>
                     </div>
                     <div className = "form-row">
                         <div className="form-group col-md-4">
                             <label htmlFor="country">Country</label>
                             <select id = "country" name={user.location} className = "form-control border border-info" onChange={handleChange}>
                                 <option value="USA">USA</option>
                                 <option value="India">India</option>
                                 <option value="Brazil">Brazil</option>
                                 <option value="Europe">Europe</option>
                                 <option value="Canada">Canada</option>
                                 <option value="Mexico">Mexico</option>
                             </select>
                        </div>
                         <div className="form-group col-md-4">
                             <label htmlFor="zone">Timezone</label>
                             <select id = "zone" name={user.timezone} className = "form-control border border-info" onChange={handleChange}>
                                 <option value="UTC+8:00">UTC+8:00</option>
                                 <option value="UTC+5:30">UTC+5:30</option>
                                 <option value="UTC+8:45">UTC+8:45</option>
                                <option value="UTC+9:00">UTC+9:00</option>
                                 <option value="UTC+9:30">UTC+9:30</option>
                                 <option value="UTC+10:00">UTC+10:00</option>
                             </select>
                         </div>
                         <div className="form-group col-md-4">
                             <label htmlFor="subject">Pick Subjects</label>
                            <select id = "subject" name={user.subject} className = "form-control border border-info" multiple onChange={handleChange}>
                                 <option value="Computer Science">Computer Science</option>
                                 <option value="Science">Science</option>
                                 <option value="Maths">Maths</option>
                                 <option value="Biology">Biology</option>
                                 <option value="Geography">Geography</option>
                             </select>
                        </div>
                     </div>
                     <div className = "form-group">
                         <div className = "form-check">
                             <input className = "form-check-input" type="checkbox" id="tutor"/>
                             <label className = "form-check-label" htmlFor = "tutor">
                                 I am a tutor
                             </label>
                         </div>
                     </div> 
                    <button type="submit" className = "btn btn-primary ml-auto">Save</button>
                    <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Home</Link></button>
                </form>
    //     
  )
}
export default Profile;