import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USEROFFERINGS } from "../utils/queries";
// import spinner from "../../assets/spinner.gif"
import spinner from "../assets/spinner.gif" 
import { UPDATE_OFFERINGS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Nav from '../components/Nav'


function Offerings(props) {

    console.log(props.location.userInput);


    const [userOffering, setUserOffering] = useState({
        input: ''
    });

    const handleChange = async (event) => {
        setUserOffering({
            input: event.target.value
        })
      };

    const handleFormSubmit = async (event) => {
        // event.preventDefault();

    }

    return(
        "Hello"
    )
}



export default Offerings;