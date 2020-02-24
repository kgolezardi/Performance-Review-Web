import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { SnackbarProvider as Snackbar, SnackbarProviderProps } from 'notistack';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends SnackbarProviderProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function SnackbarProvider(props: Props) {
  const classes = useStyles(props);
  return (
    <Snackbar {...props} classes={classes}>
      {props.children}
    </Snackbar>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    containerAnchorOriginBottomLeft: { flip: false, left: 20, right: 'auto' } as CSSProperties,
    containerAnchorOriginBottomRight: { flip: false, right: 20, left: 'auto' } as CSSProperties,
  });

const useStyles = makeStyles(styles, { name: 'SnackbarProvider' });
type StyleProps = Styles<typeof styles>;
