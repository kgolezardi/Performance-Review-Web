import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Evaluation } from 'src/global-types';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { MultilineOutput } from 'src/shared/multiline-output';
import { OutputBorder } from 'src/shared/output-border';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  title: string;
  evaluation: '%future added value' | Evaluation | null;
  evidence: string | null;
}

type Props = FCProps<OwnProps>;

export function CriterionOutputItem({ title, evaluation, evidence }: Props) {
  return (
    <Box paddingTop={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {i18n._('Evaluation')}:
          </Typography>
          <Box width={240}>
            <OutputBorder>
              {evaluation ? (
                <EvaluationOutput value={evaluation} type="self" />
              ) : (
                <Typography variant="body1">{NON_BREAKING_SPACE}</Typography>
              )}
            </OutputBorder>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {i18n._('Evidence')}:
          </Typography>
          <OutputBorder>
            <MultilineOutput value={evidence || NON_BREAKING_SPACE} />
          </OutputBorder>
        </Grid>
      </Grid>
    </Box>
  );
}
