import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';
import { ProgramContext } from '../../../state/contexts/index';

const StyledActivitySelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;

function RenderActivitySelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();

  const { memberObject, setMemberObject } = useContext(ProgramContext);

  const newMemberObject = { ...memberObject, activityId: '13' };

  const onClick = () => {
    setMemberObject(newMemberObject);
    history.push('/scanner');
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">Check-In</Menu.Item>
      <Menu.Item key="1">Check-Out</Menu.Item>
      <Menu.Divider />

      <Menu.Item key="2">Act1</Menu.Item>
      <Menu.Item key="3">Act2</Menu.Item>
      <Menu.Item key="4">Act3</Menu.Item>
    </Menu>
  );

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledActivitySelect>
        <h2>Select Activity</h2>

        <h2 style={{ textAlign: 'center' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Activity
              <DownOutlined />
            </a>
          </Dropdown>
        </h2>

        <StyledButton type="primary" onClick={onClick}>
          Submit
        </StyledButton>
      </StyledActivitySelect>
    </LayoutContainer>
  );
}
export default RenderActivitySelect;
