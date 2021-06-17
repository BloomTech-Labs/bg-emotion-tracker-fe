import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';

import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu } from 'antd';
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
          </Content>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
