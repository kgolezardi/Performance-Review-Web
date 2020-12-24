import React from 'react';
import clsx from 'clsx';
import { CircularProgress } from 'src/shared/progress';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {
  count: number;
  max: number;
  warning?: number;
}

type Props = FCProps<OwnProps> & StyleProps;

export function Counter(props: Props) {
  const { count, max, warning = 20 } = props;
  const classes = useStyles(props);

  const remaining = max - count;
  const color = remaining === 0 ? 'error' : remaining < warning ? 'medium' : 'default';

  return (
    <div className={classes.root}>
      <Typography
        variant="caption"
        className={clsx(classes.typography, {
          [classes.redColor]: color === 'error',
          [classes.warningColor]: color === 'medium',
        })}
      >
        {remaining}
      </Typography>
      <CircularProgress
        className={classes.circularProgress}
        size={18}
        thickness={6}
        value={(count * 100) / max}
        color={color}
      />
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    circularProgress: {
      marginLeft: theme.spacing(),
    },
    redColor: {
      color: theme.palette.error.main,
    },
    warningColor: {},
    typography: {},
  });

const useStyles = makeStyles(styles, { name: 'Counter' });
type StyleProps = Styles<typeof styles>;
