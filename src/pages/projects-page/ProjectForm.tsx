import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useMemo } from 'react';
import { ActionBar } from 'src/shared/action-bar';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  CheckboxInput,
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  SubmitButton,
} from 'src/shared/forminator';
import { ConfirmButton } from 'src/shared/confirm-button';
import { DangerButton } from 'src/shared/danger-button';
import { FCProps } from 'src/shared/types/FCProps';
import { Question } from 'src/shared/DynamicFields';
import { Rating } from 'src/shared/rating';
import { ReviewersInput } from 'src/shared/reviewers-input';
import { ReviewersInputProps } from 'src/shared/reviewers-input/types';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { equals, identity, prop, sortBy } from 'ramda';
import { i18n } from '@lingui/core';
import { transformAnswersToFormData } from 'src/shared/utils/transformAnswers';
import { useAuthGuardUser } from 'src/core/auth';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { DeleteProjectReviewMutationInput } from './__generated__/deleteProjectReviewMutation.graphql';
import { Evaluation } from './__generated__/editProjectReviewMutation.graphql';
import { ProjectForm_projectReview$key } from './__generated__/ProjectForm_projectReview.graphql';

const maximumReviewers = 5;

export interface ProjectFormData {
  projectReviewId: string;
  answers: Record<string, any>;
  rating?: Evaluation;
  reviewersId: string[];
  consultedWithManager: boolean;
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
        id
        rating
        reviewers {
          id
        }
        consultedWithManager
        answers {
          questionId
          value
        }
      }
    `,
    props.projectReview,
  );

  const { selfReviewProjectQuestions } = useRoundQuestions();

  const initialValue: ProjectFormData = useMemo(() => {
    return {
      projectReviewId: projectReview.id,
      answers: transformAnswersToFormData(projectReview.answers ?? [], selfReviewProjectQuestions),
      rating: projectReview.rating || undefined,
      reviewersId: projectReview.reviewers.map(prop('id')),
      consultedWithManager: projectReview.consultedWithManager ?? false,
    };
  }, [projectReview, selfReviewProjectQuestions]);

  const user = useAuthGuardUser();

  const userIds = useMemo(() => {
    if (user.manager) {
      return [user.id, user.manager.id];
    }
    return [user.id];
  }, [user]);

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
          {selfReviewProjectQuestions.map((question) => (
            <Grid key={question.id} item xs={12}>
              <Question question={question} formData={initialValue} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <DictInputItem field="reviewersId">
              <ReviewersInput
                label={i18n._('Reviewers (maximum {num})', { num: maximumReviewers })}
                users={props.users}
                excludes={userIds}
                helperText={i18n._('**Coordinate reviewers with your manager (maximum {num} reviewers)', {
                  num: maximumReviewers,
                })}
                maximumReviewers={maximumReviewers}
              />
              <FragmentPrompt value={initialValue.reviewersId || []} equal={arrayEqual} />
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="consultedWithManager">
              <CheckboxInput
                color="primary"
                label={i18n._('I consulted with my manager')}
                initialValue={initialValue.consultedWithManager}
              />
              <FragmentPrompt value={initialValue.consultedWithManager} />
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
