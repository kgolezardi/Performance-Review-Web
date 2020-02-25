import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, makeStyles } from '@material-ui/core';

export interface PlaceHolderProps {}

type Props = FCProps<PlaceHolderProps> & StyleProps;

export const PlaceHolder = (props: Props) => {
  const classes = useStyles(props);
  return <div className={classes.root}>{props.children}</div>;
};

const styles = (theme: Theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } as CSSProperties,
});
const useStyles = makeStyles(styles, { name: 'PlaceHolder' });
type StyleProps = Styles<typeof styles>;
