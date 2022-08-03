import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import { MemoryRouterProps } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { StoryDummy } from './StoryDummy';

export const routerDecorator = (routerProps: MemoryRouterProps = {}): DecoratorFunction<StoryFnReactReturnType> => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => (
  <MemoryRouter {...routerProps}>
    <StoryDummy storyFn={storyFn} />
  </MemoryRouter>
);
