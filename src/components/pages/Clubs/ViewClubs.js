import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportClubs } from './ImportClubs';
function ViewClubs(props) {
  return (
    <>
      <ViewSingleton
        headerName="Manage Clubs"
        titleName="All Clubs"
        RenderAddButton={ImportClubs}
      />
    </>
  );
}
export default ViewClubs;
