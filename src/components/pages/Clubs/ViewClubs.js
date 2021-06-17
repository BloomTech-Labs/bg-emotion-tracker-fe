import React, { useContext, useEffect, useState } from 'react';
import { ImportClubs } from './ImportClubs';
import { AdminContext } from '../../../state/contexts';
import { getClubs } from '../../../state/actions';
import { PageHeader, Table } from 'antd';
import styled from 'styled-components';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
const { Content, Sider } = Layout;

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

const sampleTableData = {
  rows: [{ clubName: 'Club Name' }],
  columns: [
    {
      title: 'Club Name',
      dataIndex: 'clubName',
      render: text => <p>{text}</p>,
      key: '1',
    },
  ],
};

function ViewClubs(props) {
  const [tableData, setTableData] = useState(sampleTableData);
  const context = useContext(AdminContext);

  /*
   * Makes axios call if the context is empty when the page is reloaded.
   */
  useEffect(() => {
    if (context.clubs.length === 0) {
      getClubs('authState', context);
    }
  }, []);

  useEffect(() => {
    programDataToTableData();
  }, [context]);

  // Updates table with new data
  function programDataToTableData() {
    const newRows = [];
    context.clubs.forEach(club => {
      const newRow = {
        clubName: club.clubname,
      };
      newRows.push(newRow);
    });
    setTableData({
      ...tableData,
      rows: newRows,
    });
  }
  return (
    <LayoutContainer>
      <NavBar titleName={'Manage Clubs'} backgroundColor="#293845" />
      <Layout>
        <Sider className="navSider" width={230}>
          <NavMenu />
        </Sider>
        <Content>
         <StyledList>
            <StyledView>
              <PageHeader
                className="site-page-header"
                title={'Clubs'}
                subTitle={`Sorted by clubs`}
              />
              <ImportClubs fetchClubs={() => getClubs('authState', context)} />
            </StyledView>
            <Table
              columns={tableData.columns}
              dataSource={tableData.rows}
              style={{ paddingLeft: 8 }}
              pagination={{ position: ['none', 'bottomRight'] }}
            />
        </StyledList>
      </Content>
   </Layout>
</LayoutContainer>
  );
}
export default ViewClubs;

/*
    <LayoutContainer>
      <ViewSingleton
        headerName="Clubs"
        titleName="All Clubs"
        RenderAddButton={ImportClubs}
        sortedBy="Club Name"
      />
    </LayoutContainer>
*/
