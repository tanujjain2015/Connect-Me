import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_SUBJECTS, QUERY_OFFERINGS } from "../../utils/queries";
import {UPDATE_SUBJECTS, UPDATE_CURRENT_SUBJECT} from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_OFFERING  } from '../../utils/mutations';
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { QUERY_PROFILE, QUERY_ME } from '../../utils/queries';



function ManageOfferings () {

    // let history = useHistory();
    // const { email: userParam } = useParams();
    // const { loading, userData } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
    //     variables: { email : userParam }
    // });
    // const user = userData?.me || userData?.user || {};
    // console.log(user);
    // const [state, setState] = useState({open: false});

    // const [addOffering] = useMutation(ADD_OFFERING);

    // let location = useLocation();
    // console.log(location);

    // const [formState, setFormState] = useState({ 
    //     name: location.user.name, 
    //     description: location.user.description, 
    //     price: location.user.price, 
    //     quantity: location.user.quantity,
    //     subject: location.user.subject
    // });

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     const mutationResponse =  await addOffering({
    //       variables: {
    //         input: {...formState}
    //       }
    //     });

        // console.log(mutationResponse)
        // const token = mutationResponse.data.updateUser.token;
        // Auth.login(token);

        // history.push('/')
    //   };

    const [formState, setFormState] = useState({ name: '', description: '', price: '', subject: '',});
    const [addOffering] = useMutation(ADD_OFFERING);
    //console.log(addOffering);

    const handleFormSubmit = async event => {
      event.preventDefault();
      const mutationResponse = await addOffering({
        variables: {
          name: formState.name, 
          description: formState.description,
          price: formState.price, 
          subject: formState.subject,
        }
      });
    //   const token = mutationResponse.data.addOffering.token;
    //   Auth.login(token);
    };
    const handleChange = event => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value
      });
    };

      return(

    <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" 
    onSubmit={handleFormSubmit}
    >
                 <div className = "form-row">
                     <div className = "form-group col-md-6">
                        <label htmlFor = "name">Offering Name</label>
                     <input name="name" type = "text" className="form-control border border-info" id = "name" 
                    //  value = {formState.name || ''}  
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

                         />
                    </div>

                    <div className = "form-group col-md-6">
                        <label htmlFor = "price">Fee</label>
                     <input name="price" type = "text"  className="form-control border border-info" id = "price" 
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
    
                         />
                    </div>



                     <div className="form-group col-md-4">
                         <label htmlFor="subject">Subject</label>
                        <select id = "subject" name="subject" className = "form-control border border-info" multiple 
                        
                        // value = {[formState.subject] || ''} 

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
                                >
                             <option value="Computer Science">Computer Science</option>
                             <option value="Science">Science</option>
                             <option value="Maths">Maths</option>
                             <option value="Biology">Biology</option>
                             <option value="Geography">Geography</option>
                         </select>
                    </div>
                 </div>

            <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Home</Link></button>
            <button className = "btn btn-light ml-auto" type="submit" >Add Offering</button>
 </form>

)

}

export default ManageOfferings;