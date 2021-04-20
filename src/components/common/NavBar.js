import React from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  LineChartOutlined,
  CalendarOutlined,
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
    margin: 1rem;
  }
  .menu-container {
    text-align: left;
    width: 109px;
  }
  img {
    height: 5rem;
    width: auto;
  }
  h1 {
    color: white;
    margin: 1% auto;
  }
`;

function NavBar(props) {
  const { userInfo, authService } = props;

  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<LineChartOutlined />}
        onClick={() => history.push('/')}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserOutlined />}
        onClick={() => history.push('/members')}
      >
        Manage Members
      </Menu.Item>
      <Menu.Item key="3" icon={<CalendarOutlined />}>
        Manage Programs
      </Menu.Item>
      <Menu.Item key="4" icon={<TeamOutlined />}>
        Manage Staff
      </Menu.Item>
    </Menu>
  );

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
