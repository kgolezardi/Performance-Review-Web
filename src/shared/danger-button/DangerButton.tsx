import React from 'react';
import { Button, ButtonProps, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { red } from '@material-ui/core/colors';

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
