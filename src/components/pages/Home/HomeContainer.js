import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';

function HomeContainer({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderHomePage userInfo={userInfo} authService={authService} />
    </>
  );
}

export default HomeContainer;
