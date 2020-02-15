import { i18n } from '@lingui/core';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Evaluation, peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';
import { getEnumLabel } from 'src/shared/enum-utils';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  value: Evaluation | '%future added value';
  type: 'self' | 'peer';
}

type Props = FCProps<OwnProps>;

export function EvaluationOutput(props: Props) {
  const { value, type } = props;
  const label =
    type === 'self'
      ? getEnumLabel(selfReviewEvaluationDictionary, value, i18n._('Unknown'))
      : getEnumLabel(peerReviewEvaluationDictionary, value, i18n._('Unknown'));

  return <Typography>{label}</Typography>;
}
