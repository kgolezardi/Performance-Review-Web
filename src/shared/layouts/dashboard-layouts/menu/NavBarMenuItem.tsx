import { lighten, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { MenuItem } from './types';

interface OwnProps {
  item: MenuItem;
}

type Props = FCProps<OwnProps> & StyleProps;

export function NavBarMenuItem(props: Props) {
  const classes = useStyles(props);

  return (
    <NavLink {...props.item.link} activeClassName={classes.active} className={classes.root}>
      {props.item.text}
      <div className={classes.bar} />
    </NavLink>
  );
}

const styles = (theme: Theme) => ({
  root: {
    '&:hover': {
      color: lighten(theme.palette.primary.main, 0.9),
    },
    fontSize: theme.typography.h6.fontSize,
    fontWeight: 'bold',
    padding: theme.spacing(2),
    color: lighten(theme.palette.primary.main, 0.7),
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  } as CSSProperties,
  bar: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    right: 0,
    transition: 'transform 0.2s ease-in, opacity 0.2s ease-in',
    backgroundColor: theme.palette.common.white,
    height: theme.spacing(0.5),
    opacity: 0,
    transform: `translateY(${theme.spacing(1)}px)`,
    borderRadius: 2,
    '$active &': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  } as CSSProperties,
  active: {
    color: theme.palette.common.white,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'NavBarMenuItem' });
type StyleProps = Styles<typeof styles>;
