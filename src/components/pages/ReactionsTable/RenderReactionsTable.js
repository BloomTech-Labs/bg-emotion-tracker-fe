import React, { useContext, useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import { AdminContext } from '../../../state/contexts';
import { getMembersReaction } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import './ReactionsTable.css';
import styled from 'styled-components';
import { fetchMembersReaction } from '../../../api';

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

// const data = [
//     {
//       memberId: 'testmember1',
//       clubname: 'Anderson',
//       reactionvalue: 1,
//       activityname: 'kickball',
//     },
//     {
//         memberId: 'testmember2',
//         clubname: 'Morton',
//         reactionvalue: 2,
//         activityname: 'basketball',
//     },
//     {
//         memberId: 'testmember3',
//         clubname: 'Anderson',
//         reactionvalue: 1,
//         activityname: 'studyhall',
//     },
//   ];

//   memberReaction {
//       memberId: 'testmember1',
//       clubname: 'Anderson',
//       reactionvalue: '',
//       activityname: '',
//   }

const sampleTableData = {
  rows: [
    {
      member: 'Member ID',
      clubname: 'Club Name',
      reactionvalue: 'Reaction Value',
      activity: 'Activity',
    },
  ],
  columns: [
    {
      title: 'Member ID',
      dataIndex: 'member',
      render: text => <p>{text}</p>,
      key: '1',
    },
    {
      title: 'Club Name',
      dataIndex: 'clubname',
      render: text => <p>{text}</p>,
      key: '2',
    },
    {
      title: 'Reaction Value',
      dataIndex: 'reactionvalue',
      render: text => <p>{text}</p>,
      key: '3',
    },
    {
      title: 'Activity',
      dataIndex: 'activities',
      render: text => <p>{text}</p>,
      key: '4',
    },
  ],
};

export default function RenderReactionsTable() {
  const context = useContext(AdminContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    reactionDataToTableData();
  }, [context]);

  const fetchMembersReaction = () => {
    getMembersReaction(context);
  };

  useEffect(() => {
    fetchMembersReaction();
  });

  const reactionDataToTableData = () => {
    const newRows = [];
    context.memberReactions.forEach(reaction => {
      const newRow = {
        memberId: reaction.member,
        clubname: reaction.clubname,
        reactionvalue: reaction.reactionvalue,
        activity: reaction.activities,
      };
      newRows.push(newRow);
    });
    setTableData({
      ...tableData,
      rows: newRows,
    });
  };

  console.log(context.memberReactions);
  console.log(tableData);

  return (
    <LayoutContainer>
      <NavBar titleName={'Manage Reactions'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          {context.memberReactions.length === 0 ? (
            <div className="centered-content flex">
              <LoadingComponent message="loading" />
            </div>
          ) : (
            <StyledView>
              <StyledList>
                <Table
                  columns={tableData.columns}
                  dataSource={tableData.rows}
                  style={{ paddingLeft: 8 }}
                  pagination={{ position: ['none', 'bottomRight'] }}
                />
              </StyledList>
            </StyledView>
          )}
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
