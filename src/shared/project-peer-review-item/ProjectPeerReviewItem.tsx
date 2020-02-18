import { i18n } from '@lingui/core';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { useFragment } from 'react-relay/hooks';
import { ProjectPeerReviewForm } from 'src/shared/project-peer-review-form';
import { ProjectCommentFormData } from 'src/shared/project-peer-review-form/types';
import { ProjectPeerReviewOutput } from 'src/shared/project-peer-review-output';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { useSaveProjectComment } from './saveProjectComment.mutation';
import { ProjectPeerReviewItem_projectReview$key } from './__generated__/ProjectPeerReviewItem_projectReview.graphql';
interface OwnProps {
  projectReview: ProjectPeerReviewItem_projectReview$key;
}

type Props = FCProps<OwnProps> & StyleProps;

const fragment = graphql`
  fragment ProjectPeerReviewItem_projectReview on ProjectReviewNode {
    id
    reviewee {
      firstName
    }
    project {
      name
    }
    ...ProjectPeerReviewOutput_projectReview
    comment {
      ...ProjectPeerReviewForm_projectComment
    }
  }
`;

export function ProjectPeerReviewItem(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);
  const saveProjectComment = useSaveProjectComment();
  const projectReviewId = projectReview.id;
  const onSubmit = useCallback(
    (input: ProjectCommentFormData | null) => {
      saveProjectComment({ input: { ...input, projectReviewId }, projectReviewId });
    },
    [saveProjectComment, projectReviewId],
  );

  const name = projectReview.project.name;

  return (
    <ExpansionPanel
      defaultExpanded={true}
      elevation={0}
      classes={{ root: classes.expansionPanelRoot, expanded: classes.expansionPanelExpanded }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("{name}'s comment about his/her performance compared to initial expectation", { name })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProjectPeerReviewOutput projectReview={projectReview} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("Your comment about {name}'s performance in this project", { name })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProjectPeerReviewForm onSubmit={onSubmit} projectComment={projectReview.comment} />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const styles = (theme: Theme) => ({
  detailTypography: {
    color: theme.palette.grey[700],
  } as CSSProperties,
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

const useStyles = makeStyles(styles, { name: 'ProjectPeerReviewItem' });
type StyleProps = Styles<typeof styles>;
