import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import NavMenu from '../../common/NavMenu';
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
      <NavBar titleName="Admin Dashboard" />
      <Layout
      // className="adminDashboardContent"
      >
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
       
        <Content>
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
    </LayoutContainer>
  );
}
export default RenderHomePage;
