import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Badge } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const RenderDashboardAlerts = () => {
  const negatives = [
    {
      clubid: 1,
      clubname: 'Jackson',
      clubmembers: [
        // for each member there is an alert
        {
          memberid: 1,
          reactions: [
            {
              clubid: 1,
              activity: {
                activityid: 1,
                activityname: 'bowling',
              },
              reactionvalue: '10D3',
              intigerValue: 1,
              resolved: false, //need to set local state of bool as well as on hte backend
            },
          ],
        },
      ],
    },
    {
      clubid: 2,
      clubname: 'Anderson',
      clubmembers: [
        // for each member there is an alert
        {
          memberid: 2,
          reactions: [
            {
              clubid: 2,
              activity: {
                activityid: 1,
                activityname: 'bowling',
              },
              reactionvalue: '10D3',
              intigerValue: 1,
              resolved: false, //need to set local state of bool as well as on hte backend
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <h2> Alerts</h2>
      <div className="alerts container">
        {negatives.forEach(location => {
          <div>
            <h3>{location.clubName}</h3>
            <Badge count={1}>
              <a href="#" className="alertLink" />
            </Badge>
          </div>;
        })}
      </div>
    </>
  );
};
export default RenderDashboardAlerts;
