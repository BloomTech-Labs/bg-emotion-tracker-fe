import React, { useState, useEffect, useContext } from 'react';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import NavMenu from '../../common/NavMenu';
import {
  Layout,
  Card,
  Dropdown,
  Button,
  Menu,
  Select,
  DatePicker,
  Space,
} from 'antd';
import { DownOutlined, StockOutlined } from '@ant-design/icons';
import Plot from 'react-plotly.js';
import { getClubs, getFeedback } from '../../../state/actions';
import { AdminContext } from '../../../state/contexts';
import './AdminDashboardPage.css';
import axios from 'axios';

const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

function RenderHomePage() {
  const context = useContext(AdminContext);
  const [whichClub, setWhichClub] = useState('');
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

  let activities = [
    'Club Checkin',
    'Club Checkout',
    'Music',
    'Soccer',
    'Basketball',
  ];

  const activitymenu = (
    <Menu>
      {activities.map(item => (
        <Menu.Item key={item.activityid}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  const clubMenu = (
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
      <NavBar titleName={whichClub == '' ? 'Admin Dashboard' : whichClub} />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu setWhichClub={setWhichClub} />
        </Sider>
        <Content>
          <Dropdown overlay={clubMenu}>
            <Button size={'large'} className="pick-a-club">
              CHOOSE CLUB <DownOutlined />
            </Button>
          </Dropdown>
          <div className="card-container">
            <Card size="big" className="graph-holder">
              <div className="selections">
                <Dropdown overlay={activitymenu} trigger={['click']}>
                  <a
                    className="ant-dropdown-link"
                    onClick={e => e.preventDefault()}
                  >
                    Choose Activity <DownOutlined />
                  </a>
                </Dropdown>
                <div className="timebox">
                  <span>Choose Date: &nbsp;</span>
                  <RangePicker></RangePicker>
                </div>
              </div>

              <span className="title">Check In</span>
              <span className="desc">
                Percentage of sentiment for all of Check-in
              </span>

              {plotData != '' ? (
                <Plot
                  className="Plot"
                  data={plotData.data}
                  layout={{
                    colorway: plotData.layout.colorway,
                    align: '0 auto',
                  }}
                />
              ) : (
                <div></div>
              )}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </Card>

            <Card size="big" className="graph-holder">
              <div className="selections">
                <Dropdown overlay={activitymenu} trigger={['click']}>
                  <a
                    className="ant-dropdown-link"
                    onClick={e => e.preventDefault()}
                  >
                    Choose Activity <DownOutlined />
                  </a>
                </Dropdown>
                <div className="timebox">
                  <span>Choose Date: &nbsp;</span>
                  <RangePicker></RangePicker>
                </div>
              </div>

              <span className="title">Check In</span>
              <span className="desc">
                Percentage of sentiment for all of Check-in
              </span>

              {plotData != '' ? (
                <Plot
                  className="Plot"
                  data={plotData.data}
                  layout={{
                    colorway: plotData.layout.colorway,
                  }}
                />
              ) : (
                <div></div>
              )}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </Card>
          </div>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
