import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { Table } from 'antd';

const ProgramList = ({ inputData }) => {
  const [tableData, setTableData] = useState({
    rows: [],
    columns: [
      {
        title: 'Program Name',
        dataIndex: 'programName',
        render: text => <p>{text}</p>,
        key: '1',
      },
      {
        title: 'Club Name',
        dataIndex: 'clubId',
        render: text => <p>{text}</p>,
        key: '2',
      },
    ],
  });

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
