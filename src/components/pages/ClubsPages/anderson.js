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
import axios from 'axios';
import '../ClubsPages/anderson.css';

const { Content, Sider } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

function Anderson() {
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
      <NavBar titleName="Anderson" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          <Card className="titlebox">
            <div className="selectbox">
              <span>How does </span>
              <Select style={{ width: 150 }}>
                <Option value="Test1">Test1</Option>
              </Select>
              <span> impact sentiment?</span>
            </div>
            <div className="timebox">
              <span>Choose a Time Range</span>
              <RangePicker></RangePicker>
            </div>
          </Card>
          <div className="card-container">
            <Card size="big" className="graph-holder">
              <span className="title">Check-in</span>
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
            </Card>
          </div>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default Anderson;