import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid, Typography } from '@material-ui/core';
import { MultilineOutput } from 'src/shared/multiline-output';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { ProjectOutput_review$key } from './__generated__/ProjectOutput_review.graphql';

const fragment = graphql`
  fragment ProjectOutput_review on ProjectReviewNode {
    text
    rating
    projectName
  }
`;

interface OwnProps {
  review: ProjectOutput_review$key;
  showProjectName?: boolean;
  hideEvaluation?: boolean;
}

type Props = FCProps<OwnProps>;

export function ProjectOutput(props: Props) {
  const { hideEvaluation = false, showProjectName = false } = props;
  const review = useFragment(fragment, props.review);

  return (
    <Grid container spacing={2}>
      {showProjectName && (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {review.projectName}
          </Typography>
        </Grid>
      )}
      {!hideEvaluation && (
        <Grid item xs={12}>
          <Typography color="textSecondary" gutterBottom>
            {i18n._('Evaluation')}
          </Typography>
          <EvaluationOutput value={review.rating as Evaluation} type="self" />
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Accomplishments')}:
        </Typography>
        <MultilineOutput value={review.text} enableTruncating />
      </Grid>
    </Grid>
  );
}
