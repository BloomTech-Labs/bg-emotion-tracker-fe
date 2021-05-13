import React from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Modal, Menu, Dropdown, Button, Alert } from 'antd';

const StyledActivitySelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderActivitySelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledActivitySelect>
        <h2>Select Activity</h2>
        <Card>
          DROPDOWN HERE!
          <div>
            <Button type="primary" onClick={() => history.push('/scanner')}>
              Submit
            </Button>
          </div>
        </Card>
      </StyledActivitySelect>
    </>
  );
}
export default RenderActivitySelect;
