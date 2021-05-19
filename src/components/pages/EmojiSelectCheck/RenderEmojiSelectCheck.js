import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Button, Radio } from 'antd';
import axios from 'axios';
import { LayoutContainer } from '../../common';
import { baseUrl } from '../../../api/index';
import {
  ActivityContext,
  ClubContext,
  MemberContext,
  EmojiContext,
} from '../../../state/contexts/index';

const StyledEmojiSelectCheck = styled.header`
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
  font-size: 3rem;
  /* background: '#ffffff';
  padding: '2px 0'; */
`;

const StyledColor = styled.div`
  &.ant-typography {
    color: 'white';
  }
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 10px auto;
  margin-top: 30px;
`;

function RenderEmojiSelectCheck(props) {
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
        `${baseUrl}/memberreactions/memberreaction/submit?mid=${memberContext.member.memberId}&aid=${activityContext.activity.activityId}&cid=${clubContext.club.clubid}&rx=${memberReaction}`,
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
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiSelectCheck>
        <h2>Select Emoji</h2>
        {/* <Divider orientation="left">***</Divider> */}

        {/* <StyledColor> */}
        <Radio.Group
          buttonStyle="solid"
          size="large"
          onChange={onChange}
          defaultValue={memberReaction}

          //   value={memberReaction}
        >
          <Radio.Button value={'1F601'}>
            <StyledEmojis>😁</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={'1F642'}>
            <StyledEmojis>🙂</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={'1F610'}>
            <StyledEmojis>😐</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={'1F641'}>
            <StyledEmojis>🙁</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={'1F61E'}>
            <StyledEmojis>😞</StyledEmojis>
          </Radio.Button>
        </Radio.Group>
        {/* </StyledColor> */}

        <StyledButton type="primary" onClick={onConfirm}>
          Confirm
        </StyledButton>
      </StyledEmojiSelectCheck>
    </LayoutContainer>
  );
}
export default RenderEmojiSelectCheck;
