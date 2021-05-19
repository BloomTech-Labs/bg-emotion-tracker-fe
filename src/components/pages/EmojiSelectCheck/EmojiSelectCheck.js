import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderEmojiSelectCheck from './RenderEmojiSelectCheck';

function EmojiSelectCheck({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderEmojiSelectCheck userInfo={userInfo} authService={authService} />
    </>
  );
}

export default EmojiSelectCheck;
