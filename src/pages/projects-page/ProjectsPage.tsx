import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import graphql from 'babel-plugin-relay/macro';
import { importMDX } from 'mdx.macro';
import { reverse } from 'ramda';
import React, { Fragment, useCallback, useContext, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { SectionGuide } from 'src/shared/section-guide';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { AddProjectForm, AddProjectFormData } from './AddProjectForm';
import { useCreateProjectReview } from './createProjectReview.mutaion';
import { useDeleteProjectReview } from './deleteProjectReview.mutation';
import { useEditProjectReview } from './editProjectReview.mutation';
import { ProjectExpansionPanel } from './ProjectExpansionPanel';
import { ProjectFormData } from './ProjectForm';
import { DeleteProjectReviewMutationInput } from './__generated__/deleteProjectReviewMutation.graphql';
import { ProjectsPageQuery } from './__generated__/ProjectsPageQuery.graphql';

const DescriptionContent = importMDX.sync('./DescriptionContent.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

const query = graphql`
  query ProjectsPageQuery {
    viewer {
      activeRound {
        participants {
          ...ReviewersInput_Reviewers
        }
      }
      projectReviews {
        id
        ...ProjectExpansionPanel_projectReview
      }
    }
  }
`;

export default function ProjectsPage(props: Props) {
  const { enqueueSnackbar } = useBiDiSnackbar();
  const createProjectReview = useCreateProjectReview();
  const editProjectReview = useEditProjectReview();
  const deleteProjectReview = useDeleteProjectReview();
  const components = useContext(MDXContext);

  const saveProject = useCallback(
    (input: ProjectFormData) => {
      return editProjectReview({ input })
        .then((res) => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch((error) => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [editProjectReview, enqueueSnackbar],
  );

  const addProjectReview = useCallback(
    ({ projectName }: AddProjectFormData) => {
      if (projectName !== null) {
        const input = { projectName };
        return createProjectReview({ input }).then((res) => {
          if (!res.createProjectReview.projectReview) {
            enqueueSnackbar(`${i18n._('Something went wrong.')} ${i18n._('Project review name is duplicated.')}`, {
              variant: 'error',
            });
          }
        });
      }
    },
    [createProjectReview, enqueueSnackbar],
  );

  const deleteProject = useCallback(
    (input: DeleteProjectReviewMutationInput) => {
      return deleteProjectReview({ input });
    },
    [deleteProjectReview],
  );

  const data = useLazyLoadQuery<ProjectsPageQuery>(query, {});

  const [initialProjectIds] = useState(
    () => new Set(data.viewer.projectReviews.map((projectReview) => projectReview.id)),
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
            <AddProjectForm onSubmit={addProjectReview} />
          </Grid>
        </Grid>
      </Box>
      <Box paddingY={2}>
        {projectReviews.map((projectReview) => {
          return (
            <ProjectExpansionPanel
              key={projectReview.id}
              projectReview={projectReview}
              initialProjectIds={initialProjectIds}
              saveProject={saveProject}
              deleteProject={deleteProject}
              users={data.viewer.activeRound?.participants ?? []}
            />
          );
        })}
      </Box>
    </Fragment>
  );
}
