import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';

const StyledMemberScanner = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderMemberScanner(props) {
  const [QRdata, setQRdata] = useState('None');
  const [scanStatus, setScanStatus] = useState(false);
  const [scanError, setScanError] = useState(false);

  const handleError = err => {
    setScanError(true);
    console.error(err);
  };

  const handleScan = data => {
    if (data) {
      setQRdata(data);
      setScanStatus(true);
    }
  };

  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledMemberScanner>
        <h2>Scanner</h2>
        <QRCodeReader handleScan={handleScan} handleError={handleError} />
        {scanStatus ? <p>Scan successful</p> : <p>Not scanned yet</p>}
        {scanError ? <p>Some error happens</p> : null}
        {scanStatus ? (
          <Redirect
            to={{
              pathname: '/emojiselector',
              state: { QRdata: QRdata },
            }}
          />
        ) : null}
        <ManualMemberInput
          setQRdata={setQRdata}
          setScanStatus={setScanStatus}
        />
      </StyledMemberScanner>
    </>
  );
}
export default RenderMemberScanner;
