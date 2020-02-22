import { MenuItem, Select, SelectProps } from '@material-ui/core';
import React, { ReactNode, useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useForminatorState } from '../core/useForminatorState';

export interface Option {
  value: string;
  label: ReactNode;
}

interface OwnProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultValue'> {
  initialValue?: string | null;
  options: Option[];
}

type Props = FCProps<OwnProps>;

function SelectInput({ initialValue = null, options, ...props }: Props) {
  const [value, setValue] = useForminatorState(initialValue);
  const onChange = useCallback(
    event => {
      setValue(event.target.value || null);
    },
    [setValue],
  );

  return (
    <Select {...props} value={value || ''} onChange={onChange}>
      {options.map((option, index) => {
        return (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default SelectInput;
