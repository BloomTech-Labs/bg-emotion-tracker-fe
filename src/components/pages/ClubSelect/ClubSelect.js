import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderClubSelect from './RenderClubSelect';

function ClubSelect({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderClubSelect userInfo={userInfo} authService={authService} />
    </>
  );
}

export default ClubSelect;
