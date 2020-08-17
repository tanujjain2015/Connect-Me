import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_OFFERINGS, QUERY_ALL_OFFERINGS } from "../utils/queries";
// import spinner from "../../assets/spinner.gif"
import spin from "../assets/spinner.gif" 
import { UPDATE_OFFERINGS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';



