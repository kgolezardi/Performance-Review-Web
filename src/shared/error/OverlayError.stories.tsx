import React from 'react';
import { Lorem } from 'src/stories/helpers';
import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { OverlayError } from './OverlayError';

const retry = () => {
  console.log('Retry button clicked.');
};

storiesOf('Error', module).add('Overlay Error', () => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100vh' }}>
    <Paper style={{ position: 'relative', height: 480, width: 320 }}>
      <Lorem paragraphCount={2} />
      <OverlayError />
    </Paper>

    <Paper style={{ position: 'relative', height: 320, width: 320 }}>
      <Lorem paragraphCount={2} />
      <OverlayError retry={retry} />
    </Paper>

    <Paper style={{ position: 'relative', height: 320, width: 320 }}>
      <Lorem paragraphCount={2} />
      <OverlayError errorText="خطای کاستومایز شده" retry={retry} buttonText="کلیک کنید" />
    </Paper>
  </div>
));
