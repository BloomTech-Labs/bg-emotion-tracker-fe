import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Button, Row, Col, Divider, Radio } from 'antd';
import axios from 'axios';
import { LayoutContainer } from '../../common';
import { baseUrl } from '../../../api/index';

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

const options = [
  { label: '😁', value: '1F601' },
  { label: '🙂', value: '1F642' },
  { label: '😐', value: '1F610' },
  { label: '🙁', value: '1F641' },
  { label: '😞', value: '1F61E' },
];

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

const InitMemberObject = {
  memberId: 'None',
  memberReaction: 'None',
};

function RenderEmojiSelectCheck(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  const memberId = props.pageProps.location.state.QRdata.memberId;

  const [memberReaction, setMemberReaction] = useState('None');
  const [memberObject, setMemberObject] = useState(InitMemberObject);

  const onChange = e => {
    setMemberReaction(e.target.value);
  };

  const onConfirm = () => {
    const currentMemberObject = {
      memberId: memberId,
      memberReaction: memberReaction,
    };
    setMemberObject(currentMemberObject);
    console.log(memberObject);
    console.log(userInfo);
    sendMemberObject();
    history.push('/emoji-confirm-redirect'); //turn off during final testing!!!
  };

  const sendMemberObject = () => {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    axios
      .post(
        `${baseUrl}/memberreactions/memberreaction/submit?mid=${
          memberObject.memberId
        }&aid=${13}&cid=${20}&rx=${memberObject.memberReaction}`,
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
          //   options={options}
          //   optionType="button"
          buttonStyle="solid"
          size="large"
          onChange={onChange}
          defaultValue={memberReaction}

          //   value={memberReaction}
        >
          <Radio.Button value={memberReaction}>
            <StyledEmojis>😁</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={memberReaction}>
            <StyledEmojis>🙂</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={memberReaction}>
            <StyledEmojis>😐</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={memberReaction}>
            <StyledEmojis>🙁</StyledEmojis>
          </Radio.Button>
          <Radio.Button value={memberReaction}>
            <StyledEmojis>😞</StyledEmojis>
          </Radio.Button>
        </Radio.Group>
        {/* </StyledColor> */}

        {/* <Radio.Group
          options={options}
          optionType="button"
          buttonStyle="solid"
          size="large"
          onChange={onChange}
          value={memberReaction}
        />
     */}

        <StyledButton type="primary" onClick={onConfirm}>
          Confirm
        </StyledButton>
      </StyledEmojiSelectCheck>
    </LayoutContainer>
  );
}
export default RenderEmojiSelectCheck;
