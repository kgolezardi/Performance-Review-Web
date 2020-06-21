import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { CriteriaHelpText } from 'src/shared/criteria-help-text';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { CriteriaResult_reviews$key } from './__generated__/CriteriaResult_reviews.graphql';
import { CriterionResultGroup } from './CriterionResultGroup';

const fragment = graphql`
  fragment CriteriaResult_reviews on PersonReviewNode @relay(plural: true) {
    id
    isSelfReview

    sahabinessRating
    sahabinessComment

    problemSolvingRating
    problemSolvingComment

    executionRating
    executionComment

    thoughtLeadershipRating
    thoughtLeadershipComment

    leadershipRating
    leadershipComment

    presenceRating
    presenceComment
  }
`;

interface OwnProps {
  reviews: CriteriaResult_reviews$key;
  isSelfReview?: boolean;
}

export type Props = FCProps<OwnProps>;

export function CriteriaResult(props: Props) {
  const { isSelfReview = true } = props;
  const reviews = useFragment(fragment, props.reviews);

  return (
    <div>
      <CriterionResultGroup
        reviews={reviews}
        details={<CriteriaHelpText criteria="sahabiness" isSelfReview={isSelfReview} />}
        title={i18n._('Organization Culture Adoption')}
        prefix="sahabiness"
      />
      <CriterionResultGroup
        reviews={reviews}
        details={<CriteriaHelpText criteria="problemSolving" isSelfReview={isSelfReview} />}
        title={i18n._('Problem Solving')}
        prefix="problemSolving"
      />
      <CriterionResultGroup
        reviews={reviews}
        details={<CriteriaHelpText criteria="execution" isSelfReview={isSelfReview} />}
        title={i18n._('Execution')}
        prefix="execution"
      />
      <CriterionResultGroup
        reviews={reviews}
        details={<CriteriaHelpText criteria="thoughtLeadership" isSelfReview={isSelfReview} />}
        title={i18n._('Thought Leadership')}
        prefix="thoughtLeadership"
      />
      <CriterionResultGroup
        reviews={reviews}
        details={<CriteriaHelpText criteria="leadership" isSelfReview={isSelfReview} />}
        title={i18n._('Leadership')}
        prefix="leadership"
      />
      <CriterionResultGroup
        reviews={reviews}
        details={<CriteriaHelpText criteria="presence" isSelfReview={isSelfReview} />}
        title={i18n._('Presence')}
        prefix="presence"
      />
    </div>
  );
}
