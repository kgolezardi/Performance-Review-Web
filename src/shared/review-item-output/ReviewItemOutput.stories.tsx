import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { loremIpsum } from 'lorem-ipsum';

import { ReviewItemOutput } from './ReviewItemOutput';

export default {
  title: 'Review Item Output/Review Item Output',
  component: ReviewItemOutput,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof ReviewItemOutput>> = (args) => <ReviewItemOutput {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'محمد محمدی',
  src: 'https://material-ui.com/static/images/avatar/1.jpg',
  type: 'self',
  value: loremIpsum({ count: 20 }),
};
