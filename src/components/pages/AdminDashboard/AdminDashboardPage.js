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
import axios from 'axios';

const { Content, Sider } = Layout;

function RenderHomePage() {
  const context = useContext(AdminContext);
  const [whichClub, setWhichClub] = useState('Anderson');
  const [authtoken, setAuthtoken] = useState('');
  const [plotData, setPlotData] = useState('');

  useEffect(() => {
    graph();
    getFeedback('authState', context);
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
    type: 'bar',
    mode: 'lines+markers',
    marker: { color: 'blue' },
  };

  dt.y = getYValues(whichClub);
  dt.x = getXValues(whichClub);

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

  function graph() {
    axios
      .get(
        'http://bg-ds-api-dev.us-east-1.elasticbeanstalk.com/vis/pie/sentiment'
      )
      .then(res => {
        console.log('response res.data: ', JSON.parse(res.data));
        setPlotData(JSON.parse(res.data));
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

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
              style={{ width: 600, height: 500 }}
              className="graph-holder"
            >
              {plotData != '' ? (
                <Plot
                  data={plotData.data}
                  layout={{
                    width: 500,
                    height: 400,
                    colorway: plotData.layout.colorway,
                  }}
                />
              ) : (
                <div></div>
              )}
            </Card>
          </div>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
