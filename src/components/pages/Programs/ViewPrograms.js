import React, { useContext, useEffect, useState } from 'react';
import { ImportPrograms } from './ImportPrograms';
import { AdminContext } from '../../../state/contexts';
import { getActivities } from '../../../state/actions';
import { PageHeader, Table } from 'antd';
import styled from 'styled-components';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
const { Content, Sider } = Layout;

const StyledList = styled.div`
  max-width: 90%;
  margin: 3rem auto;
`;
const StyledView = styled.header`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1%;
`;

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
      filters: [
        {
          text: 'Anderson',
          value: 'Anderson',
        },
        {
          text: 'Catlin',
          value: 'Catlin',
        },
        {
          text: 'Grossman',
          value: 'Grossman',
        },
        {
          text: 'Johnston',
          value: 'Johnston',
        },
        {
          text: 'Marley',
          value: 'Marley',
        },
        {
          text: 'Morton',
          value: 'Morton',
        },
        {
          text: 'Notter',
          value: 'Notter',
        },
        {
          text: 'Stelle',
          value: 'Stelle',
        },
        {
          text: 'Jefferson',
          value: 'Jefferson',
        },
      ],
      onFilter: (value, record) => record.clubName.indexOf(value) === 0,
      render: text => <p>{text}</p>,
      key: '2',
    },
  ],
};

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
      <Layout>
        <Sider className="navSider" width={210}>
          <NavMenu />
        </Sider>
        <Content>
          <StyledList>
            <StyledView>
              <ImportPrograms fetchActivities={fetchActivities} />
            </StyledView>
            <Table
              columns={tableData.columns}
              dataSource={tableData.rows}
              size={'small'}
              pagination={{ position: ['none', 'bottomRight'] }}
            />
          </StyledList>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default ViewPrograms;
