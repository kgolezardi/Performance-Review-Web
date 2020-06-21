import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid, Theme, Typography, makeStyles } from '@material-ui/core';
import { ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { ProjectResultRationGroup } from './ProjectResultRationGroup';
import { ProjectsResult_projectReview$key } from './__generated__/ProjectsResult_projectReview.graphql';

interface OwnProps {
  projectReview: ProjectsResult_projectReview$key;
}

type Props = FCProps<OwnProps> & StyleProps;

const fragment = graphql`
  fragment ProjectsResult_projectReview on ProjectReviewNode {
    id
    reviewee {
      id
      firstName
      ...getUserLabel_user
    }
    project {
      name
    }
    ...ProjectOutput_review
    comments {
      ...ProjectResultRationGroup_comments
    }
  }
`;

export function ProjectsResult(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);

  const projectName = projectReview.project.name;
  const name = getUserLabel(projectReview.reviewee);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h5">{projectName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("{name}'s comment about his/her performance compared to initial expectation", { name })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <QuoteBox>
              <ProjectOutput review={projectReview} />
            </QuoteBox>
          </Grid>
          <Grid item xs={12}>
            <ProjectResultRationGroup rating="SUPERB" comments={projectReview.comments} />
            <ProjectResultRationGroup rating="EXCEEDS_EXPECTATIONS" comments={projectReview.comments} />
            <ProjectResultRationGroup rating="MEETS_EXPECTATIONS" comments={projectReview.comments} />
            <ProjectResultRationGroup rating="NEEDS_IMPROVEMENT" comments={projectReview.comments} />
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
});

const useStyles = makeStyles(styles, { name: 'ProjectResult' });
type StyleProps = Styles<typeof styles>;
