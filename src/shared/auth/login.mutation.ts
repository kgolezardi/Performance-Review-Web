import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

import { loginMutation } from './__generated__/loginMutation.graphql';

export const useLoginMutation = () =>
  useMutation<loginMutation>(graphql`
    mutation loginMutation($input: LoginMutationInput!) {
      login(input: $input) {
        viewer {
          me {
            ...AuthGuard_user
          }
        }
      }
    }
  `);
