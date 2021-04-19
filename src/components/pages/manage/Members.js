import React, { useState, useEffect } from 'react';
import View from './View.js';
import NavBar from '../../common/NavBar.js';

const Members = () => {
  const [members, setMembers] = useState({});
  const [addState, setAddState] = useState(false);

  useEffect(() => {
    //get data from api
    //then setMembers to the data returned
  }, []);

  return (
    <div>
      <NavBar titleName="Dashboard" backgroundColor="rgba(0, 129, 198, 1)" />
      Hello, this is members!
    </div>
  );
};

export default Members;
