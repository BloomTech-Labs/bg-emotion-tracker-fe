import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';

import React, { useState, useEffect, useContext } from 'react';

import { Layout, Menu } from 'antd';
import axios from 'axios';
import Plot from 'react-plotly.js';
import {
  UserOutlined,
  TeamOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { ActivitiesWidget, MembersWidget } from '../../ReportsWidget';
import { DashboardAlerts } from '../DashboardAlerts';
import { getClubs } from '../../../state/actions';
import { AdminContext } from '../../../state/contexts';
import { getMembersReaction } from '../../../state/actions';

const { Content, Sider } = Layout;

const StyledAdminPage = styled.header`
  display: flex;
`;
function RenderHomePage() {
  const [mode, setMode] = useState('members');
  const [dateRange, setDateRange] = useState(null);
  const context = useContext(AdminContext);

  const fetchClubs = () => {
    getClubs('authState', context);
  };

  useEffect(() => {
    fetchClubs();
    getMembersReaction('authState', context);
  }, []);

  const [authtoken, setAuthtoken] = useState('');

  useEffect(() => {
    let tokenObj = {};
    if (typeof window !== 'undefined') {
      tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
      setAuthtoken(tokenObj.accessToken.accessToken);
    }
  }, []);

  useEffect(() => {
    getMarleyData();
  }, []);

  const getMarleyData = () => {
    axios
      .get(
        `https://bg-emotion-tracker-be-b.herokuapp.com/memberreactions/memberreactions`,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      )
      .then(e => {
        console.log(e);
        let avgForMarley = [];
        e.data.forEach(element => {
          if (element.clubactivity.club.clubname === 'Marley') {
            avgForMarley.push(element.reaction.reactionint);
          }
        });
      });
  };

  let widget = <div></div>;

  switch (mode) {
    case 'members': {
      widget = (
        <MembersWidget
          setMode={setMode}
          mode={mode}
          setDateRange={setDateRange}
        />
      );
      break;
    }
    case 'activities': {
      widget = <ActivitiesWidget setMode={setMode} mode={mode} />;
      break;
    }
    default:
  }

  return (
    <LayoutContainer>
      <Layout className="layout">
        <NavBar titleName="Admin Dashboard" />
        <Layout className="adminDashboardContent">
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <DashboardAlerts />
              {/* <Menu.Item
                style={{ marginTop: '30px' }}
                key="1"
                icon={<UserOutlined />}
                onClick={() => {
                  setMode('members');
                }}
              >
                Members
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<TeamOutlined />}
                onClick={() => {
                  setMode('activities');
                }}
              >
                Activities
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Content>
            {/* <div className="site-layout-content">
              <StyledAdminPage>{widget}</StyledAdminPage>
            </div> */}
            <Plot
              data={[
                {
                  x: [3, 3, 3, 3, 34, 35, 35, 5, 4, 46],
                  y: [1, 2, 3, 4, 5],
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                },
                { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
              ]}
              layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
            />
          </Content>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
