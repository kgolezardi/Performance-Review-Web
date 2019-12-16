import {
  Box,
  Card,
  CardContent,
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
import { ProjectsPageQuery } from 'src/pages/projects-page/__generated__/ProjectsPageQuery.graphql';
import { ProjectForm, ProjectFormData } from 'src/pages/projects-page/ProjectForm';
import { FCProps } from 'src/shared/types/FCProps';
import { AddProjectForm, AddProjectFormData } from './AddProjectForm';
import { useSaveProjectReview } from './saveProjectReview.mutation';

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
  const saveProjectReview = useSaveProjectReview();

  const saveProject = useCallback(
    (input: ProjectFormData) => {
      return saveProjectReview({ input });
    },
    [saveProjectReview],
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
              <Typography>{projectReview.project.name}</Typography>
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
