import { Box, FormControl, InputLabel } from '@material-ui/core';
import React from 'react';
import { SelectInput } from 'src/shared/forminator';
import { Option } from 'src/shared/forminator/types';
import { useLabelWidth } from 'src/shared/hooks';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  width: number;
  inputLabel: string;
  options: Option[];
}

type Props = FCProps<OwnProps>;

export function Select(props: Props) {
  const { width, inputLabel, options } = props;

  const { labelWidth, labelRef } = useLabelWidth();

  return (
    <Box width={width}>
      <FormControl variant="outlined" margin="dense" fullWidth>
        <InputLabel ref={labelRef}>{inputLabel}</InputLabel>
        <SelectInput options={options} labelWidth={labelWidth} />
      </FormControl>
    </Box>
  );
}
