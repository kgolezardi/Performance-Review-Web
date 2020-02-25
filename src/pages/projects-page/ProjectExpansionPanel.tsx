import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { ReviewersInputProps } from 'src/shared/reviewers-input/ReviewersInput';
import { Typography } from '@material-ui/core';
import { useFragment } from 'react-relay/hooks';

import { DeleteProjectReviewMutationInput } from './__generated__/deleteProjectReviewMutation.graphql';
import { ProjectExpansionPanel_projectReview$key } from './__generated__/ProjectExpansionPanel_projectReview.graphql';
import { ProjectForm, ProjectFormData } from './ProjectForm';

interface OwnProps {
  projectReview: ProjectExpansionPanel_projectReview$key;
  initialProjectIds: Set<string>;
  saveProject: (data: ProjectFormData) => void;
  deleteProject: (input: DeleteProjectReviewMutationInput) => void;
  users: ReviewersInputProps['users'];
}

type Props = FCProps<OwnProps>;

export function ProjectExpansionPanel(props: Props) {
  const { initialProjectIds, saveProject, deleteProject, users } = props;
  const projectReview = useFragment(fragment, props.projectReview);

  return (
    <ExpansionPanel defaultExpanded={!initialProjectIds.has(projectReview.project.id)}>
      <ExpansionPanelSummary>
        <Typography variant="h6">{projectReview.project.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ProjectForm onSubmit={saveProject} onDelete={deleteProject} projectReview={projectReview} users={users} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const fragment = graphql`
  fragment ProjectExpansionPanel_projectReview on ProjectReviewNode {
    project {
      id
      name
    }
    ...ProjectForm_projectReview
  }
`;
