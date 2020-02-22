import React, { useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { State } from './__generated__/PeerReviewPageQuery.graphql';

export interface PeerReviewContextType {
  state?: State;
}

export const PeerReviewContext = React.createContext<PeerReviewContextType | null>(null);
export function usePeerReviewContext(): PeerReviewContextType | null {
  return useContext(PeerReviewContext);
}

interface OwnProps {
  value: PeerReviewContextType;
}

type Props = FCProps<OwnProps>;

export function PeerReviewContextProvider(props: Props) {
  return <PeerReviewContext.Provider value={props.value}>{props.children}</PeerReviewContext.Provider>;
}
