import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DictInputItem, LimitedTextAreaInput } from 'src/shared/forminator';
import { Rating } from 'src/shared/rating';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  title: string;
  prefix: string;
  details?: string;
}

type Props = FCProps<OwnProps>;

export function CriterionItem({ title, details, prefix }: Props) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{details}</Typography>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field={prefix + 'Rating'}>
              <Box width={240}>
                <Rating inputLabel={i18n._('Evaluation')} />
              </Box>
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field={prefix + 'Comment'}>
              <LimitedTextAreaInput label={i18n._('Evidence')} variant="outlined" maxChars={280} fullWidth />
            </DictInputItem>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
