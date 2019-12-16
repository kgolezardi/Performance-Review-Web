import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';
import { saveProjectReviewMutation } from './__generated__/saveProjectReviewMutation.graphql';

export const useSaveProjectReview = () =>
  useMutation<saveProjectReviewMutation>(graphql`
    mutation saveProjectReviewMutation($input: SaveProjectReviewMutationInput!) {
      saveProjectReview(input: $input) {
        viewer {
          projectReviews {
            id
            ...ProjectForm_projectReview
          }
        }
        projectReview {
          id
          ...AddProjectForm_projectReview
          ...ProjectForm_projectReview
        }
      }
    }
  `);
