import React, { useState, useEffect, useContext } from 'react';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import NavMenu from '../../common/NavMenu';
import { Layout, Card, Dropdown, Button, Menu } from 'antd';
import { DownOutlined, StockOutlined } from '@ant-design/icons';
import Plot from 'react-plotly.js';
import { getClubs, getFeedback } from '../../../state/actions';
import { AdminContext } from '../../../state/contexts';
import axios from 'axios';
import '../ClubPages/anderson.css';

const { Content, Sider } = Layout;

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
          <div className="card-container">
            <Card style={{ width: 450, height: 350 }} className="graph-holder">
              {plotData != '' ? (
                <Plot
                  data={plotData.data}
                  layout={{
                    width: 420,
                    height: 320,
                    colorway: plotData.layout.colorway,
                  }}
                />
              ) : (
                <div></div>
              )}
            </Card>

            <Card style={{ width: 450, height: 350 }} className="graph-holder">
              {plotData != '' ? (
                <Plot
                  data={plotData.data}
                  layout={{
                    width: 420,
                    height: 320,
                    colorway: plotData.layout.colorway,
                  }}
                />
              ) : (
                <div></div>
              )}
            </Card>

            <Card style={{ width: 450, height: 350 }} className="graph-holder">
              {plotData != '' ? (
                <Plot
                  data={plotData.data}
                  layout={{
                    width: 420,
                    height: 320,
                    colorway: plotData.layout.colorway,
                  }}
                />
              ) : (
                <div></div>
              )}
            </Card>

            <Card style={{ width: 450, height: 350 }} className="graph-holder">
              {plotData != '' ? (
                <Plot
                  data={plotData.data}
                  layout={{
                    width: 420,
                    height: 320,
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
