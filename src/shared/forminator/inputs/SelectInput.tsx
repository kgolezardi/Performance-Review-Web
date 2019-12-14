import { MenuItem, Omit, Select } from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select';
import React, { ReactNode, useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useForminatorState } from '../core/useForminatorState';

export interface Option {
  value: string;
  label: ReactNode;
}

interface OwnProps {
  initialValue: string;
  options: Option[];
}

type Props = FCProps<OwnProps> & Omit<SelectProps, 'value' | 'onChange' | 'defaultValue'>;

function SelectInput({ initialValue, options, ...props }: Props) {
  const [value, setValue] = useForminatorState(initialValue);
  const onChange = useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return (
    <Select {...props} value={value} onChange={onChange}>
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
SelectInput.defaultProps = { initialValue: '' };
export default SelectInput;
