import { Typography } from '@material-ui/core';
import React from 'react';
import { Evaluation, evaluationDictionary } from 'src/global-types';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  value: Evaluation;
  // TODO: add a prop that determines which dictionary to use
}

type Props = FCProps<OwnProps>;

export function EvaluationOutput(props: Props) {
  const { value } = props;
  return <Typography>{evaluationDictionary[value]}</Typography>;
}
