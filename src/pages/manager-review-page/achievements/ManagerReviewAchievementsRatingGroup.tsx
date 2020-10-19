import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { ExcludeUnknown } from 'src/shared/enum-utils/types';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { ReviewAvatarGroup } from 'src/shared/review-avatar-group';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { selfReviewEvaluationDictionary } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';

import { ManagerReviewAchievementsRatingGroup_comments$key } from './__generated__/ManagerReviewAchievementsRatingGroup_comments.graphql';

const fragment = graphql`
  fragment ManagerReviewAchievementsRatingGroup_comments on ProjectCommentNode @relay(plural: true) {
    id
    rating
    text
    reviewer {
      avatarUrl
      ...getUserLabel_user
    }
  }
`;

interface OwnProps {
  comments: ManagerReviewAchievementsRatingGroup_comments$key;
  rating: ExcludeUnknown<Evaluation> | null;
}

export type Props = FCProps<OwnProps>;

export const ManagerReviewAchievementsRatingGroup = React.memo(function ManagerReviewAchievementsRatingGroup(
  props: Props,
) {
  const { rating } = props;

  const comments = useFragment(fragment, props.comments);

  const filteredByRating = rating
    ? comments.filter((comment) => comment.rating === rating)
    : comments.filter((comment) => comment.rating === rating && comment.text);
  const filteredComments = filteredByRating.filter((comment) => comment.text);

  if (filteredByRating.length === 0) {
    return null;
  }

  const currentEvaluation = rating ? selfReviewEvaluationDictionary[rating] : i18n._('Unknown');
  const evaluationsCount = filteredByRating.length;
  const commentsCount = filteredComments.length;

  const reviewers = filteredByRating.map((review) => review.reviewer).filter(isNotNil);
  const reviewAvatars = reviewers.map((reviewer) => ({
    avatarUrl: reviewer.avatarUrl ?? undefined,
    name: getUserLabel(reviewer),
  }));

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
      {filteredComments.map((review) => (
        <Box marginTop={2} key={review.id}>
          <ReviewItemInfo
            name={review.reviewer ? getUserLabel(review.reviewer) : undefined}
            src={review.reviewer?.avatarUrl ?? undefined}
            type="peer"
          >
            <MultilineOutput value={review.text} enableTruncating />
          </ReviewItemInfo>
        </Box>
      ))}
    </Box>
  );
});
