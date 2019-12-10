// TODO: make login page here
import { i18n } from '@lingui/core';
// import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function Login(/* props: Props */) {
  // const classes = useStyles();
  return <div>{i18n._('Login')}</div>;
}

const styles = (/* theme: Theme */) => ({});

// const useStyles = makeStyles(styles, { name: 'Login' });
type StyleProps = Styles<typeof styles>;
