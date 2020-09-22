import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { DecoratorFunction } from '@storybook/addons';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { i18n } from '@lingui/core';
import { ltrTheme, rtlTheme } from 'src/core/theme';

import { directionState } from '../direction-state';

export const themeDecorator: DecoratorFunction<JSX.Element> = (Story, context) => {
  const locale = context.globals.locale;
  i18n.activate(locale);
  const direction = locale === 'fa' ? 'rtl' : 'ltr';
  directionState.setDirection(direction);

  return (
    <RtlSupportProvider>
      <ThemeProvider theme={directionState.getDirection() === 'rtl' ? rtlTheme : ltrTheme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </RtlSupportProvider>
  );
};
