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
  font-size: 11rem;
  background: '#ffffff';
  color: #000000;
  padding: '2px 0';
`;

let emojiList = [
  { id: '1F601', component: <StyledEmojis>😁</StyledEmojis> },
  { id: '1F642', component: <StyledEmojis>🙂</StyledEmojis> },
  { id: '1F610', component: <StyledEmojis>😐</StyledEmojis> },
  { id: '1F641', component: <StyledEmojis>🙁</StyledEmojis> },
  { id: '1F61E', component: <StyledEmojis>😞</StyledEmojis> },

  { id: '1F605', component: <StyledEmojis>😅</StyledEmojis> },
  { id: '1F61B', component: <StyledEmojis>😛</StyledEmojis> },
  { id: '1F61C', component: <StyledEmojis>😜</StyledEmojis> },
  { id: '1F61D', component: <StyledEmojis>😝</StyledEmojis> },
  { id: '1F92A', component: <StyledEmojis>🤪</StyledEmojis> },

  { id: '1F636', component: <StyledEmojis>😶</StyledEmojis> },
  { id: '1F611', component: <StyledEmojis>😑</StyledEmojis> },
  { id: '1F644', component: <StyledEmojis>🙄</StyledEmojis> },
  { id: '1F971', component: <StyledEmojis>🥱</StyledEmojis> },
  { id: '1F634', component: <StyledEmojis>😴</StyledEmojis> },

  { id: '1F622', component: <StyledEmojis>😢</StyledEmojis> },
  { id: '1F62D', component: <StyledEmojis>😭</StyledEmojis> },
  { id: '1F628', component: <StyledEmojis>😨</StyledEmojis> },
  { id: '1F620', component: <StyledEmojis>😠</StyledEmojis> },
  { id: '1F624', component: <StyledEmojis>😤</StyledEmojis> },
];

function RenderEmojiConfirmRedirect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  const context = useContext(EmojiContext);
  const member = useContext(MemberContext);
  const [readyToGo, setReadyToGo] = useState(false);
  const [state, setState] = useState(<StyledEmojis>😁</StyledEmojis>);

  setTimeout(() => {
    member.setExists(''); // DO NOT REMOVE: or page will infinite loop
    member.setId('');
    setReadyToGo(true);
  }, 3000);

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
        <h2 className="fade-in-image">Success!</h2>
        <div className="fade-in-image">{state}</div>
      </StyledEmojiConfirmRedirect>
      {readyToGo ? <Redirect to="/scanner" /> : <></>}
    </LayoutContainer>
  );
}
export default RenderEmojiConfirmRedirect;
