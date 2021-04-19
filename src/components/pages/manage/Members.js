import React, { useState, useEffect } from 'react';
import axios from 'axios';

import View from './View.js';
import NavBar from '../../common/NavBar.js';
import { List } from '../../common';

const Members = () => {
  const [members, setMembers] = useState({});
  const [addState, setAddState] = useState(false);

  const sampleMembers = [
    { id: 1, member_id: 'URdYPfyMXs' },
    { id: 2, member_id: '5o0YOuLRPT' },
    { id: 3, member_id: 'GVyH4N1yPM' },
    { id: 4, member_id: 'mibuMWdKN2' },
    { id: 5, member_id: '179i8E7Nrg' },
    { id: 6, member_id: 'mpl8tmi8SW' },
    { id: 7, member_id: '4CZxXZrP2L' },
    { id: 8, member_id: 'fhI1oatLsR' },
  ];

  // useEffect(() => {
  //   //get data from api
  //   //then setMembers to the data returned
  //   //temporarily setting members to the sample data
  //   setMembers(sampleMembers);
  // }, []);

  //temp getItemsData function
  const getItems = () => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
      .then(response => {
        console.log(response);
        setMembers(sampleMembers);
        return sampleMembers;
      });
  };

  return (
    <div>
      <NavBar
        titleName="Manage Members"
        backgroundColor="rgba(0, 129, 198, 1)"
      />
      <List
        // Here we are passing our Axios request helper function as a callback.
        getItemsData={getItems}
        // Here we are passing in a component we want to show whilst waiting for our API request
        // to complete.
        LoadingComponent={() => <div>Loading Items...</div>}
        // Here we are passing in a component that receives our new data and returns our JSX elements.
        RenderItems={View}
      />
    </div>
  );
};

export default Members;
