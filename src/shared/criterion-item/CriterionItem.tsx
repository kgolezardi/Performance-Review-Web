import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { DictInputItem, FragmentPrompt, LimitedTextAreaInput } from 'src/shared/forminator';
import { Rating } from 'src/shared/rating';
import { FCProps } from 'src/shared/types/FCProps';
import { useServerValueContext } from 'src/shared/server-value';

interface OwnProps {
  title: string;
  prefix: string;
  details?: ReactNode;
}

type Props = FCProps<OwnProps>;

export function CriterionItem({ title, details, prefix }: Props) {
  const serverValue = useServerValueContext<any>();
  const rating = (serverValue && serverValue[prefix + 'Rating']) || null;
  const comment = (serverValue && serverValue[prefix + 'Comment']) || '';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {details}
      </Grid>
      <Grid item xs={12}>
        <DictInputItem field={prefix + 'Rating'}>
          <Box width={240}>
            <Rating inputLabel={i18n._('Evaluation')} />
          </Box>
          <FragmentPrompt value={rating} />
        </DictInputItem>
      </Grid>
      <Grid item xs={12}>
        <DictInputItem field={prefix + 'Comment'}>
          <LimitedTextAreaInput label={i18n._('Evidence')} variant="outlined" maxChars={280} fullWidth />
          <FragmentPrompt value={comment} />
        </DictInputItem>
      </Grid>
    </Grid>
  );
}
