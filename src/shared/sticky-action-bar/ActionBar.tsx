import { makeStyles, Paper, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { useInViewContext } from 'src/shared/in-view';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  noSticky?: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ActionBar(props: Props) {
  const { noSticky = false } = props;
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
      {props.children}
    </Paper>
  );
}

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    bottom: -4,
    zIndex: theme.zIndex.appBar - 30,
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
});

const useStyles = makeStyles(styles, { name: 'ActionBar' });
type StyleProps = Styles<typeof styles>;

export type ActionBarProps = Props;
