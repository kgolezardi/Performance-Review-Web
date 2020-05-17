import graphql from 'babel-plugin-relay/macro';
import { useCallback } from 'react';
import { useMutation } from 'src/relay';

import { logoutMutation } from './__generated__/logoutMutation.graphql';

const mutation = graphql`
  mutation logoutMutation($input: LogoutMutationInput!) {
    logout(input: $input) {
      viewer {
        me {
          ...AuthGuard_user
        }
      }
    }
  }
`;

export const useLogoutMutation = () => {
  const logout = useMutation<logoutMutation>(mutation);
  return useCallback(() => {
    logout({ input: {} }, { updater: (store) => store.invalidateStore() });
  }, [logout]);
};
