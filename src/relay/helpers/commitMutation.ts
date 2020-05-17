import {
  Environment,
  GraphQLTaggedNode,
  MutationConfig,
  MutationParameters,
  commitMutation as relayCommitMutation,
} from 'relay-runtime';

export function commitMutation<TOperation extends MutationParameters = MutationParameters>(
  environment: Environment,
  mutation: GraphQLTaggedNode,
  variables: TOperation['variables'],
  config: Omit<MutationConfig<TOperation>, 'mutation' | 'variables'> = {},
): Promise<TOperation['response']> {
  return new Promise((resolve, reject) => {
    relayCommitMutation<TOperation>(environment, {
      ...config,
      mutation,
      variables,
      onCompleted: (response, errors) => {
        config.onCompleted && config.onCompleted(response, errors);
        // TODO needs more attention
        if (errors) {
          reject(errors);
        } else {
          resolve(response);
        }
      },
      onError: (error) => {
        config.onError && config.onError(error);
        reject(reject);
      },
    });
  });
}
