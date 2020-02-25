import React, { ReactNode } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { DictInputItem, FragmentPrompt, LimitedTextAreaInput } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { Rating } from 'src/shared/rating';
import { i18n } from '@lingui/core';
import { useServerValueContext } from 'src/shared/server-value';

interface ServerValue {
  [key: string]: string | null;
}

interface OwnProps {
  title: string;
  prefix: string;
  type: 'self' | 'peer';
  details?: ReactNode;
}

type Props = FCProps<OwnProps>;

export function CriterionItem({ title, details, prefix, type }: Props) {
  const serverValue = useServerValueContext<ServerValue>();
  const rating = (serverValue && serverValue[prefix + 'Rating']) || null;
  const comment = (serverValue && serverValue[prefix + 'Comment']) || '';

  return (
    <Box paddingTop={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          {details}
        </Grid>
        <Grid item xs={12}>
          <DictInputItem field={prefix + 'Rating'}>
            <Box width={240}>
              <Rating inputLabel={i18n._('Evaluation')} type={type} />
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
    </Box>
  );
}
