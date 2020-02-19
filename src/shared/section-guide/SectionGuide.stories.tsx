import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { SectionGuide } from './SectionGuide';
import { LoremIpsum } from 'lorem-ipsum';

storiesOf('Section Guide', module)
  .addDecorator(themeDecorator())
  .add('simple', () => <SectionGuide>{new LoremIpsum().generateSentences(2)}</SectionGuide>);
