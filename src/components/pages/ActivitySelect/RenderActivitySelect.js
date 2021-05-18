import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';
import { ProgramContext, ActivityContext } from '../../../state/contexts/index';
import { ClubsContext } from '../../../state/contexts';

const StyledActivitySelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
  text-align: center;
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

function RenderActivitySelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();

  const { memberObject, setMemberObject, setClubs } = useContext(
    ProgramContext
  );

  const { setActivity, activity } = useContext(ActivityContext);
  const context = useContext(ClubsContext);

  const { club } = useContext(ClubsContext);

  console.log('context' + club.activities);
  // const newMemberObject = { ...memberObject, activityId: '13' };

  // const onClick = () => {
  //   setMemberObject(newMemberObject);
  //   history.push('/scanner');
  // };

  const selectActivity = (e, item) => {
    setActivity(item);
    console.log(context);
  };

  const menu = (
    <Menu>
      {club.activities &&
        club.activities.map(item => (
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
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledActivitySelect>
        <h2>Select Activity</h2>

        <h2 style={{ textAlign: 'center' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link">
              Activity <DownOutlined />
            </a>
          </Dropdown>
        </h2>
        <h2 className="dropdownSelected">
          {activity && activity.activityname}
        </h2>
        <StyledButton
          size="large"
          type="primary"
          onClick={e => e.preventDefault()}
        >
          <StyledLink to="/scanner">Confirm</StyledLink>
        </StyledButton>
      </StyledActivitySelect>
    </LayoutContainer>
  );
}
export default RenderActivitySelect;
