import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { LayoutContainer } from '../../common';

const StyledEmojiSelector = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const initialMemberFeedback = {
  memeberId: 'None',
  emojiCode: 'None',
};

function RenderEmojiSelector(props) {
  const locationState = props.pageProps.history.location.state;

  const [memberFeedback, setMemberFeedback] = useState(initialMemberFeedback);

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiSelector>
        <h2>Rate the Event</h2>
        {locationState ? <p>Choose emoji</p> : <p>Use scanner first</p>}
      </StyledEmojiSelector>
    </LayoutContainer>
  );
}
export default RenderEmojiSelector;
