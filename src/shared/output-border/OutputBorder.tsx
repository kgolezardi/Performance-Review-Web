import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function OutputBorder(props: Props) {
  const classes = useStyles(props);
  return <div className={classes.root}>{props.children}</div>;
}

const styles = (theme: Theme) => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    padding: theme.spacing(),
    borderRadius: theme.spacing(0.5),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'OutputBorder' });
type StyleProps = Styles<typeof styles>;
