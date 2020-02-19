import React, { useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

export interface InViewContextType {
  topInView: boolean;
  bottomInView: boolean;
}

export const InViewContext = React.createContext<InViewContextType | null>(null);
export function useInViewContext(): InViewContextType {
  const context = useContext(InViewContext);
  if (!context) {
    throw new Error('useInViewContext must be used inside the <InViewContextProvider />');
  }
  return context;
}

interface OwnProps {
  value: InViewContextType;
}

type Props = FCProps<OwnProps>;

export function InViewContextProvider(props: Props) {
  return <InViewContext.Provider value={props.value}>{props.children}</InViewContext.Provider>;
}
