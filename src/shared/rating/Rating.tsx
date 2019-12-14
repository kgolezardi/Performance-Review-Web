import React, { useMemo } from 'react';
import { evaluationDictionary } from 'src/globalTypes';
import { Select } from 'src/shared/select';
import { FCProps } from 'src/shared/types/FCProps';
import { getOptionsFromDictionary } from 'src/shared/utils/getOptionsFromDictionary';

interface OwnProps {
  inputLabel: string;
  initialValue?: string;
}

type Props = FCProps<OwnProps>;

export function Rating(props: Props) {
  const { inputLabel, initialValue } = props;

  const options = useMemo(() => getOptionsFromDictionary(evaluationDictionary), []);

  return <Select options={options} inputLabel={inputLabel} initialValue={initialValue} />;
}
