import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';
function ViewPrograms(props) {
  return (
    <ViewSingleton
      headerName="Manage Programs"
      titleName="All Programs"
      RenderAddButton={ImportPrograms}
    />
  );
}
export default ViewPrograms;
