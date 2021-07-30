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
import { AdminContext, AdminContextProvider } from '../../../state/contexts';
import axios from 'axios';
import '../ClubsPages/anderson.css';
import { getClubData } from '../../../api';

const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

function Anderson() {
  const context = useContext(AdminContext);
  const [activities, setActivities] = useState([]);
  const [plotData, setPlotData] = useState('');

  useEffect(() => {
    graph();
    getClubActivity();
    getFeedback('authState', context);
    if (context.clubs.length === 0) {
      getClubs('authState', context);
    }
  }, []);

  useEffect(() => {
    getClubActivity();
  }, [context.club]);

  const getClubActivity = () => {
    getClubData(context.club.clubid).then(res => {
      setActivities(res.activities);
    });
  };

  const menu = (
    <Menu>
      {activities.map(item => (
        <Menu.Item key={item.activity.activityid}>
          {item.activity.activityname}
        </Menu.Item>
      ))}
    </Menu>
  );

  // **reactive function that uses context**
  //   const menu = (
  //     <Menu className="menu-club">
  //       {context.clubs.map(club => (
  //         <Menu.Item
  //           key={club.clubid}
  //           icon={<StockOutlined />}
  //           onClick={() => setWhichClub(club.clubname)}
  //           className="menu-club"
  //         >
  //           {club.clubname}
  //         </Menu.Item>
  //       ))}
  //     </Menu>
  //   );

  function graph() {
    axios
      .get(
        'http://bg-ds-api-dev.us-east-1.elasticbeanstalk.com/vis/pie/Anderson/Basketball/2021-07-01/2021-07-31'
      )
      .then(res => {
        setPlotData(JSON.parse(res.data));
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  return (
    <LayoutContainer>
      <NavBar titleName={context.club.clubname} />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>

        <Content>
          <div className="card-container">
            <Card size="big" className="graph-holder">
              <div className="selections">
                <Dropdown overlay={menu} trigger={['click']}>
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

              <span className="title">
                Percentage of sentiment for all of Check-In
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
                <Dropdown overlay={menu} trigger={['click']}>
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

              <span className="title">
                Percentage of sentiment for all of Check-Out
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
export default Anderson;
