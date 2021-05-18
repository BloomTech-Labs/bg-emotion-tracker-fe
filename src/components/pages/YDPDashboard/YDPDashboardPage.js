import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';
import {
  ProgramContext,
  ClubsContext,
  ClubContext,
} from '../../../state/contexts';
import { getClub } from '../../../state/actions';

const StyledYDPPage = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const StyledLink = styled(Link)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;

function RenderHomePage() {
  const { memberObject, setMemberObject } = useContext(ProgramContext);
  const clubsContext = useContext(ClubsContext);
  const clubContext = useContext(ClubContext);

  const newMemberObject = { ...memberObject, clubId: '20' };

  const onClick = () => {
    setMemberObject(newMemberObject);
  };

  let data = {
    clubs: [],
  };

  const selectClub = (e, item) => {
    getClub(item.clubid, clubContext);
    // setActivity(item);
    // api call to backend
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
        <StyledButton
          size="large"
          type="primary"
          onClick={e => e.preventDefault()}
        >
          <StyledLink to="/activity-select">Confirm</StyledLink>
        </StyledButton>
      </StyledYDPPage>
    </LayoutContainer>
  );
}
export default RenderHomePage;
