import React from 'react';
import { Evaluation } from 'src/__generated__/enums';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';

import { ItemOutput } from './ItemOutput';

interface OwnProps {
  title: string;
  value: Evaluation | null;
  type: 'self' | 'peer';
  defaultValue?: string;
}

type Props = FCProps<OwnProps>;

export function EvaluationItemOutput(props: Props) {
  const { title, type, value } = props;
  return <ItemOutput title={title} value={<EvaluationOutput type={type} value={value} />} />;
}
