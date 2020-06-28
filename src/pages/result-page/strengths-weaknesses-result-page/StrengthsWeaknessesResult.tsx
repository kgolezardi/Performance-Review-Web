import graphql from 'babel-plugin-relay/macro';
import React, { Fragment, useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessResultExpansionPanel } from 'src/pages/result-page/strengths-weaknesses-result-page/StrengthsWeaknessResultExpansionPanel';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { useFragment } from 'react-relay/hooks';

import { StrengthsWeaknessesResult_reviews$key } from './__generated__/StrengthsWeaknessesResult_reviews.graphql';

const fragment = graphql`
  fragment StrengthsWeaknessesResult_reviews on PersonReviewNode @relay(plural: true) {
    id
    isSelfReview
    strengths
    weaknesses
  }
`;

interface OwnProps {
  reviews: StrengthsWeaknessesResult_reviews$key;
}

export type Props = FCProps<OwnProps>;

export function StrengthsWeaknessesResult(props: Props) {
  const reviews = useFragment(fragment, props.reviews);

  const strengthOwnReviews = useMemo(() => reviews.find((review) => review.isSelfReview)?.strengths?.filter(isNotNil), [
    reviews,
  ]);

  const strengthReviews = useMemo(
    () =>
      reviews
        .filter((review) => !review.isSelfReview)
        .flatMap((review) => review.strengths)
        .filter(isNotNil)
        .sort(),
    [reviews],
  );

  const weaknessOwnReviews = useMemo(
    () => reviews.find((review) => review.isSelfReview)?.weaknesses?.filter(isNotNil),
    [reviews],
  );

  const weaknessReviews = useMemo(
    () =>
      reviews
        .filter((review) => !review.isSelfReview)
        .flatMap((review) => review.weaknesses)
        .filter(isNotNil)
        .sort(),

    [reviews],
  );

  return (
    <Fragment>
      <StrengthsWeaknessResultExpansionPanel
        title={i18n._('The most important characteristics or effective behaviors that he/she should maintain')}
        ownReviews={strengthOwnReviews}
        reviews={strengthReviews}
      />
      <StrengthsWeaknessResultExpansionPanel
        title={i18n._('The most important characteristics or behaviors he/she should improve')}
        ownReviews={weaknessOwnReviews}
        reviews={weaknessReviews}
      />
    </Fragment>
  );
}
