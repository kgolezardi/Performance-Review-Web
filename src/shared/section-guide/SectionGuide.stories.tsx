import { storiesOf } from '@storybook/react';
import { LoremIpsum } from 'lorem-ipsum';
import React from 'react';
import { SectionGuide } from './SectionGuide';

storiesOf('Section Guide', module).add('simple', () => (
  <SectionGuide>{new LoremIpsum().generateSentences(2)}</SectionGuide>
));
