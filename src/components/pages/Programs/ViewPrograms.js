import React, { useContext, useEffect, useState } from 'react';
import { ImportPrograms } from './ImportPrograms';
import { AdminContext } from '../../../state/contexts';
import { getActivities } from '../../../state/actions';
import { PageHeader, Table } from 'antd';
import styled from 'styled-components';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';

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

const StyledList = styled.div`
  max-width: 1200px;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;
const StyledView = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
function ViewPrograms() {
  const [tableData, setTableData] = useState(sampleTableData);
  const context = useContext(AdminContext);
  // Get activities and set to context
  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    programDataToTableData();
  }, [context]);

  const fetchActivities = () => {
    getActivities(context);
  };
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
    <LayoutContainer>
      <NavBar titleName={'Manage Programs'} backgroundColor="#293845" />
      <StyledList>
        <StyledView>
          <PageHeader
            className="site-page-header"
            title={'Programs'}
            subTitle={`Sorted by clubs`}
          />
          <ImportPrograms fetchActivities={fetchActivities} />
        </StyledView>
        <Table
          columns={tableData.columns}
          dataSource={tableData.rows}
          style={{ paddingLeft: 8 }}
          pagination={{ position: ['none', 'bottomRight'] }}
        />
      </StyledList>
    </LayoutContainer>
  );
}
export default ViewPrograms;
