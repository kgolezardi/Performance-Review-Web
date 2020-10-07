import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { IdentifiedReviewItemInfo } from './IdentifiedReviewItemInfo';

export default {
  title: 'Review Item Output/Identified Review Item Info',
  component: IdentifiedReviewItemInfo,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof IdentifiedReviewItemInfo>> = (args) => (
  <IdentifiedReviewItemInfo {...args} />
);

export const IdentifiedSelfReviewItemInfo = Template.bind({});
IdentifiedSelfReviewItemInfo.args = {
  name: 'محمد محمدی',
  src: 'https://material-ui.com/static/images/avatar/1.jpg',
  type: 'self',
};

export const IdentifiedPeerReviewItemInfo = Template.bind({});
IdentifiedPeerReviewItemInfo.args = {
  name: 'محمد محمدی',
  src: 'https://material-ui.com/static/images/avatar/1.jpg',
  type: 'peer',
};
