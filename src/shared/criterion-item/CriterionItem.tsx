import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, FormControl, InputLabel } from '@material-ui/core';
import React from 'react';
import { DictInputItem, LimitedTextAreaInput, SelectInput } from 'src/shared/forminator';
import { useLabelWidth } from 'src/shared/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { Rating } from 'src/shared/rating';

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
        <DictInputItem field={prefix + 'Rating'}>
          <Box width={240}>
            <Rating inputLabel={i18n._('Select')} />
          </Box>
        </DictInputItem>
        <DictInputItem field={prefix + 'Comment'}>
          <LimitedTextAreaInput variant="outlined" maxChars={280} rows={5} fullWidth />
        </DictInputItem>
      </CardContent>
    </Card>
  );
}
