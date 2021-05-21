import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { LayoutContainer, BackButton } from '../../common';
import { ActivityContext, MemberContext } from '../../../state/contexts/index';

const StyledMemberScanner = styled.header`
  display: flex;
  margin-left: 25%;
  margin-right: 25%;
  flex-direction: column;
  /* width: 800px; */
  /* max-width: 90%; */
  /* margin: 3rem auto; */
`;

function RenderMemberScanner(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [checkAct, setCheckAct] = useState(true); //state for checking the check

  const activityContext = useContext(ActivityContext); //the act context
  const memberContext = useContext(MemberContext);

  const handleCheckTrue = checkAct => {
    setCheckAct({ checkAct: true });
  };
  const handleCheckFalse = checkAct => {
    setCheckAct({ checkAct: false });
  };

  const handleError = err => {
    setScanError(true);
  };

  const handleScan = data => {
    if (data) {
      memberContext.setMemberId({ memberId: data });
      setScanStatus(true);
      //   handleCheck();
    }
  };

  const handleCheck = check => {
    if (
      activityContext.activity.activityname === 'Club Attendance' ||
      activityContext.activity.activityname === 'Club Checkout'
    ) {
      //check it
      handleCheckTrue();
    } else {
      handleCheckFalse();
    }

    console.log(checkAct);
  };

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />

      <Link to="/activity-select">
        <BackButton buttonText="Change Activity" classType="primary" />
      </Link>

      <StyledMemberScanner>
        <h2>Scanner</h2>
        <QRCodeReader handleScan={handleScan} handleError={handleError} />
        {scanStatus ? <p>Scan successful</p> : <p>Not scanned yet</p>}
        {scanError ? <p>Some error happens</p> : null}
        {scanStatus ? (
          <Redirect
            to={
              checkAct
                ? { pathname: '/emoji-selectcheck' }
                : { pathname: '/emoji-selectactivity' }
            }
          />
        ) : null}
        <ManualMemberInput setScanStatus={setScanStatus} />
      </StyledMemberScanner>
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
