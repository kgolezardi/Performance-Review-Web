import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useMemo } from 'react';
import { ActionBar } from 'src/shared/action-bar';
import { Box, Grid, Typography } from '@material-ui/core';
import { ConfirmButton } from 'src/shared/confirm-button';
import {
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  LimitedTextAreaInput,
  SubmitButton,
} from 'src/shared/forminator';
import { DangerButton } from 'src/shared/danger-button';
import { FCProps } from 'src/shared/types/FCProps';
import { Guide } from 'src/shared/guide/Guide';
import { LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD, LIMITED_TEXT_AREA_MAX_CHARS } from 'src/shared/constants';
import { Rating } from 'src/shared/rating';
import { ReviewersInput } from 'src/shared/reviewers-input';
import { ReviewersInputProps } from 'src/shared/reviewers-input/types';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { equals, identity, prop, sortBy } from 'ramda';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';
import { useGuidesContext } from 'src/core/guides';

import { DeleteProjectReviewMutationInput } from './__generated__/deleteProjectReviewMutation.graphql';
import { Evaluation } from './__generated__/editProjectReviewMutation.graphql';
import { ProjectForm_projectReview$key } from './__generated__/ProjectForm_projectReview.graphql';

export interface ProjectFormData {
  projectReviewId: string;
  text?: string;
  rating?: Evaluation;
  reviewersId: string[];
}
interface OwnProps {
  onSubmit: (data: ProjectFormData) => void;
  onDelete: (input: DeleteProjectReviewMutationInput) => void;
  projectReview: ProjectForm_projectReview$key;
  users: ReviewersInputProps['users'];
}

type Props = FCProps<OwnProps>;

const arrayEqual = (v1: string[] | undefined, v2: string[] | undefined) => {
  return equals(sortBy(identity, v1 || []), sortBy(identity, v2 || []));
};

export function ProjectForm(props: Props) {
  const { onSubmit, onDelete } = props;
  const projectReview = useFragment(
    graphql`
      fragment ProjectForm_projectReview on ProjectReviewNode {
        projectName
        text
        id
        rating
        reviewers {
          id
        }
      }
    `,
    props.projectReview,
  );

  const { selfReviewProjectReviewHelpModalText } = useGuidesContext();

  const initialValue: ProjectFormData = useMemo(() => {
    return {
      projectReviewId: projectReview.id,
      text: projectReview.text || '',
      rating: projectReview.rating || undefined,
      reviewersId: projectReview.reviewers.map(prop('id')),
    };
  }, [projectReview]);

  const user = useAuthGuardUser();
  const userIds = useMemo(() => [user.id], [user]);

  const handleDelete = useCallback(() => {
    onDelete({ projectReviewId: projectReview.id });
  }, [onDelete, projectReview]);

  const dirty = useFormDirty();

  return (
    <Forminator onSubmit={onSubmit} initialValue={initialValue}>
      <Grid container spacing={2}>
        <DictInput>
          <DictInputItem field="projectReviewId">
            <ConstantInput />
          </DictInputItem>

          <Grid item xs={12}>
            <Typography>{i18n._('How effective were you in this project?')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="rating">
              <Box width={240}>
                <Rating inputLabel={i18n._('My evaluation')} type="self" />
                <FragmentPrompt value={initialValue.rating || null} />
              </Box>
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="text">
              <LimitedTextAreaInput
                label={i18n._('Accomplishments Description')}
                maxChars={LIMITED_TEXT_AREA_MAX_CHARS}
                counterDisplayThreshold={LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD}
                variant="outlined"
                fullWidth
                helperText={
                  <Box display="flex" alignItems="center">
                    {i18n._(
                      'Work results and achievements reflecting your contributions; For instance, your key-results',
                    )}
                    <Guide guideText={selfReviewProjectReviewHelpModalText} title={i18n._('Accomplishments')} />
                  </Box>
                }
              />
              <FragmentPrompt value={initialValue.text || ''} />
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="reviewersId">
              <ReviewersInput
                label={i18n._('Reviewers')}
                users={props.users}
                excludes={userIds}
                helperText={i18n._('**Coordinate reviewers with your manager (maximum 6 reviewers)')}
              />
              <FragmentPrompt value={initialValue.reviewersId || []} equal={arrayEqual} />
            </DictInputItem>
          </Grid>
        </DictInput>
        <StickyBottomPaper noSticky>
          <ActionBar>
            <ConfirmButton
              buttonText={i18n._('Delete')}
              onConfirm={handleDelete}
              text={i18n._('Are you sure you want to delete {projectName} review?', {
                projectName: projectReview.projectName,
              })}
              ConfirmComponent={DangerButton}
              confirmProps={{ variant: 'contained' }}
            />
            <SubmitButton variant="contained" color="primary" disabled={!dirty}>
              {i18n._('Save')}
            </SubmitButton>
          </ActionBar>
        </StickyBottomPaper>
      </Grid>
    </Forminator>
  );
}
