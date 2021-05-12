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
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiSelector>
        <h2>Emoji Selector</h2>
      </StyledEmojiSelector>
    </>
  );
}
export default RenderEmojiSelector;
