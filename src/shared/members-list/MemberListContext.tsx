import React, { useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

export interface MemberListContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const MemberListContext = React.createContext<MemberListContextType | null>(null);
export function useMemberListContext(): MemberListContextType {
  const context = useContext(MemberListContext);
  if (!context) {
    throw new Error('useMemberListContext must be used inside the <MemberListContextProvider />');
  }
  return context;
}

interface OwnProps {
  value: MemberListContextType;
}

type Props = FCProps<OwnProps>;

export function MemberListContextProvider(props: Props) {
  return <MemberListContext.Provider value={props.value}>{props.children}</MemberListContext.Provider>;
}
