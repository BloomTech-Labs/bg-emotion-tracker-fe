import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { Button } from 'antd';
import { LayoutContainer } from '../../common';
import { ProgramContext } from '../../../state/contexts/index';

const StyledMemberScanner = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  /* width: 800px; */
  /* max-width: 90%; */
  /* margin: 3rem auto; */
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-align: center;
  justify-content: center;
  align-content: center;
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

const StyledButton = styled(Button)`
  background-color: 293845;
  width: auto;
  text-align: center;
  justify-content: center;
  align-content: center;
  margin: 10px auto;
`;

function RenderMemberScanner(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);

  const { memberObject, setMemberObject } = useContext(ProgramContext);

  const handleError = err => {
    setScanError(true);
    console.error(err);
  };

  const handleScan = data => {
    if (data) {
      const newMemberObject = { ...memberObject, memberId: data };
      setMemberObject(newMemberObject);
      setScanStatus(true);
    }
  };

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />

      {/* <StyledCenterA> */}

      <StyledLink to="/activity-select">
        <StyledButton size="large" type="primary">
          Choose Activity
        </StyledButton>
      </StyledLink>

      {/* <StyledCenterB> */}
      <StyledMemberScanner>
        <h2>Scanner</h2>
        <QRCodeReader handleScan={handleScan} handleError={handleError} />
        {scanStatus ? <p>Scan successful</p> : <p>Not scanned yet</p>}
        {scanError ? <p>Some error happens</p> : null}
        {scanStatus ? (
          <Redirect
            to={{
              pathname: '/emoji-selectcheck',
            }}
          />
        ) : null}
        <ManualMemberInput setScanStatus={setScanStatus} />
      </StyledMemberScanner>
      {/* </StyledCenterB> */}
      {/* </StyledCenterA> */}
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
