import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Answers } from 'src/core/domain';
import { Box, Typography } from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { ExcludeUnknown } from 'src/shared/enum-utils/types';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { QuestionOutput } from 'src/shared/project-output';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { getQuestionsAnswersPair } from 'src/shared/utils/questionsAnswersPair';
import { i18n } from '@lingui/core';
import { innerJoin } from 'ramda';
import { selfReviewEvaluationDictionary } from 'src/global-types';
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
  const { peerReviewProjectQuestions } = useRoundQuestions();

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
            {getQuestionsAnswersPair(peerReviewProjectQuestions, review.answers).map(([question, answer], index) => (
              <Box key={index} my={2}>
                <QuestionOutput questionLabel={question} />
                <MultilineOutput value={answer} />
              </Box>
            ))}
          </ReviewItemInfo>
        </Box>
      ))}
    </Box>
  );
});
