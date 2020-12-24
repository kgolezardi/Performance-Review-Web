import React from 'react';
import { Box, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { LinearProgress } from 'src/shared/progress';
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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '&:first-child': {
        marginTop: 0,
      },
    },
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
