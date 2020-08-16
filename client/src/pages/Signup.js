import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import ImageUpload from "../components/ImageUpload";
function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: ''});
  const [addUser] = useMutation(ADD_USER);
  //console.log(addUser);
  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
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
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  //Image upload ===============================================================
  return (
    <div className="container my-1">
      <Link to="/login">
        ← Go to Login
      </Link>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="tutor">Signing up as?</label>
          <select id="tutor" name ="tutor" onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
          </select>
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="location">Choose a location</label>
          <select id="location" name ="location" onChange={handleChange}>
            <option value="AMER">AMER</option>
            <option value="EMEA">EMEA</option>
            <option value="APAC">APAC</option>
          </select>
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="bio">Bio:</label>
          <textarea
            placeholder="Provide some description about you and your skill set and what are you looking for..."
            name="bio"
            type="text"
            id="bio"
            rows = "6" 
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="subjcets">Pick desired Subjects</label>
          <select id="subjects" name ="subjects" multiple onChange={handleChange}>
            <option value="Computer Science">Computer Science</option>
            <option value="Science">Science</option>
            <option value="Maths">Maths</option>
            <option value="Biology">Biology</option>
            <option value="Geography">Geography</option>
          </select> */}
          {/* <input
            placeholder="choose your country"
            type="location"
            onChange={handleChange}
          />  */}
        {/* </div> */}

        <div className="">
          <ImageUpload>
          </ImageUpload>
        </div>
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Signup;