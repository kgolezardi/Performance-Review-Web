import { i18n } from '@lingui/core';
import { Box, Grid, InputAdornment, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useCallback } from 'react';
import { usePeerReviewContext } from 'src/pages/peer-review-page/PeerReviewContext';
import { ConditionalSection, FragmentRef } from 'src/shared/forminator';
import { useFragmentLens } from 'src/shared/forminator/core/fragment-lens/useFragmentLens';
import ArrayAppendButton from 'src/shared/forminator/inputs/array-input/ArrayAppendButton';
import ArrayInput from 'src/shared/forminator/inputs/array-input/ArrayInput';
import ArrayOutput from 'src/shared/forminator/inputs/array-input/ArrayOutput';
import LimitedTextAreaInput from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import { FCProps } from 'src/shared/types/FCProps';
import { ClearIcon } from './ClearIcon';

interface OwnProps {
  title: string;
  maxLength: number;
  label?: string;
}

type Props = FCProps<OwnProps>;

export function StrengthsOrWeaknesses({ title, maxLength, label, ...props }: Props) {
  const lens = useFragmentLens();
  const disabled = usePeerReviewContext()?.state === 'DONE' ?? false;
  const addButtonCondition = useCallback(
    (value: unknown[] | undefined) => {
      return (!value || value.length < maxLength) && !disabled;
    },
    [maxLength, disabled],
  );
  const clearIconCondition = useCallback((value: unknown[] | undefined) => {
    return !(value && value.length === 1);
  }, []);

  return (
    <Box paddingTop={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <ArrayInput initialValue={[undefined]}>
          <FragmentRef lens={lens} />
          <ArrayOutput>
            <Grid item xs={12}>
              <Box position="relative">
                <LimitedTextAreaInput
                  variant="outlined"
                  maxChars={280}
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
                  disabled={disabled}
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
    </Box>
  );
}
