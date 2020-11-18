import React from 'react';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { FormChangeDetector } from 'src/shared/form-change-detector';
import { FormChangePrompt } from 'src/shared/form-change-prompt';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import { i18n } from '@lingui/core';

import { StoryDummy } from './StoryDummy';

export const promptDecorator = (message?: string): DecoratorFunction<StoryFnReactReturnType> => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => (
  <FormChangeDetector>
    <FormChangePrompt message={message || i18n._('Changes you made may not be saved.')} />
    <StoryDummy storyFn={storyFn} />
  </FormChangeDetector>
);
