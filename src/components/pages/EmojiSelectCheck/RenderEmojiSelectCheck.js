import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Button, Divider, Radio } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../../api/index';

const StyledEmojiSelectCheck = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 10px auto;
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
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiSelectCheck>
        <h2>Select Emoji</h2>
        <Divider orientation="left">***</Divider>
        <Radio.Group
          options={options}
          optionType="button"
          buttonStyle="solid"
          size="large"
          onChange={onChange}
          value={memberReaction}
        />

        <StyledButton type="primary" onClick={onConfirm}>
          Confirm
        </StyledButton>
      </StyledEmojiSelectCheck>
    </>
  );
}
export default RenderEmojiSelectCheck;
