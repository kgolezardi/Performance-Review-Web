import React from 'react';
import { Box, Container } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { importMDX } from 'mdx.macro';

import { ResultStartCard } from './ResultStartCard';

const Content = importMDX.sync('./ResultStartPageContent.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function ResultStartPage(props: Props) {
  return (
    <Container maxWidth="md">
      <Box marginTop={15}>
        <ResultStartCard Content={Content} />
      </Box>
    </Container>
  );
}
