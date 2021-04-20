import React, { useState, useEffect } from 'react';
import NavBar from '../../common/NavBar.js';
import ViewList from './ViewList.js';

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

const Members = () => {
  const [members, setMembers] = useState([]);
  // //if add is true, modal is active;
  // const [add, setAdd] = useState(false);

  const columns = [
    {
      title: 'Member ID',
      dataIndex: 'member_id',
      key: 'id',
      render: text => <p>{text}</p>,
    },
  ];

  useEffect(() => {
    //get data from api
    //then setMembers to the data returned
    //until back-end is built, using sampleMembers data
    setMembers(sampleMembers);
  }, []);

  return (
    <div>
      <NavBar titleName="Manage Members" />
      <ViewList
        title="Members"
        sortedBy="ID"
        columns={columns}
        members={members}
      />
    </div>
  );
};

export default Members;
