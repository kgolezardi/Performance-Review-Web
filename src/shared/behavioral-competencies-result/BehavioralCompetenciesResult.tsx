import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { BehavioralCompetencyHelpText } from 'src/shared/behavioral-competency-help-text';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { BehavioralCompetenciesResult_reviews$key } from './__generated__/BehavioralCompetenciesResult_reviews.graphql';
import { BehavioralCompetencyResultExpansionPanel } from './BehavioralCompetencyResultExpansionPanel';

const fragment = graphql`
  fragment BehavioralCompetenciesResult_reviews on PersonReviewNode @relay(plural: true) {
    ...BehavioralCompetencyResultExpansionPanel_reviews
  }
`;

interface OwnProps {
  reviews: BehavioralCompetenciesResult_reviews$key;
  isSelfReview?: boolean;
}

export type Props = FCProps<OwnProps>;

export function BehavioralCompetenciesResult(props: Props) {
  const { isSelfReview = true } = props;

  const reviews = useFragment(fragment, props.reviews);

  return (
    <Fragment>
      <BehavioralCompetencyResultExpansionPanel
        reviews={reviews}
        details={<BehavioralCompetencyHelpText criteria="sahabiness" isSelfReview={isSelfReview} />}
        title={i18n._('Organization Culture Adoption')}
        prefix="sahabiness"
      />
      <BehavioralCompetencyResultExpansionPanel
        reviews={reviews}
        details={<BehavioralCompetencyHelpText criteria="problemSolving" isSelfReview={isSelfReview} />}
        title={i18n._('Problem Solving')}
        prefix="problemSolving"
      />
      <BehavioralCompetencyResultExpansionPanel
        reviews={reviews}
        details={<BehavioralCompetencyHelpText criteria="execution" isSelfReview={isSelfReview} />}
        title={i18n._('Output Quality')}
        prefix="execution"
      />
      <BehavioralCompetencyResultExpansionPanel
        reviews={reviews}
        details={<BehavioralCompetencyHelpText criteria="thoughtLeadership" isSelfReview={isSelfReview} />}
        title={i18n._('Thought Leadership')}
        prefix="thoughtLeadership"
      />
      <BehavioralCompetencyResultExpansionPanel
        reviews={reviews}
        details={<BehavioralCompetencyHelpText criteria="leadership" isSelfReview={isSelfReview} />}
        title={i18n._('Leadership')}
        prefix="leadership"
      />
      <BehavioralCompetencyResultExpansionPanel
        reviews={reviews}
        details={<BehavioralCompetencyHelpText criteria="presence" isSelfReview={isSelfReview} />}
        title={i18n._('Presence')}
        prefix="presence"
      />
    </Fragment>
  );
}
