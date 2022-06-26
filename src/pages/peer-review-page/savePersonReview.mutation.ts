import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

import { savePersonReviewMutation } from './__generated__/savePersonReviewMutation.graphql';

export const useSavePersonReviewMutation = () =>
  useMutation<savePersonReviewMutation>(graphql`
    mutation savePersonReviewMutation($input: SavePersonReviewMutationInput!) {
      savePersonReview(input: $input) {
        personReview {
          state
        }
        viewer {
          usersToReview {
            peerPersonReview {
              state
            }
          }
        }
      }
    }
  `);
