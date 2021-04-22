import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportStaff } from './ImportStaff';
function ViewStaff(props) {
  return (
    <ViewSingleton
      headerName="Manage Staff"
      titleName="All Staff"
      RenderAddButton={ImportStaff}
    />
  );
}
export default ViewStaff;
