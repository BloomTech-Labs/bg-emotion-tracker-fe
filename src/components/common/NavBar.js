import React, { useContext } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import {
  MenuOutlined,
  // UserOutlined,
  // TeamOutlined,
  // LogoutOutlined,
  // LineChartOutlined,
  // CalendarOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/BGC-logo-header.png';
// import { useHistory } from 'react-router';
// import { UserContext } from '../../state/contexts';

import NavBarLinks from './NavBarLinks';

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

const NavBar = props => {
  const { hideMenu } = props;
  // const context = useContext(UserContext);
  // const history = useHistory();

  // let role = context.user.roles && context.user.roles[0].role.name;

  // to update nav menu links update in NavBarLinks component
  const menu = (
    <Menu className="mainhamburger">
      <NavBarLinks />
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
};
export default NavBar;
