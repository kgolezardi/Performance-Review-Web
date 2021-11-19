import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

import { editProjectReviewMutation } from './__generated__/editProjectReviewMutation.graphql';

export const useEditProjectReview = () =>
  useMutation<editProjectReviewMutation>(graphql`
    mutation editProjectReviewMutation($input: EditProjectReviewMutationInput!) {
      editProjectReview(input: $input) {
        projectReview {
          id
          ...ProjectForm_projectReview
        }
      }
    }
  `);
