import React, { useContext } from 'react';
import { Menu, Badge } from 'antd';

import {
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  LineChartOutlined,
  CalendarOutlined,
  UpSquareOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { AdminContext, UserContext } from '../../state/contexts';
import { useHistory } from 'react-router';

const NavMenu = props => {
  const context = useContext(UserContext);
  const adminContext = useContext(AdminContext);

  const num = adminContext.memberReactions;
  // console.log(adminContext.memberReactions);
  const history = useHistory();

  let role = localStorage.getItem('role');

  return (
    <Menu
      className="mainhamburger"
      // className = { hidden ? "mainhamburger" : "mainhamburger active"}
      mode="inline"
    >
      <Menu.Item
        key="1"
        icon={<LineChartOutlined />}
        onClick={() => history.push('/')}
      >
        Home
      </Menu.Item>

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          onClick={() => history.push('/manage-members')}
        >
          Manage Members
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="3"
          icon={<CalendarOutlined />}
          onClick={() => history.push('/manage-programs')}
        >
          Manage Programs
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="5"
          icon={<TeamOutlined />}
          onClick={() => history.push('/manage-clubs')}
        >
          Manage Clubs
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="6"
          icon={<UpSquareOutlined />}
          onClick={() => history.push('/leaderboard')}
        >
          Leaderboard
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="7"
          icon={<BellOutlined />}
          onClick={() => history.push('/alerts')}
        >
          Alerts
          <Badge count={num.length} className="badge" />
        </Menu.Item>
      )}

      <Menu.Item
        key="8"
        icon={<LogoutOutlined />}
        onClick={() => history.push('/logout')}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
