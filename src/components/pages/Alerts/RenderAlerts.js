import React, { useContext, useEffect, useState } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import Tabs from '../../common/Tabs';
import './Alerts.css';
import { Layout, Button } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getClubs, getMembersReaction } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import '../../../styles/styles.css';
import axios from 'axios';

const { Content, Sider } = Layout;

function RenderAlerts() {
  const context = useContext(AdminContext);
  const [resolve, setResolve] = useState();

  useEffect(() => {
    setResolve(true);
    getClubs('authState', context);
    getMembersReaction('authState', context);
  }, [resolve]);

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

  //resolve button
  function resolveBtn(memberreactionid) {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

    axios.put(
      `https://bg-emotion-tracker-be-b.herokuapp.com/memberreactions/update/${memberreactionid}`,
      {
        reactionresolved: true,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
        },
      }
    );
    setResolve(!resolve);
  }

  return (
    <LayoutContainer>
      <NavBar titleName={'Alerts'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          {context.clubs.length === 0 ? (
            <div className="centered-content flex">
              <LoadingComponent message="loading" />
            </div>
          ) : (
            <Tabs>
              {context.clubs.map(club => (
                <div label={club.clubname} key={club.clubid}>
                  <div className="under-tabs-container">
                    {sentimentObj[club.clubname]?.map(alert => {
                      return (
                        <div key={alert.id} className="alertDiv flags box">
                          <div className="contentDiv">
                            <h4>Member: {alert.member}</h4>
                            <h4>Activity: {alert.activities}</h4>
                            <h4>Time: {alert.createddate}</h4>
                          </div>
                          <div className="buttDiv">
                            <Button
                              type="primary"
                              onClick={() => resolveBtn(alert.id)}
                            >
                              Resolve
                            </Button>

                            {/* <Modal
                                title="Add Clubs"
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                width={'70%'}
                              /> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </Tabs>
          )}
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderAlerts;
