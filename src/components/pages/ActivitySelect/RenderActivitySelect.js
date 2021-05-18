import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';
import { ProgramContext, ActivityContext } from '../../../state/contexts/index';

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

let data = {
  clubid: 21,
  activities: [
    {
      activity: {
        activityid: 13,
        activityname: 'Club Attendance',
      },
    },
    {
      activity: {
        activityid: 14,
        activityname: 'Check Out',
      },
    },
    {
      activity: {
        activityid: 15,
        activityname: 'Act 1',
      },
    },
    {
      activity: {
        activityid: 16,
        activityname: 'Act 2',
      },
    },
    {
      activity: {
        activityid: 17,
        activityname: 'Act 3',
      },
    },
  ],
};

function RenderActivitySelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();

  const { memberObject, setMemberObject, setClubs } = useContext(
    ProgramContext
  );

  const { setActivity } = useContext(ActivityContext);

  // const newMemberObject = { ...memberObject, activityId: '13' };

  // const onClick = () => {
  //   setMemberObject(newMemberObject);
  //   history.push('/scanner');
  // };

  const selectActivity = (e, item) => {
    setActivity(item);
  };

  const menu = (
    <Menu>
      {data.activities.map(item => (
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

        {/* <StyledButton type="primary" onClick={onClick}>
          Submit
        </StyledButton> */}
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
