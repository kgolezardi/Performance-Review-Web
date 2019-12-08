import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getPaletteColor } from 'src/shared/utils/material-ui/palette.utils';
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
    fontSize: theme.typography.h6.fontSize,
    fontWeight: 'bold',
    padding: theme.spacing(2),
    color: getPaletteColor(theme.palette.primary, 100),
    textDecoration: 'none',
  } as CSSProperties,

  bar: {
    transition: 'transform 0.2s ease-in, opacity 0.2s ease-in',
    marginTop: theme.spacing(),
    backgroundColor: theme.palette.common.white,
    height: theme.spacing(0.5),
    opacity: 0,
    transform: `translateY(${theme.spacing(1)}px)`,
    borderRadius: 2,
    '$active &': {
      color: theme.palette.common.white,
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  active: {
    color: theme.palette.common.white,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'NavBarMenuItem' });
type StyleProps = Styles<typeof styles>;
