import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  logo: string;
  label: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function Brand(props: Props) {
  const classes = useStyles(props);
  return (
    <Fragment>
      {/* TODO: uncomment when logo added */}
      {/* <img className={classes.logo} src={props.logo} alt={props.label} /> */}
      <span className={classes.label}>{props.label}</span>
    </Fragment>
  );
}

const styles = (theme: Theme) => ({
  logo: {
    height: theme.spacing(5),
    margin: theme.spacing(2),
  } as CSSProperties,
  label: {
    fontWeight: 'bold',
    fontSize: theme.typography.h5.fontSize,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'BrandLabel' });
type StyleProps = Styles<typeof styles>;
