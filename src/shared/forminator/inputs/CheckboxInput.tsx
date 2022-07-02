import React, { useCallback } from 'react';
import { Checkbox, CheckboxProps, FormControlLabel, Omit } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';

import { useForminatorState } from '../core/useForminatorState';

interface OwnProps {
  initialValue?: boolean;
  label: string;
}

type Props = FCProps<OwnProps> & Omit<CheckboxProps, 'value' | 'onChange' | 'defaultValue'>;

function CheckboxInput({ initialValue = false, label, ...props }: Props) {
  const [value, setValue] = useForminatorState(initialValue);

  const onChange = useCallback(
    (_, checked) => {
      setValue(checked);
    },
    [setValue],
  );

  return <FormControlLabel label={label} control={<Checkbox {...props} checked={value} onChange={onChange} />} />;
}
export default CheckboxInput;
