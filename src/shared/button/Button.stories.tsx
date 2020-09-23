import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click',
};
export const Grey = Template.bind({});
Grey.args = {
  children: 'Click',
  color: 'grey',
};
