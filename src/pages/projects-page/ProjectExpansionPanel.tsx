import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { ReviewersInputProps } from 'src/shared/reviewers-input/ReviewersInput';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
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

type Props = FCProps<OwnProps> & StyleProps;

export function ProjectExpansionPanel(props: Props) {
  const { initialProjectIds, saveProject, deleteProject, users } = props;
  const classes = useStyles(props);
  const projectReview = useFragment(fragment, props.projectReview);

  return (
    <ExpansionPanel
      defaultExpanded={!initialProjectIds.has(projectReview.project.id)}
      elevation={0}
      classes={{ root: classes.expansionPanelRoot, expanded: classes.expansionPanelExpanded }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{projectReview.project.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ProjectForm onSubmit={saveProject} onDelete={deleteProject} projectReview={projectReview} users={users} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const styles = (theme: Theme) => ({
  expansionPanelRoot: {
    '&:first-child:before': {
      display: 'none',
    },
    '&:not(:first-child):before': {
      display: 'block !important',
      opacity: '100% !important',
    },
    '&$expansionPanelExpanded': {
      margin: 0,
    },
  } as CSSProperties,
  expansionPanelExpanded: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ProjectExpansionPanel' });
type StyleProps = Styles<typeof styles>;

const fragment = graphql`
  fragment ProjectExpansionPanel_projectReview on ProjectReviewNode {
    project {
      id
      name
    }
    ...ProjectForm_projectReview
  }
`;
