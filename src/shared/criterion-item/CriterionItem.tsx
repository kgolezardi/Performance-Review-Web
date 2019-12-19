import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import React from 'react';
import { DictInputItem, LimitedTextAreaInput } from 'src/shared/forminator';
import { Rating } from 'src/shared/rating';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  title: string;
  prefix: string;
  subheader?: string;
}

type Props = FCProps<OwnProps>;

export function CriterionItem({ title, subheader, prefix }: Props) {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DictInputItem field={prefix + 'Rating'}>
              <Box width={240}>
                <Rating inputLabel={i18n._('Select')} />
              </Box>
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field={prefix + 'Comment'}>
              <LimitedTextAreaInput variant="outlined" maxChars={280} fullWidth />
            </DictInputItem>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
