import { makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { PlaceHolder } from 'src/shared/board-list';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface EmptyListProps {
  text: string;
}

type Props = FCProps<EmptyListProps> & StyleProps;

export function EmptyList(props: Props) {
  const classes = useStyles(props);
  return (
    <PlaceHolder>
      <div className={classes.root}>
        {props.children}
        <Typography variant="body1">{props.text}</Typography>
      </div>
    </PlaceHolder>
  );
}
const styles = (theme: Theme) => ({
  root: {
    textAlign: 'center',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'EmptyList' });
type StyleProps = Styles<typeof styles>;
