import React from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportMembers } from './ImportMember';
function ViewMembers(props) {
  return (
    <ViewSingleton
      headerName="Manage Members"
      titleName="All Members"
      RenderAddButton={ImportMembers}
    />
  );
}
export default ViewMembers;
