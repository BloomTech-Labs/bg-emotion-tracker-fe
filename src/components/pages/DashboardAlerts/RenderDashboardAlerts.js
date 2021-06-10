import React, { useContext, useState } from 'react';
import './DashboardAlerts.css';
import { Badge } from 'antd';
import { dummyData } from './AlertsDummyData';

function RenderDashboardAlerts() {
  const combineFlags = dummyData => {
    const rtn = {};
    dummyData.forEach(location => {
      if (!(location.clubname in rtn)) {
        rtn[location.clubname] = 0;
      }
      rtn[location.clubname] += 1;
    });
    return rtn;
  };

  let flagObj = combineFlags(dummyData);

  return (
    <>
      <div className="alerts container">
        <h2 className="alerts header"> Alerts</h2>
        {Object.keys(flagObj).map(location => (
          <div className="alert div" key={location}>
            <h3>{location}</h3>
            <Badge count={flagObj[location]} className="badge">
              <a href="#" className="alertLink" />
            </Badge>
          </div>
        ))}
      </div>
    </>
  );
}
export default RenderDashboardAlerts;
