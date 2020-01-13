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
        elevation={inView ? 0 : 4}
        classes={{
          root: clsx(classes.root, {
            [classes.sticky]: !inView,
          }),
        }}
      >
        {props.children}
      </Paper>
      <div className={classes.inViewSpy} ref={ref} />
    </>
  );
}

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    bottom: -4,
    zIndex: theme.zIndex.appBar - 25,
    width: '100%',
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.spacing(),
    padding: theme.spacing(2),
    justifyContent: 'end',
  } as CSSProperties,
  sticky: {
    position: 'sticky',
  } as CSSProperties,
  inViewSpy: {
    height: 1,
    width: '100%',
    backgroundColor: 'transparent',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'StickyActionBar' });
type StyleProps = Styles<typeof styles>;
