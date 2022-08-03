import { i18n } from '@lingui/core';
import { createStyles, Grid, lighten, makeStyles, Theme, Typography, useTheme } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { ReviewersInput_Reviewers$key } from 'src/shared/reviewers-input/__generated__/ReviewersInput_Reviewers.graphql';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ManageAdjustmentFormData } from './ManageAdjustmentFormData';
import { ManagerAdjustmentForm } from './ManagerAdjustmentForm';
import { ManagerAdjustmentAchievementsExpansionPanel_projectReview$key } from './__generated__/ManagerAdjustmentAchievementsExpansionPanel_projectReview.graphql';

const fragment = graphql`
  fragment ManagerAdjustmentAchievementsExpansionPanel_projectReview on ProjectReviewNode {
    id
    reviewee {
      id
      firstName
      manager {
        id
      }
      ...getUserLabel_user
    }
    projectName
    comments {
      ...ManagerReviewAchievementsRatingGroup_comments
    }
    managerComment {
      id
      rating
    }
    approvedByManager
    ...ProjectOutput_review
    ...ManagerAdjustmentForm_data
  }
`;

interface OwnProps {
  projectReview: ManagerAdjustmentAchievementsExpansionPanel_projectReview$key;
  users: ReviewersInput_Reviewers$key;
  maximumReviewers: number;
  onSubmit: (formData: ManageAdjustmentFormData) => void;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerAdjustmentAchievementsExpansionPanel(props: Props) {
  const { maximumReviewers, onSubmit, users } = props;
  const classes = useStyles();
  const projectReview = useFragment(fragment, props.projectReview);
  const theme = useTheme();
  const quoteBoxBgcolor = lighten(theme.palette.primary.main, 0.85);
  const {
    projectName,
    reviewee: { firstName: name },
    approvedByManager,
  } = projectReview;

  return (
    <ExpansionPanel defaultExpanded={false}>
      <ExpansionPanelSummary className={clsx(classes.summaryRoot, { [classes.approved]: approvedByManager })}>
        <Typography variant="h3">{projectName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={3}>
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
          <ManagerAdjustmentForm
            onSubmit={onSubmit}
            users={users}
            maximumReviewers={maximumReviewers}
            formData={projectReview}
            reviveeId={projectReview.reviewee.id}
            managerId={projectReview.reviewee.manager?.id ?? ''}
          />
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
    summaryRoot: {
      borderLeft: `4px solid ${theme.palette.error.main}`,
    },
    approved: {
      borderLeft: `4px solid ${theme.palette.success.main}`,
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerAdjustmentAchievementsExpansionPanel' });
type StyleProps = Styles<typeof styles>;
