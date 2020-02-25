import { i18n } from '@lingui/core';
import { Grid, Typography } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { MultilineOutput } from 'src/shared/multiline-output';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectOutput_review$key } from './__generated__/ProjectOutput_review.graphql';

const fragment = graphql`
  fragment ProjectOutput_review on ProjectReviewNode {
    text
    rating
    project {
      name
    }
  }
`;

interface OwnProps {
  review: ProjectOutput_review$key;
  showProjectName?: boolean;
}

type Props = FCProps<OwnProps>;

export function ProjectOutput(props: Props) {
  const { showProjectName = false } = props;
  const review = useFragment(fragment, props.review);

  return (
    <Grid container spacing={2}>
      {showProjectName && (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {review.project.name}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Evaluation')}
        </Typography>
        <EvaluationOutput value={review.rating as Evaluation} type="self" />
      </Grid>
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Accomplishments')}:
        </Typography>
        <MultilineOutput value={review.text} />
      </Grid>
    </Grid>
  );
}
