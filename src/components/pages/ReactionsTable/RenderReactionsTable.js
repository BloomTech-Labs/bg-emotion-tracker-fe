import React, { useContext, useState, useEffect } from 'react';
import { Table } from 'antd';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import { AdminContext } from '../../../state/contexts';
import { getReactions } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import './ReactionsTable.css';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const StyledList = styled.div`
  width: 90%;
  margin: 3rem auto;
`;

const sampleTableData = {
  rows: [
    {
      member: 'Member ID',
      clubname: 'Club Name',
      reactionvalue: 'Reaction Value',
      activities: 'Activity',
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
      onFilter: (value, record) => record.clubname.indexOf(value) === 0,
      render: text => <p>{text}</p>,
      key: '2',
    },
    {
      title: 'Reaction Value',
      dataIndex: 'reactionvalue',
      render: text => <p>{String.fromCodePoint(parseInt(text, 16))}</p>,
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
  const [tableData, setTableData] = useState(sampleTableData);

  useEffect(() => {
    reactionDataToTableData();
  }, [context]);

  const fetchMembersReaction = () => {
    getReactions(context);
  };

  useEffect(() => {
    fetchMembersReaction();
  }, []);

  const reactionDataToTableData = () => {
    const newRows = [];
    context.reactions.forEach(reaction => {
      const newRow = {
        member: reaction.member.memberid,
        clubname: reaction.clubactivity.club.clubname,
        reactionvalue: reaction.reaction.reactionvalue,
        activities: reaction.clubactivity.activity.activityname,
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
      <NavBar titleName={'Manage Reactions'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          {context.reactions.length === 0 ? (
            <div className="centered-content flex">
              <LoadingComponent message="loading" />
            </div>
          ) : (
            <StyledList>
              <Table
                columns={tableData.columns}
                dataSource={tableData.rows}
                size={'small'}
                pagination={{ position: ['none', 'bottomRight'] }}
              />
            </StyledList>
          )}
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
