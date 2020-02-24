import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useFragment } from 'react-relay/hooks';
import {
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  LimitedTextAreaInput,
  SubmitButton,
} from 'src/shared/forminator';
import { Rating } from 'src/shared/rating';
import { StickyActionBar } from 'src/shared/sticky-action-bar';
import { FCProps } from 'src/shared/types/FCProps';
import { Evaluation } from '../../__generated__/savePersonReviewMutation.graphql';
import { PeerReviewProjectsForm_projectComment$key } from './__generated__/PeerReviewProjectsForm_projectComment.graphql';

export interface ProjectCommentFormData {
  id: string;
  text: string;
  rating: Evaluation | null;
}

interface OwnProps {
  onSubmit: (data: ProjectCommentFormData) => void;
  projectComment: PeerReviewProjectsForm_projectComment$key;
}

type Props = FCProps<OwnProps>;

const fragment = graphql`
  fragment PeerReviewProjectsForm_projectComment on ProjectCommentNode {
    id
    text
    rating
  }
`;

export function PeerReviewProjectsForm(props: Props) {
  const { onSubmit } = props;
  const projectCommentObj = useFragment(fragment, props.projectComment);
  const projectComment = {
    text: projectCommentObj.text || '',
    rating: projectCommentObj.rating || null,
    id: projectCommentObj.id || '',
  };

  const [ref, inView] = useInView();

  return (
    <Forminator onSubmit={onSubmit} initialValue={projectComment}>
      <Grid container spacing={2} ref={ref}>
        <DictInput>
          <Grid item xs={12}>
            <DictInputItem field="rating">
              <Box width={240} paddingBottom={4}>
                <Rating inputLabel={i18n._('Evaluation')} type="peer" />
              </Box>
              <FragmentPrompt value={projectComment?.rating || null} />
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="text">
              <LimitedTextAreaInput label={i18n._('Observation')} variant="outlined" maxChars={512} fullWidth />
              <FragmentPrompt value={projectComment?.text || ''} />
            </DictInputItem>
          </Grid>
        </DictInput>
        <StickyActionBar noSticky={!inView}>
          <SubmitButton variant="contained" color="primary">
            {i18n._('Save')}
          </SubmitButton>
        </StickyActionBar>
      </Grid>
    </Forminator>
  );
}
