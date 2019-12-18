import { i18n } from '@lingui/core';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { ProjectForm, ProjectFormData } from 'src/pages/projects-page/ProjectForm';
import { ProjectsPageQuery } from 'src/pages/projects-page/__generated__/ProjectsPageQuery.graphql';
import { FCProps } from 'src/shared/types/FCProps';
import { AddProjectForm, AddProjectFormData } from './AddProjectForm';
import { useSaveProjectReview } from './saveProjectReview.mutation';
import { i18n } from '@lingui/core';
import { useSnackbar } from 'notistack';

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
        ...ProjectForm_projectReview
      }
    }
  }
`;

export default function ProjectsPage(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const saveProjectReview = useSaveProjectReview();

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

  const data = useLazyLoadQuery<ProjectsPageQuery>(query, {});

  const [initialProjectIds] = useState(
    () => new Set(data.viewer.projectReviews.map(projectReview => projectReview.project.id)),
  );

  return (
    <Container maxWidth="sm">
      <Box marginY={2}>
        <Card>
          <CardHeader title={i18n._('Add project')} />
          <CardContent>
            <AddProjectForm
              projectReviews={data.viewer.projectReviews}
              projects={data.viewer.projects}
              onSubmit={addProjectReview}
            />
          </CardContent>
        </Card>
      </Box>
      {data.viewer.projectReviews.map(projectReview => {
        return (
          <ExpansionPanel key={projectReview.id} defaultExpanded={!initialProjectIds.has(projectReview.project.id)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{projectReview.project.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ProjectForm onSubmit={saveProject} projectReview={projectReview} users={data.viewer.users} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Container>
  );
}
