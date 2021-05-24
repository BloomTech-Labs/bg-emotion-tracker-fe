import React, { useContext, useEffect, useState } from 'react';
import { ImportClubs } from './ImportClubs';
import { AdminContext } from '../../../state/contexts';
import { getClubs } from '../../../state/actions';
import { PageHeader, Table } from 'antd';
import styled from 'styled-components';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';

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

  // Get activities and set to context
  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    programDataToTableData();
  }, [context]);

  const fetchClubs = () => {
    getClubs('authState', context);
  };

  // Updates table with new data
  function programDataToTableData() {
    console.log('data to table' + context.clubs);
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
      <StyledList>
        <StyledView>
          <PageHeader
            className="site-page-header"
            title={'Clubs'}
            subTitle={`Sorted by clubs`}
          />
          <ImportClubs fetchClubs={fetchClubs} />
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
