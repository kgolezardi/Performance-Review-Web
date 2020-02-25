import React, { Suspense } from 'react';
import { FullPageSpinner } from 'src/shared/loading';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import { environment } from 'src/relay';

import { StoryDummy } from './StoryDummy';

export const relayDecorator = () => (storyFn: StoryFn<StoryFnReactReturnType>) => (
  <RelayEnvironmentProvider environment={environment}>
    <Suspense fallback={<FullPageSpinner />}>
      <StoryDummy storyFn={storyFn} />
    </Suspense>
  </RelayEnvironmentProvider>
);
