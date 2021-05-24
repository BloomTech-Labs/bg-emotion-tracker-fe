import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportStaff } from './ImportStaff';
function ViewStaff(props) {
  return (
    <ViewSingleton
      headerName="Manage Staff"
      titleName="Manage Staff"
      RenderAddButton={ImportStaff}
      sortedBy="ID"
    />
  );
}
export default ViewStaff;
