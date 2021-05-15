import React from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Button, Row, Col, Divider } from 'antd';
import { LayoutContainer } from '../../common';

const StyledEmojiSelectCheck = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const style = { background: '#ffffff', padding: '2px 0' };

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

function RenderEmojiSelectCheck(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledEmojiSelectCheck>
        <h2>Select Emoji</h2>

        <StyledEmojis>
          <>
            <Divider orientation="left">***</Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}>
                <div style={style}>😁</div>
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
          </>
        </StyledEmojis>

        <StyledButton
          type="primary"
          onClick={() => history.push('/emoji-confirm-redirect')}
        >
          Confirm
        </StyledButton>
      </StyledEmojiSelectCheck>
    </LayoutContainer>
  );
}
export default RenderEmojiSelectCheck;
