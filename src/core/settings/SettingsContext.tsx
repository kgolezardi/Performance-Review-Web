import React, { useContext } from 'react';

import { Phase } from './__generated__/SettingsProviderQuery.graphql';

export interface SettingsContextValue {
  phase: Phase;
  loginBackgroundImage: string | null;
  idlePageUrl: string | null;
  startText: string | null;
  lightLogoUrl: string | null;
  logoUrl: string | null;
}
export const SettingsContext = React.createContext<SettingsContextValue | null>(null);

export function useAppSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used inside the SettingsProvider');
  }
  return context;
}
