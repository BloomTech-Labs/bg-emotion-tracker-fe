import React, { useContext, useEffect, useState } from 'react';
import { ViewSingleton, LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import { ImportMembers } from './ImportMember';
import { AdminContext } from '../../../state/contexts';
import { PageHeader, Table } from 'antd';
import { getMembers } from '../../../state/actions';
import styled from 'styled-components';

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
  rows: [{ memberId: 'Member ID' }],
  columns: [
    {
      title: 'Member id',
      dataIndex: 'memberId',
      render: text => <p>{text}</p>,
      key: '1',
    },
  ],
};
function ViewMembers(props) {
  const [tableData, setTableData] = useState(sampleTableData);
  const context = useContext(AdminContext);
  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    memberDataToTableData();
  }, [context]);

  const fetchMembers = () => {
    getMembers(context);
  };
  // Updates table with new data
  const memberDataToTableData = () => {
    console.log(context);
    const newRows = [];
    context.members.forEach(member => {
      const newRow = {
        memberId: member.memberid,
      };
      newRows.push(newRow);
    });
    console.log(newRows);
    setTableData({
      ...tableData,
      rows: newRows,
    });
  };
  return (
    <LayoutContainer>
      <NavBar titleName={'All Members'} backgroundColor="#293845" />
      <StyledList>
        <StyledView>
          <PageHeader
            className="site-page-header"
            title={'Members'}
            subTitle={`Sorted by id`}
          />
          <ImportMembers />
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
export default ViewMembers;
/* <LayoutContainer>
<ViewSingleton
headerName="Members"
titleName="All Members"
RenderAddButton={ImportMembers}
rows={mockData.rows}
columns={mockData.columns}
sortedBy="ID"
/>
</LayoutContainer>



*/
