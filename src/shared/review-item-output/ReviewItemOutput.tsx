import PeerCommnentIcon from '@material-ui/icons/SpeakerNotes';
import React from 'react';
import SelfCommentIcon from '@material-ui/icons/RateReview';
import { Avatar, Box, Chip, Grid, Typography, lighten, useTheme } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { i18n } from '@lingui/core';

interface OwnProps {
  anonymous?: boolean;
  disableTruncating?: boolean;
  name?: string;
  src?: string;
  type: 'self' | 'peer';
  value: string | null;
}

type Props = FCProps<OwnProps>;

export function ReviewItemOutput(props: Props) {
  const { anonymous = false, disableTruncating, name, src, type, value } = props;

  const theme = useTheme();
  const selfBgcolor = lighten(theme.palette.primary.light, 0.85);
  const bgcolor = type === 'self' ? selfBgcolor : 'grey.200';

  return (
    <Grid container spacing={2}>
      <Grid item>
        {anonymous ? (
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
        ) : (
          <Avatar src={src}>{name?.[0]}</Avatar>
        )}
      </Grid>
      <Grid item xs>
        {!anonymous && name && (
          <Box marginBottom={1}>
            <Typography variant="button">{name}</Typography>
            {type === 'self' && (
              <Box marginLeft={2} display="inline-block">
                <Chip label={i18n._('Reviewee')} size="small" color="primary" />
              </Box>
            )}
          </Box>
        )}
        <MultilineOutput value={value} enableTruncating={!disableTruncating} />
      </Grid>
    </Grid>
  );
}
