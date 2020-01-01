import { CircularProgress as MuiCircularProgress, CircularProgressProps, makeStyles, Theme } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends CircularProgressProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function CircularProgress(props: Props) {
  const { children } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <MuiCircularProgress {...props} classes={{ circle: classes.circle }} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    display: 'inline-block',
    position: 'relative',
  } as CSSProperties,
  content: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  } as CSSProperties,
  circle: ({ value }: Props) =>
    ({
      strokeLinecap: 'round',
      color: value ? (value < 100 ? amber[400] : green[500]) : theme.palette.primary,
    } as CSSProperties),
});

const useStyles = makeStyles(styles, { name: 'CircularProgress' });
type StyleProps = Styles<typeof styles>;
