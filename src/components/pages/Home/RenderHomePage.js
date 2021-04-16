import React from 'react';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card } from 'antd';

const StyledHomePage = styled.header`
  display: flex;
  margin: 10%;
  justify-content: center;
`;

function RenderHomePage(props) {
  const { userInfo /*authService*/ } = props;
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledHomePage>
        <Card>Sample Data</Card>
      </StyledHomePage>
    </>
  );
}
export default RenderHomePage;
