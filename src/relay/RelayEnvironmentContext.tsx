import React, { createContext, useCallback, useContext, useState } from 'react';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { FCProps } from 'src/shared/types/FCProps';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { fetchQuery } from './fetchQuery';

const createNewEnvironmnet = () => {
  return new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
};

export type RelayEnvironmentResetContextType = () => void;

export const RelayEnvironmentResetContext = createContext<RelayEnvironmentResetContextType | null>(null);

export function useRelayEnvironmentReset(): RelayEnvironmentResetContextType {
  const context = useContext(RelayEnvironmentResetContext);
  if (!context) {
    throw new Error('useRelayEnvironmentReset must be used inside the <RelayEnvironmnetContextProvider />');
  }
  return context;
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

/**
 * this compnent is a combination of two context provider:
 * RelayEnvironmentResetContext.Provider and RelayEnvironmentProvider.
 * you can access environment using useRelayEnvironment hook.
 * you can access reset method using useRelayEnvironmentReset hook.
 */
export function RelayEnvironmnetContextProvider(props: Props) {
  const [environment, setEnvironment] = useState(createNewEnvironmnet);

  const reset = useCallback(() => {
    const environment = createNewEnvironmnet();
    setEnvironment(environment);
  }, []);

  return (
    <RelayEnvironmentResetContext.Provider value={reset}>
      <RelayEnvironmentProvider environment={environment}>{props.children}</RelayEnvironmentProvider>
    </RelayEnvironmentResetContext.Provider>
  );
}
