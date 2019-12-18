import { Button, createMuiTheme } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { ltrTheme } from 'src/core/theme';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends ButtonProps {}

type Props = FCProps<OwnProps>;

const theme = createMuiTheme({
  ...ltrTheme,
  palette: {
    primary: red,
  },
});

export function DangerButton(props: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props} color="primary" />
    </ThemeProvider>
  );
}
