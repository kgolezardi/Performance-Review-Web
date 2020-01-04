import { Box, LinearProgress, Typography } from '@material-ui/core';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  name: React.ReactNode;
  value: number;
}

type Props = FCProps<OwnProps>;

export function ProjectProgress(props: Props) {
  const { name, value } = props;
  return (
    <Box marginY={3}>
      <Typography>{name}</Typography>
      <LinearProgress value={value} variant="determinate" />
    </Box>
  );
}
