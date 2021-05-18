import React, { useContext } from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';

const StyledClubSelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

let data = [{ clubs: [] }];

function RenderClubSelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();

  const menu = (
    <Menu>
      {data.clubs.map(item => (
        <Menu.Item key={item.clubid} onClick={e => console.log('club')}>
          {item.clubname}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <LayoutContainer>
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
    </LayoutContainer>
  );
}
export default RenderClubSelect;
