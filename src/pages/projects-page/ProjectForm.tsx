import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import { equals, identity, prop, sortBy } from 'ramda';
import React, { useCallback, useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { DeleteProjectReviewMutationInput } from 'src/pages/projects-page/__generated__/deleteProjectReviewMutation.graphql';
import AccomplishmentsLimitedTextAreaInput from 'src/shared/accomplishments-limited-text-area-input/AccomplishmentsLimitedTextAreaInput';
import { ConfirmButton } from 'src/shared/confirm-button';
import { DangerButton } from 'src/shared/danger-button';
import {
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  SubmitButton,
} from 'src/shared/forminator';
import { Rating } from 'src/shared/rating';
import { ReviewersInput } from 'src/shared/reviewers-input';
import { ReviewersInputProps } from 'src/shared/reviewers-input/types';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectForm_projectReview$key } from './__generated__/ProjectForm_projectReview.graphql';
import { Evaluation } from './__generated__/saveProjectReviewMutation.graphql';

export interface ProjectFormData {
  projectId: string;
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
        project {
          id
          name
        }
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

  const initialValue: ProjectFormData = useMemo(() => {
    return {
      projectId: projectReview.project.id,
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

  return (
    <Forminator onSubmit={onSubmit} initialValue={initialValue}>
      <DictInput>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DictInputItem field="projectId">
              <ConstantInput />
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="rating">
              <Box width={240}>
                <Rating inputLabel={i18n._('Evaluation')} />
                <FragmentPrompt value={initialValue.rating || null} />
              </Box>
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="text">
              <AccomplishmentsLimitedTextAreaInput
                label={i18n._('Accomplishments')}
                maxChars={512}
                variant="outlined"
                fullWidth
              />
              <FragmentPrompt value={initialValue.text || ''} />
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="reviewersId">
              <ReviewersInput label={i18n._('Reviewers')} users={props.users} excludes={userIds} />
              <FragmentPrompt value={initialValue.reviewersId || []} equal={arrayEqual} />
            </DictInputItem>
          </Grid>
          <Grid item xs />
          <Grid item>
            <ConfirmButton
              buttonText={i18n._('Delete')}
              onConfirm={handleDelete}
              text={i18n._('Are you sure you want to delete this project review?')}
              ConfirmComponent={DangerButton}
              confirmProps={{ variant: 'contained' }}
            />
          </Grid>
          <Grid item>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Save')}
            </SubmitButton>
          </Grid>
        </Grid>
      </DictInput>
    </Forminator>
  );
}
