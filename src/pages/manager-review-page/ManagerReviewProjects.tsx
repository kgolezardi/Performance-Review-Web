import { Box } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { ProjectOutput } from 'src/shared/project-output';
import { FCProps } from 'src/shared/types/FCProps';
import { ManagerReviewProjects_reviews$key } from './__generated__/ManagerReviewProjects_reviews.graphql';

const fragment = graphql`
  fragment ManagerReviewProjects_reviews on ProjectReviewNode @relay(plural: true) {
    id
    ...ProjectOutput_review
  }
`;

interface OwnProps {
  reviews: ManagerReviewProjects_reviews$key | null;
}

type Props = FCProps<OwnProps>;

export function ManagerReviewProjects(props: Props) {
  const reviews = useFragment(fragment, props.reviews);
  return (
    <Box padding={3} paddingTop={4}>
      {reviews?.map(review => (
        <Box paddingY={3} key={review.id}>
          <ProjectOutput review={review} showProjectName />
        </Box>
      ))}
    </Box>
  );
}
