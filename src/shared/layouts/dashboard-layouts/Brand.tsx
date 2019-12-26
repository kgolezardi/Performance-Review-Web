import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  logo: string;
  label: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function Brand(props: Props) {
  const classes = useStyles(props);
  return <img className={classes.logo} src={props.logo} alt={props.label} />;
}

const styles = (theme: Theme) => ({
  logo: {
    height: '100%',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Brand' });
type StyleProps = Styles<typeof styles>;
