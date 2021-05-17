import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Button, Row, Col, Divider, Radio } from 'antd';
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

//const style = { background: '#ffffff', padding: '2px 0' };

// const style= styled.div`
// font-size:15rem;
// background: '#ffffff';
// padding: '8px 0';
// `;

const StyledEmojis = styled.div`
  font-size: 3rem;
  background: '#ffffff';
  padding: '2px 0';
`;

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
    sendMemberObject();
  };

  const sendMemberObject = () => {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    axios
      .post(`${baseUrl}/clubs/clubs`, {
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
        },
        memberObject,
      })
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
        <p>{memberId}</p>
        <StyledEmojis>
          <>
            <Divider orientation="left">***</Divider>
            {/*
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}>
                <div style={style} >😁</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>🙂</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>😐</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>🙁</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>😞</div>
              </Col>
            </Row>
            */}
            <Radio.Group onChange={onChange} value={memberReaction}>
              <Radio value={'U+1F601'}>😁</Radio>
              <Radio value={'U+1F642'}>🙂</Radio>
              <Radio value={'U+1F610'}>😐</Radio>
              <Radio value={'U+1F641'}>🙁</Radio>
              <Radio value={'U+1F61E'}>😞</Radio>
            </Radio.Group>
          </>
        </StyledEmojis>

        <StyledButton type="primary" onClick={onConfirm}>
          Confirm
        </StyledButton>
      </StyledEmojiSelectCheck>
    </>
  );
}
export default RenderEmojiSelectCheck;
