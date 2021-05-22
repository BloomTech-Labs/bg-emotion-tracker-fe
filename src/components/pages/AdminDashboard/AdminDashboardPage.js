import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { ActivitiesWidget, MembersWidget } from '../../ReportsWidget';

const { Content, Sider } = Layout;

const StyledAdminPage = styled.header`
  display: flex;
`;
function RenderHomePage() {
  const [mode, setMode] = useState('members');

  let widget = <div></div>;

  switch (mode) {
    case 'members': {
      widget = <MembersWidget setMode={setMode} mode={mode} />;
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
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item
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
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <StyledAdminPage>{widget}</StyledAdminPage>
            </div>
          </Content>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
