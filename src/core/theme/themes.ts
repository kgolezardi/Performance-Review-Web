import { PaletteType } from '@material-ui/core';
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
      background: { default: teal['50'] },
    },
    typography: {
      fontFamily: 'Shabnam, "Roboto", "Helvetica", "Arial", sans-serif',
    },
  };
  return themeOptions;
}

export const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: '#1297CE',
      main: '#27B2EC',
      light: '#56C3F0',
    },
    contrastThreshold: 2.4,
    error: red,
  },
};

export const rtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'light'));
export const ltrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'light'));

export const darkRtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'dark'));
export const darkLtrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'dark'));
