import React, { createContext, useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

export type TabPanelsContextType = number;
export const TabPanelsContext = createContext<TabPanelsContextType | null>(null);

export function useTabPanelsContext(): TabPanelsContextType {
  const context = useContext(TabPanelsContext);
  if (context === null) {
    throw new Error('useTabPanelsContext must be used inside the <TabPanelsProvider/>');
  }
  return context;
}

interface OwnProps {
  value: TabPanelsContextType;
}

type Props = FCProps<OwnProps>;

export function TabPanelsProvider(props: Props) {
  return <TabPanelsContext.Provider value={props.value}>{props.children}</TabPanelsContext.Provider>;
}
