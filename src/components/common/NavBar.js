import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Menu, Dropdown, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const StyledNavBar = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  background-color: ${props => props.backgroundColor};
  text-align: center;
  .avatar,
  button {
    margin: 2%;
  }
  h1 {
    margin: 1% auto;
  }
`;

const menu = (
  <Menu>
    <Link to="/">
      <Menu.Item key="1" icon={<UserOutlined />}>
        Home
      </Menu.Item>
    </Link>
    <Link to="manage-members">
      <Menu.Item key="2" icon={<UserOutlined />}>
        Manage Members
      </Menu.Item>
    </Link>
    <Link to="manage-programs">
      <Menu.Item key="3" icon={<UserOutlined />}>
        Manage Programs
      </Menu.Item>
    </Link>
    <Link to="manage-staff">
      <Menu.Item key="4" icon={<UserOutlined />}>
        Manage Staff
      </Menu.Item>
    </Link>
  </Menu>
);

function NavBar(props) {
  const { userInfo, authService } = props;
  return (
    <>
      <StyledNavBar backgroundColor={props.backgroundColor}>
        <Avatar size="large" icon={<UserOutlined />} className="avatar" />
        <h1>{props.titleName}</h1>
        <Dropdown overlay={menu}>
          <Button>
            <DownOutlined />
          </Button>
        </Dropdown>
      </StyledNavBar>
    </>
  );
}
export default NavBar;
