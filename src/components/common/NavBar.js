import React, { useContext } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  LineChartOutlined,
  CalendarOutlined,
  UpSquareOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/BGC-logo-header.png';
import { useHistory } from 'react-router';
import { UserContext } from '../../state/contexts';

const StyledNavBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  background-color: rgba(0, 129, 198, 1);
  top: 0;
  width: 100%;
  img,
  .menu-container {
    margin: 1.5rem;
  }
  .menu-container {
    text-align: left;
    width: 10vh;
  }
  img {
    height: 6vh;
  }
  h1 {
    color: white;
    margin: 0;
  }
`;

function NavBar(props) {
  const { hideMenu } = props;
  const context = useContext(UserContext);
  const history = useHistory();

  let role = context.user.roles && context.user.roles[0].role.name;

  const menu = (
    <Menu className="mainhamburger">
      <Menu.Item
        key="1"
        icon={<LineChartOutlined />}
        onClick={() => history.push('/')}
      >
        Home
      </Menu.Item>
      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          onClick={() => history.push('/manage-members')}
        >
          Manage Members
        </Menu.Item>
      )}
      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="3"
          icon={<CalendarOutlined />}
          onClick={() => history.push('/manage-programs')}
        >
          Manage Programs
        </Menu.Item>
      )}
      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="5"
          icon={<TeamOutlined />}
          onClick={() => history.push('/manage-clubs')}
        >
          Manage Clubs
        </Menu.Item>
      )}
      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="6"
          icon={<UpSquareOutlined />}
          onClick={() => history.push('/leaderboard')}
        >
          Leaderboard
        </Menu.Item>
      )}
      <Menu.Item
        key="7"
        icon={<LogoutOutlined />}
        onClick={() => history.push('/logout')}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <StyledNavBar backgroundColor={props.backgroundColor}>
        {!hideMenu && (
          <div className="menu-container">
            <Dropdown overlay={menu} trigger={['click']}>
              <Button
                type="text"
                style={{ color: 'white', fontSize: '2.4rem' }}
              >
                <MenuOutlined />
              </Button>
            </Dropdown>
          </div>
        )}
        <h1>{props.titleName}</h1>
        <img src={logo} alt="Boys & Girls Club of Greater Conejo Valley" />
      </StyledNavBar>
    </>
  );
}
export default NavBar;
