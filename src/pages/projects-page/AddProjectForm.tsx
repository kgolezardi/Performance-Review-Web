import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import { ProjectInput } from 'src/shared/project-input';
import { ProjectInputProps } from 'src/shared/project-input/types';
import { FCProps } from 'src/shared/types/FCProps';
import { AddProjectForm_projectReview$key } from './__generated__/AddProjectForm_projectReview.graphql';

export interface AddProjectFormData {
  projectId: string | null;
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{i18n._('Adding Projects')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{i18n._('Choose projects you have been working on in the past year.')}</Typography>
          </Grid>
          <Grid container item spacing={2} alignItems="center" xs={12}>
            <Grid item>
              <DictInputItem field="projectId">
                <Box width={240}>
                  <ProjectInput
                    label={i18n._('Select project')}
                    projects={props.projects}
                    excludes={selectedProjectIds}
                  />
                </Box>
              </DictInputItem>
            </Grid>
            <Grid item>
              <Box marginTop={0.375}>
                <SubmitButton variant="outlined" color="primary" startIcon={<AddIcon />}>
                  {i18n._('Add')}
                </SubmitButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DictInput>
    </Forminator>
  );
}
