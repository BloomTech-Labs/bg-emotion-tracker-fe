import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { QRCodeReader } from '../QRCodeReader';
import ManualMemberInput from './ManualMemberInput';
import { LayoutContainer, BackButton } from '../../common';
import { MemberContext } from '../../../state/contexts/index';
import { getMember } from '../../../state/actions';
import { Typography } from 'antd';
const { Text } = Typography;

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
  const [error, setError] = useState('Internal Server Error.');
  const history = useHistory();
  const [id, setId] = useState('');

  const memberContext = useContext(MemberContext);

  const handleError = err => {
    setScanError(true);
    setError(err);
  };

  useEffect(() => {
    memberContext.setId(id);
    if (id) history.push('/emoji-selectcheck');
  }, [id]);

  const handleScan = data => {
    setId(data);
    if (data) {
      getMember(data, memberContext);
    }
  };

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
        {scanStatus ? (
          <Text className="regularText">Scan successful</Text>
        ) : (
          <Text className="regularText">Not scanned yet</Text>
        )}
        {scanError ? (
          <Text className="errorText" strong type="danger">
            {error}
          </Text>
        ) : null}
        <ManualMemberInput
          setScanStatus={setScanStatus}
          handleError={handleError}
        />
      </StyledMemberScanner>

      {/* </StyledCenterA> */}
    </LayoutContainer>
  );
}
export default RenderMemberScanner;
