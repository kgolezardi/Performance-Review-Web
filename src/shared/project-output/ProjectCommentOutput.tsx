import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Typography } from '@material-ui/core';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { MultilineOutput } from '../multiline-output';
import { ProjectCommentOutput_comment$key } from './__generated__/ProjectCommentOutput_comment.graphql';
import { QuestionOutput } from './QuestionOutput';
import { getQuestionsAnswersPair } from '../utils/questionsAnswersPair';

const fragment = graphql`
  fragment ProjectCommentOutput_comment on ProjectCommentNode {
    rating
    answers {
      value
      questionId
    }
  }
`;

interface OwnProps {
  comment: ProjectCommentOutput_comment$key;
}

type Props = FCProps<OwnProps>;

export function ProjectCommentOutput(props: Props) {
  const comment = useFragment(fragment, props.comment);
  const { peerReviewProjectQuestions } = useRoundQuestions();

  const questionsAnswers = getQuestionsAnswersPair(peerReviewProjectQuestions, comment.answers);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Evaluation')}:
        </Typography>
        <Box width={240}>
          <EvaluationOutput value={comment.rating as Evaluation} type="peer" />
        </Box>
      </Grid>
      {questionsAnswers.pairs.map(([question, answer], index) => (
        <Grid key={index} item xs={12}>
          <QuestionOutput questionLabel={question} />
          <MultilineOutput value={answer} />
        </Grid>
      ))}
    </Grid>
  );
}
