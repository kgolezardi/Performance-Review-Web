import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { ExcludeUnknown } from 'src/shared/enum-utils/types';
import { FCProps } from 'src/shared/types/FCProps';
import { ReviewItemOutput } from 'src/shared/review-item-output';
import { i18n } from '@lingui/core';
import { selfReviewEvaluationDictionary } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';

import { ProjectResultRatingGroup_comments$key } from './__generated__/ProjectResultRatingGroup_comments.graphql';

const fragment = graphql`
  fragment ProjectResultRatingGroup_comments on ProjectCommentNode @relay(plural: true) {
    id
    rating
    text
  }
`;

interface OwnProps {
  comments: ProjectResultRatingGroup_comments$key;
  rating: ExcludeUnknown<Evaluation> | null;
}

export type Props = FCProps<OwnProps>;

export const ProjectResultRatingGroup = React.memo(function ProjectResultRatingGroup(props: Props) {
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
      {filteredComments.map((review) => (
        <Box marginTop={2} key={review.id}>
          <ReviewItemOutput value={review.text} type="peer" anonymous />
        </Box>
      ))}
    </Box>
  );
});
