import React from 'react';
import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';

const StyledAdminPage = styled.header`
  display: flex;
`;
function RenderHomePage() {
  return (
    <LayoutContainer>
      <NavBar titleName="Club Director Dashboard" backgroundColor="#293845" />
      <StyledAdminPage>
        <h2 style={{ textAlign: 'center' }}>Club Director Dashboard</h2>
      </StyledAdminPage>
    </LayoutContainer>
  );
}
export default RenderHomePage;
