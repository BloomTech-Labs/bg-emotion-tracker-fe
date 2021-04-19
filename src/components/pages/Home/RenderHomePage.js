import React from 'react';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card } from 'antd';

const StyledHomePage = styled.header`
  display: flex;
  flex-direction: column;
  margin: 10%;
  justify-content: center;
`;

function RenderHomePage(props) {
  const { userInfo /*authService*/ } = props;
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledHomePage>
        <h2>Club Name</h2>
        <Card>Sample Data</Card>
      </StyledHomePage>
    </>
  );
}
export default RenderHomePage;
