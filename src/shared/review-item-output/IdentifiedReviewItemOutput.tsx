import React from 'react';
import { Avatar, Box, Chip, Grid, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { i18n } from '@lingui/core';

interface OwnProps {
  disableTruncating?: boolean;
  name?: string;
  src?: string;
  type: 'self' | 'peer';
  value: string | null;
}

type Props = FCProps<OwnProps>;

export function IdentifiedReviewItemOutput(props: Props) {
  const { disableTruncating, name, src, type, value } = props;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Avatar src={src}>{name?.[0]}</Avatar>
      </Grid>
      <Grid item xs>
        <Box marginBottom={1}>
          <Typography variant="button">{name}</Typography>
          {type === 'self' && (
            <Box marginLeft={2} display="inline-block">
              <Chip label={i18n._('Reviewee')} size="small" color="primary" />
            </Box>
          )}
        </Box>
        <MultilineOutput value={value} enableTruncating={!disableTruncating} />
      </Grid>
    </Grid>
  );
}
