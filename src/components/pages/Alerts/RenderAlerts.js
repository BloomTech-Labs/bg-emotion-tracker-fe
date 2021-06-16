import React from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import Tabs from '../../common/Tabs';
import './Alerts.css';

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
    </LayoutContainer>
  );
}
export default RenderAlerts;
