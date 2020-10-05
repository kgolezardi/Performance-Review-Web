import PeerCommnentIcon from '@material-ui/icons/SpeakerNotes';
import React from 'react';
import SelfCommentIcon from '@material-ui/icons/RateReview';
import { Box, Grid, lighten, useTheme } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';

interface OwnProps {
  disableTruncating?: boolean;
  type: 'self' | 'peer';
  value: string | null;
}

type Props = FCProps<OwnProps>;

export function AnonymousReviewItemOutput(props: Props) {
  const { disableTruncating, type, value } = props;

  const theme = useTheme();
  const selfBgcolor = lighten(theme.palette.primary.light, 0.85);
  const bgcolor = type === 'self' ? selfBgcolor : 'grey.200';

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          bgcolor={bgcolor}
          width={40}
          height={40}
        >
          {type === 'self' ? <SelfCommentIcon color="primary" /> : <PeerCommnentIcon color="action" />}
        </Box>
      </Grid>
      <Grid item xs>
        <MultilineOutput value={value} enableTruncating={!disableTruncating} />
      </Grid>
    </Grid>
  );
}
