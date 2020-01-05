import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { LinearProgress } from 'src/shared/progress';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  name: React.ReactNode;
  value: number;
}

type Props = FCProps<OwnProps>;

export function ProjectProgress(props: Props) {
  const { name, value } = props;
  const color = getColor(value);
  return (
    <Box marginY={3}>
      <Typography>{name}</Typography>
      <LinearProgress value={value} color={color} />
    </Box>
  );
}

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
