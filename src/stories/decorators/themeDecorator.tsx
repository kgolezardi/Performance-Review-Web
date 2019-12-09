import { CssBaseline } from '@material-ui/core';
import { Direction } from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';
import { ltrTheme, rtlTheme } from 'src/core/theme/themes';
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
  const direction = maybeDirection || 'rtl'; // directionState.getDirection();
  const theme = direction === 'rtl' ? rtlTheme : ltrTheme;
  return (
    <RtlSupportProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {transparent && <TransparentBackground />}
        {storyFn()}
      </ThemeProvider>
    </RtlSupportProvider>
  );
};
