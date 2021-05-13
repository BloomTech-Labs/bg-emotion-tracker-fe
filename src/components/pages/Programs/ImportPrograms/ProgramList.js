import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../../../api/index';
// const baseUrl = "http://localhost:2019";

const userClubId = 20;
// this will be handled in context state, hard coded for testing now.

const initialTableData = {
  rows: [{ programName: 'Sample Name', clubId: '20' }],
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
      .then(res =>
        userClubId === 0
          ? setActivities(res.data)
          : setActivities(
              // res.data
              res.data.filter(club => club.clubid === userClubId)
            )
      )
      .catch(e => console.log(e));
  }
  // on component mount, stores programs data to state.
  // From there, data can be pruned and displayed as desired.
  // If data becomes too large, may need to handle pruning in this call.

  useEffect(() => {
    fetchActivities();
  }, []);

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
      <Table
        columns={tableData.columns}
        dataSource={tableData.rows}
        style={{ paddingLeft: 8 }}
        pagination={{ position: ['none', 'bottomRight'] }}
      />
    </>
  );
};

export default ProgramList;
