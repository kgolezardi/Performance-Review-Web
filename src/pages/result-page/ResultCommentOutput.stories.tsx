import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { loremIpsum } from 'lorem-ipsum';

import { ResultCommentOutput } from './ResultCommentOutput';

export default {
  title: 'Result Comment Output',
  component: ResultCommentOutput,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof ResultCommentOutput>> = (args) => <ResultCommentOutput {...args} />;

export const SelfComment = Template.bind({});
SelfComment.args = {
  type: 'self',
  value: loremIpsum({ count: 20 }),
};

export const PeerComment = Template.bind({});
PeerComment.args = {
  type: 'peer',
  value: loremIpsum({ count: 20 }),
};

export const NoTruncationSelfType = Template.bind({});
NoTruncationSelfType.args = {
  disableTruncating: true,
  type: 'self',
  value: loremIpsum({ count: 20 }),
};

export const NoTruncationPeerType = Template.bind({});
NoTruncationPeerType.args = {
  disableTruncating: true,
  type: 'peer',
  value: loremIpsum({ count: 20 }),
};

export const NullValueSelfType = Template.bind({});
NullValueSelfType.args = {
  type: 'self',
  value: null,
};

export const NullValuePeerType = Template.bind({});
NullValuePeerType.args = {
  type: 'peer',
  value: null,
};
