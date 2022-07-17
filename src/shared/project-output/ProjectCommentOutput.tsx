import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Typography } from '@material-ui/core';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { AnswerOutput } from './AnswerOutput';
import { ProjectCommentOutput_comment$key } from './__generated__/ProjectCommentOutput_comment.graphql';
import { QuestionOutput } from './QuestionOutput';
import { QuestionsAnswers } from './QuestionsAnswers';

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
      <QuestionsAnswers whichQuestions="peerReviewProjectQuestions" answers={comment.answers}>
        <Grid item xs={12}>
          <QuestionOutput />
          <AnswerOutput />
        </Grid>
      </QuestionsAnswers>
    </Grid>
  );
}
