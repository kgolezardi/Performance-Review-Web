import React from 'react';
import { evaluationDictionary } from 'src/globalTypes';
import { getOptionsFromDictionary } from 'src/shared/rating/utils';
import { Select } from 'src/shared/select';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  inputLabel: string;
  initialValue?: string;
}

type Props = FCProps<OwnProps>;

export function Rating(props: Props) {
  const { inputLabel, initialValue } = props;

  const options = getOptionsFromDictionary(evaluationDictionary);

  return <Select options={options} inputLabel={inputLabel} initialValue={initialValue} />;
}
