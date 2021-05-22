import React from 'react';

import ImportModal from './ImportModal';
// Container for import page
const ImportContainer = props => {
  const { fetchActivities } = props;
  return (
    <div>
      <ImportModal fetchActivities={fetchActivities} />
    </div>
  );
};

export default ImportContainer;
