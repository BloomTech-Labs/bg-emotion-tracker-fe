import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderActivitySelect from './RenderActivitySelect';

function ActivitySelect({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderActivitySelect userInfo={userInfo} authService={authService} />
    </>
  );
}

export default ActivitySelect;
