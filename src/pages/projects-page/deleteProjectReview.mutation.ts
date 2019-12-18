import graphql from 'babel-plugin-relay/macro';
import { deleteProjectReviewMutation } from 'src/pages/projects-page/__generated__/deleteProjectReviewMutation.graphql';
import { useMutation } from 'src/relay';

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
