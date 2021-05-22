import React, { useContext, useEffect, useState } from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';
import { ProgramContext } from '../../../state/contexts';
import { getActivities } from '../../../state/actions';

const sampleTableData = {
  rows: [{ programName: 'Program Name', activityId: '0', clubId: '0' }],
  columns: [
    {
      title: 'Program Name',
      dataIndex: 'programName',
      render: text => <p>{text}</p>,
      key: '1',
    },
    {
      title: 'Club Name',
      dataIndex: 'clubName',
      render: text => <p>{text}</p>,
      key: '2',
    },
  ],
};

function ViewPrograms() {
  const [tableData, setTableData] = useState(sampleTableData);
  const context = useContext(ProgramContext);
  // Get activities and set to context
  useEffect(() => {
    getActivities(context);
  }, []);

  useEffect(() => {
    programDataToTableData();
  }, [context]);

  // Updates table with new data
  function programDataToTableData() {
    const newRows = [];
    context.programs.forEach(club => {
      club.activities.forEach(activity => {
        const newRow = {
          programName: activity.activity.activityname,
          // activityId: activity.activity.activityid,
          clubName: club.clubname,
        };
        newRows.push(newRow);
      });
    });
    setTableData({
      ...tableData,
      rows: newRows,
    });
  }

  return (
    <ViewSingleton
      headerName="Programs"
      titleName="All Programs"
      rows={tableData.rows}
      columns={tableData.columns}
      RenderAddButton={ImportPrograms}
      sortedBy="Name"
    />
  );
}
export default ViewPrograms;
