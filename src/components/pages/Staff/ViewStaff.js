import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportStaff } from './ImportStaff';
function ViewStaff(props) {
  return (
    <ViewSingleton
      headerName="Staff"
      titleName="All Staff"
      RenderAddButton={ImportStaff}
      sortedBy="ID"
    />
  );
}
export default ViewStaff;
