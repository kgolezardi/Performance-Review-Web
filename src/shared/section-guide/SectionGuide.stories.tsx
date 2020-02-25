import React from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import { storiesOf } from '@storybook/react';
import { themeDecorator } from 'src/stories/decorators';

import { SectionGuide } from './SectionGuide';

storiesOf('Section Guide', module)
  .addDecorator(themeDecorator())
  .add('simple', () => <SectionGuide>{new LoremIpsum().generateSentences(2)}</SectionGuide>);
