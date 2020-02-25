import React from 'react';
import { Paper, PaperProps } from '@material-ui/core';
import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

import { StoryDummy } from './StoryDummy';

export const storyWrapperDecorator = (style?: PaperProps['style']) => (storyFn: StoryFn<StoryFnReactReturnType>) => (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Paper
      style={{
        width: 400,
        height: 400,
        padding: 16,
        ...style,
      }}
    >
      <StoryDummy storyFn={storyFn} />
    </Paper>
  </div>
);
