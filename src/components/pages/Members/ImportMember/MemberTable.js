import React, { useEffect, useState } from 'react';
import { GenerateTable } from '../../../common/GenerateTable';

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
      <GenerateTable
        rows={tableData.rows}
        columns={tableData.columns}
        sortedBy="ID"
        tableName="Members"
        RenderAddButton={null}
      />
    </>
  );
};

export default MemberTable;
