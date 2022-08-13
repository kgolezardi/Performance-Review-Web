import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Typography } from '@material-ui/core';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { ManagerProjectOutput_review$key } from './__generated__/ManagerProjectOutput_review.graphql';
import { MultilineOutput } from '../multiline-output';
import { QuestionOutput } from './QuestionOutput';
import { ReviewItemInfo } from '../review-item-info';
import { getQuestionsAnswersPair } from '../utils/questionsAnswersPair';
import { getUserLabel } from '../utils/getUserLabel';

const fragment = graphql`
  fragment ManagerProjectOutput_review on ManagerProjectCommentNode {
    rating
    answers {
      questionId
      value
    }
  }
`;

interface OwnProps {
  review: ManagerProjectOutput_review$key;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ManagerProjectOutput(props: Props) {
  const review = useFragment(fragment, props.review);
  const { managerReviewProjectQuestions } = useRoundQuestions();
  const me = useAuthGuardUser();
  const questionsAnswers = getQuestionsAnswersPair(managerReviewProjectQuestions, review.answers);

  return (
    <Box mt={3}>
      <Typography variant="h5">{i18n._('Your manger comment')}</Typography>
      <Box bgcolor="success.light" borderRadius={3} mt={2} p={2}>
        <ReviewItemInfo name={getUserLabel(me)} src={me.avatarUrl ?? undefined} type="peer">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="textSecondary" gutterBottom>
                {i18n._('Evaluation')}
              </Typography>
              <EvaluationOutput value={review.rating as Evaluation} type="peer" />
            </Grid>
            {questionsAnswers.pairs.map(([question, answer], index) => (
              <Grid key={index} item xs={12}>
                <QuestionOutput questionLabel={question} />
                <MultilineOutput value={answer} />
              </Grid>
            ))}
          </Grid>
        </ReviewItemInfo>
      </Box>
    </Box>
  );
}
