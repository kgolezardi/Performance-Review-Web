import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

export const useStartReviewMutation = () =>
  useMutation<any>(graphql`
    mutation startReviewMutation($input: StartReviewMutationInput!) {
      startReview(input: $input) {
        viewer {
          me {
            hasStarted
          }
        }
        ok
      }
    }
  `);
