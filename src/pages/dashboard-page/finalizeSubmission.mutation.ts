import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';
import { finalizeSubmissionMutation } from './__generated__/finalizeSubmissionMutation.graphql';

export const useFinalSubmissionMutation = () =>
  useMutation<finalizeSubmissionMutation>(graphql`
    mutation finalizeSubmissionMutation($input: FinalizeSubmissionMutationInput!) {
      finalizeSubmission(input: $input) {
        personReview {
          finalSubmit
        }
      }
    }
  `);
