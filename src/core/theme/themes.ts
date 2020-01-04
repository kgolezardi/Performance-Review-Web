import { PaletteType } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import createMuiTheme, { Direction, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { deepOrange } from '@material-ui/core/colors';

export function getThemeOptions(base: ThemeOptions, direction: Direction, paletteType: PaletteType) {
  const themeOptions: ThemeOptions = {
    ...base,
    direction,
    palette: {
      ...base.palette,
      type: paletteType,
      background: { default: grey[100] },
    },
    typography: {
      fontFamily: 'Shabnam, "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '36px', fontWeight: 'bold' },
      h2: { fontSize: '30px', fontWeight: 'bold' },
      h3: { fontSize: '24px', fontWeight: 'bold' },
      h4: { fontSize: '20px', fontWeight: 'bold' },
      h5: { fontSize: '18px', fontWeight: 'bold' },
      h6: { fontSize: '16px', fontWeight: 'bold' },
      subtitle1: { fontSize: '12px' },
      subtitle2: { fontSize: '11px', fontWeight: 'bold' },
      body1: { fontSize: '14px' },
      body2: { fontSize: '12px' },
      button: { fontSize: '14px', fontWeight: 'bold' },
      caption: { fontSize: '12px', fontWeight: 'lighter' },
      overline: { fontSize: '13px', fontWeight: 'lighter' },
    },
  };
  return themeOptions;
}

export const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: '#0F7DAA',
      main: '#1297CE',
      light: '#27B2EC',
    },
    secondary: {
      dark: deepOrange[600],
      main: deepOrange[500],
      light: deepOrange[300],
    },
    error: red,
  },
};

export const rtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'light'));
export const ltrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'light'));

export const darkRtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'dark'));
export const darkLtrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'dark'));
