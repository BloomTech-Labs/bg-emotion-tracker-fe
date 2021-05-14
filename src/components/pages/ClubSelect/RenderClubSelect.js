import React from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const StyledClubSelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderClubSelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledClubSelect>
        <h2>Select Club</h2>
        <Card>
          DROPDOWN HERE!
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Click me <DownOutlined />
            </a>
          </Dropdown>
          <div>
            <Button
              type="primary"
              onClick={() => history.push('/activity-select')}
            >
              Submit
            </Button>
          </div>
        </Card>
      </StyledClubSelect>
    </>
  );
}
export default RenderClubSelect;
