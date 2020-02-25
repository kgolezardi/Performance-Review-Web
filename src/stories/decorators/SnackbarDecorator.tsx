import React from 'react';
import { SnackbarProvider } from 'src/core/snackbar';
import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

import { StoryDummy } from './StoryDummy';

export const snackbarDecorator = () => (storyFn: StoryFn<StoryFnReactReturnType>) => (
  <SnackbarProvider>
    <StoryDummy storyFn={storyFn} />
  </SnackbarProvider>
);
