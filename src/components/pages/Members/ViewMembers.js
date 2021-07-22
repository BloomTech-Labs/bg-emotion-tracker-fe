import React, { useContext, useEffect, useState } from 'react';
import { ViewSingleton, LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import { ImportMembers } from './ImportMember';
import { AdminContext } from '../../../state/contexts';
import { PageHeader, Table } from 'antd';
import { getMembers } from '../../../state/actions';
import styled from 'styled-components';
import NavMenu from '../../common/NavMenu';
import { Layout } from 'antd';
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
    const newRows = [];
    context.members.forEach(member => {
      const newRow = {
        memberId: member.memberid,
      };
      newRows.push(newRow);
    });
    setTableData({
      ...tableData,
      rows: newRows,
    });
  };
  return (
    <LayoutContainer>
      <NavBar titleName={'Manage Members'} backgroundColor="#293845" />

      <Layout>
        <Sider className="navSider" width={230}>
          <NavMenu />
        </Sider>

        <Content>
          <StyledList>
            <StyledView>
              <PageHeader
                className="site-page-header"
                title={'Members'}
                subTitle={`Sorted by id`}
              />
              <ImportMembers fetchMembers={fetchMembers} />
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
export default ViewMembers;
