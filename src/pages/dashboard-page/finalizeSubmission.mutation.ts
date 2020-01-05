import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';
import { FinalSubmissionPageMutation } from './__generated__/FinalSubmissionPageMutation.graphql';

export const useFinalSubmissionMutation = () =>
  useMutation<FinalSubmissionPageMutation>(graphql`
    mutation FinalSubmissionPageMutation($input: FinalizeSubmissionMutationInput!) {
      finalizeSubmission(input: $input) {
        personReview {
          finalSubmit
        }
      }
    }
  `);
