import { createStyles, makeStyles, Theme } from '@material-ui/core';
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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  });

const useStyles = makeStyles(styles, { name: 'TextLink' });
type StyleProps = Styles<typeof styles>;
