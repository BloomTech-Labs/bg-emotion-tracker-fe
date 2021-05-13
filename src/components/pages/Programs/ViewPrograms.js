import React, { useContext, useEffect } from 'react';
import { ViewSingleton } from '../../common/ViewSingleton';
import { ImportPrograms } from './ImportPrograms';
import { UserContext } from '../../../state/contexts';

function ViewPrograms(props) {
  const { rows, columns } = props;
  const context = useContext(UserContext);

  useEffect(() => {
    context.setPrograms([{ programname: 'asdf', clubid: '20' }]);
  }, []);

  console.log('context ', context);

  return (
    <ViewSingleton
      headerName="Programs"
      titleName="All Programs"
      rows={rows}
      columns={columns}
      RenderAddButton={ImportPrograms}
      sortedBy="Name"
    />
  );
}
export default ViewPrograms;
