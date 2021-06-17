import React from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import Tabs from '../../common/Tabs';
import './Alerts.css';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
const { Content, Sider } = Layout;

const dummyClubData = [
  'Anderson',
  'Caitlin',
  'Grossman',
  'Johnston',
  'Marley',
  'Morton',
  'Notter',
  'Stelle',
  'Jefferson',
];

function RenderAlerts(props) {
  return (
    <LayoutContainer>
      <NavBar titleName={'Alerts'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
            <Tabs>
              {dummyClubData.map(elem => (
                <div label={elem}>
                  <div className="under-tabs-container">
                    <div className="flags box">
                      <h2>Negative Sentiment</h2>
                    </div>
                    <div className="insights box">
                      <h2>Insights</h2>
                    </div>
                  </div>
                </div>
              ))}
          </Tabs>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderAlerts;
