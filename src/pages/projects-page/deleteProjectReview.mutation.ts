import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

import { deleteProjectReviewMutation } from './__generated__/deleteProjectReviewMutation.graphql';

export const useDeleteProjectReview = () =>
  useMutation<deleteProjectReviewMutation>(graphql`
    mutation deleteProjectReviewMutation($input: DeleteProjectReviewMutationInput!) {
      deleteProjectReview(input: $input) {
        viewer {
          projectReviews {
            id
            ...ProjectForm_projectReview
          }
        }
        deletedProjectReviewId
      }
    }
  `);
