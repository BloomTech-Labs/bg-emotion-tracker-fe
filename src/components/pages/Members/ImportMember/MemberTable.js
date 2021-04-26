import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const MemberTable = ({ inputData }) => {
  const [tableData, setTableData] = useState({
    rows: [],
    columns: [
      {
        title: 'Member ID',
        dataIndex: 'member_id',
        render: text => <p>{text}</p>,
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
      const newRow = { member_id: item };
      newRows.push(newRow);
    });
    inputData.file.forEach(item => {
      const newRow = { member_id: item };
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

export default MemberTable;
