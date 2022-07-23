import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ActionBar } from 'src/shared/action-bar';
import { Box, Grid } from '@material-ui/core';
import {
  DictInput,
  DictInputItem,
  DynamicFields,
  Forminator,
  FragmentPrompt,
  Question,
  QuestionPrompt,
  SubmitButton,
} from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { Rating } from 'src/shared/rating';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { i18n } from '@lingui/core';
import { transformAnswersToFormData } from 'src/shared/utils/transformAnswers';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import {
  Evaluation,
  PeerReviewProjectsForm_projectComment$key,
} from './__generated__/PeerReviewProjectsForm_projectComment.graphql';

const fragment = graphql`
  fragment PeerReviewProjectsForm_projectComment on ProjectCommentNode {
    id
    rating
    answers {
      questionId
      value
    }
  }
`;

export interface PeerReviewProjectsFormValue {
  answers: Record<string, any>;
  rating: Evaluation | null;
}

interface OwnProps {
  onSubmit: (data: PeerReviewProjectsFormValue) => void;
  projectComment: PeerReviewProjectsForm_projectComment$key;
}

type Props = FCProps<OwnProps>;

export function PeerReviewProjectsForm(props: Props) {
  const { onSubmit } = props;

  const { peerReviewProjectQuestions } = useRoundQuestions();

  const projectComment = useFragment(fragment, props.projectComment);
  const initialValue: PeerReviewProjectsFormValue = {
    answers: transformAnswersToFormData(projectComment.answers, peerReviewProjectQuestions),
    rating: projectComment.rating,
  };

  const dirty = useFormDirty();

  return (
    <Forminator onSubmit={onSubmit} initialValue={initialValue}>
      <Grid container spacing={2}>
        <DictInput>
          <Grid item xs={12}>
            <DictInputItem field="rating">
              <Box width={240}>
                <Rating inputLabel={i18n._('Evaluation')} type="peer" />
              </Box>
              <FragmentPrompt value={initialValue.rating} />
            </DictInputItem>
          </Grid>
          <DynamicFields formData={initialValue} questions={peerReviewProjectQuestions} answersKey="answers">
            <Grid item xs={12}>
              <Question>
                <QuestionPrompt />
              </Question>
            </Grid>
          </DynamicFields>
        </DictInput>
        <StickyBottomPaper noSticky>
          <ActionBar>
            <SubmitButton variant="contained" color="primary" disabled={!dirty}>
              {i18n._('Save')}
            </SubmitButton>
          </ActionBar>
        </StickyBottomPaper>
      </Grid>
    </Forminator>
  );
}
