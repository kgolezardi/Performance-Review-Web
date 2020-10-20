import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

import { startReviewMutation } from './__generated__/startReviewMutation.graphql';

export const useStartReviewMutation = () =>
  useMutation<startReviewMutation>(graphql`
    mutation startReviewMutation($input: StartReviewMutationInput!) {
      startReview(input: $input) {
        viewer {
          me {
            ...AuthGuard_user
          }
        }
      }
    }
  `);
