import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import ReportChartWidget from '../../reports/ReportChartWidget';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const StyledAdminPage = styled.header`
  display: flex;
`;
function RenderHomePage() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState(0);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
                  setMode(0);
                  console.log('mode: ', mode);
                }}
              >
                Member Positivity
              </Menu.Item>
              {/* <Menu.Item key="2" icon={<TeamOutlined />}>
                Activity Feedback
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <StyledAdminPage>
                <ReportChartWidget setMode={setMode} mode={mode} />
              </StyledAdminPage>
            </div>
          </Content>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
