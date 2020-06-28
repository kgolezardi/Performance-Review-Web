import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Theme, Typography, lighten, makeStyles, useTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { ProjectResultExpansionPanel_projectReview$key } from './__generated__/ProjectResultExpansionPanel_projectReview.graphql';
import { ProjectResultRatingGroup } from './ProjectResultRatingGroup';

const fragment = graphql`
  fragment ProjectResultExpansionPanel_projectReview on ProjectReviewNode {
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
      ...ProjectResultRatingGroup_comments
    }
  }
`;

interface OwnProps {
  projectReview: ProjectResultExpansionPanel_projectReview$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ProjectResultExpansionPanel(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);

  const theme = useTheme();
  const quoteBoxBgcolor = lighten(theme.palette.primary.main, 0.85);
  const projectName = projectReview.project.name;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h3">{projectName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._('Your comments about your performance compared to initial expectation')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <QuoteBox bgcolor={quoteBoxBgcolor}>
              <ProjectOutput review={projectReview} />
            </QuoteBox>
          </Grid>
          <Grid item xs={12}>
            <Box marginTop={2}>
              <Typography variant="button" className={classes.detailTypography}>
                {i18n._('Other people comments about your performance compared to initial expectation')}
              </Typography>
            </Box>
            <ProjectResultRatingGroup rating="SUPERB" comments={projectReview.comments} />
            <ProjectResultRatingGroup rating="EXCEEDS_EXPECTATIONS" comments={projectReview.comments} />
            <ProjectResultRatingGroup rating="MEETS_EXPECTATIONS" comments={projectReview.comments} />
            <ProjectResultRatingGroup rating="NEEDS_IMPROVEMENT" comments={projectReview.comments} />
            <ProjectResultRatingGroup rating={null} comments={projectReview.comments} />
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

const useStyles = makeStyles(styles, { name: 'ProjectResultExpansionPanel' });
type StyleProps = Styles<typeof styles>;
