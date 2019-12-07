import { PaletteType } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import createMuiTheme, { Direction, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export function getThemeOptions(base: ThemeOptions, direction: Direction, paletteType: PaletteType) {
  const themeOptions: ThemeOptions = {
    ...base,
    direction,
    palette: {
      ...base.palette,
      type: paletteType,
    },
    typography: {
      fontFamily: 'Shabnam, "Roboto", "Helvetica", "Arial", sans-serif',
    },
  };
  return themeOptions;
}

export const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: teal,
    secondary: deepPurple,
    error: red,
  },
};

export const rtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'light'));
export const ltrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'light'));

export const darkRtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'dark'));
export const darkLtrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'dark'));
