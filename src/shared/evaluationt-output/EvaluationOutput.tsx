import { i18n } from '@lingui/core';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Evaluation, evaluationDictionary } from 'src/global-types';
import { getEnumLabel } from 'src/shared/enum-utils';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  value: Evaluation | '%future added value';
  // TODO: add a prop that determines which dictionary to use
}

type Props = FCProps<OwnProps>;

export function EvaluationOutput(props: Props) {
  const { value } = props;
  return <Typography>{getEnumLabel(evaluationDictionary, value, i18n._('Unknown'))}</Typography>;
}
