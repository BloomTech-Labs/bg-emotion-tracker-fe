import React from 'react';

import ImportModal from './ImportModal';
// Container for import page
const ImportContainer = props => {
  return (
    <div>
      <ImportModal fetchMembers={props.fetchMembers} />
    </div>
  );
};

export default ImportContainer;
