import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Link, LinkProps } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

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
