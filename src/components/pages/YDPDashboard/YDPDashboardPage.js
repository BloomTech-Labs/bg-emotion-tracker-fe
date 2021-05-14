import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/YDPNavBar';
import { Card, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const StyledYDPPage = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const StyledLink = styled(Link)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;

function RenderHomePage() {
  const menu = (
    <Menu>
      <Menu.Item key="0">1st Club</Menu.Item>
      <Menu.Item key="1">2nd Club</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd Club</Menu.Item>
    </Menu>
  );

  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledYDPPage>
        <h2 style={{ textAlign: 'center' }}>Select Club</h2>
        <h2 style={{ textAlign: 'center' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Clubs <DownOutlined />
            </a>
          </Dropdown>
        </h2>
        <StyledLink to="/activity-select">
          <StyledButton size="large" type="primary">
            Confirm
          </StyledButton>
        </StyledLink>
      </StyledYDPPage>
    </>
  );
}
export default RenderHomePage;
