import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderEmojiSelectActivity from './RenderEmojiSelectActivity';

function EmojiSelectActivity({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderEmojiSelectActivity
        userInfo={userInfo}
        authService={authService}
      />
    </>
  );
}

export default EmojiSelectActivity;
