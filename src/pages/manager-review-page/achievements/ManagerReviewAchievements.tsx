import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Typography } from '@material-ui/core';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { Evaluation } from 'src/pages/dashboard-page/__generated__/AchievementsIndicators_projects.graphql';
import { FCProps } from 'src/shared/types/FCProps';
import { ServerValueProvider } from 'src/shared/server-value';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useInView } from 'react-intersection-observer';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';

import { ManagerReviewAchievementsExpansionPanel } from './ManagerReviewAchievementsExpansionPanel';
import { ManagerReviewAchievementsMutation } from './__generated__/ManagerReviewAchievementsMutation.graphql';
import { ManagerReviewAchievementsQuery } from './__generated__/ManagerReviewAchievementsQuery.graphql';
import { ManagerReviewAchievementsValue } from './ManagerReviewAchievementsValue';

interface OwnProps {
  revieweeId: string;
}

export type Props = FCProps<OwnProps>;

const query = graphql`
  query ManagerReviewAchievementsQuery($id: ID!) {
    viewer {
      user(id: $id) {
        projectReviews {
          id
          managerComment {
            id
            rating
          }
          ...ManagerReviewAchievementsExpansionPanel_projectReview
        }
      }
    }
  }
`;

export function ManagerReviewAchievements(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ManagerReviewAchievementsQuery>(query, { id: revieweeId });
  const projectReviews = data.viewer.user?.projectReviews;

  const [, inView] = useInView();
  const { enqueueSnackbar } = useBiDiSnackbar();

  const value: ManagerReviewAchievementsValue =
    data.viewer.user?.projectReviews.reduce((previousValue, currentValue) => {
      return { ...previousValue, [currentValue.id]: currentValue.managerComment?.rating };
    }, {}) ?? {};

  const saveManagerProjectComment = useMutation<ManagerReviewAchievementsMutation>(graphql`
    mutation ManagerReviewAchievementsMutation($input: SaveManagerProjectCommentMutationInput!) {
      saveManagerProjectComment(input: $input) {
        managerProjectComment {
          id
          rating
        }
      }
    }
  `);

  const handleSubmit = (data: ManagerReviewAchievementsValue) => {
    const inputs = (Object.entries(data).filter(([, rating]) => rating != null) as [
      string,
      Evaluation,
    ][]).map(([projectReviewId, rating]) => ({ projectReviewId, rating }));

    Promise.all(inputs.map((input) => saveManagerProjectComment({ input })))
      .then(() => {
        enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
      });
  };

  return (
    <Box padding={4}>
      <ServerValueProvider value={value}>
        <Forminator onSubmit={handleSubmit} initialValue={value}>
          <DictInput>
            {projectReviews?.map((projectReview) => (
              <ManagerReviewAchievementsExpansionPanel projectReview={projectReview} key={projectReview.id} />
            ))}
            <StickyBottomPaper noSticky={inView}>
              <Box display="flex">
                <Box flex={1}>
                  <Typography>
                    {i18n._('You have evaluated {number} from {total} projects.', {
                      number: Object.values(value).filter(isNotNil).length,
                      total: Object.values(value).length,
                    })}
                  </Typography>
                </Box>
                <SubmitButton variant="contained" color="primary">
                  {i18n._('Save')}
                </SubmitButton>
              </Box>
            </StickyBottomPaper>
          </DictInput>
        </Forminator>
      </ServerValueProvider>
    </Box>
  );
}
