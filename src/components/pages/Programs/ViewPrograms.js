import React, { useContext, useEffect, useState } from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';
import { ProgramContext } from '../../../state/contexts';
import axios from 'axios';
import { baseUrl } from '../../../api/index';

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
      title: 'Activity ID',
      dataIndex: 'activityId',
      render: text => <p>{text}</p>,
      key: '2',
    },
    {
      title: 'Club ID',
      dataIndex: 'clubId',
      render: text => <p>{text}</p>,
      key: '2',
    },
  ],
};

function ViewPrograms() {
  const [programData, setProgramData] = useState([]);
  const [tableData, setTableData] = useState(sampleTableData);
  const context = useContext(ProgramContext);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    context.setPrograms(programData);
    programDataToTableData(programData);
  }, [programData]);

  function fetchActivities() {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    axios
      .get(`${baseUrl}/clubs/clubs`, {
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
        },
      })
      .then(
        res => setProgramData(res.data)

        // /*for filtering by club:*/
        // userClubId === 0
        //   ? setActivities(res.data)
        //   : setActivities(
        //       // res.data
        //       res.data.filter(club => club.clubid === userClubId)
        //    )
      )
      .catch(e => console.log(e));
  }

  function programDataToTableData(arrayOfClubs) {
    const newRows = [];
    arrayOfClubs.forEach(club => {
      club.activities.forEach(activity => {
        const newRow = {
          programName: activity.activity.activityname,
          activityId: activity.activity.activityid,
          clubId: club.clubid,
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
