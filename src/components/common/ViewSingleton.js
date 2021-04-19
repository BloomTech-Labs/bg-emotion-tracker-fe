import React from 'react';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Button, Table, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const StyledView = styled.header`
  margin: 10%;
  justify-content: center;
  button {
  }
  h2,
  button {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
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

function ViewMembers(props) {
  return (
    <>
      <NavBar titleName={props.headerName} backgroundColor="royalblue" />
      <StyledView>
        <h2>{props.titleName}</h2>
      </StyledView>
    </>
  );
}
export default ViewMembers;
