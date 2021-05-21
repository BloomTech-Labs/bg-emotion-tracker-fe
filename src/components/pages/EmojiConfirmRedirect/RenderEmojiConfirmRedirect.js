import React, { useContext, useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Modal, Menu, Dropdown, Button, Alert } from 'antd';
import { LayoutContainer } from '../../common';
import { emoji, EmojiContext, MemberContext } from '../../../state/contexts';

const StyledEmojiConfirmRedirect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
  text-align: center;
`;

const StyledEmojis = styled.div`
  font-size: 3rem;
  background: '#ffffff';
  padding: '2px 0';
`;

let emojiList = [
  { id: '1F601', component: <StyledEmojis>😁</StyledEmojis> },
  { id: '1F642', component: <StyledEmojis>🙂</StyledEmojis> },
  { id: '1F610', component: <StyledEmojis>😐</StyledEmojis> },
  { id: '1F641', component: <StyledEmojis>🙁</StyledEmojis> },
  { id: '1F61E', component: <StyledEmojis>😞</StyledEmojis> },
];

function RenderEmojiConfirmRedirect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  const context = useContext(EmojiContext);
  const member = useContext(MemberContext);
  const [state, setState] = useState(<StyledEmojis>😁</StyledEmojis>);

  setTimeout(() => {
    member.setExists(false); // DO NOT REMOVE: or page will infinite loop
    member.setId('');
    history.push('/scanner');
  }, 4000);

  useEffect(() => {
    let selectedEmoji = emojiList.filter(emoji => {
      return context.emoji === emoji.id;
    });
    setState(selectedEmoji[0].component);
  }, [state]);

  return (
    <LayoutContainer>
      <NavBar hideMenu />
      <StyledEmojiConfirmRedirect>
        <h2>Success!</h2>
        {state}
      </StyledEmojiConfirmRedirect>
    </LayoutContainer>
  );
}
export default RenderEmojiConfirmRedirect;
