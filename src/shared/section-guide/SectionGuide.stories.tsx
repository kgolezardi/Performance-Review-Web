import React from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import { storiesOf } from '@storybook/react';

import { SectionGuide } from './SectionGuide';

storiesOf('Section Guide', module).add('simple', () => (
  <SectionGuide>{new LoremIpsum().generateSentences(2)}</SectionGuide>
));
