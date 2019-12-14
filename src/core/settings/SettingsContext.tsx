import React, { useContext } from 'react';
export interface SettingsContextValue {
  selfAssessment: boolean;
  peerReviews: boolean;
  managerReviews: boolean;
  calibration: boolean;
  result: boolean;
}
export const SettingsContext = React.createContext<SettingsContextValue | null>(null);

export function useAppSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used inside the SettingsProvider');
  }
  return context;
}
