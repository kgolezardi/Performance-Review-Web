import React from 'react';
import { CssBaseline, Direction, ThemeProvider } from '@material-ui/core';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import { directionState } from 'src/stories/direction-state';
import { ltrTheme, rtlTheme } from 'src/core/theme';

import { StoryDummy } from './StoryDummy';
import { TransparentBackground } from './TransparentBackground';

interface themeDecoratorOptions {
  direction?: Direction;
  transparent?: boolean;
}

export const themeDecorator = ({
  direction: maybeDirection,
  transparent = true,
}: themeDecoratorOptions = {}): DecoratorFunction<StoryFnReactReturnType> => (
  storyFn: StoryFn<StoryFnReactReturnType>,
) => {
  const direction = maybeDirection || directionState.getDirection();
  const theme = direction === 'rtl' ? rtlTheme : ltrTheme;
  return (
    <RtlSupportProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {transparent && <TransparentBackground />}
        <StoryDummy storyFn={storyFn} />
      </ThemeProvider>
    </RtlSupportProvider>
  );
};
