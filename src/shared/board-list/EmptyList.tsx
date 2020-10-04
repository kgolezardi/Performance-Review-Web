import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, Typography, makeStyles } from '@material-ui/core';

import { PlaceHolder } from './PlaceHolder';

interface EmptyListProps {
  text: string;
  icon: React.ReactNode;
}

type Props = FCProps<EmptyListProps> & StyleProps;

export function EmptyList(props: Props) {
  const { text, icon } = props;
  const classes = useStyles(props);
  return (
    <PlaceHolder classes={{ root: classes.root }}>
      {icon}
      <Typography variant="body1" className={classes.typography}>
        {text}
      </Typography>
    </PlaceHolder>
  );
}
const styles = (theme: Theme) => ({
  root: {
    textAlign: 'center',
    width: '75%',
  } as CSSProperties,
  typography: {
    color: theme.palette.grey[700],
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'EmptyList' });
type StyleProps = Styles<typeof styles>;
