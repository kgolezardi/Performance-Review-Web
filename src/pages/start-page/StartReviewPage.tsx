import { Box, Container } from '@material-ui/core';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { StartReviewCard } from './StartReviewCard';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function StartReviewPage(props: Props) {
  return (
    <Container maxWidth="md">
      <Box marginTop={15}>
        <StartReviewCard />
      </Box>
    </Container>
  );
}
