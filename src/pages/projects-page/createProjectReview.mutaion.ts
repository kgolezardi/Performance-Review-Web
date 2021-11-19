import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

import { createProjectReviewMutation } from './__generated__/createProjectReviewMutation.graphql';

export const useCreateProjectReview = () => {
  return useMutation<createProjectReviewMutation>(graphql`
    mutation createProjectReviewMutation($input: CreateProjectReviewMutationInput!) {
      createProjectReview(input: $input) {
        viewer {
          projectReviews {
            id
            ...ProjectExpansionPanel_projectReview
          }
        }
        projectReview {
          id
        }
      }
    }
  `);
};
