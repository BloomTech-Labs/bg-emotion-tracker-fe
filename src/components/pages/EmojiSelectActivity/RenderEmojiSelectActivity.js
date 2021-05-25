import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Button, Radio, Row, Col } from 'antd';
import axios from 'axios';
import { LayoutContainer } from '../../common';
import { baseUrl } from '../../../api/index';
import {
  ActivityContext,
  ClubContext,
  MemberContext,
  EmojiContext,
} from '../../../state/contexts/index';
import '../../../styles/styles.less';

const StyledEmojiSelectActivity = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const StyledEmojis = styled.div`
  width: 560px;
  height: 420px;
  position: absolute;
  left: 50%;
  margin-left: -280px;
  top: 50%;
  margin-top: -280px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

const emojiStyles = {
  borderRadius: '0px',
  border: '1px solid #ffffff',
  background: '#ffffff',
};

function RenderEmojiSelectActivity(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();

  const [memberReaction, setMemberReaction] = useState('1F601');
  const activityContext = useContext(ActivityContext);
  const clubContext = useContext(ClubContext);
  const memberContext = useContext(MemberContext);
  const { setEmoji } = useContext(EmojiContext);

  useEffect(() => {
    setEmoji(memberReaction);
  }, []);

  const onChange = e => {
    setMemberReaction(e.target.value);
    setEmoji(e.target.value);
  };

  const onConfirm = () => {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    axios
      .post(
        `${baseUrl}/memberreactions/memberreaction/submit?mid=${memberContext.id}&aid=${activityContext.activity.activityid}&cid=${clubContext.club.clubid}&rx=${memberReaction}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
          },
        }
      )
      .then(res => {
        history.push('/emoji-confirm-redirect');
      })
      .catch(e => console.log(e));
  };

  return (
    <LayoutContainer className="ydp">
      <NavBar hideMenu />
      <StyledEmojiSelectActivity>
        {/* <h2>Select Emoji</h2> */}
        <StyledEmojis>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F601'}
          >
            😁
          </button>

          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F642'}
          >
            🙂
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F610'}
          >
            😐
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F641'}
          >
            🙁
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F61E'}
          >
            😞
          </button>
        </StyledEmojis>

        <StyledButton
          type="primary"
          className="emojiConfirmBtn"
          onClick={onConfirm}
        >
          Confirm
        </StyledButton>
      </StyledEmojiSelectActivity>
    </LayoutContainer>
  );
}
export default RenderEmojiSelectActivity;
