import React from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/BGC-logo-header.png';
import { useHistory } from 'react-router';

const StyledNavBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  background-color: rgba(0, 129, 198, 1);
  text-align: center;
  img,
  .menu-container {
    margin: 2%;
  }
  .menu-container {
    text-align: left;
    width: 109px;
  }
  img {
    height: 60px;
    width: auto;
  }
  h1 {
    color: white;
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
        <div className="menu-container">
          <Dropdown overlay={menu}>
            <Button type="text" style={{ color: 'white', fontSize: '32px' }}>
              <MenuOutlined />
            </Button>
          </Dropdown>
        </div>
        <h1>{props.titleName}</h1>
        <img src={logo} alt="Boys & Girls Club of Greater Conejo Valley" />
      </StyledNavBar>
    </>
  );
}
export default NavBar;
