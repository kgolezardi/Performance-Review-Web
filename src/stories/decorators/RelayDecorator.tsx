import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { environment } from 'src/relay';
import { StoryDummy } from './StoryDummy';

export const relayDecorator = () => (storyFn: StoryFn<StoryFnReactReturnType>) => (
  <RelayEnvironmentProvider environment={environment}>
    <StoryDummy storyFn={storyFn} />
  </RelayEnvironmentProvider>
);
