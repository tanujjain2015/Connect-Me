import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_SUBJECTS, QUERY_OFFERINGS, QUERY_PROFILE, QUERY_ME } from "../../utils/queries";
import {UPDATE_SUBJECTS, UPDATE_CURRENT_SUBJECT} from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_OFFERING  } from '../../utils/mutations';
import { Link, useHistory, useLocation, useParams, Redirect } from "react-router-dom";
import {  } from '../../utils/queries';
import Auth  from '../../utils/auth';
import Footer from '../Footer/Footer';
import Button from '../CustomButtons/Button';


function ManageOfferings () {

    let history = useHistory();
    const { email: userParam } = useParams();
    const { loading, userData } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
        variables: { email : userParam }
    });
    const user = userData?.me || userData?.user || {};
    console.log(user);
    const [state, setState] = useState({open: false});
    

    // const state = useSelector((state) => {
    //     return state
    //   });
    //   const dispatch = useDispatch();
    // const { subject } = state;
    // const { data: categoryData } = useQuery(QUERY_SUBJECTS);

    // let location = useLocation();
    // console.log(location);


    const [formState, setFormState] = useState({ name: '', description: '', price: '', quantity: '' , subject: ''});
    const [addOffering] = useMutation(ADD_OFFERING);
    console.log(addOffering);



    const handleFormSubmit = async event => {
      event.preventDefault();

      const mutationResponse = await addOffering({
        variables: {
          name: formState.name, 
          description: formState.description,
          price: Number(formState.price), 
          quantity: Number(formState.quantity),
          subject: formState.subject,
        //   user: formState.user.id
        //   user: Auth.getProfile().formState.userData,
        }
      });
    //   const token = mutationResponse.data.addOffering.token;
    //   Auth.login(token);
        history.push('/')
    };



    const handleChange = event => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value
      });
    };

      return(

        <>
    <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" 
    onSubmit={handleFormSubmit}
    >
                 <div className = "form-row">
                     <div className = "form-group col-md-6">
                        <label htmlFor = "name">Offering Name</label>
                     <input name="name" type = "text" className="form-control border border-info" id = "name" 
                    //  value = {formState.name || ''}  
                        onChange=
                        {event => {
                            const { name, value } = event.target;
                             console.log(event);
                             console.log(event.target.name);
                             console.log(event.target.value);
                             setFormState({
                             ...formState,
                             [name]: value
                             });
                         }}  
                        // onChange={handleChange}
        
                         />
                    </div>


                     <div className = "form-group col-md-6">
                        <label htmlFor = "description">Offering Description</label>
                     <textarea name="description" type = "text" className="form-control border border-info" id = "description" 
                    //  value = {formState.description || ''}  
                        onChange={event => {
                            const { name, value } = event.target;
                             console.log(event);
                             console.log(event.target.name);
                             console.log(event.target.value);
                             setFormState({
                             ...formState,
                             [name]: value
                             });
                         }}  
                        // onChange={handleChange}

                         />
                    </div>

                    <div className = "form-group col-md-6">
                        <label htmlFor = "price">Fee</label>
                     <input name="price" type="number" className="form-control border border-info" id = "price" 
                    //  value = {formState.price || ''}  
                        onChange={event => {
                            const { name, value } = event.target;
                             console.log(event);
                             console.log(event.target.name);
                             console.log(event.target.value);
                             setFormState({
                             ...formState,
                             [name]: value
                             });
                         }}  
                        // onChange={handleChange}
    
                         />
                    </div>


                    <div className = "form-group col-md-6">
                        <label htmlFor = "quantity">Quantity</label>
                     <input name="quantity" type="number" className="form-control border border-info" id = "quantity" 
                    //  value = {formState.quantity || ''}  
                        onChange={event => {
                            const { name, value } = event.target;
                             console.log(event);
                             console.log(event.target.name);
                             console.log(event.target.value);
                             setFormState({
                             ...formState,
                             [name]: value
                             });
                         }}  
                        // onChange={handleChange}
    
                         />
                    </div>




                     <div className="form-group col-md-4">
                         <label htmlFor="subject">Subject</label>
                        <select id = "subject" name="subject" className = "form-control border border-info"  
                        
                        // value = {[formState.subject] || ''} 

                                onChange={event => {
                                    const { name, value } = event.target;
                                        console.log(event);
                                        console.log("Subject logs" , event.target.name);
                                        console.log("Subject logs" , event.target.value);
                                        setFormState({
                                        ...formState,
                                        [name]: value
                                        });
                                    }}  
                                // onChange={handleChange}

                                // onChange={handleChange}
                                // ref={ref => {
                                //   this._select = ref
                                // }}
                                // defaultValue={state.value}
                                >
                             <option value="5f3ca2bc002bf133b95fb974">Computer Science</option>
                             <option value="5f3ca2bc002bf133b95fb975">Science</option>
                             <option value="5f3ca2bc002bf133b95fb976">Maths</option>
                             <option value="5f3ca2bc002bf133b95fb977">Biology</option>
                             <option value="5f3ca2bc002bf133b95fb978">Geography</option>
                         </select>
                    </div>
                 </div>

            {/* <button className = "btn btn-primary ml-auto" type="submit" >Add Offering</button> */}
            {/* <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Home</Link></button> */}

            <Button type="submit" color="primary" round style={{color: "#FFFFFF"}}>
                        Add Offering
            </Button>

            <Button type="submit" color="default" round simple>
                    <Link to="/">Home</Link>
            </Button>

 </form>

 <Footer />

</>
)

}

export default ManageOfferings;