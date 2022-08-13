import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Theme, Typography, createStyles, lighten, makeStyles, useTheme } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { FormChangeDetector } from 'src/shared/form-change-detector';
import { InView } from 'src/shared/in-view';
import { ManagerProjectOutput } from 'src/shared/project-output/ManagerProjectOutput';
import { ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Styles } from 'src/shared/types/Styles';
import { ThoseWhoDidNotComment } from 'src/shared/those-who-did-not-comment/ThoseWhoDidNotComment';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';
import { usePrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';

import { ManageReviewFormData } from './ManagerReviewAchievementsValue';
import { ManagerReviewAchievementsExpansionPanel_projectReview$key } from './__generated__/ManagerReviewAchievementsExpansionPanel_projectReview.graphql';
import { ManagerReviewAchievementsRatingGroup } from './ManagerReviewAchievementsRatingGroup';
import { ManagerReviewEvaluationExpansionPanelSummary } from '../ManagerReviewExpansionPanelSummary';
import { ManagerReviewForm } from './ManagerReviewForm';

const fragment = graphql`
  fragment ManagerReviewAchievementsExpansionPanel_projectReview on ProjectReviewNode {
    id
    reviewee {
      id
      firstName
      ...getUserLabel_user
    }
    projectName
    comments {
      ...ManagerReviewAchievementsRatingGroup_comments
      ...ThoseWhoDidNotComment_comments
    }
    managerComment {
      id
      rating
      ...ManagerReviewForm_data
      ...ManagerProjectOutput_review
    }
    ...ProjectOutput_review
  }
`;

interface OwnProps {
  projectReview: ManagerReviewAchievementsExpansionPanel_projectReview$key;
  saveManagerProjectReview: (formData: ManageReviewFormData) => void;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewAchievementsExpansionPanel(props: Props) {
  const { saveManagerProjectReview } = props;
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);
  const printing = usePrintingContext();
  const theme = useTheme();
  const quoteBoxBgcolor = lighten(theme.palette.primary.main, 0.85);
  const projectName = projectReview.projectName;
  const name = getUserLabel(projectReview.reviewee, { short: true });

  return (
    <ExpansionPanel defaultExpanded={printing}>
      <InView>
        <ManagerReviewEvaluationExpansionPanelSummary rating={projectReview.managerComment?.rating ?? null}>
          <Typography variant="h5">{projectName}</Typography>
        </ManagerReviewEvaluationExpansionPanelSummary>
      </InView>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("{name}'s comment about his/her performance compared to initial expectation", { name })}
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
                {i18n._('Other people comments about {name} performance compared to initial expectation', { name })}
              </Typography>
            </Box>
            {printing && projectReview.managerComment && (
              <Grid item xs={12}>
                <ManagerProjectOutput review={projectReview.managerComment} />
              </Grid>
            )}
            <ManagerReviewAchievementsRatingGroup rating="SUPERB" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating="EXCEEDS_EXPECTATIONS" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating="MEETS_EXPECTATIONS" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating="NEEDS_IMPROVEMENT" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating={null} comments={projectReview.comments} />
          </Grid>
          <ThoseWhoDidNotComment comments={projectReview.comments} />
          {!printing && (
            <Grid item xs={12}>
              <FormChangeDetector>
                <ManagerReviewForm onSubmit={saveManagerProjectReview} formData={projectReview.managerComment} />
              </FormChangeDetector>
            </Grid>
          )}
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

const useStyles = makeStyles(styles, { name: 'ManagerReviewAchievementsExpansionPanel' });
type StyleProps = Styles<typeof styles>;
