import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';

const StyledList = styled.div`
  max-width: 1200px;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;
const StyledView = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function RenderLeaderboard(props) {
  return (
    <LayoutContainer>
      <NavBar titleName={'Leaderboard'} backgroundColor="#293845" />
      <StyledList>
        <StyledView></StyledView>
      </StyledList>
    </LayoutContainer>
  );
}
export default RenderLeaderboard;
