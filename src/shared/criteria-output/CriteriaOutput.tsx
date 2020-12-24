import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { BehavioralCompetencyOutput } from 'src/shared/behavioral-competency-output';
import { Evaluation } from 'src/global-types';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { CriteriaOutput_review$key } from './__generated__/CriteriaOutput_review.graphql';

const fragment = graphql`
  fragment CriteriaOutput_review on PersonReviewNode {
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

interface OwnProps {
  isSelfReview: boolean;
  review: CriteriaOutput_review$key | null;
}

type Props = FCProps<OwnProps>;

export function CriteriaOutput(props: Props) {
  const { isSelfReview } = props;
  const review = useFragment(fragment, props.review);
  const reviewType = isSelfReview ? 'self' : 'peer';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BehavioralCompetencyOutput
          title={i18n._('Organization Culture Adoption')}
          evaluation={review?.sahabinessRating as Evaluation}
          evidence={review?.sahabinessComment ?? null}
          type={reviewType}
        />
      </Grid>
      <Grid item xs={12}>
        <BehavioralCompetencyOutput
          title={i18n._('Problem Solving')}
          evaluation={review?.problemSolvingRating as Evaluation}
          evidence={review?.problemSolvingComment ?? null}
          type={reviewType}
        />
      </Grid>
      <Grid item xs={12}>
        <BehavioralCompetencyOutput
          title={i18n._('Output Quality')}
          evaluation={review?.executionRating as Evaluation}
          evidence={review?.executionComment ?? null}
          type={reviewType}
        />
      </Grid>
      <Grid item xs={12}>
        <BehavioralCompetencyOutput
          title={i18n._('Thought Leadership')}
          evaluation={review?.thoughtLeadershipRating as Evaluation}
          evidence={review?.thoughtLeadershipComment ?? null}
          type={reviewType}
        />
      </Grid>
      <Grid item xs={12}>
        <BehavioralCompetencyOutput
          title={i18n._('Leadership')}
          evaluation={review?.leadershipRating as Evaluation}
          evidence={review?.leadershipComment ?? null}
          type={reviewType}
        />
      </Grid>
      <Grid item xs={12}>
        <BehavioralCompetencyOutput
          title={i18n._('Presence')}
          evaluation={review?.presenceRating as Evaluation}
          evidence={review?.presenceComment ?? null}
          type={reviewType}
        />
      </Grid>
    </Grid>
  );
}
