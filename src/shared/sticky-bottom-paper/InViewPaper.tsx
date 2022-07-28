import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useInViewContext } from 'src/shared/in-view';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  noSticky?: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function InViewPaper(props: Props) {
  const { children, noSticky = false } = props;
  const classes = useStyles(props);
  const { bottomInView } = useInViewContext();

  const sticky = !noSticky && !bottomInView;

  return (
    <Paper
      elevation={sticky ? 4 : 0}
      classes={{
        root: clsx(classes.root, {
          [classes.sticky]: sticky,
        }),
      }}
    >
      {children}
    </Paper>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      bottom: -4,
      zIndex: theme.zIndex.appBar - 30,
      padding: theme.spacing(2),
      width: '100%',
      '@media print': {
        boxShadow: 'none',
      },
    },
    sticky: {
      position: 'sticky',
      '@media print': {
        position: 'static',
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'InViewPaper' });
type StyleProps = Styles<typeof styles>;
