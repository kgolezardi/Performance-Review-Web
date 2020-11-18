import React from 'react';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import { UnsavedDetector } from 'src/shared/unsaved-detector';
import { UnsavedPrompt } from 'src/shared/unsaved-prompt';
import { i18n } from '@lingui/core';

import { StoryDummy } from './StoryDummy';

export const promptDecorator = (message?: string): DecoratorFunction<StoryFnReactReturnType> => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => (
  <UnsavedDetector>
    <UnsavedPrompt message={message || i18n._('Changes you made may not be saved.')} />
    <StoryDummy storyFn={storyFn} />
  </UnsavedDetector>
);
