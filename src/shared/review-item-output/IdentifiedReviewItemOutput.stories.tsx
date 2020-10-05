import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { loremIpsum } from 'lorem-ipsum';

import { IdentifiedReviewItemOutput } from './IdentifiedReviewItemOutput';

export default {
  title: 'Review Item Output/Identified Review Item Output',
  component: IdentifiedReviewItemOutput,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof IdentifiedReviewItemOutput>> = (args) => (
  <IdentifiedReviewItemOutput {...args} />
);

export const IdentifiedSelfReviewItemOutput = Template.bind({});
IdentifiedSelfReviewItemOutput.args = {
  name: 'محمد محمدی',
  src: 'https://material-ui.com/static/images/avatar/1.jpg',
  type: 'self',
  value: loremIpsum({ count: 20 }),
};

export const IdentifiedPeerReviewItemOutput = Template.bind({});
IdentifiedPeerReviewItemOutput.args = {
  name: 'محمد محمدی',
  src: 'https://material-ui.com/static/images/avatar/1.jpg',
  type: 'peer',
  value: loremIpsum({ count: 20 }),
};
