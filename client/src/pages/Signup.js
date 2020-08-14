import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

//import ImageUploader from 'react-images-upload';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
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
          <label htmlFor="tutor">Do you wish to be a tutor?</label>
          <input
            value ="tutor"
            name="tutor"
            type="checkbox"
            id="tutor"
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="locations">Choose a location</label>
          <select id="locations" name ="locations" onChange={handleChange}>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="Brazil">Brazil</option>
            <option value="Europe">Europe</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
          </select>
          {/* <input
            // placeholder="choose your country"
            // type="locations"
            onChange={handleChange}
          />  */}
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="subjcets">Pick desired Subjects</label>
          <select id="subjects" name ="subjects" multiple onChange={handleChange}>
            <option value="Computer Science">Computer Science</option>
            <option value="Science">Science</option>
            <option value="Maths">Maths</option>
            <option value="Biology">Biology</option>
            <option value="Geography">Geography</option>
          </select>
          {/* <input
            placeholder="choose your country"
            type="locations"
            onChange={handleChange}
          />  */}
        </div>

        {/* <div className = "flex-row flex-end">
        <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        </div> */}

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
