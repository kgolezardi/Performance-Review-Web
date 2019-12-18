import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

export const useLogoutMutation = () =>
  useMutation(graphql`
    mutation logoutMutation($input: LogoutMutationInput!) {
      logout(input: $input) {
        viewer {
          me {
            id
          }
        }
      }
    }
  `);
