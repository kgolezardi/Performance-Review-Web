import { i18n } from '@lingui/core';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import React, { useCallback } from 'react';
import { ConditionalSection, FragmentRef } from 'src/shared/forminator';
import ArrayAppendButton from 'src/shared/forminator/inputs/array-input/ArrayAppendButton';
import ArrayInput from 'src/shared/forminator/inputs/array-input/ArrayInput';
import ArrayOutput from 'src/shared/forminator/inputs/array-input/ArrayOutput';
import { FCProps } from 'src/shared/types/FCProps';
import { useFragmentLens } from '../forminator/core/fragment-lens/useFragmentLens';
import LimitedTextAreaInput from '../forminator/inputs/LimitedTextAreaInput';

interface OwnProps {
  title: string;
  maxLength: number;
}

type Props = FCProps<OwnProps>;

export function StrengthsOrWeaknesses({ title, maxLength, ...props }: Props) {
  const lens = useFragmentLens();
  const condition = useCallback(
    (value: unknown[]) => {
      return value ? value.length < maxLength : true;
    },
    [maxLength],
  );
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Grid container spacing={2}>
          <ArrayInput initialValue={[undefined]}>
            <FragmentRef lens={lens} />
            <ArrayOutput>
              <Grid item xs={12}>
                <LimitedTextAreaInput variant="outlined" maxChars={280} fullWidth inputProps={{ dir: 'auto' }} />
              </Grid>
            </ArrayOutput>
            <ConditionalSection condition={condition} lens={lens}>
              <Grid item>
                <ArrayAppendButton>{i18n._('Add')}</ArrayAppendButton>
              </Grid>
            </ConditionalSection>
          </ArrayInput>
        </Grid>
      </CardContent>
    </Card>
  );
}
