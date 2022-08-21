import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Theme, Typography, createStyles, lighten, makeStyles, useTheme } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { ManagerProjectOutput } from 'src/shared/project-output/ManagerProjectOutput';
import { ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Styles } from 'src/shared/types/Styles';
import { ThoseWhoDidNotComment } from 'src/shared/those-who-did-not-comment/ThoseWhoDidNotComment';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';
import { usePrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';

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
    projectName
    ...ProjectOutput_review
    comments {
      ...ProjectResultRatingGroup_comments
    }
    managerComment {
      ...ManagerProjectOutput_review
    }
    ...ThoseWhoDidNotComment_review
  }
`;

interface OwnProps {
  projectReview: ProjectResultExpansionPanel_projectReview$key;
  reviewersAreAnonymous: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ProjectResultExpansionPanel(props: Props) {
  const { reviewersAreAnonymous } = props;

  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);

  const printing = usePrintingContext();
  const theme = useTheme();
  const quoteBoxBgcolor = lighten(theme.palette.primary.main, 0.85);
  const projectName = projectReview.projectName;

  return (
    <ExpansionPanel defaultExpanded={printing}>
      <ExpansionPanelSummary>
        <Typography variant="h5">{projectName}</Typography>
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
            {projectReview.managerComment && (
              <QuoteBox bgcolor={theme.palette.success.light}>
                <ManagerProjectOutput review={projectReview.managerComment} />
              </QuoteBox>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box marginTop={2}>
              <Typography variant="button" className={classes.detailTypography}>
                {i18n._('Other people comments about your performance compared to initial expectation')}
              </Typography>
            </Box>
            <ProjectResultRatingGroup
              reviewersAreAnonymous={reviewersAreAnonymous}
              rating="SUPERB"
              comments={projectReview.comments}
            />
            <ProjectResultRatingGroup
              reviewersAreAnonymous={reviewersAreAnonymous}
              rating="EXCEEDS_EXPECTATIONS"
              comments={projectReview.comments}
            />
            <ProjectResultRatingGroup
              reviewersAreAnonymous={reviewersAreAnonymous}
              rating="MEETS_EXPECTATIONS"
              comments={projectReview.comments}
            />
            <ProjectResultRatingGroup
              reviewersAreAnonymous={reviewersAreAnonymous}
              rating="NEEDS_IMPROVEMENT"
              comments={projectReview.comments}
            />
            <ProjectResultRatingGroup
              reviewersAreAnonymous={reviewersAreAnonymous}
              rating={null}
              comments={projectReview.comments}
            />
          </Grid>
          <ThoseWhoDidNotComment review={projectReview} />
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    detailTypography: {
      color: theme.palette.grey[700],
    },
  });

const useStyles = makeStyles(styles, { name: 'ProjectResultExpansionPanel' });
type StyleProps = Styles<typeof styles>;
