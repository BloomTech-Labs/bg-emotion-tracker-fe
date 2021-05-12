import React from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Modal, Menu, Dropdown, Button, Alert } from 'antd';

const StyledEmojiConfirmRedirect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderEmojiConfirmRedirect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiConfirmRedirect>
        <h2>Success!</h2>
        <Card>
          EMOJI CONFIRMATION HERE AND REDIRECT TO SCANNER AFTER X SECONDS!
        </Card>
      </StyledEmojiConfirmRedirect>
    </>
  );
}
export default RenderEmojiConfirmRedirect;
