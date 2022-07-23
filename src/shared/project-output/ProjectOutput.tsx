import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid, Typography } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { AnswerOutput } from './AnswerOutput';
import { ProjectOutput_review$key } from './__generated__/ProjectOutput_review.graphql';
import { QuestionOutput } from './QuestionOutput';

const fragment = graphql`
  fragment ProjectOutput_review on ProjectReviewNode {
    rating
    projectName
    answers {
      questionId
      value
    }
  }
`;

interface OwnProps {
  review: ProjectOutput_review$key;
  showProjectName?: boolean;
  hideEvaluation?: boolean;
}

type Props = FCProps<OwnProps>;

export function ProjectOutput(props: Props) {
  const { hideEvaluation = false, showProjectName = false } = props;
  const review = useFragment(fragment, props.review);
  const { selfReviewProjectQuestions } = useRoundQuestions();

  return (
    <Grid container spacing={2}>
      {showProjectName && (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {review.projectName}
          </Typography>
        </Grid>
      )}
      {!hideEvaluation && (
        <Grid item xs={12}>
          <Typography color="textSecondary" gutterBottom>
            {i18n._('Evaluation')}
          </Typography>
          <EvaluationOutput value={review.rating as Evaluation} type="self" />
        </Grid>
      )}
      {selfReviewProjectQuestions.map((question) => (
        <Grid item xs={12}>
          <QuestionOutput questionLabel={question.label} />
          <AnswerOutput answers={review.answers} questionId={question.id} questionType={question.questionType} />
        </Grid>
      ))}
    </Grid>
  );
}
