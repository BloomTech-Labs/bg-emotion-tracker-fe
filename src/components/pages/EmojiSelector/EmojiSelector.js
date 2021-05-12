import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderEmojiSelector';

function EmojiSelector({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderHomePage userInfo={userInfo} authService={authService} />
    </>
  );
}

export default EmojiSelector;
