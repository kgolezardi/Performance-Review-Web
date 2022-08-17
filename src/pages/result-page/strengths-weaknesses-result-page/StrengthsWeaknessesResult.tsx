import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessResultExpansionPanel } from 'src/pages/result-page/strengths-weaknesses-result-page/StrengthsWeaknessResultExpansionPanel';
import { StrengthsWeaknessesOutput_reviews$key } from 'src/shared/strengths-weaknesses-output/__generated__/StrengthsWeaknessesOutput_reviews.graphql';
import { i18n } from '@lingui/core';

interface OwnProps {
  reviews: StrengthsWeaknessesOutput_reviews$key;
  reviewersAreAnonymous: boolean;
}

export type Props = FCProps<OwnProps>;

export function StrengthsWeaknessesResult(props: Props) {
  return (
    <Fragment>
      <StrengthsWeaknessResultExpansionPanel
        title={i18n._('The most important characteristics or effective behaviors that he/she should maintain')}
        reviews={props.reviews}
        type="strengths"
        anonymous={props.reviewersAreAnonymous}
      />
      <StrengthsWeaknessResultExpansionPanel
        title={i18n._('The most important characteristics or behaviors he/she should improve')}
        reviews={props.reviews}
        type="weaknesses"
        anonymous={props.reviewersAreAnonymous}
      />
    </Fragment>
  );
}
