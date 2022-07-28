import { FormControl, InputLabel } from '@material-ui/core';
import React, { ComponentProps } from 'react';
import { SelectInput } from 'src/shared/forminator';
import { useLabelWidth } from 'src/shared/hooks';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends Omit<ComponentProps<typeof SelectInput>, 'labelWidth'> {
  inputLabel: string;
}

type Props = FCProps<OwnProps>;

export function Select(props: Props) {
  const { inputLabel, ...selectInputProps } = props;

  const { labelWidth, labelRef } = useLabelWidth();

  return (
    <FormControl variant="outlined" margin="dense" fullWidth>
      <InputLabel ref={labelRef}>{inputLabel}</InputLabel>
      <SelectInput {...selectInputProps} labelWidth={labelWidth} />
    </FormControl>
  );
}
