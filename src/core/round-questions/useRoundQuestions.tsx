import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';

import { RoundQuestionsQuery } from './__generated__/RoundQuestionsQuery.graphql';
import {
  RoundQuestions_managerReview,
  RoundQuestions_managerReview$key,
} from './__generated__/RoundQuestions_managerReview.graphql';
import {
  RoundQuestions_peerReview,
  RoundQuestions_peerReview$key,
} from './__generated__/RoundQuestions_peerReview.graphql';
import {
  RoundQuestions_selfReview,
  RoundQuestions_selfReview$key,
} from './__generated__/RoundQuestions_selfReview.graphql';
import {
  managerReviewProjectQuestionsFragment,
  peerReviewProjectQuestionsFragment,
  query,
  selfReviewProjectQuestionsFragment,
} from './RoundQuestion';

export type RoundQuestions = {
  selfReviewProjectQuestions: RoundQuestions_selfReview;
  managerReviewProjectQuestions: RoundQuestions_managerReview;
  peerReviewProjectQuestions: RoundQuestions_peerReview;
};

export function useRoundQuestions(): RoundQuestions {
  const data = useLazyLoadQuery<RoundQuestionsQuery>(query, {});
  const selfReviewProjectQuestions = useFragment<RoundQuestions_selfReview$key>(
    selfReviewProjectQuestionsFragment,
    data.viewer.activeRound.selfReviewProjectQuestions,
  );
  const peerReviewProjectQuestions = useFragment<RoundQuestions_peerReview$key>(
    peerReviewProjectQuestionsFragment,
    data.viewer.activeRound.peerReviewProjectQuestions,
  );
  const managerReviewProjectQuestions = useFragment<RoundQuestions_managerReview$key>(
    managerReviewProjectQuestionsFragment,
    data.viewer.activeRound.managerReviewProjectQuestions,
  );

  return {
    selfReviewProjectQuestions,
    managerReviewProjectQuestions,
    peerReviewProjectQuestions,
  };
}
