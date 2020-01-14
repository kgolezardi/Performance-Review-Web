import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import graphql from 'babel-plugin-relay/macro';
import { importMDX } from 'mdx.macro';
import { reverse } from 'ramda';
import React, { Fragment, useCallback, useContext, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { DeleteProjectReviewMutationInput } from 'src/pages/projects-page/__generated__/deleteProjectReviewMutation.graphql';
import { ProjectsPageQuery } from 'src/pages/projects-page/__generated__/ProjectsPageQuery.graphql';
import { useDeleteProjectReview } from 'src/pages/projects-page/deleteProjectReview.mutation';
import { ProjectFormData } from 'src/pages/projects-page/ProjectForm';
import { PromptProvider } from 'src/shared/prompt';
import { SectionGuide } from 'src/shared/section-guide';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { AddProjectForm, AddProjectFormData } from './AddProjectForm';
import { ProjectExpansionPanel } from './ProjectExpansionPanel';
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
    (input: AddProjectFormData) => {
      return saveProjectReview({ input });
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
        <Grid container spacing={2}>
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
      <PromptProvider message={i18n._('Changes you made may not be saved.')}>
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
      </PromptProvider>
    </Fragment>
  );
}
