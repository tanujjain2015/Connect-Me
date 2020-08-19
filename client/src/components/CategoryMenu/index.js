import React, {useEffect} from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_SUBJECTS, QUERY_OFFERINGS } from "../../utils/queries";
import {UPDATE_SUBJECTS, UPDATE_CURRENT_SUBJECT} from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '../Badge/Badge';
//import Header from "../Header/Header";
import Typography  from "@material-ui/core/Typography";


function CategoryMenu() {
  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();
  const { subjects } = state;
  const { loading, data: categoryData } = useQuery(QUERY_SUBJECTS);

  useEffect(() => {
    //if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if(categoryData) {
      //execute our dispatch function with our action object indicating the type of action and the data to set our state for subjects to
      dispatch({
        type: UPDATE_SUBJECTS,
        subjects: categoryData.subjects
      });
      categoryData.subjects.forEach(subject => {
        idbPromise('subjects', 'put', subject)
      }) 
    } else if (!loading) {
      idbPromise('subjects', 'get').then(subjects => {
        dispatch({
          type: UPDATE_SUBJECTS,
          subjects: subjects
        })
      })
    }
  }, [categoryData, loading, dispatch]);
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_SUBJECT,
      currentSubject: id
    });
  };
  return (
    <div>
      {/* <Header>Choose a Subject</Header> */}
      <Typography variant="h4" gutterBottom>
      Choose a Subject
      </Typography> 
      <Badge color="primary">
          {subjects.map(item => (
              <button
                key={item._id}
                onClick={() => {
                  handleClick(item._id);
                }}
              >
                {item.subject}
              </button>
            ))}
      </Badge>

    </div>
  );
}
export default CategoryMenu;
