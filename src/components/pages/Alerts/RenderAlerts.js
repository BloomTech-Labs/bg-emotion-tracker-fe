import React, { useContext, useEffect } from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import Tabs from '../../common/Tabs';
import './Alerts.css';
import { Layout, Button } from 'antd';
import NavMenu from '../../common/NavMenu';
import { AdminContext } from '../../../state/contexts';
import { getClubs, getMembersReaction } from '../../../state/actions';
const { Content, Sider } = Layout;

function RenderAlerts(props) {
  const context = useContext(AdminContext);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleOk = () => {
  //   // Send data to backend
  //   // if (inputData.individual.length > 0) {
  //   //   inputData.individual.forEach(item => {
  //   //     console.log(item);
  //   //     postClub(item);
  //   //   });
  //   // }
  //   // setIsModalVisible(false);
  //   // clearState();
  //   // setTimeout(() => {
  //   //   fetchClubs();
  //   // }, 2000);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  //   clearState();
  // };

  // const clearState = () => {
  //   setInputData({
  //     individual: [],
  //     file: [],
  //   });
  // };

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  useEffect(() => {
    if (context.clubs.length === 0) {
      getClubs('authState', context);
    }
    if (context.memberReactions.length === 0) {
      getMembersReaction('authState', context);
    }
  }, []);

  function seperate_club_data(arr) {
    let rtn = {};
    arr.forEach(alert => {
      if (!(alert.clubname in rtn)) {
        rtn[alert.clubname] = [];
      }
      rtn[alert.clubname].push(alert);
    });
    console.log(rtn);
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
          {context.clubs.length === 0 ? (
            <div>
              <h2>Loading</h2>
            </div>
          ) : (
            <Tabs>
              {context.clubs.map(club => (
                <div label={club.clubname} key={club.clubid}>
                  <div className="under-tabs-container" key={club.clubid}>
                    {sentimentObj[club.clubname].map(alert => {
                      return (
                        <div key="alert.id" className="alertDiv flags box">
                          <div className="contentDiv">
                            <h4>Member: {alert.member}</h4>
                            <h4>Activity: {alert.activities}</h4>
                            <h4>Time: {alert.createddate}</h4>
                          </div>
                          <div className="buttDiv">
                            <Button type="primary" /*onClick={showModal}*/>
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
