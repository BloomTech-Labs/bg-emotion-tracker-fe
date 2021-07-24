import React from 'react';
import styled from 'styled-components';
import { LayoutContainer } from '../../common';
import NavBar from '../../common/NavBar';
import { Layout } from 'antd';
import NavMenu from '../../common/NavMenu';
const { Sider, Content } = Layout;

const StyledAdminPage = styled.header`
  display: flex;
`;

function RenderHomePage() {
  return (
    <LayoutContainer>
      <NavBar titleName="Club Director Dashboard" backgroundColor="dre" />
      <Layout>
        <Sider className="navSider" width={230}>
          <NavMenu />
        </Sider>
        <Content>
          <StyledAdminPage>
            <h2 style={{ textAlign: 'center' }}>Club Director Dashboard</h2>
          </StyledAdminPage>
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
export default RenderHomePage;
