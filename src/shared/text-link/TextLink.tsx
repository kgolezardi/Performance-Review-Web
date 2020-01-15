import { makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends LinkProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function TextLink(props: Props) {
  const classes = useStyles(props);
  return <Link className={classes.root} target="_blank" {...props} />;
}

const styles = (theme: Theme) => ({
  root: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'TextLink' });
type StyleProps = Styles<typeof styles>;
