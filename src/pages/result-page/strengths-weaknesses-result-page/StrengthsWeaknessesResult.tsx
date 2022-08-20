import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessResultExpansionPanel } from 'src/pages/result-page/strengths-weaknesses-result-page/StrengthsWeaknessResultExpansionPanel';
import { StrengthsWeaknessesOutput_user$key } from 'src/shared/strengths-weaknesses-output/__generated__/StrengthsWeaknessesOutput_user.graphql';
import { i18n } from '@lingui/core';

interface OwnProps {
  reviewee: StrengthsWeaknessesOutput_user$key;
  reviewersAreAnonymous: boolean;
}

export type Props = FCProps<OwnProps>;

export function StrengthsWeaknessesResult(props: Props) {
  return (
    <Fragment>
      <StrengthsWeaknessResultExpansionPanel
        title={i18n._('The most important characteristics or effective behaviors that he/she should maintain')}
        reviewee={props.reviewee}
        type="strengths"
        anonymous={props.reviewersAreAnonymous}
      />
      <StrengthsWeaknessResultExpansionPanel
        title={i18n._('The most important characteristics or behaviors he/she should improve')}
        reviewee={props.reviewee}
        type="weaknesses"
        anonymous={props.reviewersAreAnonymous}
      />
    </Fragment>
  );
}
