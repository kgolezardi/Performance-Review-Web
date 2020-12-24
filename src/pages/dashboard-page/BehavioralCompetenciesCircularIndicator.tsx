import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { Typography } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import {
  BehavioralCompetenciesCircularIndicator_review,
  BehavioralCompetenciesCircularIndicator_review$key,
} from './__generated__/BehavioralCompetenciesCircularIndicator_review.graphql';
import { DashboardPageCircularIndicator } from './DashboardPageCircularIndicator';

interface OwnProps {
  review: BehavioralCompetenciesCircularIndicator_review$key | null;
}

type Props = FCProps<OwnProps>;

export function BehavioralCompetenciesCircularIndicator(props: Props) {
  const review = useFragment(fragment, props.review);

  const numberOfFilledFields = getNumberOfFilledFields(review);
  const totalNumber = getLength(review);
  const value = getValue(numberOfFilledFields, totalNumber);
  const color = getColor(numberOfFilledFields);
  const text = getText(numberOfFilledFields);

  return (
    <DashboardPageCircularIndicator {...props} color={color} value={value} shadow>
      <Typography>{text}</Typography>
    </DashboardPageCircularIndicator>
  );
}

export const fragment = graphql`
  fragment BehavioralCompetenciesCircularIndicator_review on PersonReviewNode {
    sahabinessComment
    problemSolvingComment
    executionComment
    thoughtLeadershipComment
    leadershipComment
    presenceComment
    sahabinessRating
    problemSolvingRating
    executionRating
    thoughtLeadershipRating
    leadershipRating
    presenceRating
  }
`;

const getLength = (obj: object | null) => {
  if (obj === null) {
    return 0;
  }
  return Object.keys(obj).length;
};

const getNumberOfFilledFields = (review: BehavioralCompetenciesCircularIndicator_review | null): number => {
  if (review === null) {
    return 0;
  }

  const keys = Object.keys(review) as [keyof BehavioralCompetenciesCircularIndicator_review];
  const items = keys.map((key) => Boolean(review[key]));
  return items.filter(Boolean).length;
};

const getValue = (numberOfFilledFields: number, totalNumber: number): number => {
  return (numberOfFilledFields / totalNumber) * 100;
};

const getColor = (numberOfFilledFields: number) => {
  if (numberOfFilledFields <= 3) {
    return 'low';
  }
  if (4 <= numberOfFilledFields && numberOfFilledFields <= 7) {
    return 'medium';
  }
  if (8 <= numberOfFilledFields && numberOfFilledFields <= 11) {
    return 'high';
  }
  if (numberOfFilledFields === 12) {
    return 'complete';
  }
};

const getText = (numberOfFilledFields: number) => {
  if (numberOfFilledFields === 0) {
    return i18n._("You haven't entered anything yet!");
  }
  if (1 <= numberOfFilledFields && numberOfFilledFields <= 7) {
    return i18n._("It'd be good if u wrote more!");
  }
  if (8 <= numberOfFilledFields && numberOfFilledFields <= 11) {
    return i18n._("You're almost there!");
  }
  if (numberOfFilledFields === 12) {
    return i18n._("It's complete!");
  }
  return i18n._("You're almost there!");
};
