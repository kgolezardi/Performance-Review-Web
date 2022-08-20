import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { Grid, Typography } from '@material-ui/core';
import { i18n } from '@lingui/core';
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
    projectReview {
      reviewee {
        manager {
          avatarUrl
          ...getUserLabel_user
        }
      }
    }
  }
`;

interface OwnProps {
  review: ManagerProjectOutput_review$key;
  self?: boolean;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ManagerProjectOutput(props: Props) {
  const review = useFragment(fragment, props.review);
  const { managerReviewProjectQuestions } = useRoundQuestions();
  const questionsAnswers = getQuestionsAnswersPair(managerReviewProjectQuestions, review.answers);
  const manager = review.projectReview.reviewee.manager;

  if (!review || !manager) {
    return null;
  }

  return (
    <ReviewItemInfo name={getUserLabel(manager)} src={manager.avatarUrl ?? undefined} type="manager">
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
  );
}
