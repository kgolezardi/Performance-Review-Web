import React, { useContext } from 'react';

import { RoundQuestions_managerReview } from './__generated__/RoundQuestions_managerReview.graphql';
import { RoundQuestions_peerReview } from './__generated__/RoundQuestions_peerReview.graphql';
import { RoundQuestions_selfReview } from './__generated__/RoundQuestions_selfReview.graphql';

export type RoundQuestionsContextValue = {
  selfReviewProjectQuestions: RoundQuestions_selfReview;
  managerReviewProjectQuestions: RoundQuestions_managerReview;
  peerReviewProjectQuestions: RoundQuestions_peerReview;
};
export const RoundQuestionsContext = React.createContext<RoundQuestionsContextValue | null>(null);

export function useRoundQuestionsContext(): RoundQuestionsContextValue {
  const context = useContext(RoundQuestionsContext);
  if (!context) {
    throw new Error('useRoudQuestionsContext must be used inside the RoundQuestionsProvider');
  }
  return context;
}
