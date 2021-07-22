import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Layout } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer, StyledBtn } from '../../common';
import { YouthContext } from '../../../state/contexts/index';
import { getClub } from '../../../state/actions';
import NavMenu from '../../common/NavMenu';

const { Content, Sider } = Layout;

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
  const youthContext = useContext(YouthContext);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [dropDownName, setDropDownName] = useState('');

  const onClick = e => {
    e.preventDefault();
  };

  const selectClub = (e, item) => {
    getClub(item.clubid, youthContext);
    setDropDownName(item.clubname);
    setDisabledBtn(false);
  };

  const menu = (
    <Menu className="ydp-selection-dropdowns">
      {youthContext.clubs.map(item => (
        <Menu.Item key={item.clubid} onClick={e => selectClub(e, item)}>
          {item.clubname}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <LayoutContainer className="ydp">
      <NavBar titleName="YDP Dashboard" backgroundColor="#293845" />
      <Layout>
        <Sider className="navSider" width={230}>
          <NavMenu />
        </Sider>

        <Content>
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
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
