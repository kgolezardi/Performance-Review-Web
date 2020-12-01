import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ActionBar } from 'src/shared/action-bar';
import { Box, Grid } from '@material-ui/core';
import {
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  LimitedTextAreaInput,
  SubmitButton,
} from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD, LIMITED_TEXT_AREA_MAX_CHARS } from 'src/shared/constants';
import { Rating } from 'src/shared/rating';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { Evaluation } from '../../__generated__/savePersonReviewMutation.graphql';
import { PeerReviewProjectsForm_projectComment$key } from './__generated__/PeerReviewProjectsForm_projectComment.graphql';

const fragment = graphql`
  fragment PeerReviewProjectsForm_projectComment on ProjectCommentNode {
    id
    text
    rating
  }
`;

export interface PeerReviewProjectsFormValue {
  text: string;
  rating: Evaluation | null;
}

interface OwnProps {
  onSubmit: (data: PeerReviewProjectsFormValue) => void;
  projectComment: PeerReviewProjectsForm_projectComment$key;
}

type Props = FCProps<OwnProps>;

export function PeerReviewProjectsForm(props: Props) {
  const { onSubmit } = props;

  const projectComment = useFragment(fragment, props.projectComment);
  const initialValue: PeerReviewProjectsFormValue = {
    text: projectComment.text ?? '',
    rating: projectComment.rating,
  };

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
          <Grid item xs={12}>
            <DictInputItem field="text">
              <LimitedTextAreaInput
                label={i18n._('Feedback')}
                variant="outlined"
                maxChars={LIMITED_TEXT_AREA_MAX_CHARS}
                counterDisplayThreshold={LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD}
                fullWidth
              />
              <FragmentPrompt value={initialValue.text} />
            </DictInputItem>
          </Grid>
        </DictInput>
        <StickyBottomPaper noSticky>
          <ActionBar>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Save')}
            </SubmitButton>
          </ActionBar>
        </StickyBottomPaper>
      </Grid>
    </Forminator>
  );
}
