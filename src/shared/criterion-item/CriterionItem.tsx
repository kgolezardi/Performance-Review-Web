import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, FormControl, InputLabel } from '@material-ui/core';
import React from 'react';
import { DictInputItem, LimitedTextAreaInput, SelectInput } from 'src/shared/forminator';
import { useLabelWidth } from 'src/shared/hooks/useLabelWidth';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  title: string;
  prefix: string;
  subheader?: string;
}

type Props = FCProps<OwnProps>;

export function CriterionItem({ title, subheader, prefix }: Props) {
  const { labelWidth, labelRef } = useLabelWidth();

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <DictInputItem field={prefix + '__Rating'}>
          <Box width={240}>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel ref={labelRef}>{i18n._('Select')}</InputLabel>
              {/* TODO: get options from GraphQl */}
              <SelectInput options={[]} labelWidth={labelWidth} />
            </FormControl>
          </Box>
        </DictInputItem>
        <DictInputItem field={prefix + '__Comment'}>
          <LimitedTextAreaInput variant="outlined" maxChars={280} rows={5} fullWidth />
        </DictInputItem>
      </CardContent>
    </Card>
  );
}
