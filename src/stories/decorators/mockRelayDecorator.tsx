import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React, { Suspense, useEffect, useMemo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { MockResolvers } from 'relay-test-utils/lib/RelayMockPayloadGenerator';
import { FullPageSpinner } from 'src/shared/loading';
import { StoryDummy } from './StoryDummy';

interface MockRelayDecoratorOptions {
  delay?: number;
}

export const mockRelayDecorator = (mockResolvers?: MockResolvers, { delay = 500 }: MockRelayDecoratorOptions = {}) => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => {
  const environment = useMemo(() => createMockEnvironment(), []);
  useEffect(() => {
    setTimeout(() => {
      environment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, mockResolvers),
      );
    }, delay);
  }, [environment]);
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<FullPageSpinner />}>
        <StoryDummy storyFn={storyFn} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};
