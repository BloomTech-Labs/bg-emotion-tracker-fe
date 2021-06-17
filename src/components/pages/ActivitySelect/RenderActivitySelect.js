import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Layout } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';
import { YouthContext } from '../../../state/contexts/index';
import { StyledBtn, BackButton } from '../../common';
import NavMenu from '../../common/NavMenu';

const { Content, Sider } = Layout;

const StyledActivitySelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
  margin-top: 15%;
  text-align: center;
  font-size: 3rem;
`;

function RenderActivitySelect(props) {
  const youthContext = useContext(YouthContext);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [dropDownName, setDropDownName] = useState('');

  const selectActivity = (e, item) => {
    youthContext.setActivity(item);
    setDropDownName(item.activityname);
    setDisabledBtn(false);
  };

  const menu = (
    <Menu className="ydp-selection-dropdowns ">
      {youthContext.club.activities &&
        youthContext.club.activities.map(item => (
          <Menu.Item
            key={item.activityid}
            onClick={e => selectActivity(e, item.activity)}
          >
            {item.activity.activityname}
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <LayoutContainer className="ydp">
      <NavBar backgroundColor="#293845" />
      <Layout>
        <Sider className="navSider" width={230}>
          <NavMenu />
        </Sider>

        <Content>
          <Link to="/YDPDashboard">
            <BackButton buttonText="Change Club" classType="primary" />
          </Link>

          <StyledActivitySelect>
            <h2 style={{ textAlign: 'center' }}>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link">
                  {dropDownName ? dropDownName : 'Select Activity'}{' '}
                  <DownOutlined />
                </a>
              </Dropdown>
            </h2>
            <StyledBtn
              label="Confirm"
              path="/scanner"
              isDisabled={disabledBtn}
            />
          </StyledActivitySelect>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderActivitySelect;
