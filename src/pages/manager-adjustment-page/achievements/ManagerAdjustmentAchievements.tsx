import { i18n } from '@lingui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { ManageAdjustmentFormData } from './ManageAdjustmentFormData';
import { ManagerAdjustmentAchievementsExpansionPanel } from './ManagerAdjustmentAchievementsExpansionPanel';
import { ManagerAdjustmentAchievementsMutation } from './__generated__/ManagerAdjustmentAchievementsMutation.graphql';
import { ManagerAdjustmentAchievementsQuery } from './__generated__/ManagerAdjustmentAchievementsQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

export type Props = FCProps<OwnProps>;

const query = graphql`
  query ManagerAdjustmentAchievementsQuery($id: ID!) {
    viewer {
      activeRound {
        maxReviewers
      }
      users {
        ...ReviewersInput_Reviewers
      }
      user(id: $id) {
        projectReviews {
          id
          managerComment {
            id
            rating
          }
          ...ManagerAdjustmentAchievementsExpansionPanel_projectReview
        }
      }
    }
  }
`;

export function ManagerAdjustmentAchievements(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ManagerAdjustmentAchievementsQuery>(query, { id: revieweeId });
  const projectReviews = data.viewer.user?.projectReviews;

  const { enqueueSnackbar } = useBiDiSnackbar();

  const saveManagerAdjustmentProjectReview = useMutation<ManagerAdjustmentAchievementsMutation>(graphql`
    mutation ManagerAdjustmentAchievementsMutation($input: AdjustProjectReviewMutationInput!) {
      adjustProjectReview(input: $input) {
        projectReview {
          approvedByManager
          reviewers {
            id
          }
        }
      }
    }
  `);

  const handleSubmit = async (formData: ManageAdjustmentFormData) => {
    try {
      await saveManagerAdjustmentProjectReview({
        input: formData,
      });
      enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
    }
  };

  return (
    <>
      {projectReviews?.map((projectReview) => (
        <ManagerAdjustmentAchievementsExpansionPanel
          maximumReviewers={data.viewer.activeRound.maxReviewers}
          users={data.viewer.users}
          projectReview={projectReview}
          onSubmit={handleSubmit}
        />
      ))}
    </>
  );
}
