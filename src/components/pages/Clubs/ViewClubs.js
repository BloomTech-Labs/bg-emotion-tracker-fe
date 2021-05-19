import React from 'react';
import { LayoutContainer, ViewSingleton } from '../../common';
import { ImportClubs } from './ImportClubs';
function ViewClubs(props) {
  return (
    <LayoutContainer>
      <ViewSingleton
        headerName="Clubs"
        titleName="All Clubs"
        RenderAddButton={ImportClubs}
        sortedBy="Club Name"
      />
    </LayoutContainer>
  );
}
export default ViewClubs;
