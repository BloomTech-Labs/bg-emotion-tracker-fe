import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import logo from '../../assets/images/BGC-logo-header.png';

const StyledNavBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 129, 198, 1);
  top: 0;
  width: 100%;

  img,
  .menu-container {
    margin: 1rem;
  }
  .menu-container {
    text-align: left;
    width: 10vh;
  }
  img {
    height: 8vh;
  }
  h1 {
    color: white;
    font-size: 1.7em;
  }

  @media (min-width: 1000px) {
    display: flex;
    justify-content: center;

    h1 {
      flex: 1;
      display: flex;
      font-size: 2em;
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
      </StyledNavBar>
    </>
  );
}
export default NavBar;
