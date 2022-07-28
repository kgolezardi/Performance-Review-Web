import { Button, ButtonProps, createMuiTheme, Theme, ThemeProvider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends ButtonProps {}

type Props = FCProps<OwnProps>;

const themeFunction = (theme: Theme): Theme =>
  createMuiTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: theme.palette.augmentColor(red),
    },
  });

export function DangerButton(props: Props) {
  return (
    <ThemeProvider theme={themeFunction}>
      <Button {...props} color="primary" />
    </ThemeProvider>
  );
}
