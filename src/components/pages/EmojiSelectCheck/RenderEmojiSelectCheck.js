import React from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Modal, Menu, Dropdown, Button, Alert } from 'antd';

const StyledEmojiSelectCheck = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderEmojiSelectCheck(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiSelectCheck>
        <h2>How do you feel?</h2>
        <Card>
          EMOJIS HERE!
          <div>
            <Button
              type="primary"
              onClick={() => history.push('/emoji-confirm-redirect')}
            >
              Submit
            </Button>
          </div>
        </Card>
      </StyledEmojiSelectCheck>
    </>
  );
}
export default RenderEmojiSelectCheck;
