import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { transformAnswersToInput } from 'src/shared/utils/transformAnswers';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';
import { useRoundQuestions } from 'src/core/round-questions';

import { ManageReviewFormData } from './ManagerReviewAchievementsValue';
import { ManagerReviewAchievementsExpansionPanel } from './ManagerReviewAchievementsExpansionPanel';
import { ManagerReviewAchievementsMutation } from './__generated__/ManagerReviewAchievementsMutation.graphql';
import { ManagerReviewAchievementsQuery } from './__generated__/ManagerReviewAchievementsQuery.graphql';

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

  const { managerReviewProjectQuestions } = useRoundQuestions();
  const { enqueueSnackbar } = useBiDiSnackbar();

  const saveManagerProjectComment = useMutation<ManagerReviewAchievementsMutation>(graphql`
    mutation ManagerReviewAchievementsMutation($input: SaveManagerProjectCommentMutationInput!) {
      saveManagerProjectComment(input: $input) {
        managerProjectComment {
          id
          rating
          answers {
            questionId
            value
          }
        }
      }
    }
  `);

  const handleSubmit = async (data: ManageReviewFormData) => {
    const input = {
      ...data,
      answers: transformAnswersToInput(data.answers, managerReviewProjectQuestions),
    };
    try {
      await saveManagerProjectComment({ input });
      enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
    }
  };

  return (
    <>
      {projectReviews?.map((projectReview) => (
        <React.Fragment key={projectReview.id}>
          <ManagerReviewAchievementsExpansionPanel
            saveManagerProjectReview={handleSubmit}
            projectReview={projectReview}
          />
        </React.Fragment>
      ))}
    </>
  );
}
