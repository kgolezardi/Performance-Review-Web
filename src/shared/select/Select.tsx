import { FormControl, InputLabel } from '@material-ui/core';
import React from 'react';
import { SelectInput } from 'src/shared/forminator';
import { Option } from 'src/shared/forminator/types';
import { useLabelWidth } from 'src/shared/hooks';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  inputLabel: string;
  options: Option[];
  initialValue?: string;
}

type Props = FCProps<OwnProps>;

export function Select(props: Props) {
  const { inputLabel, options, initialValue } = props;

  const { labelWidth, labelRef } = useLabelWidth();

  return (
    <FormControl variant="outlined" margin="dense" fullWidth>
      <InputLabel ref={labelRef}>{inputLabel}</InputLabel>
      <SelectInput options={options} initialValue={initialValue} labelWidth={labelWidth} />
    </FormControl>
  );
}
