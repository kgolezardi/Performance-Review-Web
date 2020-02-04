import React, { useContext, useMemo, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

export interface MemberListContextType {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const MemberListContext = React.createContext<MemberListContextType | null>(null);
export function useMemberListContext(): MemberListContextType {
  const context = useContext(MemberListContext);
  if (!context) {
    throw new Error('useMemberListContext must be used inside the <MemberListContextProvider />');
  }
  return context;
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function MemberListContextProvider(props: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const value = useMemo(() => ({ selectedId, setSelectedId }), [selectedId]);

  return <MemberListContext.Provider value={value}>{props.children}</MemberListContext.Provider>;
}
