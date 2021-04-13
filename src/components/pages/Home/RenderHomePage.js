import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Statistic,
  Card,
  Row,
  Col,
  Avatar,
  Menu,
  Dropdown,
  Button,
} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { DownOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';

const StyledHomePage = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  background: royalblue;
  text-align: center;
  .avatar {
    margin: 2%;
  }
  h1 {
    margin: 1% 30% 0%;
  }
  button {
    margin: 2%;
  }
`;

const StyledData = styled.body`
  padding: 5%;
  margin: 2%;
`;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Add User
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      Generate QR
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      Print ID
    </Menu.Item>
  </Menu>
);
function handleMenuClick(e) {
  console.log('click', e);
}

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <>
      <StyledHomePage>
        <Avatar size="large" icon={<UserOutlined />} className="avatar" />
        <h1>Hi {userInfo.name}, Welcome.</h1>
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
        <Dropdown overlay={menu}>
          <Button>
            <DownOutlined />
          </Button>
        </Dropdown>
      </StyledHomePage>
      <StyledData>
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Happiness Rate"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Attendance This Week"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Thumbs Today"
              value={1128}
              prefix={<LikeOutlined />}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Kids Logged" value={93} suffix="/ 100" />
          </Col>
        </Row>
        ,
      </StyledData>
      <Button> Import CSV</Button>
    </>
  );
}
export default RenderHomePage;
