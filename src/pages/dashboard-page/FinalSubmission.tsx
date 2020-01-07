import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import { mean } from 'ramda';
import React, { useCallback } from 'react';
import { useFragment } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { ConfirmButton } from 'src/shared/confirm-button';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { FinalSubmission_dominantCharacteristics$key } from './__generated__/FinalSubmission_dominantCharacteristics.graphql';
import { FinalSubmission_performanceCompetencies$key } from './__generated__/FinalSubmission_performanceCompetencies.graphql';
import { FinalSubmission_projects$key } from './__generated__/FinalSubmission_projects.graphql';
import { useFinalSubmissionMutation } from './finalizeSubmission.mutation';
import { getAchievementValue, getDominantCharacteristicsValue, getPerformanceCompetenciesValue } from './utils';

interface OwnProps {
  performanceCompetencies: FinalSubmission_performanceCompetencies$key | null;
  dominantCharacteristics: FinalSubmission_dominantCharacteristics$key | null;
  projects: FinalSubmission_projects$key;
}

type Props = FCProps<OwnProps>;

export function FinalSubmission(props: Props) {
  const performanceCompetencies = useFragment(performanceCompetenciesFragment, props.performanceCompetencies);
  const dominantCharacteristics = useFragment(dominantCharacteristicsFragment, props.dominantCharacteristics);
  const projects = useFragment(projectsFragment, props.projects);

  const { enqueueSnackbar } = useBiDiSnackbar();
  const { id: revieweeId, firstName } = useAuthGuardUser();

  const finalSubmissionMutation = useFinalSubmissionMutation();
  const handleFinalizingSubmit = useCallback(() => {
    finalSubmissionMutation({ input: { revieweeId } })
      .then(res => {
        //TODO: Add popup to thank the user
        // Also add changes to the app
      })
      .catch(error => {
        enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
      });
  }, [enqueueSnackbar, revieweeId, finalSubmissionMutation]);

  const contentForEmptyForms = i18n._(
    "Dear {firstName}, you haven't filled anything yet. We'd be thankful if you filled forms completely and submit them.",
    { firstName },
  );

  const contentForFilledForms = i18n._(
    "Dear {firstName}, you haven'nt filled the forms completely yet. But you can finish your review by clicking on the following button. Keep in mind that after your submission, you can not edit the forms.",
    { firstName },
  );

  const contentForCompleteForms = i18n._(
    'Dear {firstName}, we are really thankful to you. You have completed the review and now you can finish the review by clicking on the following button. Keep in mind that after your submission, you can not edit the forms.',
    { firstName },
  );

  const performanceCompetenciesValue = getPerformanceCompetenciesValue(performanceCompetencies);
  const dominantCharacteristicsValue = getDominantCharacteristicsValue(dominantCharacteristics);
  const achievementValue = projects.map(project => getAchievementValue(project));

  const value = getValue(performanceCompetenciesValue, dominantCharacteristicsValue, achievementValue);

  const getText = () => {
    if (value === 0) {
      return contentForEmptyForms;
    }
    if (value === 100) {
      return contentForCompleteForms;
    }
    return contentForFilledForms;
  };

  return (
    <Box marginY={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm xs={12}>
          <Typography>{getText()}</Typography>
        </Grid>
        <Grid item>
          <ConfirmButton
            buttonText={i18n._('Finish and send review')}
            text={i18n._(
              "Once you finish the process and submit forms, you wouldn't be able to edit forms and forms will be sent to us. Are you sure?",
            )}
            onConfirm={handleFinalizingSubmit}
            buttonProps={{ variant: 'contained', color: 'secondary', disabled: !value }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const performanceCompetenciesFragment = graphql`
  fragment FinalSubmission_performanceCompetencies on PersonReviewNode {
    sahabinessComment
    problemSolvingComment
    executionComment
    thoughtLeadershipComment
    leadershipComment
    presenceComment
    sahabinessRating
    problemSolvingRating
    executionRating
    thoughtLeadershipRating
    leadershipRating
    presenceRating
  }
`;

const dominantCharacteristicsFragment = graphql`
  fragment FinalSubmission_dominantCharacteristics on PersonReviewNode {
    strengths
    weaknesses
  }
`;

const projectsFragment = graphql`
  fragment FinalSubmission_projects on ProjectReviewNode @relay(plural: true) {
    project {
      name
    }
    rating
    reviewers {
      id
    }
    text
  }
`;

const getValue = (
  performanceCompetenciesValue: number,
  dominantCharacteristicsValue: number,
  achievementValue: number[],
) => {
  const achievementsValue = achievementValue.length ? mean(achievementValue) : 0;
  return (performanceCompetenciesValue + dominantCharacteristicsValue + achievementsValue) / 3;
};
