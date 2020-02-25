import React from 'react';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { MemoryRouter } from 'react-router-dom';
import { MemoryRouterProps } from 'react-router';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

import { StoryDummy } from './StoryDummy';

export const routerDecorator = (routerProps: MemoryRouterProps = {}): DecoratorFunction<StoryFnReactReturnType> => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => (
  <MemoryRouter {...routerProps}>
    <StoryDummy storyFn={storyFn} />
  </MemoryRouter>
);
