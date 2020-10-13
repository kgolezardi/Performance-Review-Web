import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewAchievementsExpansionPanel } from './ManagerReviewAchievementsExpansionPanel';
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
          ...ManagerReviewAchievementsExpansionPanel_projectReview
        }
      }
    }
  }
`;

export function ManagerReviewAchievements(props: Props) {
  const data = useLazyLoadQuery<ManagerReviewAchievementsQuery>(query, { id: props.revieweeId });
  const projectReviews = data.viewer.user?.projectReviews;
  return (
    <Box padding={4}>
      {projectReviews?.map((projectReview) => (
        <ManagerReviewAchievementsExpansionPanel projectReview={projectReview} key={projectReview.id} />
      ))}
    </Box>
  );
}
