import React, { createContext, useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

export type ServerValueContextType<V> = V;
export const ServerValueContext = createContext<ServerValueContextType<any> | null>(null);

export function useServerValueContext<V>(): ServerValueContextType<V> | null {
  return useContext(ServerValueContext);
}

interface OwnProps<V> {
  value: V;
}

type Props<V> = FCProps<OwnProps<V>>;

export function ServerValueProvider<V>(props: Props<V>) {
  return <ServerValueContext.Provider value={props.value}>{props.children}</ServerValueContext.Provider>;
}
