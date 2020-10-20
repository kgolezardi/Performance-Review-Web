import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Theme, Typography, lighten, makeStyles, useTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { DictInputItem, FragmentPrompt } from 'src/shared/forminator';
import { ExpansionPanel, ExpansionPanelDetails } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Rating } from 'src/shared/rating';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';
import { useServerValueContext } from 'src/shared/server-value';

import { ManagerReviewAchievementsExpansionPanel_projectReview$key } from './__generated__/ManagerReviewAchievementsExpansionPanel_projectReview.graphql';
import { ManagerReviewAchievementsRatingGroup } from './ManagerReviewAchievementsRatingGroup';
import { ManagerReviewAchievementsValue } from './ManagerReviewAchievementsValue';
import { ManagerReviewEvaluationExpansionPanelSummary } from '../ManagerReviewExpansionPanelSummary';

const fragment = graphql`
  fragment ManagerReviewAchievementsExpansionPanel_projectReview on ProjectReviewNode {
    id
    reviewee {
      id
      firstName
      ...getUserLabel_user
    }
    project {
      name
    }
    comments {
      ...ManagerReviewAchievementsRatingGroup_comments
    }
    managerComment {
      id
      rating
    }
    ...ProjectOutput_review
  }
`;

interface OwnProps {
  projectReview: ManagerReviewAchievementsExpansionPanel_projectReview$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewAchievementsExpansionPanel(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);

  const theme = useTheme();
  const quoteBoxBgcolor = lighten(theme.palette.primary.main, 0.85);
  const projectName = projectReview.project.name;
  const name = getUserLabel(projectReview.reviewee, { short: true });

  const serverValue = useServerValueContext<ManagerReviewAchievementsValue>();
  const rating = serverValue?.[projectReview.id] ?? null;

  return (
    <ExpansionPanel>
      <ManagerReviewEvaluationExpansionPanelSummary rating={rating}>
        <Typography variant="h3">{projectName}</Typography>
      </ManagerReviewEvaluationExpansionPanelSummary>
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
            <ManagerReviewAchievementsRatingGroup rating="SUPERB" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating="EXCEEDS_EXPECTATIONS" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating="MEETS_EXPECTATIONS" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating="NEEDS_IMPROVEMENT" comments={projectReview.comments} />
            <ManagerReviewAchievementsRatingGroup rating={null} comments={projectReview.comments} />
          </Grid>
          <Grid item xs>
            <DictInputItem field={projectReview.id}>
              <Box bgcolor="grey.100" marginTop={4} padding={2}>
                <Box color="grey.700">
                  <Typography gutterBottom>
                    {i18n._('Your evaluation of {name} on project {projectName}', {
                      name,
                      projectName: projectReview.project.name,
                    })}
                  </Typography>
                </Box>
                <Box width="320px">
                  <Rating inputLabel={i18n._('Evaluation')} type="peer" />
                </Box>
              </Box>
              <FragmentPrompt value={rating} />
            </DictInputItem>
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

const useStyles = makeStyles(styles, { name: 'ManagerReviewAchievementsExpansionPanel' });
type StyleProps = Styles<typeof styles>;
