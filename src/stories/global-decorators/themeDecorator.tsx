import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { DecoratorFunction } from '@storybook/addons';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { i18n } from '@lingui/core';
import { ltrTheme, rtlTheme } from 'src/core/theme';

import { StorybookStyles } from './StorybookStyles';

export const themeDecorator: DecoratorFunction<JSX.Element> = (Story, context) => {
  const locale = context.globals.locale;
  i18n.activate(locale);
  const direction = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <RtlSupportProvider>
      <ThemeProvider theme={direction === 'rtl' ? rtlTheme : ltrTheme}>
        <StorybookStyles>
          <CssBaseline />
          <Story {...context} />
        </StorybookStyles>
      </ThemeProvider>
    </RtlSupportProvider>
  );
};
