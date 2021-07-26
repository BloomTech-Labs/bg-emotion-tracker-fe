import React, { useContext, useEffect, useState } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import './Alerts.css';
import { Layout, Card } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getClubs, getMembersReaction } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import '../../../styles/styles.css';

const { Content, Sider } = Layout;

function ElapsedTime(createddate) {
  let today = new Date();
  let startDate = new Date(createddate);
  let diffInMilliSeconds = Math.abs(startDate - today) / 1000;

  // calc days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = '';
  // if (days > 0) {
  //   difference += days === 1 ? `${days} day, ` : `${days} days, `;
  // }

  difference +=
    hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

  difference +=
    minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;

  return Math.floor(diffInMilliSeconds);
}

function RenderAlerts() {
  const context = useContext(AdminContext);

  function seperate_club_data(arr) {
    let rtn = {};
    arr.forEach(alert => {
      if (!(alert.clubname in rtn)) {
        rtn[alert.clubname] = [];
      }
      rtn[alert.clubname].push(alert);
    });
    return rtn;
  }

  let sentimentObj = seperate_club_data(context.memberReactions);

  return (
    <LayoutContainer>
      <NavBar titleName={'Alerts'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          <Card>
            <div>
              <table>
                <thead>
                  <tr className="trclass">
                    <th>Club Name</th>
                    <th>Emoji</th>
                    <th>MemberID</th>
                    <th>Activity</th>
                    <th>Created</th>
                    <th>Elapsed</th>
                  </tr>
                </thead>
                <tbody>
                  {context.clubs.map(club => (
                    <>
                      {sentimentObj[club.clubname]?.map(alert => {
                        return (
                          <tr
                            className={
                              ElapsedTime(alert.createddate) > 0 &&
                              ElapsedTime(alert.createddate) < 30
                                ? 'tddata'
                                : ElapsedTime(alert.createddate) >= 30 &&
                                  ElapsedTime(alert.createddate) < 60
                                ? 'tddataorangealert'
                                : 'tddataredalert'
                            }
                          >
                            <td className="tddata">{alert.clubname}</td>
                            <td className="emoji">
                              {String.fromCodePoint(
                                parseInt(alert.reactionvalue, 16)
                              )}
                            </td>
                            <td className="tddata">{alert.member}</td>
                            <td className="tddata">{alert.activities}</td>
                            <td className="tddata">{alert.createddate}</td>
                            <td className="tddata">
                              {ElapsedTime(alert.createddate)}
                              {''} Minutes
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderAlerts;
