import React, { useContext } from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';
import { ClubsContext, ClubContext } from '../../../state/contexts/index';
import { getClub } from '../../../state/actions';
import { StyledBtn } from '../../common';

const StyledYDPPage = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
  text-align: center;
`;

function RenderHomePage() {
  const clubsContext = useContext(ClubsContext);
  const clubContext = useContext(ClubContext);

  const onClick = e => {
    e.preventDefault();
    console.log(clubContext);
  };

  const selectClub = (e, item) => {
    getClub(item.clubid, clubContext);
  };

  const menu = (
    <Menu>
      {clubsContext.clubs.map(item => (
        <Menu.Item key={item.clubid} onClick={e => selectClub(e, item)}>
          {item.clubname}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledYDPPage>
        <h2 style={{ textAlign: 'center' }}>Select Club</h2>
        <h2 style={{ textAlign: 'center' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link">
              Clubs <DownOutlined />
            </a>
          </Dropdown>
        </h2>
        <h2 className="dropdownSelected">
          {clubContext.club && clubContext.club.clubname}
        </h2>
        <StyledBtn label="Confirm" onClick={onClick} path="/activity-select" />
      </StyledYDPPage>
    </LayoutContainer>
  );
}
export default RenderHomePage;
