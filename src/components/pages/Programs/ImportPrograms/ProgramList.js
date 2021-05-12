import React, { useState, useEffect } from 'react';
// import { List } from 'antd';
import { GenerateTable } from '../../../common/GenerateTable';
import axios from 'axios';
import { baseUrl } from '../../../../api/index';
// const baseUrl = "http://localhost:2019";

const clubid = 20;
// this will be handled in context state, hard coded for testing now.

const initialTableData = {
  rows: [],
  columns: [
    {
      title: 'Program Name',
      dataIndex: 'programName',
      render: text => <p>{text}</p>,
      key: '1',
    },
    {
      title: 'Club ID',
      dataIndex: 'clubId',
      render: text => <p>{text}</p>,
      key: '2',
    },
  ],
};

const ProgramList = ({ inputData }) => {
  const [activities, setActivities] = useState([]);
  const [tableData, setTableData] = useState(initialTableData);

  function fetchActivities() {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    axios
      .get(`${baseUrl}/clubs/clubs`, {
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
        },
      })
      .then(res => setActivities(res.data))
      .catch(e => console.log(e));
  }
  // on component mount, stores programs data to state.
  // From there, data can be pruned and displayed as desired.
  // If data becomes too large, may need to handle pruning in this call.

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    //get data from api
    //then setListData to the data returned
    //until back-end is built, using rows data
    dataToTable();
  }, [inputData]);

  const dataToTable = () => {
    //Add Rows
    const newRows = [];
    inputData.individual.forEach(item => {
      const newRow = { programName: item.programName, clubId: item.clubId };
      newRows.push(newRow);
    });
    inputData.file.forEach(item => {
      const newRow = { programName: item.programName, clubId: item.clubId };
      newRows.push(newRow);
    });
    setTableData({
      ...tableData,
      rows: newRows,
    });
  };
  return (
    <>
      <GenerateTable
        rows={tableData.rows}
        columns={tableData.columns}
        tableName={'Members'}
        RenderAddButton={null}
      />
    </>
  );
};

export default ProgramList;
