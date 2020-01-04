import { storiesOf } from '@storybook/react';
import React from 'react';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { MultilineOutput } from './MultilineOutput';

storiesOf('Multiline Output', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({}))
  .add('default', () => <MultilineOutput value={'First Line \n SecondLine \n LastLine'} />)
  .add('Fa', () => <MultilineOutput value={'خط اول\nخط دوم\nخط سوم'} />);
