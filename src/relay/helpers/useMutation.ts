import { GraphQLTaggedNode } from 'react-relay';
import { MutationConfig, MutationParameters } from 'relay-runtime';
import { useCallback } from 'react';
import { useRelayEnvironment } from 'react-relay/hooks';

import { commitMutation } from './commitMutation';

export const useMutation = <TOperation extends MutationParameters = MutationParameters>(
  mutation: GraphQLTaggedNode,
) => {
  const environment = useRelayEnvironment();
  return useCallback(
    (
      variables: TOperation['variables'],
      config: Omit<MutationConfig<TOperation>, 'mutation' | 'variables'> = {},
    ): Promise<TOperation['response']> => commitMutation<TOperation>(environment, mutation, variables, config),
    [environment, mutation],
  );
};
