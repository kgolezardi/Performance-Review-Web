import React from 'react';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';

import { OutputBorder } from './OutputBorder';

storiesOf('Output Border', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({}))
  .add('default', () => {
    return <OutputBorder>this is sample text</OutputBorder>;
  });
