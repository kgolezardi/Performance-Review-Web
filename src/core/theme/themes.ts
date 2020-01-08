import { PaletteType } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import createMuiTheme, { Direction, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

export function getThemeOptions(base: ThemeOptions, direction: Direction, paletteType: PaletteType): ThemeOptions {
  const typography: TypographyOptions = {
    fontFamily: 'Shabnam, "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '36px', fontWeight: 'bold' },
    h2: { fontSize: '30px', fontWeight: 'bold' },
    h3: { fontSize: '24px', fontWeight: 'bold' },
    h4: { fontSize: '20px', fontWeight: 'bold' },
    h5: { fontSize: '18px', fontWeight: 'bold' },
    h6: { fontSize: '16px', fontWeight: 'bold' },
    subtitle1: { fontSize: '12px' },
    subtitle2: { fontSize: '11px', fontWeight: 'bold' },
    body1: { fontSize: 14 },
    body2: { fontSize: '12px' },
    button: { fontSize: '14px', fontWeight: 'bold' },
    caption: { fontSize: '12px', fontWeight: 'lighter' },
    overline: { fontSize: '13px', fontWeight: 'lighter' },
  };

  return {
    ...base,
    direction,
    palette: {
      ...base.palette,
      type: paletteType,
      background: { default: grey[100] },
    },
    typography,
    overrides: {
      MuiInputBase: {
        root: {
          fontSize: typography?.body1?.fontSize,
        },
        multiline: {
          lineHeight: '1.5em',
        },
      },
    },
  };
}

export const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: '#0F7DAA',
      main: '#1297CE',
      light: '#27B2EC',
    },
    error: red,
  },
};

export const rtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'light'));
export const ltrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'light'));

export const darkRtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'dark'));
export const darkLtrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'dark'));
