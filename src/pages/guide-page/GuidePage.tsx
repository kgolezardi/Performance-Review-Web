import { i18n } from '@lingui/core';
import { Box, Container } from '@material-ui/core';
import { importMDX } from 'mdx.macro';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { GuideCard } from './GuideCard';

const Content = importMDX.sync('./FAQ.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function FaqPage(props: Props) {
  return (
    <Container maxWidth="md">
      <Box marginY={4}>
        <GuideCard title={i18n._('FAQ')} Content={Content} />
      </Box>
    </Container>
  );
}
