import React from 'react';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator } from 'src/stories/decorators';

import { LinearProgress } from './LinearProgress';

storiesOf('Linear Progress', module)
  .addDecorator(storyWrapperDecorator({}))
  .add('default color', () => {
    return <LinearProgress value={50} />;
  })
  .add('low color', () => {
    return <LinearProgress value={10} color="low" />;
  })
  .add('medium color', () => {
    return <LinearProgress value={40} color="medium" />;
  })
  .add('high color', () => {
    return <LinearProgress value={80} color="high" />;
  })
  .add('complete color', () => {
    return <LinearProgress value={100} color="complete" />;
  });
