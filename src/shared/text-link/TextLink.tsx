import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Link, LinkProps } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { Theme, makeStyles } from '@material-ui/core';

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
