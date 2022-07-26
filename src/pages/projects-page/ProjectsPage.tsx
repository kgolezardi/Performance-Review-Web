import graphql from 'babel-plugin-relay/macro';
import React, { Fragment, useCallback, useContext, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { reverse } from 'ramda';
import { transformAnswersToInput } from 'src/shared/utils/transformAnswers';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { AddProjectForm, AddProjectFormData } from './AddProjectForm';
import { DeleteProjectReviewMutationInput } from './__generated__/deleteProjectReviewMutation.graphql';
import { ProjectExpansionPanel } from './ProjectExpansionPanel';
import { ProjectFormData } from './ProjectForm';
import { ProjectsPageQuery } from './__generated__/ProjectsPageQuery.graphql';
import { useCreateProjectReview } from './createProjectReview.mutaion';
import { useDeleteProjectReview } from './deleteProjectReview.mutation';
import { useEditProjectReview } from './editProjectReview.mutation';

const DescriptionContent = importMDX.sync('./DescriptionContent.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

const query = graphql`
  query ProjectsPageQuery {
    viewer {
      activeRound {
        maxProjectReviews
        maxReviewers
        participants {
          ...ReviewersInput_Reviewers
        }
        selfReviewProjectQuestions {
          id
          questionType
          order
          label
          helpText
          choices
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
  const data = useLazyLoadQuery<ProjectsPageQuery>(query, {});

  const { enqueueSnackbar } = useBiDiSnackbar();
  const createProjectReview = useCreateProjectReview();
  const editProjectReview = useEditProjectReview();
  const deleteProjectReview = useDeleteProjectReview();
  const components = useContext(MDXContext);
  const { selfReviewProjectQuestions } = useRoundQuestions();

  const projectReviews = reverse(data.viewer.projectReviews);
  const canAddNewProject = projectReviews.length < data.viewer.activeRound.maxProjectReviews;

  const saveProject = useCallback(
    (input: ProjectFormData) => {
      return editProjectReview({
        input: { ...input, answers: transformAnswersToInput(input.answers, selfReviewProjectQuestions) },
      })
        .then((res) => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch((error) => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [editProjectReview, enqueueSnackbar, selfReviewProjectQuestions],
  );

  const addProjectReview = useCallback(
    ({ projectName }: AddProjectFormData) => {
      if (canAddNewProject && projectName !== null && !!projectName.length) {
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
    [canAddNewProject, createProjectReview, enqueueSnackbar],
  );

  const deleteProject = useCallback(
    (input: DeleteProjectReviewMutationInput) => {
      return deleteProjectReview({ input });
    },
    [deleteProjectReview],
  );

  const [initialProjectIds] = useState(
    () => new Set(data.viewer.projectReviews.map((projectReview) => projectReview.id)),
  );

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
            <AddProjectForm onSubmit={addProjectReview} canAddNewProject={canAddNewProject} />
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
              maximumProjectReviewers={data.viewer.activeRound.maxReviewers}
            />
          );
        })}
      </Box>
    </Fragment>
  );
}
