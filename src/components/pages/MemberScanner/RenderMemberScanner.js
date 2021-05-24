import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { LayoutContainer, BackButton } from '../../common';
import { getMember } from '../../../state/actions';
import { Typography } from 'antd';
import { ActivityContext, MemberContext } from '../../../state/contexts/index';

const { Title } = Typography;
const { Text } = Typography;

const StyledMemberScanner = styled.header`
  display: flex;
  margin-left: 30%;
  margin-right: 30%;
  flex-direction: column;
  text-align: center;
  margin-top: 15%;

  @media (min-width: 1240px) {
    margin-left: 38%;
    margin-right: 38%;
  }
`;

function RenderMemberScanner(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [error, setError] = useState('Internal Server Error.');
  const [checkValid, setCheckValid] = useState(false);
  const activityContext = useContext(ActivityContext); //the act context
  const memberContext = useContext(MemberContext);

  const handleError = err => {
    console.log(err);
    if (err.toString().search(/video source/i) >= 0) {
      setScanError(true);
      setError('Camera Unavailable');
      return;
    }
    if (err.toString().search(/Permission denied/i) >= 0) {
      setScanError(true);
      setError('Camera Permission Denied');
      return;
    }
    setScanError(true);
    setError(err);
  };

  useEffect(() => {
    memberContext.setExists('');
  }, []);

  useEffect(() => {
    if (memberContext.exists === true) {
      setCheckValid(true);
    } else if (memberContext.exists === false) {
      handleError('This member does not exist.');
    }
  }, [memberContext.exists]);

  const handleScan = data => {
    if (data) {
      getMember(data, memberContext);

      memberContext.setId(data);
      setScanStatus(true);
    }
  };

  return (
    <LayoutContainer>
      <NavBar backgroundColor="#293845" />

      <Link to="/activity-select">
        <BackButton buttonText="Change Activity" classType="primary" />
      </Link>

      <StyledMemberScanner>
        <QRCodeReader handleScan={handleScan} handleError={handleError} />
        {scanError ? (
          <Text className="errorText" type="danger">
            {error}
          </Text>
        ) : (
          <Text style={{ height: '21px' }}></Text>
        )}
        {(() => {
          if (memberContext.id && memberContext.exists && scanStatus) {
            if (checkValid) {
              if (
                activityContext.activity.activityname === 'Club Attendance' ||
                activityContext.activity.activityname === 'Club Checkout'
              ) {
                return <Redirect to="/emoji-selectcheck" />;
              } else {
                return <Redirect to="/emoji-selectactivity" />;
              }
            }
          }
        })()}
        <ManualMemberInput
          handleError={handleError}
          setScanStatus={setScanStatus}
        />
      </StyledMemberScanner>
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
