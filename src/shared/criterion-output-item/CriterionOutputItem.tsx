import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { MultilineOutput } from 'src/shared/multiline-output';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  title: string;
  evaluation: '%future added value' | Evaluation | null;
  evidence: string | null;
}

type Props = FCProps<OwnProps>;

export function CriterionOutputItem({ title, evaluation, evidence }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {i18n._('Evaluation')}:
        </Typography>
        <Box width={240}>
          <EvaluationOutput value={evaluation} type="self" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {i18n._('Evidence')}:
        </Typography>
        <MultilineOutput value={evidence} />
      </Grid>
    </Grid>
  );
}
