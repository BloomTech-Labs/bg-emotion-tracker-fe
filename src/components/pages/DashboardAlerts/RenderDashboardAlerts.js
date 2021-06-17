import React, { useContext, useState, useEffect } from 'react';
import './DashboardAlerts.css';
import { Badge, Menu } from 'antd';
import { dummyData } from './AlertsDummyData';
import { AdminContext } from '../../../state/contexts';
import { getMembersReaction } from '../../../state/actions';

import axios from 'axios';
import MenuItem from 'antd/lib/menu/MenuItem';

function RenderDashboardAlerts() {
  const context = useContext(AdminContext);
  // let [reactions, setReactions] = useState([]);

  /*
   * This function combines the locations into one object with the value of the
   * number of times the location appears. Main pourpous is to not have repeating locations and have a number coralating
   * to the number of alerts.
   */
  function combine_flags(arr) {
    const rtn = {};

    arr.forEach(alert => {
      if (!(alert.clubname in rtn)) {
        rtn[alert.clubname] = 0;
      }
      rtn[alert.clubname] += 1;
    });
    return rtn;
  }

  let flagObj = combine_flags(context.memberReactions);

  return (
    <>
      <Menu>
        {context.clubs.map(club => (
          <div className="club alert" key={club.clubid}>
            <h3 className="mi">{club.clubname}</h3>
            <Badge count={flagObj[club.clubname]} className="badge">
              <a
                href="/alerts"
                className="alertLink"
                alt="redirects to the alerts tab"
              >
                {' '}
              </a>
            </Badge>
          </div>
        ))}
      </Menu>
    </>
  );
}
export default RenderDashboardAlerts;
