import graphql from 'babel-plugin-relay/macro';
import React, { Fragment, useCallback, useContext, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { reverse } from 'ramda';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { AddProjectForm, AddProjectFormData } from './AddProjectForm';
import { DeleteProjectReviewMutationInput } from './__generated__/deleteProjectReviewMutation.graphql';
import { ProjectExpansionPanel } from './ProjectExpansionPanel';
import { ProjectFormData } from './ProjectForm';
import { ProjectsPageQuery } from './__generated__/ProjectsPageQuery.graphql';
import { useDeleteProjectReview } from './deleteProjectReview.mutation';
import { useSaveProjectReview } from './saveProjectReview.mutation';

const DescriptionContent = importMDX.sync('./DescriptionContent.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

const query = graphql`
  query ProjectsPageQuery {
    viewer {
      projects {
        ...ProjectInput_projects
      }
      users {
        ...ReviewersInput_Reviewers
      }
      projectReviews {
        id
        project {
          id
          name
        }
        ...AddProjectForm_projectReview
        ...ProjectExpansionPanel_projectReview
      }
    }
  }
`;

export default function ProjectsPage(props: Props) {
  const { enqueueSnackbar } = useBiDiSnackbar();
  const saveProjectReview = useSaveProjectReview();
  const deleteProjectReview = useDeleteProjectReview();
  const components = useContext(MDXContext);

  const saveProject = useCallback(
    (input: ProjectFormData) => {
      return saveProjectReview({ input })
        .then(res => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch(error => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [saveProjectReview, enqueueSnackbar],
  );

  const addProjectReview = useCallback(
    ({ projectId }: AddProjectFormData) => {
      if (projectId !== null) {
        const input = { projectId };
        return saveProjectReview({ input });
      }
    },
    [saveProjectReview],
  );

  const deleteProject = useCallback(
    (input: DeleteProjectReviewMutationInput) => {
      return deleteProjectReview({ input });
    },
    [deleteProjectReview],
  );

  const data = useLazyLoadQuery<ProjectsPageQuery>(query, {});

  const [initialProjectIds] = useState(
    () => new Set(data.viewer.projectReviews.map(projectReview => projectReview.project.id)),
  );

  const projectReviews = reverse(data.viewer.projectReviews);

  return (
    <Fragment>
      <Box padding={4}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SectionGuide>
              <DescriptionContent components={components} />
            </SectionGuide>
          </Grid>
          <Grid item xs={12}>
            <AddProjectForm
              projectReviews={data.viewer.projectReviews}
              projects={data.viewer.projects}
              onSubmit={addProjectReview}
            />
          </Grid>
        </Grid>
      </Box>
      <Box paddingY={2}>
        {projectReviews.map(projectReview => {
          return (
            <ProjectExpansionPanel
              key={projectReview.id}
              projectReview={projectReview}
              initialProjectIds={initialProjectIds}
              saveProject={saveProject}
              deleteProject={deleteProject}
              users={data.viewer.users}
            />
          );
        })}
      </Box>
    </Fragment>
  );
}
