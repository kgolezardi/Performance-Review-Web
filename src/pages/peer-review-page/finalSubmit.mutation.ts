import graphql from 'babel-plugin-relay/macro';
import { finalSubmitMutation } from 'src/pages/peer-review-page/__generated__/finalSubmitMutation.graphql';
import { useMutation } from 'src/relay';

export const useFinalSubmitMutation = () =>
  useMutation<finalSubmitMutation>(graphql`
    mutation finalSubmitMutation($input: SavePersonReviewMutationInput!) {
      savePersonReview(input: $input) {
        personReview {
          state
        }
      }
    }
  `);
