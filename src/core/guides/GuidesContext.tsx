import React, { useContext } from 'react';

export interface GuidesContextValue {
  selfReviewSahabinessHelpModalText: string | null;
  selfReviewProblemSolvingHelpModalText: string | null;
  selfReviewExecutionHelpModalText: string | null;
  selfReviewThoughtLeadershipHelpModalText: string | null;
  selfReviewLeadershipHelpModalText: string | null;
  selfReviewPresenceHelpModalText: string | null;
  selfReviewProjectReviewHelpModalText: string | null;
}
export const GuidesContext = React.createContext<GuidesContextValue | null>(null);

export function useGuidesContext(): GuidesContextValue {
  const context = useContext(GuidesContext);
  if (!context) {
    throw new Error('useGuidesContext must be used inside the GuidesProvider');
  }
  return context;
}
