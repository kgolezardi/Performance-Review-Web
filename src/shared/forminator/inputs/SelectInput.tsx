import RemoveIcon from '@material-ui/icons/Close';
import React, { ReactNode, useCallback } from 'react';
import { Box, IconButton, MenuItem, Select, SelectProps } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';

import { useForminatorState } from '../core/useForminatorState';

export interface Option {
  value: string;
  label: ReactNode;
}

interface OwnProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultValue'> {
  initialValue?: string | null;
  options: Option[];
  isRemoveAble?: boolean;
}

type Props = FCProps<OwnProps>;

function SelectInput({ initialValue = null, options, isRemoveAble = true, ...props }: Props) {
  const [value, setValue] = useForminatorState(initialValue);
  const onChange = useCallback(
    (event) => {
      setValue(event.target.value || null);
    },
    [setValue],
  );

  const handleRemove = () => {
    setValue(null);
  };

  return (
    <Box display="flex">
      <Select fullWidth {...props} value={value || ''} onChange={onChange}>
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      {isRemoveAble ? (
        <Box display="flex" alignItems="center" ml={1}>
          <IconButton disabled={!value} size="small" onClick={handleRemove}>
            <RemoveIcon />
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
}

export default SelectInput;
