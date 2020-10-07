import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { loremIpsum } from 'lorem-ipsum';

import { MultilineOutput } from '../multiline-output';
import { ReviewItemInfo } from './ReviewItemInfo';

export default {
  title: 'Review Item Output/Review Item Info',
  component: ReviewItemInfo,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof ReviewItemInfo>> = (args) => <ReviewItemInfo {...args} />;

export const SelfIdentifiedReview = Template.bind({});
SelfIdentifiedReview.args = {
  name: 'محمد محمدی',
  src: 'https://material-ui.com/static/images/avatar/1.jpg',
  type: 'self',
  children: <MultilineOutput value={loremIpsum({ count: 20 })} />,
};

export const SelfAnonymousReview = Template.bind({});
SelfAnonymousReview.args = {
  anonymous: true,
  type: 'self',
  children: <MultilineOutput value={loremIpsum({ count: 20 })} />,
};

export const PeerIdentifiedReview = Template.bind({});
PeerIdentifiedReview.args = {
  name: 'محمد محمدی',
  src: 'https://material-ui.com/static/images/avatar/1.jpg',
  type: 'peer',
  children: <MultilineOutput value={loremIpsum({ count: 20 })} />,
};

export const PeerAnonymousReview = Template.bind({});
PeerAnonymousReview.args = {
  anonymous: true,
  type: 'peer',
  children: <MultilineOutput value={loremIpsum({ count: 20 })} />,
};
