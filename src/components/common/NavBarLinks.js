import React, { useContext } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  LineChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { UserContext } from '../../state/contexts';

const NavBarLinks = () => {
  const history = useHistory();
  const context = useContext(UserContext);

  let role = context.user.roles && context.user.roles[0].role.name;

  return (
    <div>
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
      <Menu.Item
        key="6"
        icon={<LogoutOutlined />}
        onClick={() => history.push('/logout')}
      >
        Log Out
      </Menu.Item>
    </div>
  );
};

export default NavBarLinks;
