import React, { useContext, useEffect, useState } from 'react';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import { ImportMembers } from './ImportMember';
import { AdminContext } from '../../../state/contexts';
import { Table } from 'antd';
import { getMembers } from '../../../state/actions';
import styled from 'styled-components';
import NavMenu from '../../common/NavMenu';
import { Layout, Button } from 'antd';
import { updateMember } from '../../../api';
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

function ViewMembers(props) {
  const context = useContext(AdminContext);

  const sampleTableData = {
    rows: [{ memberId: 'Member ID', action: '', tableid: null }],
    columns: [
      {
        title: 'Member IDs',
        dataIndex: 'memberId',
        render: (text, record) => (
          <p
            style={{
              color:
                record.action == 'Deactivate'
                  ? 'rgba(0, 0, 0, 0.65)'
                  : 'lightgray',
            }}
          >
            {text}
          </p>
        ),
        key: '1',
      },
      {
        title: '',
        dataIndex: '',
        key: 'action',
        width: '25%',
        render: record => (
          <Button
            onClick={() => {
              updateMember(record.tableid).then(() => getMembers(context));
            }}
          >
            {record.action}
          </Button>
        ),
      },
    ],
  };

  const [tableData, setTableData] = useState(sampleTableData);

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
    let count = 1;
    context.members.forEach(member => {
      const newRow = {
        key: count,
        memberId: member.memberid,
        action: member.active ? 'Deactivate' : 'Activate',
        tableid: member.member_table_id,
      };
      newRows.push(newRow);
      count++;
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
        <Sider className="navSider" width={200}>
          <NavMenu />
        </Sider>
        <Content>
          <StyledList>
            <StyledView>
              <ImportMembers fetchMembers={fetchMembers} />
            </StyledView>
            <Table
              columns={tableData.columns}
              dataSource={tableData.rows}
              rowKey={'key'}
              size={'small'}
              pagination={{ position: ['none', 'bottomRight'] }}
            />
          </StyledList>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default ViewMembers;
