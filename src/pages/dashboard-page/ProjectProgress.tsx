import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { LinearProgress } from 'src/shared/progress';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  name: React.ReactNode;
  value: number;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ProjectProgress(props: Props) {
  const { name, value } = props;
  const classes = useStyles(props);
  const color = getColor(value);
  return (
    <Box marginY={3} className={classes.root}>
      <Typography gutterBottom>{name}</Typography>
      <LinearProgress value={value} color={color} />
    </Box>
  );
}

const styles = (theme: Theme) => ({
  root: {
    '&:first-child': {
      marginTop: 0,
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ProjectProgress' });
type StyleProps = Styles<typeof styles>;

const getColor = (value: number) => {
  if (value === 100) {
    return 'complete';
  }
  if (value <= 20) {
    return 'low';
  }
  if (value < 60) {
    return 'medium';
  }
  return 'high';
};
