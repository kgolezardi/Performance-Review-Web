import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { DictInput, Forminator } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { ServerValueProvider } from 'src/shared/server-value';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewAchievementsExpansionPanel } from './ManagerReviewAchievementsExpansionPanel';
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
  const data = useLazyLoadQuery<ManagerReviewAchievementsQuery>(query, { id: props.revieweeId });
  const projectReviews = data.viewer.user?.projectReviews;

  const value: ManagerReviewAchievementsValue =
    data.viewer.user?.projectReviews.reduce((previousValue, currentValue) => {
      return { ...previousValue, [currentValue.id]: currentValue.managerComment?.rating };
    }, {}) ?? {};

  // TODO: Submit mutation
  const handleSubmit = () => {};

  return (
    <Box padding={4}>
      <ServerValueProvider value={value}>
        <Forminator onSubmit={handleSubmit} initialValue={value}>
          <DictInput>
            {projectReviews?.map((projectReview) => (
              <ManagerReviewAchievementsExpansionPanel projectReview={projectReview} key={projectReview.id} />
            ))}
          </DictInput>
        </Forminator>
      </ServerValueProvider>
    </Box>
  );
}
