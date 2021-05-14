import React from 'react';
//import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
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

const StyledEmojis = styled.div`
  font-size: 3rem;
  background: '#ffffff';
  padding: '2px 0';
`;

function RenderEmojiConfirmRedirect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();

  setTimeout(() => {
    history.push('/scanner');
  }, 4000);

  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiConfirmRedirect>
        <h2>Success!</h2>
        <StyledEmojis>🙂</StyledEmojis>
        EMOJI CONFIRMATION HERE AND REDIRECT TO SCANNER AFTER X SECONDS!
      </StyledEmojiConfirmRedirect>
    </>
  );
}
export default RenderEmojiConfirmRedirect;
