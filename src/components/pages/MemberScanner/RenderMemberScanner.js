import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';

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

  const handleScan = data => {
    if (data) {
      setQRdata(data);
    }
  };

  const onClick = () => {};

  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledMemberScanner>
        <h2>Scaner</h2>
        <QRCodeReader handleScan={handleScan} />
        <p>{QRdata}</p>
        <Button type="primary" onClick={onClick}>
          Submit
        </Button>
      </StyledMemberScanner>
    </>
  );
}
export default RenderMemberScanner;
