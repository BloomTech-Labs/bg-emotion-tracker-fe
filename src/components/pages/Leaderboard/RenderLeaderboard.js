import React, { useEffect, useContext, useState } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import { Layout } from 'antd';
import { Table } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getLeaderboard } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const StyledList = styled.div`
  width: 90%;
  margin: 3rem auto;
`;
const StyledView = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const sampleTableData = {
  rows: [
    {
      member: 'Ranking',
      clubname: 'Club Name',
      reactionvalue: 'Rating',
      activities: 'Percent Change',
    },
  ],
  columns: [
    {
      title: 'Ranking',
      dataIndex: 'ranking',
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
      title: 'Rating',
      dataIndex: 'rating',
      render: text => <p>{text}</p>,
      key: '3',
    },
    {
      title: 'Percent Change',
      dataIndex: 'change',
      render: text => <p>{text}</p>,
      key: '4',
    },
  ],
};

function RenderLeaderboard(props) {
  const context = useContext(AdminContext);
  const [tableData, setTableData] = useState(sampleTableData);

  useEffect(() => {
    reactionDataToTableData();
  }, [context]);

  function sortLeaderboard(arr) {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (arr[j - 1].clubrating > arr[j].clubrating) {
          var temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }

  const fetchLeaderboard = () => {
    getLeaderboard('authstate', context);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const reactionDataToTableData = () => {
    const newRows = [];
    const sortedLeaderboard = sortLeaderboard(context.leaderboard).reverse();
    for (var i = 0; i < sortedLeaderboard.length; i++) {
      sortedLeaderboard[i].ranking = i + 1;
    }
    sortedLeaderboard.forEach(el => {
      const newRow = {
        ranking: el.ranking,
        clubname: el.clubname,
        rating: el.clubrating.toFixed(3),
        change: ((el.clubrating.toFixed(3) / 1) * 100).toFixed(2) + '%',
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
      <NavBar titleName={'Leaderboard'} backgroundColor="#293845" />
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
            <StyledView>
              <StyledList>
                <Table
                  columns={tableData.columns}
                  dataSource={tableData.rows}
                  size={'small'}
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
export default RenderLeaderboard;
