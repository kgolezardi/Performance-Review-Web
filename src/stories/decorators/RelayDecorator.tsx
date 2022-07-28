import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React, { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { environment } from 'src/relay';
import { FullPageSpinner } from 'src/shared/loading';
import { StoryDummy } from './StoryDummy';

export const relayDecorator = () => (storyFn: StoryFn<StoryFnReactReturnType>) => (
  <RelayEnvironmentProvider environment={environment}>
    <Suspense fallback={<FullPageSpinner />}>
      <StoryDummy storyFn={storyFn} />
    </Suspense>
  </RelayEnvironmentProvider>
);
