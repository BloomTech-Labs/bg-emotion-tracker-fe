import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';
function ViewPrograms(props) {
  return (
    <ViewSingleton
      headerName="Programs"
      RenderAddButton={ImportPrograms}
      sortedBy="Name"
    />
  );
}
export default ViewPrograms;
