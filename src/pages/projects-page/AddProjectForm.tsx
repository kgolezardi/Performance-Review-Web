import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import { ProjectInput } from 'src/shared/project-input';
import { ProjectInputProps } from 'src/shared/project-input/types';
import { FCProps } from 'src/shared/types/FCProps';
import { AddProjectForm_projectReview$key } from './__generated__/AddProjectForm_projectReview.graphql';

export interface AddProjectFormData {
  projectId: string;
}
interface OwnProps {
  onSubmit: (data: AddProjectFormData) => void;
  projectReviews: AddProjectForm_projectReview$key;
  projects: ProjectInputProps['projects'];
}

type Props = FCProps<OwnProps>;

export function AddProjectForm(props: Props) {
  const { onSubmit } = props;
  const projectReviews = useFragment(
    graphql`
      fragment AddProjectForm_projectReview on ProjectReviewNode @relay(plural: true) {
        project {
          id
        }
      }
    `,
    props.projectReviews,
  );

  const selectedProjectIds = useMemo(() => projectReviews.map(projectReview => projectReview.project.id), [
    projectReviews,
  ]);

  return (
    <Forminator onSubmit={onSubmit}>
      <DictInput>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <DictInputItem field="projectId">
              <ProjectInput label={i18n._('Project')} projects={props.projects} excludes={selectedProjectIds} />
            </DictInputItem>
          </Grid>
          <Grid item>
            <Box marginTop={0.375}>
              <SubmitButton variant="contained" color="primary">
                {i18n._('Add')}
              </SubmitButton>
            </Box>
          </Grid>
        </Grid>
      </DictInput>
    </Forminator>
  );
}
