import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
//import Preview from '../assets/preview.jpg'
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

//Icons
//import { FaEdit, FaSave } from "react-icons/fa";

//Bootstarp imports
//import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = (props) => {
    const { email: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
        variables: { email : userParam }
    });
      const user = data?.me || data?.user || {};
      
        return (
        <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark">
                <div className = "form-row">
                    <div className = "form-group col-md-6">
                        <label htmlFor = "firstName">First Name</label>
                        <input name={user.firstName} type = "text" class="form-control border border-info" id = "firstName" value = {user.firstName} />
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

                <div className = "form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="country">Country</label>
                        <select id = "country" name="country" className = "form-control border border-info">
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
                        <select id = "zone" name="zone" className = "form-control border border-info">
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
                        <select id = "subject" name="subject" className = "form-control border border-info" multiple>
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

                <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Save</Link></button>
                <button type="submit" className = "btn btn-light ml-auto"><Link to="/profile">Cancel</Link></button>
            </form>
   
    )
}

export default EditProfile;