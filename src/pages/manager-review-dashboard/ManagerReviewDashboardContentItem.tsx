import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  title: string;
  value: Evaluation | null;
}

type Props = FCProps<OwnProps>;

export function ManagerReviewDashboardContentItem(props: Props) {
  const { title, value } = props;
  return (
    <Box>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {title}:
      </Typography>
      <EvaluationOutput type="peer" value={value} />
    </Box>
  );
}
