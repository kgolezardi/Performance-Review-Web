import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { NavLink } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {
  logo: string;
  label: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function Brand(props: Props) {
  const classes = useStyles(props);

  return (
    <NavLink to="/" className={classes.root}>
      <img className={classes.logo} src={props.logo} alt={props.label} />
    </NavLink>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textDecoration: 'none',
      color: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
      height: '100%',
      width: '100%',
    },
    logo: {
      height: '100%',
    },
  });

const useStyles = makeStyles(styles, { name: 'Brand' });
type StyleProps = Styles<typeof styles>;
