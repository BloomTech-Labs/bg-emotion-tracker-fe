import React from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
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
    margin: 1.5rem;
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
    margin: 0;
  }
`;

function NavBar(props) {
  const { userInfo, authService } = props;

  const menu = (
    <Menu>
      {/* <Menu.Item
        key="1"
        icon={<LineChartOutlined />}
        onClick={() => history.push('/')}
      >
        Home
      </Menu.Item>
      */}

      <Menu.Item
        key="5"
        icon={<LogoutOutlined />}
        onClick={() => history.push('/logout')}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );
  const history = useHistory();
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
