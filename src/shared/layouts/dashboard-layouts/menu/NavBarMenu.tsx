import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import { NavBarMenuItem } from './NavBarMenuItem';
import { NavbarMenuItem } from './types';

interface OwnProps {
  items: NavbarMenuItem[];
}

type Props = FCProps<OwnProps> & StyleProps;

export function NavBarMenu(props: Props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {props.items.map((item, index) => (
        <NavBarMenuItem item={item} key={index} />
      ))}
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: theme.spacing(3),
    },
  });

const useStyles = makeStyles(styles, { name: 'NavBarMenu' });
type StyleProps = Styles<typeof styles>;
