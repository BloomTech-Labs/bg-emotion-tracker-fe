import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { LayoutContainer } from '../../common';
import { ProgramContext } from '../../../state/contexts';

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
  const [QRdata, setQRdata] = useState('None');
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);

  const con = useContext(ProgramContext);

  const handleError = err => {
    setScanError(true);
  };

  const handleScan = data => {
    if (data) {
      setQRdata(data);
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
              state: { QRdata: QRdata },
            }}
          />
        ) : null}
        <ManualMemberInput
          setQRdata={setQRdata}
          setScanStatus={setScanStatus}
        />
      </StyledMemberScanner>
      {/* </StyledCenterB> */}
      {/* </StyledCenterA> */}
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
