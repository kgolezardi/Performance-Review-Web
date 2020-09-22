import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

import Reacteroids from './Reacteroids';

storiesOf('Reacteroids', module).add('default', () => {
  const [show, setShow] = useState(true);
  const handleExit = useCallback(() => {
    setShow(false);
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      {show && <Reacteroids onExit={handleExit} />}
    </div>
  );
});
