import React from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';

const StyledAdminPage = styled.header`
  display: flex;
`;
function RenderHomePage() {
  return (
    <>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledAdminPage>
        <h2 style={{ textAlign: 'center' }}>Admin Dashboard</h2>
      </StyledAdminPage>
    </>
  );
}
export default RenderHomePage;
