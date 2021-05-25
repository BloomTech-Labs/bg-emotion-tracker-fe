import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer, StyledBtn } from '../../common';
import { ClubsContext, ClubContext } from '../../../state/contexts/index';
import { getClub } from '../../../state/actions';

const StyledYDPPage = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
  margin-top: 15%;

  text-align: center;
  font-size: 3rem !important;
`;

function RenderHomePage() {
  const clubsContext = useContext(ClubsContext);
  const clubContext = useContext(ClubContext);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [dropDownName, setDropDownName] = useState('');

  useEffect(() => {
    // console.log('club: ', clubContext.club.clubname);
    // if (!clubContext.club.clubname) {
    //   setDisabledBtn(true);
    // }
  }, []);

  const onClick = e => {
    e.preventDefault();
  };

  const selectClub = (e, item) => {
    getClub(item.clubid, clubContext);
    setDropDownName(item.clubname);
    setDisabledBtn(false);
  };

  const menu = (
    <Menu className="ydp-selection-dropdowns">
      {clubsContext.clubs.map(item => (
        <Menu.Item key={item.clubid} onClick={e => selectClub(e, item)}>
          {item.clubname}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <LayoutContainer className="ydp">
      <NavBar titleName="YDP Dashboard" backgroundColor="#293845" />
      <StyledYDPPage>
        <h2 style={{ textAlign: 'center' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link">
              {dropDownName ? dropDownName : 'Select Club'} <DownOutlined />
            </a>
          </Dropdown>
        </h2>

        <StyledBtn
          label="Confirm"
          onClick={onClick}
          path="/activity-select"
          isDisabled={disabledBtn}
          // isDisabled={clubContext.club.clubname}
        />
      </StyledYDPPage>
    </LayoutContainer>
  );
}
export default RenderHomePage;
