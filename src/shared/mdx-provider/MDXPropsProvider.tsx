import React, { createContext, useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

type MDXPropsProviderContextType<Props> = Props;
export const MDXPropsContext = createContext<MDXPropsProviderContextType<any> | null>(null);

export function useMDXPropsContext<Props>(): MDXPropsProviderContextType<Props> {
  const context = useContext<MDXPropsProviderContextType<Props> | null>(MDXPropsContext);
  if (context === null) {
    throw new Error('useMDXPropsContext must be used inside the <MDXPropsProvider/>');
  }
  return context;
}

interface OwnProps<Props> {
  value: MDXPropsProviderContextType<Props>;
}

type Props<P> = FCProps<OwnProps<P>>;

export function MDXPropsProvider<P>(props: Props<P>) {
  return <MDXPropsContext.Provider value={props.value}>{props.children}</MDXPropsContext.Provider>;
}
