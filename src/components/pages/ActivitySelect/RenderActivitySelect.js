import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';
import { ActivityContext } from '../../../state/contexts/index';
import { ClubContext } from '../../../state/contexts';
import { StyledBtn } from '../../common';

import BackButton from '../../common/BackButton';
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

function RenderActivitySelect(props) {
  const { setActivity, activity } = useContext(ActivityContext);
  const { club } = useContext(ClubContext);

  console.log('Activity context ' + activity);

  const tempOnClick = e => {
    e.preventDefault();
    setActivity({ activityId: '14' });
  };

  const selectActivity = (e, item) => {
    setActivity(item);
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

      <Link to="/YDPDashboard">
        <BackButton buttonText="Change Club" classType="primary" />
      </Link>

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
        <StyledBtn label="Confirm" path="/scanner" onClick={tempOnClick} />
      </StyledActivitySelect>
    </LayoutContainer>
  );
}
export default RenderActivitySelect;
