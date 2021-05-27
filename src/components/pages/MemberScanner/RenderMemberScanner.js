import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { LayoutContainer, BackButton } from '../../common';
import { getMember } from '../../../state/actions';
import { Typography } from 'antd';
import { YouthContext } from '../../../state/contexts/index';

const { Title } = Typography;
const { Text } = Typography;

const StyledMemberScanner = styled.header`
  display: flex;
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 15%;
  flex-direction: column;
  text-align: center;
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
  const youthContext = useContext(YouthContext);

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
    youthContext.setExists('');
  }, []);

  useEffect(() => {
    if (youthContext.exists === true) {
      setCheckValid(true);
    } else if (youthContext.exists === false) {
      handleError('This member does not exist.');
    }
  }, [youthContext.exists]);

  const handleScan = data => {
    if (data) {
      getMember(data, youthContext);

      youthContext.setId(data);
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
          if (youthContext.id && youthContext.exists && scanStatus) {
            if (checkValid) {
              if (
                youthContext.activity.activityname === 'Club Checkin' ||
                youthContext.activity.activityname === 'Club Checkout'
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
