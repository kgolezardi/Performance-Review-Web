import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { ExcludeUnknown } from 'src/shared/enum-utils/types';
import { FCProps } from 'src/shared/types/FCProps';
import {
  PerformanceCompetenciesComment,
  PerformanceCompetenciesPrefix,
  PerformanceCompetenciesRating,
  selfReviewEvaluationDictionary,
} from 'src/global-types';
import { ReviewItemOutput } from 'src/shared/review-item-output';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { CriterionResultRatingGroup_reviews$key } from './__generated__/CriterionResultRatingGroup_reviews.graphql';

const fragment = graphql`
  fragment CriterionResultRatingGroup_reviews on PersonReviewNode @relay(plural: true) {
    id
    isSelfReview
    sahabinessRating
    sahabinessComment
    problemSolvingRating
    problemSolvingComment
    executionRating
    executionComment
    thoughtLeadershipRating
    thoughtLeadershipComment
    leadershipRating
    leadershipComment
    presenceRating
    presenceComment
  }
`;

interface OwnProps {
  reviews: CriterionResultRatingGroup_reviews$key;
  rating: ExcludeUnknown<Evaluation> | null;
  prefix: PerformanceCompetenciesPrefix;
}

export type Props = FCProps<OwnProps>;

export const CriterionResultRatingGroup = React.memo(function CriterionResultRatingGroup(props: Props) {
  const { rating, prefix } = props;

  const reviews = useFragment(fragment, props.reviews);

  const criteriaRating = (prefix + 'Rating') as PerformanceCompetenciesRating;

  const criteriaComment = (prefix + 'Comment') as PerformanceCompetenciesComment;

  const filteredByRating =
    rating !== null
      ? reviews.filter((review) => review[criteriaRating] === rating)
      : reviews.filter((review) => review[criteriaRating] === rating && review[criteriaComment]);
  const sortedReviews = filteredByRating.filter((review) => review[criteriaComment]).sort();

  if (filteredByRating.length === 0) {
    return null;
  }

  const selfReview = sortedReviews.find((review) => review.isSelfReview);
  const peerReviews = sortedReviews.filter((review) => !review.isSelfReview);
  const currentEvaluation = rating ? selfReviewEvaluationDictionary[rating] : i18n._('Unknown');
  const evaluationsCount = filteredByRating.length;
  const commentsCount = sortedReviews.length;

  return (
    <Box marginTop={3}>
      <Box display="flex" alignItems="baseline">
        <Typography variant="h5">{currentEvaluation}</Typography>
        <Box marginLeft={2} color="grey.700">
          <Typography variant="caption">
            {i18n._('{evaluationsCount} evaluations / {commentsCount} comments', { evaluationsCount, commentsCount })}
          </Typography>
        </Box>
      </Box>
      {selfReview && (
        <Box marginTop={2}>
          <ReviewItemOutput anonymous type="self" value={selfReview[criteriaComment]} />
        </Box>
      )}
      {peerReviews.map((review) => (
        <Box marginTop={2} key={review.id}>
          <ReviewItemOutput anonymous type="peer" value={review[criteriaComment]} />
        </Box>
      ))}
    </Box>
  );
});
