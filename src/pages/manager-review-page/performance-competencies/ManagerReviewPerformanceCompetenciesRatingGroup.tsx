import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { ExcludeUnknown } from 'src/shared/enum-utils/types';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import {
  PerformanceCompetenciesComment,
  PerformanceCompetenciesPrefix,
  PerformanceCompetenciesRating,
  selfReviewEvaluationDictionary,
} from 'src/global-types';
import type { ReviewAvatar } from 'src/shared/review-avatar-group';
import { ReviewAvatarGroup } from 'src/shared/review-avatar-group';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { useFragment } from 'react-relay/hooks';

import { ManagerReviewPerformanceCompetenciesRatingGroup_reviews$key } from './__generated__/ManagerReviewPerformanceCompetenciesRatingGroup_reviews.graphql';

const fragment = graphql`
  fragment ManagerReviewPerformanceCompetenciesRatingGroup_reviews on PersonReviewNode @relay(plural: true) {
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
    reviewer {
      avatarUrl
      ...getUserLabel_user
    }
  }
`;

interface OwnProps {
  reviews: ManagerReviewPerformanceCompetenciesRatingGroup_reviews$key;
  rating: ExcludeUnknown<Evaluation> | null;
  prefix: PerformanceCompetenciesPrefix;
}

export type Props = FCProps<OwnProps>;

export const ManagerReviewPerformanceCompetenciesRatingGroup = React.memo(
  function ManagerReviewPerformanceCompetenciesRatingGroup(props: Props) {
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

    const reviewAvatars: ReadonlyArray<ReviewAvatar> = filteredByRating
      .map((review) =>
        review.reviewer
          ? {
              self: review.isSelfReview,
              avatarUrl: review.reviewer.avatarUrl ?? undefined,
              name: getUserLabel(review.reviewer),
            }
          : null,
      )
      .filter(isNotNil);

    return (
      <Box marginTop={3}>
        <Typography variant="h5">{currentEvaluation}</Typography>
        <Box alignItems="center" display="flex" marginY={2}>
          <ReviewAvatarGroup users={reviewAvatars} />
          <Box marginLeft={2} color="grey.700">
            <Typography variant="caption">
              {i18n._('{evaluationsCount} evaluations / {commentsCount} comments', { evaluationsCount, commentsCount })}
            </Typography>
          </Box>
        </Box>
        {selfReview && (
          <Box marginTop={2}>
            <ReviewItemInfo
              name={selfReview.reviewer ? getUserLabel(selfReview.reviewer) : undefined}
              src={selfReview.reviewer?.avatarUrl ?? undefined}
              type="self"
            >
              <MultilineOutput value={selfReview[criteriaComment]} enableTruncating />
            </ReviewItemInfo>
          </Box>
        )}
        {peerReviews.map((review) => (
          <Box marginTop={2} key={review.id}>
            <ReviewItemInfo
              name={review.reviewer ? getUserLabel(review.reviewer) : undefined}
              src={review.reviewer?.avatarUrl ?? undefined}
              type="peer"
            >
              <MultilineOutput value={review[criteriaComment]} enableTruncating />
            </ReviewItemInfo>
          </Box>
        ))}
      </Box>
    );
  },
);
