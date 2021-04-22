import React, { useState, useEffect } from 'react';
import ViewTable from './ViewTable.js';

const GenerateTable = props => {
  const [listData, setListData] = useState([]);
  const { rows, columns, tableName } = props;

  useEffect(() => {
    //get data from api
    //then setListData to the data returned
    //until back-end is built, using rows data
    setListData(rows);
  }, []);

  return (
    <div>
      <ViewTable
        title={tableName}
        sortedBy="ID"
        columns={columns}
        rows={rows}
      />
    </div>
  );
};

export default GenerateTable;
// example props data for members
/*
const props = {
  rows: [
    { member_id: 'URdYPfyMXs' },
    { member_id: '5o0YOuLRPT' },
    { member_id: 'GVyH4N1yPM' },
    { member_id: 'mibuMWdKN2' },
    { member_id: '179i8E7Nrg' },
    { member_id: 'mpl8tmi8SW' },
    { member_id: '4CZxXZrP2L' },
    { member_id: 'fhI1oatLsR' },
  ],
  columns: [
    {
      title: 'Member ID',
      dataIndex: 'member_id',
      render: text => <p>{text}</p>,
    },
  ],
};
*/
// Example props data for Programs
/*
const props = {
  rows: [
    { staff_id: 'ST5o0YOuLRPT', staff_name: "bob the builder", staff_role: "YDA" },
    { staff_id: 'STURdYPfyMXs', staff_name: "bob the builder", staff_role: "YDA" },
    { staff_id: 'STGVyH4N1yPM', staff_name: "bob the builder", staff_role: "YDA" },
    { staff_id: 'STmibuMWdKN2', staff_name: "bob the builder", staff_role: "YDA" },
    { staff_id: 'ST179i8E7Nrg', staff_name: "bob the builder", staff_role: "YDA" },
    { staff_id: 'STmpl8tmi8SW', staff_name: "bob the builder", staff_role: "YDA" },
    { staff_id: 'ST4CZxXZrP2L', staff_name: "bob the builder", staff_role: "YDA" },
    { staff_id: 'STfhI1oatLsR', staff_name: "bob the builder", staff_role: "YDA" },
  ],
  columns: [
    {
      title: 'ID',
      dataIndex: 'staff_id',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'staff_name',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Role',
      dataIndex: 'staff_role',
      render: text => <p>{text}</p>,
    },
  ],
};
*/
