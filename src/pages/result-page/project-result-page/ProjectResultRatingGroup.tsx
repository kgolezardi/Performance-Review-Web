import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { AnswerOutput } from 'src/shared/project-output/AnswerOutput';
import { Answers } from 'src/core/domain';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { ExcludeUnknown } from 'src/shared/enum-utils/types';
import { FCProps } from 'src/shared/types/FCProps';
import { QuestionOutput } from 'src/shared/project-output';
import { QuestionsAnswers } from 'src/shared/project-output/QuestionsAnswers';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { i18n } from '@lingui/core';
import { innerJoin } from 'ramda';
import { selfReviewEvaluationDictionary } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestionsContext } from 'src/core/round-questions';

import { ProjectResultRatingGroup_comments$key } from './__generated__/ProjectResultRatingGroup_comments.graphql';

const fragment = graphql`
  fragment ProjectResultRatingGroup_comments on ProjectCommentNode @relay(plural: true) {
    id
    rating
    answers {
      value
      questionId
    }
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
  const { peerReviewProjectQuestions } = useRoundQuestionsContext();

  const peerAnswers = (answers: Answers) =>
    innerJoin((a, b) => a.questionId === b.id, answers, peerReviewProjectQuestions);

  const filteredByRating = rating
    ? comments.filter((comment) => comment.rating === rating)
    : comments.filter((comment) => comment.rating === rating && peerAnswers(comment.answers).every((c) => c.value));
  const filteredComments = filteredByRating.filter((comment) => peerAnswers(comment.answers).every((c) => c.value));

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
          <ReviewItemInfo anonymous type="peer">
            <QuestionsAnswers whichQuestions="peerReviewProjectQuestions" answers={review.answers}>
              <Box my={2}>
                <QuestionOutput />
                <AnswerOutput />
              </Box>
            </QuestionsAnswers>
          </ReviewItemInfo>
        </Box>
      ))}
    </Box>
  );
});
