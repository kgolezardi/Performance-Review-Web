import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';
import React, { Fragment, useState } from 'react';
import { Divider, List, MenuItem, Paper, Theme, createStyles, lighten, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { NavLink } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';

import type { NavbarMenuItem } from './types';

interface OwnProps {
  item: NavbarMenuItem;
}

type Props = FCProps<OwnProps> & StyleProps;

export function NavBarMenuItem(props: Props) {
  const {
    item: { children, link, text },
  } = props;
  const classes = useStyles(props);

  const [hide, setHide] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (children) {
      event.preventDefault();
    }
  };

  const handleMouseEnter = () => {
    if (children) {
      setHide(false);
    }
  };

  const hideMenu = () => {
    setHide(true);
  };

  return (
    <div className={clsx(classes.root, { [classes.hide]: hide })}>
      <NavLink
        activeClassName={classes.active}
        className={classes.link}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...link}
      >
        {text}
        {children && <ArrowDropDownIcon />}
        <div className={classes.bar} />
      </NavLink>

      {children && (
        <Paper className={classes.menu}>
          <List>
            {children.map((item, index) => (
              <Fragment key={index}>
                <MenuItem className={classes.menuItem} disableGutters>
                  <NavLink className={classes.menuItemLink} {...item.link} onClick={hideMenu}>
                    {item.text}
                  </NavLink>
                </MenuItem>
                {index !== children.length - 1 && <Divider variant="middle" />}
              </Fragment>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '&:hover $menu': {
        display: 'block',
      },
    },
    link: {
      fontSize: theme.typography.h6.fontSize,
      padding: theme.spacing(2),
      color: theme.palette.common.white,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      height: '100%',
      '&:hover': {
        color: lighten(theme.palette.primary.main, 0.9),
      },
    },
    hide: {},
    menu: {
      display: 'none',
      position: 'absolute',
      top: 60,
      '$root$hide &': {
        display: 'none !important',
      },
    },
    menuItem: {},
    menuItemLink: {
      color: theme.palette.text.primary,
      height: '100%',
      width: '100%',
      textDecoration: 'none',
      padding: theme.spacing(1.5, 2),
    },
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
    },
    active: {
      color: theme.palette.common.white,
      fontWeight: 'bold',
    },
  });

const useStyles = makeStyles(styles, { name: 'NavBarMenuItem' });
type StyleProps = Styles<typeof styles>;
