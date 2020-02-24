import { Box, Container } from '@material-ui/core';
import { importMDX } from 'mdx.macro';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { StartReviewCard } from './StartReviewCard';

const Content = importMDX.sync('./SelfStartReviewContent.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function SelfStartReviewPage(props: Props) {
  return (
    <Container maxWidth="md">
      <Box marginTop={15}>
        <StartReviewCard Content={Content} />
      </Box>
    </Container>
  );
}
