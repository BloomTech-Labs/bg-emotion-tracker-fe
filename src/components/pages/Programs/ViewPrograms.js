import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';

function ViewPrograms(props) {
  const { rows, columns } = props;
  return (
    <ViewSingleton
      headerName="Manage Programs"
      titleName="All Programs"
      rows={rows}
      columns={columns}
      RenderAddButton={ImportPrograms}
      sortedBy="Name"
    />
  );
}
export default ViewPrograms;
