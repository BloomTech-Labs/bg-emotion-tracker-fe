import React from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';

const StyledEmojiSelector = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderEmojiSelector(props) {
  const locationState = props.pageProps.history.location.state;

  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiSelector>
        <h2>Emoji Selector</h2>
        {locationState ? <p>Choose emoji</p> : <p>Use scanner first</p>}
      </StyledEmojiSelector>
    </>
  );
}
export default RenderEmojiSelector;
