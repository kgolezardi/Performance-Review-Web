import { storiesOf } from '@storybook/react';
import React from 'react';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { NumberOutput } from './NumberOutput';

storiesOf('Number Output', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({}))
  .add('default', () => <NumberOutput value={1234567890} />);
