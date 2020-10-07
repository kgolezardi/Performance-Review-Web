import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { AnonymousReviewItemInfo } from './AnonymousReviewItemInfo';

export default {
  title: 'Review Item Output/Anonymous Review Item Info',
  component: AnonymousReviewItemInfo,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof AnonymousReviewItemInfo>> = (args) => (
  <AnonymousReviewItemInfo {...args} />
);

export const AnonymousSelfReviewItemInfo = Template.bind({});
AnonymousSelfReviewItemInfo.args = {
  type: 'self',
};

export const AnonymousPeerReviewItemInfo = Template.bind({});
AnonymousPeerReviewItemInfo.args = {
  type: 'peer',
};
