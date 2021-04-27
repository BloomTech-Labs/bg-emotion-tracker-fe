import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportClubs } from './ImportClubs';
function ViewClubs(props) {
  return (
    <>
      <ViewSingleton
        headerName="Clubs"
        titleName="All Clubs"
        RenderAddButton={ImportClubs}
        sortedBy="Club Name"
      />
    </>
  );
}
export default ViewClubs;
