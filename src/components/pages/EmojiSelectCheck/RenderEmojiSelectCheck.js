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
  width: 560px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 10px auto;
  margin-top: 30px;
`;

const emojiStyles = {
  // width: "auto",
  // fontSize: "20px",
  borderRadius: '0px',
  border: '1px solid #ffffff',
  // color: "ffffff",
  // margin: "0.5em 1em",
  // padding: "0.25em 1em",
  background: '#ffffff',
};

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
        `${baseUrl}/memberreactions/memberreaction/submit?mid=${memberContext.member.memberId}&aid=${activityContext.activity.activityid}&cid=${clubContext.club.clubid}&rx=${memberReaction}`,
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
      <NavBar hideMenu />
      <StyledEmojiSelectCheck>
        <h2>Select Emoji</h2>
        {/* <Divider orientation="left">***</Divider> */}

        <StyledEmojis>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F605'}
          >
            😅
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F61B'}
          >
            😛
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F61C'}
          >
            😜
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F61D'}
          >
            😝
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F92A'}
          >
            🤪
          </button>

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

          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F636'}
          >
            😶
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F611'}
          >
            😑
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F644'}
          >
            🙄
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F971'}
          >
            🥱
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F634'}
          >
            😴
          </button>

          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F622'}
          >
            😢
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F62D'}
          >
            😭
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F628'}
          >
            😨
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F620'}
          >
            😠
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F624'}
          >
            😤
          </button>
        </StyledEmojis>

        {/* <Row justify="center" align="top">
          <Radio.Group
            buttonStyle="solid"
            size="large"
            onChange={onChange}
            defaultValue={'1F601'}

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
        </Row> */}

        <StyledButton type="primary" onClick={onConfirm}>
          Confirm
        </StyledButton>
      </StyledEmojiSelectCheck>
    </LayoutContainer>
  );
}
export default RenderEmojiSelectCheck;
