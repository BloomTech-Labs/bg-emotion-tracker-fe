import React, { useContext } from 'react';
import { Menu, Badge, Dropdown } from 'antd';

import {
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  LineChartOutlined,
  CalendarOutlined,
  FireOutlined,
  RightSquareOutlined,
  BellOutlined,
  DownOutlined,
  CheckCircleOutlined,
  StockOutlined,
} from '@ant-design/icons';
import { AdminContext } from '../../state/contexts';
import { useHistory } from 'react-router';

const NavMenu = props => {
  const adminContext = useContext(AdminContext);

  const num = adminContext.memberReactions;

  const { SubMenu } = Menu;

  const history = useHistory();

  let role = localStorage.getItem('role');

  const menu = (
    <Menu className="menu-club">
      {adminContext.clubs.map(club => (
        <Menu.Item
          key={club.clubid}
          icon={<StockOutlined />}
          onClick={() => {
            adminContext.setClub(club);
            history.push('/anderson');
          }}
          className="menu-club"
        >
          {club.clubname}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Menu className="mainhamburger" mode="inline">
      <Menu.Item
        key="1"
        icon={<LineChartOutlined />}
        onClick={() => history.push('/')}
      >
        Home
      </Menu.Item>

      {role === 'ADMIN' && (
        <Menu.Item key="2" icon={<CheckCircleOutlined />}>
          <Dropdown overlay={menu}>
            <a
              onClick={e => {
                e.preventDefault();
              }}
            >
              Choose Club <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="3"
          icon={<UserOutlined />}
          onClick={() => history.push('/manage-members')}
        >
          Manage Members
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="4"
          icon={<CalendarOutlined />}
          onClick={() => history.push('/manage-programs')}
        >
          Manage Programs
        </Menu.Item>
      )}

      {role === 'ADMIN' && (
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
          key="7"
          icon={<RightSquareOutlined />}
          onClick={() => history.push('/allreactions')}
        >
          Manage Reactions
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="6"
          icon={<FireOutlined />}
          onClick={() => history.push('/leaderboard')}
        >
          Leaderboard
        </Menu.Item>
      )}

      {(role === 'ADMIN' || role === 'CD') && (
        <Menu.Item
          key="8"
          icon={<BellOutlined />}
          onClick={() => history.push('/alerts')}
        >
          Alerts
          <Badge count={num.length} className="badge" />
        </Menu.Item>
      )}

      <Menu.Item
        key="9"
        icon={<LogoutOutlined />}
        onClick={() => history.push('/logout')}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
