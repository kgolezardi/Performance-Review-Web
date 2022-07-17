import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';

import { RoundQuestionsContext } from './RoundQuestionsContext';
import { RoundQuestionsQuery } from './__generated__/RoundQuestionsQuery.graphql';
import { RoundQuestions_managerReview$key } from './__generated__/RoundQuestions_managerReview.graphql';
import { RoundQuestions_peerReview$key } from './__generated__/RoundQuestions_peerReview.graphql';
import { RoundQuestions_selfReview$key } from './__generated__/RoundQuestions_selfReview.graphql';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function RoundQuestions(props: Props) {
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
  const value = useMemo(
    () => ({ selfReviewProjectQuestions, managerReviewProjectQuestions, peerReviewProjectQuestions }),
    [selfReviewProjectQuestions, managerReviewProjectQuestions, peerReviewProjectQuestions],
  );

  return <RoundQuestionsContext.Provider value={value}>{props.children}</RoundQuestionsContext.Provider>;
}

const query = graphql`
  query RoundQuestionsQuery {
    viewer {
      activeRound {
        selfReviewProjectQuestions {
          ...RoundQuestions_selfReview
        }
        peerReviewProjectQuestions {
          ...RoundQuestions_peerReview
        }
        managerReviewProjectQuestions {
          ...RoundQuestions_managerReview
        }
      }
    }
  }
`;

const selfReviewProjectQuestionsFragment = graphql`
  fragment RoundQuestions_selfReview on QuestionNode @relay(plural: true) {
    id
    questionType
    order
    label
    helpText
    choices
    privateAnswerToPeerReviewers
    privateAnswerToReviewee
  }
`;

const peerReviewProjectQuestionsFragment = graphql`
  fragment RoundQuestions_peerReview on QuestionNode @relay(plural: true) {
    id
    questionType
    order
    label
    helpText
    choices
    privateAnswerToPeerReviewers
    privateAnswerToReviewee
  }
`;

const managerReviewProjectQuestionsFragment = graphql`
  fragment RoundQuestions_managerReview on QuestionNode @relay(plural: true) {
    id
    questionType
    order
    label
    helpText
    choices
    privateAnswerToPeerReviewers
    privateAnswerToReviewee
  }
`;
