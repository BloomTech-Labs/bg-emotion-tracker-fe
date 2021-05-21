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
`;

function RenderMemberScanner(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [error, setError] = useState('Internal Server Error.');
  const history = useHistory();
  const [id, setId] = useState('');
  const [checkAct, setCheckAct] = useState(false); //state for checking the check

  const activityContext = useContext(ActivityContext); //the act context
  const memberContext = useContext(MemberContext);

  const handleCheckTrue = checkAct => {
    setCheckAct(true);
  };
  const handleCheckFalse = checkAct => {
    setCheckAct(false);
  };

  const handleError = err => {
    setScanError(true);
    setError(err);
  };

  //   useEffect(() => {
  //     if (checkAct) {
  //     history.push ('/emoji-selectcheck');
  //     } else {
  //      history.push ('/emoji-selectactivity');}
  //     }, [checkAct]);

  const handleScan = data => {
    setId(data);
    if (data) {
      getMember(data, memberContext);
      memberContext.setId(data);
      handleCheck();
      setScanStatus(true);
    }
  };

  const handleCheck = check => {
    // if (!memberContext.exists) {
    //     handleError('Member Id invalid');
    // }

    if (
      activityContext.activity.activityname === 'Club Attendance' || //problem here!!!!!!!!
      activityContext.activity.activityname === 'Club Checkout'
    ) {
      //check it
      handleCheckTrue();
    } else {
      handleCheckFalse();
    }
    console.log(activityContext.activity.activityname);
    console.log(checkAct);
  };

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />

      <Link to="/activity-select">
        <BackButton buttonText="Change Activity" classType="primary" />
      </Link>

      <StyledMemberScanner>
        <Title level={2}>Scanner</Title>
        <QRCodeReader handleScan={handleScan} handleError={handleError} />
        {scanStatus ? <p>Scan successful</p> : <p>Not scanned yet</p>}
        {scanError ? <p>Some error happens</p> : null}
        {scanStatus ? (
          checkAct ? (
            <Redirect to="/emoji-selectcheck" />
          ) : (
            <Redirect to="/emoji-selectactivity" />
          )
        ) : null}
        <ManualMemberInput
          setScanStatus={setScanStatus}
          handleError={handleError}
        />
      </StyledMemberScanner>
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
