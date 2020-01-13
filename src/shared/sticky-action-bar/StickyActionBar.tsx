import React from 'react';
import { useInView } from 'react-intersection-observer';
import { makeStyles, Paper, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import clsx from 'clsx';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function StickyActionBar(props: Props) {
  const [ref, inView] = useInView();
  const classes = useStyles(props);

  return (
    <>
      <Paper
        elevation={0}
        classes={{
          root: clsx(classes.root, {
            [classes.sticky]: !inView,
          }),
        }}
      >
        {props.children}
      </Paper>
      <div className={classes.stickyBottom} ref={ref} />
    </>
  );
}

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    bottom: -4,
    zIndex: 1000,
    width: '100%',
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.spacing(),
    padding: theme.spacing(2),
    justifyContent: 'end',
  } as CSSProperties,
  sticky: {
    position: 'sticky',
    boxShadow: '0px -2px 4px 0px rgba(0,0,0,0.3)',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  } as CSSProperties,
  stickyBottom: {
    height: 1,
    width: '100%',
    backgroundColor: 'transparent',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'StickyActionBar' });
type StyleProps = Styles<typeof styles>;
