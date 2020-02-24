import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { Reacteroids } from './reacteroids';

storiesOf('Games', module)
  .addDecorator(themeDecorator())
  .add('default', () => {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Reacteroids />
      </div>
    );
  });
