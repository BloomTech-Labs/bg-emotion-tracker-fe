import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import NavMenu from './NavMenu';

import {
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  LineChartOutlined,
  CalendarOutlined,
  UpSquareOutlined,
  BellOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/BGC-logo-header.png';
import { useHistory } from 'react-router';
import { UserContext } from '../../state/contexts';

const StyledNavBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    /* margin: 0; */
  }

  @media (min-width: 1000px) {
    display: flex;
    justify-content: center;

    h1 {
      flex: 1;
      display: flex;
      justify-content: center;
      transform: translateX(60px);
    }
  }
`;

function NavBar(props) {
  const { hideMenu } = props;
  const [hidden, setHidden] = useState(true);

  const sidebarToggle = () => {
    setHidden(!hidden);

    const elem = document.querySelectorAll('.navSider');

    elem.forEach(el => {
      console.log(el);
      el.classList.toggle('active');
    });
  };

  return (
    <>
      <StyledNavBar backgroundColor={props.backgroundColor}>
        {!hideMenu && (
          <div className="menu-container">
            <Button
              type="text"
              style={{ color: 'white', fontSize: '2.4rem' }}
              onClick={sidebarToggle}
            >
              {hidden ? <MenuOutlined /> : <ArrowLeftOutlined />}
            </Button>
          </div>
        )}
        <h1>{props.titleName}</h1>
        <img src={logo} alt="Boys & Girls Club of Greater Conejo Valley" />
      </StyledNavBar>
    </>
  );
}
export default NavBar;
