import React, { useContext, useEffect, useState } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import './Alerts.css';
import { Layout, Card, Table } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getClubs, getMembersReaction } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import '../../../styles/styles.css';
import axios from 'axios';
import { useHistory } from 'react-router';

const { Content, Sider } = Layout;

const columns = [
  {
    key: 1,
    title: 'Club Name',
    className: 'tddata',
    dataIndex: 'clubname',
  },
  {
    key: 2,
    title: 'Emoji',
    className: 'emoji',
    dataIndex: 'reactionvalue',
    render: text => <>{String.fromCodePoint(parseInt(text, 16))}</>,
  },
  {
    key: 3,
    title: 'MemberID',
    className: 'tddata',
    dataIndex: 'member',
  },
  {
    key: 4,
    title: 'Activity',
    className: 'tddata',
    dataIndex: 'activities',
  },
  {
    key: 5,
    title: 'Created',
    className: 'tddata',
    dataIndex: 'createddate',
    render: text => <>{text.slice(11, 16)}</>,
  },
  {
    key: 6,
    title: 'Elapsed',
    className: 'tddata',
    dataIndex: 'createddate',
    render: text => <p>{ElapsedTime(text)} Minutes</p>,
  },
];

function ElapsedTime(createddate) {
  let today = new Date();
  let startDate = new Date(createddate);
  let diffInMilliSeconds = Math.abs(startDate - today) / 1000;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  const totalMinutesRounded = Math.floor(diffInMilliSeconds / 60);

  return totalMinutesRounded;
}

function RenderAlerts(props) {
  const context = useContext(AdminContext);

  const history = useHistory();

  useEffect(() => {
    if (context.memberReactions.length === 0) {
      getMembersReaction('authState', context);
    }
  }, []);

  function handleClick(e) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <LayoutContainer>
      <NavBar titleName={'Alerts'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          <Card>
            <Table
              dataSource={context.memberReactions}
              columns={columns}
              pagination={{ pageSize: 5 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    history.push(`/${record.clubname}`);
                  }, // click row
                  // onDoubleClick: event => {}, // double click row
                  // onContextMenu: event => {}, // right button click row
                  // onMouseEnter: event => {}, // mouse enter row
                  // onMouseLeave: event => {}, // mouse leave row
                };
              }}
            >
              {console.log(context.memberReactions)}
            </Table>
          </Card>
          {/* <Card>
            {context.memberReactions.length === 0 ? (
              <div className="centered-content flex">
                <LoadingComponent message="loading" />
              </div>
            ) : (
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
                <tbody onClick={handleClick}>{context.memberReactions.map((alert) => (
                  <tr  className={ElapsedTime(alert.createddate) > 0 && ElapsedTime(alert.createddate) < 30 ? 'tddata' : ElapsedTime(alert.createddate) >= 30 && ElapsedTime(alert.createddate) < 60 ? 'tddataorangealert' : 'tddataredalert' }
                  >
                    <td className="tddata">{alert.clubname}</td>
                    <td className="emoji">{String.fromCodePoint(parseInt(alert.reactionvalue, 16))}</td>
                    <td className="tddata">{alert.member}</td>
                    <td className="tddata">{alert.activities}</td>
                    <td className="tddata">{(alert.createddate).slice(11, 16)}</td>
                    <td className="tddata">{ElapsedTime(alert.createddate)} Minutes</td>
                  </tr>
                ))}
                  
                </tbody>
              </table>
            )}
          </Card> */}
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderAlerts;
