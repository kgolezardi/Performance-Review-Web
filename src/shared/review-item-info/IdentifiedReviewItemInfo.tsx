import React from 'react';
import { Avatar, Box, Chip, Grid, Theme, Typography, lighten, styled } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';

interface OwnProps {
  name?: string;
  src?: string;
  type: 'self' | 'peer';
}

type Props = FCProps<OwnProps>;

export function IdentifiedReviewItemInfo(props: Props) {
  const { children, name, src, type } = props;

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
              <RevieweeChip label={i18n._('Reviewee')} size="small" color="primary" />
            </Box>
          )}
        </Box>
        {children}
      </Grid>
    </Grid>
  );
}

const RevieweeChip = styled(Chip)(({ theme }: { theme: Theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.main, 0.9),
}));
