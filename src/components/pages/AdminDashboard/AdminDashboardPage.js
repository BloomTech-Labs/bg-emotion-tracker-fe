import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import ReportChartWidget from '../../common/ReportChartWidget';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const StyledAdminPage = styled.header`
  display: flex;
`;
function RenderHomePage() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <LayoutContainer>
      <Layout className="layout">
        <NavBar titleName="Admin Dashboard" backgroundColor="#293845" />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                icon={<UserOutlined />}
                title="Member Positivity"
              >
                <Menu.Item key="1">option1</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="Activity Feedback"
              >
                <Menu.Item key="9">option9</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <StyledAdminPage>
                <ReportChartWidget />
              </StyledAdminPage>
            </div>
          </Content>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
