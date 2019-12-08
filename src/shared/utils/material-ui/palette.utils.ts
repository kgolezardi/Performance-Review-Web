import { Color } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

export const getPaletteColor = (palette: PaletteColor, level: keyof (Color & PaletteColor)) => {
  return (palette as Color & PaletteColor)[level];
};
