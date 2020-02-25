import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function ManagerReviewNoUserContent(props: Props) {
  return (
    <Paper>
      <Box px={4} py={8} textAlign="center">
        <Typography variant="h6">{i18n._('Select a team member please')}</Typography>
      </Box>
    </Paper>
  );
}
