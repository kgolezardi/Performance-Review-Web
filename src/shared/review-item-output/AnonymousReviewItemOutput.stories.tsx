import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { loremIpsum } from 'lorem-ipsum';

import { AnonymousReviewItemOutput } from './AnonymousReviewItemOutput';

export default {
  title: 'Review Item Output/Anonymous Review Item Output',
  component: AnonymousReviewItemOutput,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof AnonymousReviewItemOutput>> = (args) => (
  <AnonymousReviewItemOutput {...args} />
);

export const AnonymousSelfReviewItemOutput = Template.bind({});
AnonymousSelfReviewItemOutput.args = {
  type: 'self',
  value: loremIpsum({ count: 20 }),
};

export const AnonymousPeerReviewItemOutput = Template.bind({});
AnonymousPeerReviewItemOutput.args = {
  type: 'peer',
  value: loremIpsum({ count: 20 }),
};
