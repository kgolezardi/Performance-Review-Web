import React from 'react';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { PromptProvider } from 'src/shared/prompt';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import { i18n } from '@lingui/core';

import { StoryDummy } from './StoryDummy';

export const promptDecorator = (message?: string): DecoratorFunction<StoryFnReactReturnType> => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => (
  <PromptProvider message={message || i18n._('Changes you made may not be saved.')}>
    <StoryDummy storyFn={storyFn} />
  </PromptProvider>
);
