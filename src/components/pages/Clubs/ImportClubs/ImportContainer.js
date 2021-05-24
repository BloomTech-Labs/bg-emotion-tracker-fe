import React from 'react';

import ImportModal from './ImportModal';
// Container for import page
const ImportContainer = props => {
  return (
    <div>
      <ImportModal fetchClubs={props.fetchClubs} />
    </div>
  );
};

export default ImportContainer;
