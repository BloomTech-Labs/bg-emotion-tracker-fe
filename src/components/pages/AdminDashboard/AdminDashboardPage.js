import React, { useState, useEffect, useContext } from 'react';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import NavMenu from '../../common/NavMenu';
import { Layout, Card, Dropdown, Button, Menu } from 'antd';
import { DownOutlined, StockOutlined } from '@ant-design/icons';
import Plot from 'react-plotly.js';
import { getClubs, getFeedback } from '../../../state/actions';
import { AdminContext } from '../../../state/contexts';
import './AdminDashboardPage.css';

const { Content, Sider } = Layout;

function RenderHomePage() {
  const context = useContext(AdminContext);
  const [whichClub, setWhichClub] = useState('Anderson');
  const [authtoken, setAuthtoken] = useState('');

  useEffect(() => {
    getFeedback('authState', context);
    console.log('working');
    if (context.clubs.length === 0) {
      getClubs('authState', context);
    }
  }, []);

  function getYValues(str) {
    const output = [];
    const [temp] = context.feedback.filter(club => club.clubname === str);
    temp?.activityReactionRatings?.forEach(activity => {
      output.push(activity.activityrating);
    });
    return output;
  }

  function getXValues(str) {
    const output = [];
    const [temp] = context.feedback.filter(club => club.clubname === str);
    temp?.activityReactionRatings?.forEach(activity => {
      output.push(activity.activityname);
    });
    return output;
  }

  const dt = {
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
  };

  dt.y = getYValues(whichClub);
  dt.x = getXValues(whichClub);

  // let widget = <div></div>;

  const menu = (
    <Menu className="menu-club">
      {context.clubs.map(club => (
        <Menu.Item
          key={club.clubid}
          icon={<StockOutlined />}
          onClick={() => setWhichClub(club.clubname)}
          className="menu-club"
        >
          {club.clubname}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <LayoutContainer>
      <NavBar titleName="Admin Dashboard" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          <Dropdown overlay={menu}>
            <Button size={'large'} className="pick-a-club">
              CHOOSE CLUB <DownOutlined />
            </Button>
          </Dropdown>
          <div className="card-container">
            <Card
              title={whichClub}
              extra={<a href="/leaderboard">Leaderboard</a>}
              style={{ width: 600, height: 400 }}
              className="graph-holder"
            >
              <Plot
                data={[dt]}
                layout={{
                  width: 550,
                  height: 300,
                  title: {
                    text: `Avg Sentiment by Activity`,
                    font: { size: 18 },
                  },
                  margin: { l: 30, r: 20, t: 40, b: 40 },
                  showlegend: false,
                  xaxis: { linecolor: 'black', linewidth: 2, mirror: true },
                  yaxis: { linecolor: 'black', linewidth: 2, mirror: true },
                }}
              />
            </Card>
          </div>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
