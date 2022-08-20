import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Answers } from 'src/core/domain';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { ExcludeUnknown } from 'src/shared/enum-utils/types';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { QuestionOutput } from 'src/shared/project-output';
import { ReviewAvatarGroup } from 'src/shared/review-avatar-group';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { getQuestionsAnswersPair } from 'src/shared/utils/questionsAnswersPair';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { peerReviewEvaluationDictionary } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { ProjectResultRatingGroup_comments$key } from './__generated__/ProjectResultRatingGroup_comments.graphql';

const fragment = graphql`
  fragment ProjectResultRatingGroup_comments on ProjectCommentNode @relay(plural: true) {
    id
    rating
    answers {
      value
      questionId
    }
    reviewer {
      avatarUrl
      ...getUserLabel_user
    }
  }
`;

interface OwnProps {
  comments: ProjectResultRatingGroup_comments$key;
  rating: ExcludeUnknown<Evaluation> | null;
  reviewersAreAnonymous?: boolean;
}

export type Props = FCProps<OwnProps>;

export const ProjectResultRatingGroup = React.memo(function ProjectResultRatingGroup(props: Props) {
  const { rating, reviewersAreAnonymous = false } = props;

  const comments = useFragment(fragment, props.comments);
  const { peerReviewProjectQuestions } = useRoundQuestions();

  const peerAnswers = (answers: Answers) => getQuestionsAnswersPair(peerReviewProjectQuestions, answers);

  const filteredByRating = rating
    ? comments.filter((comment) => comment.rating === rating)
    : comments.filter((comment) => comment.rating === rating && peerAnswers(comment.answers).hasPairs);
  const filteredComments = filteredByRating.filter((comment) => peerAnswers(comment.answers).hasPairs);

  if (filteredByRating.length === 0) {
    return null;
  }

  const currentEvaluation = rating ? peerReviewEvaluationDictionary[rating] : i18n._('Unknown');
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
        {!reviewersAreAnonymous && <ReviewAvatarGroup users={reviewAvatars} />}
        <Box marginLeft={2} color="grey.700">
          <Typography variant="caption">
            {i18n._('{evaluationsCount} evaluations / {commentsCount} comments', { evaluationsCount, commentsCount })}
          </Typography>
        </Box>
      </Box>
      {filteredComments.map((review) => (
        <ReviewItemInfo
          key={review.id}
          name={review.reviewer ? getUserLabel(review.reviewer) : undefined}
          src={review.reviewer?.avatarUrl ?? undefined}
          type="peer"
          anonymous={reviewersAreAnonymous}
        >
          {peerAnswers(review.answers).pairs.map(([question, answer], index) => (
            <Box key={index} my={2}>
              <QuestionOutput questionLabel={question} />
              <MultilineOutput value={answer} />
            </Box>
          ))}
        </ReviewItemInfo>
      ))}
    </Box>
  );
});
