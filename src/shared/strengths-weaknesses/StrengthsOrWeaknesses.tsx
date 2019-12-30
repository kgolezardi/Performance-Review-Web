import { i18n } from '@lingui/core';
import { Card, CardContent, CardHeader, Container, Grid } from '@material-ui/core';
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
  label?: string;
}

type Props = FCProps<OwnProps>;

export function StrengthsOrWeaknesses({ title, maxLength, label, ...props }: Props) {
  const lens = useFragmentLens();
  const condition = useCallback(
    (value: unknown[]) => {
      return !value || value.length < maxLength;
    },
    [maxLength],
  );
  return (
    <Card>
      <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <ArrayInput initialValue={[undefined]}>
              <FragmentRef lens={lens} />
              <ArrayOutput>
                <Grid item xs={12}>
                  <LimitedTextAreaInput
                    variant="outlined"
                    maxChars={128}
                    fullWidth
                    inputProps={{ dir: 'auto' }}
                    label={label}
                  />
                </Grid>
              </ArrayOutput>
              <ConditionalSection condition={condition} lens={lens}>
                <Grid item xs />
                <Grid item>
                  <ArrayAppendButton variant="outlined" color="primary">
                    {i18n._('What else')}
                  </ArrayAppendButton>
                </Grid>
              </ConditionalSection>
            </ArrayInput>
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
}
