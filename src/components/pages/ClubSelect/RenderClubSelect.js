import React from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Modal, Menu, Dropdown, Button, Alert } from 'antd';

const StyledClubSelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderClubSelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledClubSelect>
        <h2>Select Club</h2>
        <Card>
          DROPDOWN HERE!
          <div>
            <Button
              type="primary"
              onClick={() => history.push('/activity-select')}
            >
              Submit
            </Button>
          </div>
        </Card>
      </StyledClubSelect>
    </>
  );
}
export default RenderClubSelect;
