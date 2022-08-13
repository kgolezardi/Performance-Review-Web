import AddIcon from '@material-ui/icons/Add';
import ArrayAppendButton from 'src/shared/forminator/inputs/array-input/ArrayAppendButton';
import ArrayInput from 'src/shared/forminator/inputs/array-input/ArrayInput';
import ArrayOutput from 'src/shared/forminator/inputs/array-input/ArrayOutput';
import LimitedTextAreaInput from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import React, { useCallback } from 'react';
import { Box, Grid, InputAdornment, Typography } from '@material-ui/core';
import { ConditionalSection, FragmentRef } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD, LIMITED_TEXT_AREA_MAX_CHARS } from 'src/shared/constants';
import { i18n } from '@lingui/core';
import { useFragmentLens } from 'src/shared/forminator/core/fragment-lens/useFragmentLens';

import { ClearIcon } from './ClearIcon';

interface OwnProps {
  title?: string;
  maxLength: number;
  label?: string;
}

type Props = FCProps<OwnProps>;

export function StrengthsOrWeaknesses({ title, maxLength, label, ...props }: Props) {
  const lens = useFragmentLens();
  const addButtonCondition = useCallback(
    (value: unknown[] | undefined) => {
      return !value || value.length < maxLength;
    },
    [maxLength],
  );
  const clearIconCondition = useCallback((value: unknown[] | undefined) => {
    return !(value && value.length === 1);
  }, []);

  return (
    <Grid container spacing={2}>
      {title ? (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Grid>
      ) : null}
      <ArrayInput initialValue={[undefined]}>
        <FragmentRef lens={lens} />
        <ArrayOutput>
          <Grid item xs={12}>
            <Box position="relative">
              <LimitedTextAreaInput
                variant="outlined"
                maxChars={LIMITED_TEXT_AREA_MAX_CHARS}
                counterDisplayThreshold={LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD}
                label={label}
                fullWidth
                inputProps={{ dir: 'auto' }}
                InputProps={{
                  endAdornment: (
                    <ConditionalSection lens={lens} condition={clearIconCondition}>
                      <InputAdornment position="end">
                        <ClearIcon />
                      </InputAdornment>
                    </ConditionalSection>
                  ),
                }}
              />
            </Box>
          </Grid>
        </ArrayOutput>
        <ConditionalSection condition={addButtonCondition} lens={lens}>
          <Grid item xs />
          <Grid item>
            <ArrayAppendButton variant="outlined" color="primary" startIcon={<AddIcon />}>
              {i18n._('Add')}
            </ArrayAppendButton>
          </Grid>
        </ConditionalSection>
      </ArrayInput>
    </Grid>
  );
}
