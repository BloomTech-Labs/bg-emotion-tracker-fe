import React, { useContext, useState, useEffect } from 'react';
import './DashboardAlerts.css';
import { Badge, Menu } from 'antd';
import { dummyData } from './AlertsDummyData';
import { AdminContext } from '../../../state/contexts';
import { getClubs } from '../../../state/actions';
import axios from 'axios';
import MenuItem from 'antd/lib/menu/MenuItem';

function RenderDashboardAlerts() {
  const context = useContext(AdminContext);
  let [reactions, setReactions] = useState([]);

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

  const fetchClubs = () => {
    getClubs('authState', context);
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // Get all membersreactions
  const getMembersReaction = () => {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

    const promise = axios.get(
      `https://bg-emotion-tracker-be-b.herokuapp.com/memberreactions/alert`,
      {
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
        },
      }
    );

    const dataPromise = promise.then(res => {
      setReactions(res.data);
      return res.data;
    });
    return dataPromise;
  };

  useEffect(() => {
    getMembersReaction();
  }, []);
  let flagObj = combine_flags(reactions);

  return (
    <>
      <Menu>
        {context.clubs.map(club => (
          <div className="club alert" key={club.clubid}>
            <h3 className="mi">{club.clubname}</h3>
            <Badge count={flagObj[club.clubname]} className="badge">
              <a href="/alerts" className="alertLink" />
            </Badge>
          </div>
        ))}
      </Menu>
    </>
  );
}
export default RenderDashboardAlerts;
