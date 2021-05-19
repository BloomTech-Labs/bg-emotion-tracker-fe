import React from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card } from 'antd';
import { LayoutContainer } from '../../common';

const StyledHomePage = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

function RenderHomePage() {
  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledHomePage>
        <h2>You don't have access to that page.</h2>
      </StyledHomePage>
    </LayoutContainer>
  );
}
export default RenderHomePage;
