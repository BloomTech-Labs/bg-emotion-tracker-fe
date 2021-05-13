import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const ClubTable = ({ inputData }) => {
  const [tableData, setTableData] = useState({
    rows: [],
    columns: [
      {
        title: 'Club Name',
        dataIndex: 'club_name',
        render: text => <p>{text}</p>,
        key: '1',
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
    let rowKey = 1;
    //Add Rows
    const newRows = [];
    inputData.individual.forEach(item => {
      const newRow = { club_name: item, key: rowKey };
      newRows.push(newRow);
      rowKey++;
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

export default ClubTable;
