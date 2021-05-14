import React, { useContext, useEffect, useState } from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';
import { ProgramContext } from '../../../state/contexts';
import axios from 'axios';
import { baseUrl } from '../../../api/index';

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

function ViewPrograms(props) {
  const { rows, columns } = props;
  const [programData, setProgramData] = useState([]);
  const [tableData, setTableData] = useState(initialTableData);
  const context = useContext(ProgramContext);

  console.log('props ', props);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    context.setPrograms(programData);
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

        // for filtering by club use this:
        // userClubId === 0
        //   ? setActivities(res.data)
        //   : setActivities(
        //       // res.data
        //       res.data.filter(club => club.clubid === userClubId)
        //    )
      )
      .catch(e => console.log(e));
  }

  console.log('context ', context);

  return (
    <ViewSingleton
      headerName="Programs"
      titleName="All Programs"
      rows={rows}
      columns={columns}
      RenderAddButton={ImportPrograms}
      sortedBy="Name"
    />
  );
}
export default ViewPrograms;
