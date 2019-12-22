import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { SnackbarProvider as Snackbar, SnackbarProviderProps } from 'notistack';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { CheckIcon, ErrorIcon, InfoIcon, WarningIcon } from 'src/core/icons';

interface OwnProps extends SnackbarProviderProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function SnackbarProvider(props: Props) {
  const theme = useTheme();
  const { iconStyles, ...classes } = useStyles(props);

  return (
    <Snackbar
      {...props}
      classes={classes}
      iconVariant={{
        success: <CheckIcon className={iconStyles} />,
        warning: <WarningIcon className={iconStyles} />,
        error: <ErrorIcon className={iconStyles} />,
        info: <InfoIcon className={iconStyles} />,
      }}
      anchorOrigin={{ horizontal: theme.direction === 'rtl' ? 'right' : 'left', vertical: 'bottom' }}
    >
      {props.children}
    </Snackbar>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    containerAnchorOriginBottomLeft: { flip: false, left: 20, right: 'auto' } as CSSProperties,
    containerAnchorOriginBottomRight: { flip: false, right: 20, left: 'auto' } as CSSProperties,
    /* iconStyles taken from notistack */
    iconStyles: {
      opacity: 0.9,
      fontSize: 20,
      marginRight: 8,
    } as CSSProperties,
  });

const useStyles = makeStyles(styles, { name: 'SnackbarProvider' });
type StyleProps = Styles<typeof styles>;
