import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { GenerateTable } from '../../../common/GenerateTable';

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
        title: 'Club ID',
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
