import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { LayoutContainer, BackButton } from '../../common';
import { MemberContext } from '../../../state/contexts/index';
const StyledMemberScanner = styled.header`
  display: flex;
  margin-left: 25%;
  margin-right: 25%;
  flex-direction: column;
  /* width: 800px; */
  /* max-width: 90%; */
  /* margin: 3rem auto; */
`;

const StyledCenterB = styled(Link)`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-content: center;
`;

const StyledCenterA = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-content: center;
`;

function RenderMemberScanner(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);

  //   const [emojiPage, setEmojiPage] = useState(); //state for emoji page select

  const memberContext = useContext(MemberContext);

  const handleError = err => {
    setScanError(true);
  };

  const handleScan = data => {
    if (data) {
      memberContext.setMemberId({ memberId: data });
      setScanStatus(true);
    }
  };

  // const handleEmojiPage = asdf => { //ftn to set the emoji page state

  // };

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />

      {/* <StyledCenterA> */}

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
            to={{
              pathname: '/emoji-selectcheck', //needs to be a var state {emojiPageState}
            }}
          />
        ) : null}
        <ManualMemberInput setScanStatus={setScanStatus} />
      </StyledMemberScanner>

      {/* </StyledCenterA> */}
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
