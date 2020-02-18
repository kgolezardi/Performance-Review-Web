import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import { StoryDummy } from './StoryDummy';
import { PromptProvider } from 'src/shared/prompt';
import { i18n } from '@lingui/core';

export const promptDecorator = (message?: string): DecoratorFunction<StoryFnReactReturnType> => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => (
  <PromptProvider message={message || i18n._('Changes you made may not be saved.')}>
    <StoryDummy storyFn={storyFn} />
  </PromptProvider>
);
