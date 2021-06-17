import React from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import Tabs from '../../common/Tabs';
import './Alerts.css';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
const { Content, Sider } = Layout;

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
            <div label="Anderson">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Caitlin">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Grossman">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Johnston">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Marley">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Morton">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Notter">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Stelle">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
            <div label="Jefferson">
              <div className="under-tabs-container">
                <div className="flags box"></div>
                <div className="insights box"></div>
              </div>
            </div>
          </Tabs>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderAlerts;
