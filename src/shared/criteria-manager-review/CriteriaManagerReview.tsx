import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Evaluation } from 'src/global-types';
import { CriterionOutputItem } from 'src/shared/criterion-output-item';
import { FCProps } from 'src/shared/types/FCProps';
import { CriteriaManagerReview_review$key } from './__generated__/CriteriaManagerReview_review.graphql';

interface OwnProps {
  review: CriteriaManagerReview_review$key;
}

type Props = FCProps<OwnProps>;

export function CriteriaManagerReview(props: Props) {
  const review = useFragment(fragment, props.review);
  return (
    <Box padding={3}>
      <Grid item xs={12}>
        <CriterionOutputItem
          title={i18n._('Organization Culture Adoption')}
          evaluation={review.sahabinessRating as Evaluation}
          evidence={review.sahabinessComment}
        />
      </Grid>
      <Grid item xs={12}>
        <CriterionOutputItem
          title={i18n._('Problem Solving')}
          evaluation={review.problemSolvingRating as Evaluation}
          evidence={review.problemSolvingComment}
        />
      </Grid>
      <Grid item xs={12}>
        <CriterionOutputItem
          title={i18n._('Execution')}
          evaluation={review.executionRating as Evaluation}
          evidence={review.executionComment}
        />
      </Grid>
      <Grid item xs={12}>
        <CriterionOutputItem
          title={i18n._('Thought Leadership')}
          evaluation={review.thoughtLeadershipRating as Evaluation}
          evidence={review.thoughtLeadershipComment}
        />
      </Grid>
      <Grid item xs={12}>
        <CriterionOutputItem
          title={i18n._('Leadership')}
          evaluation={review.leadershipRating as Evaluation}
          evidence={review.leadershipComment}
        />
      </Grid>
      <Grid item xs={12}>
        <CriterionOutputItem
          title={i18n._('Presence')}
          evaluation={review.presenceRating as Evaluation}
          evidence={review.presenceComment}
        />
      </Grid>
    </Box>
  );
}

const fragment = graphql`
  fragment CriteriaManagerReview_review on PersonReviewNode {
    sahabinessComment
    sahabinessRating
    problemSolvingComment
    problemSolvingRating
    executionComment
    executionRating
    thoughtLeadershipComment
    thoughtLeadershipRating
    leadershipComment
    leadershipRating
    presenceComment
    presenceRating
  }
`;

export type CriteriaManagerReviewProps = Props;
