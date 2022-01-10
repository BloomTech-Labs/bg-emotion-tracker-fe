import React, { useContext, useEffect, useState } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import { Layout, Table } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getMembersReaction } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import '../ReactionsTable/ReactionsTable.css';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const StyledList = styled.div`
  width: 90%;
  margin: 3rem auto;
`;

const sampleTableData = {
  rows: [
    {
      key: 'Key',
      clubname: 'Club Name',
      reactionvalue: 'Reaction Value',
      member: 'Member ID',
      activities: 'Activity',
      createddate: 'Created Date',
      elapsed: 'Elapsed Time',
    },
  ],
  columns: [
    {
      key: '1',
      title: 'Reaction Value',
      dataIndex: 'reactionvalue',
      render: text => <p>{text}</p>,
    },
    {
      key: '2',
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
    },
    {
      key: '3',
      title: 'Member ID',
      dataIndex: 'member',
      render: text => <p>{text}</p>,
    },
    {
      key: '4',
      title: 'Activity',
      dataIndex: 'activities',
      render: text => <p>{text}</p>,
    },
    {
      key: '5',
      title: 'Created',
      dataIndex: 'createddate',
      render: text => <p>{text}</p>,
    },
    {
      key: '6',
      title: 'Elapsed Time',
      dataIndex: 'elapsed',
      render: text => <p>{text}</p>,
    },
  ],
};

function ElapsedTime(createddate) {
  const dateNow = new Date();
  const startDate = new Date(createddate);
  let diffInMilliSeconds = Math.abs(startDate - dateNow) / 60000;

  return Math.floor(diffInMilliSeconds);
}

function RenderAlerts() {
  const context = useContext(AdminContext);
  const [tableData, setTableData] = useState(sampleTableData);

  useEffect(() => {
    reactionDataToTableData();
  }, [context]);

  const fetchMembersReaction = () => {
    getMembersReaction('authstate', context);
  };

  useEffect(() => {
    fetchMembersReaction();
  }, []);

  const reactionDataToTableData = () => {
    const newRows = [];
    let count = 1;
    context.memberReactions.forEach(alert => {
      const newRow = {
        key: count,
        reactionvalue: String.fromCodePoint(parseInt(alert.reactionvalue, 16)),
        clubname: alert.clubname,
        member: alert.member,
        activities: alert.activities,
        createddate: Date(alert.createddate).toString(),
        elapsed: ElapsedTime(alert.createddate),
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
      <NavBar titleName={'Alerts'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          {context.length === 0 ? (
            <div className="centered-content flex">
              <LoadingComponent message="loading" />
            </div>
          ) : (
            <StyledList>
              <Table
                columns={tableData.columns}
                dataSource={tableData.rows}
                rowKey={'key'}
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
export default RenderAlerts;
