import PeerCommnentIcon from '@material-ui/icons/SpeakerNotes';
import React from 'react';
import SelfCommentIcon from '@material-ui/icons/RateReview';
import { Box, Grid, lighten, useTheme } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';

import { PersonType } from './ReviewItemInfo';

interface OwnProps {
  type: PersonType;
}

type Props = FCProps<OwnProps>;

export function AnonymousReviewItemInfo(props: Props) {
  const { children, type } = props;

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
          width={48}
          height={48}
          displayPrint="none !important"
        >
          {type === 'self' ? <SelfCommentIcon color="primary" /> : <PeerCommnentIcon color="action" />}
        </Box>
      </Grid>
      <Grid item xs>
        {children}
      </Grid>
    </Grid>
  );
}
