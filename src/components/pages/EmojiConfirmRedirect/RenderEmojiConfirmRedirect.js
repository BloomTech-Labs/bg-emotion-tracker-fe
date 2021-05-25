import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { LayoutContainer } from '../../common';
import { EmojiContext, MemberContext } from '../../../state/contexts';

const StyledEmojiConfirmRedirect = styled.header`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 500px;
  max-width: 90%;
  margin: 3rem auto;
  /* padding-top: 500px; */
  text-align: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const StyledEmojisOffset = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  /* left: 0%; */
  /* margin-left: -250px; */
  /* top: 50%; */
  /* margin-top: -750px; */
`;

const StyledEmojis = styled.div`
  font-size: 11rem;
  background: '#ffffff';
  color: #000000;
  /* padding: '2px 0'; */
`;

let emojiList = [
  { id: '1F601', component: <StyledEmojis>😁</StyledEmojis> },
  { id: '1F642', component: <StyledEmojis>🙂</StyledEmojis> },
  { id: '1F610', component: <StyledEmojis>😐</StyledEmojis> },
  { id: '1F641', component: <StyledEmojis>🙁</StyledEmojis> },
  { id: '1F61E', component: <StyledEmojis>😞</StyledEmojis> },

  { id: '1F603', component: <StyledEmojis>😃</StyledEmojis> },
  { id: '1F60A', component: <StyledEmojis>😊</StyledEmojis> },
  { id: '1F60C', component: <StyledEmojis>😌</StyledEmojis> },
  { id: '1F61D', component: <StyledEmojis>😝</StyledEmojis> },
  { id: '1F60E', component: <StyledEmojis>😎</StyledEmojis> },

  { id: '1F62E', component: <StyledEmojis>😮</StyledEmojis> },
  { id: '1F915', component: <StyledEmojis>🤕</StyledEmojis> },
  { id: '1F974', component: <StyledEmojis>🥴</StyledEmojis> },
  { id: '1F971', component: <StyledEmojis>🥱</StyledEmojis> },
  { id: '1F634', component: <StyledEmojis>😴</StyledEmojis> },

  { id: '1F622', component: <StyledEmojis>😢</StyledEmojis> },
  { id: '1F62D', component: <StyledEmojis>😭</StyledEmojis> },
  { id: '1F628', component: <StyledEmojis>😨</StyledEmojis> },
  { id: '1F620', component: <StyledEmojis>😠</StyledEmojis> },
  { id: '1F624', component: <StyledEmojis>😤</StyledEmojis> },
];

function RenderEmojiConfirmRedirect(props) {
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
  }, [state, context.emoji]);

  return (
    <LayoutContainer>
      <NavBar hideMenu />

      <StyledEmojiConfirmRedirect className="fade-in-image">
        {/* <h2>Success!</h2> */}
        <StyledEmojisOffset>
          <div className="item">{state}</div>
          <div className="circleA"></div>
          <div className="circleB"></div>
          <div className="circleC"></div>
          <div className="circleD"></div>
          <div className="circleE"></div>
          <div className="circleF"></div>
          <div className="circleG"></div>
          <div className="circleH"></div>
          <div className="circleI"></div>
          <div className="circleJ"></div>
          <div className="circleK"></div>
          <div className="circleL"></div>
        </StyledEmojisOffset>
      </StyledEmojiConfirmRedirect>

      {readyToGo ? <Redirect to="/scanner" /> : <></>}
    </LayoutContainer>
  );
}
export default RenderEmojiConfirmRedirect;
