import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import { prop } from 'ramda';
import React, { useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import {
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  LimitedTextAreaInput,
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
  projectReview: ProjectForm_projectReview$key;
  users: ReviewersInputProps['users'];
}

type Props = FCProps<OwnProps>;

export function ProjectForm(props: Props) {
  const { onSubmit } = props;
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
              </Box>
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="text">
              <LimitedTextAreaInput
                label={i18n._('Accomplishments')}
                maxChars={512}
                rows={4}
                variant="outlined"
                fullWidth
              />
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="reviewersId">
              <ReviewersInput label={i18n._('Reviewers')} users={props.users} excludes={userIds} />
            </DictInputItem>
          </Grid>
          <Grid item xs />
          <Grid item>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Submit')}
            </SubmitButton>
          </Grid>
        </Grid>
      </DictInput>
    </Forminator>
  );
}
