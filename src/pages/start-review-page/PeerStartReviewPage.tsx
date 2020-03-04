import React from 'react';
import { Box, Container } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { importMDX } from 'mdx.macro';

import { StartReviewCard } from './StartReviewCard';

const Content = importMDX.sync('./PeerStartReviewContent.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function PeerStartReviewPage(props: Props) {
  return (
    <Container maxWidth="md">
      <Box marginTop={15}>
        <StartReviewCard Content={Content} />
      </Box>
    </Container>
  );
}
