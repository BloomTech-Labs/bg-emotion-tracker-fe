import React from 'react';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import GenerateTable from './GenerateTable';
const StyledView = styled.header`
  margin: 10%;
`;

function ViewContainer(props) {
  const { RenderAddButton, rows, columns, headerName } = props;
  return (
    <>
      <NavBar titleName={headerName} backgroundColor="#293845" />
      <StyledView>
        <RenderAddButton />
        <GenerateTable rows={rows} columns={columns} tableName={headerName} />
      </StyledView>
    </>
  );
}
export default ViewContainer;
