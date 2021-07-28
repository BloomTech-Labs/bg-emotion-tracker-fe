import React, { useEffect, useContext } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import './Leaderboard.css';
import Tabs from '../../common/Tabs';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getLeaderboard } from '../../../state/actions';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
const { Content, Sider } = Layout;

function RenderLeaderboard(props) {
  // Brings in context
  const context = useContext(AdminContext);

  // Sorts the leaderboard data from the backend by clubrating
  function sortLeaderboard(arr) {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (arr[j - 1].clubrating > arr[j].clubrating) {
          var temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }

  // Gets leaderboard data if context hasn't come in

  useEffect(() => {
    if (context.leaderboard.length === 0) {
      getLeaderboard('authState', context);
    }
  }, []);

  const sortedLeaderboard = sortLeaderboard(context.leaderboard).reverse();

  // Adds ranking to each leaderboard item

  for (var i = 0; i < sortedLeaderboard.length; i++) {
    sortedLeaderboard[i].ranking = i + 1;
  }

  return (
    <LayoutContainer>
      <NavBar titleName={'Leaderboard'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          <Tabs>
            <div label="CHECK-IN VS. CHECK-OUT">
              <ul className="leaderboard-ul">
                {sortedLeaderboard.map(elem => (
                  <div className={`li-container`} key={elem.clubrating}>
                    <li>
                      <h2 className="place">{elem.ranking}</h2>
                      <h2 className="place">{elem.clubname}</h2>
                      <h2 className="rating">{elem.clubrating.toFixed(3)}</h2>
                      <div className="chevron">
                        {elem.clubrating > 0 ? (
                          <UpOutlined
                            style={{ fontSize: '32px', color: 'green' }}
                          />
                        ) : (
                          <DownOutlined
                            style={{ fontSize: '32px', color: 'red' }}
                          />
                        )}
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
            <div label="MOST IMPROVED LAST MONTH">
              <ul className="leaderboard-ul">
                {sortedLeaderboard.map(elem => (
                  <div className={`li-container`} key={elem.clubrating}>
                    <li>
                      <h2 className="place">{elem.ranking}</h2>
                      <h2 className="place">{elem.clubname}</h2>
                      <h2 className="rating">{elem.clubrating.toFixed(3)}</h2>
                      <div className="chevron">
                        {elem.clubrating > 0 ? (
                          <UpOutlined
                            style={{ fontSize: '32px', color: 'green' }}
                          />
                        ) : (
                          <DownOutlined
                            style={{ fontSize: '32px', color: 'red' }}
                          />
                        )}
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </Tabs>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderLeaderboard;
