import React from 'react';
import { storiesOf } from '@storybook/react';
import { themeDecorator } from 'src/stories/decorators';

import { Reacteroids } from './reacteroids';

storiesOf('Games', module)
  .addDecorator(themeDecorator())
  .add('default', () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 800,
          height: 600,
        }}
      >
        <Reacteroids />
      </div>
    );
  });
