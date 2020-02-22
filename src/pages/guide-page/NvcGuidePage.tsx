import { i18n } from '@lingui/core';
import { Box, Container } from '@material-ui/core';
import { importMDX } from 'mdx.macro';
import React from 'react';
import { GuideCard } from 'src/pages/guide-page/GuideCard';
import { FCProps } from 'src/shared/types/FCProps';

const Content = importMDX.sync('./NVCGuide.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function NvcGuide(props: Props) {
  return (
    <Container maxWidth="md">
      <Box marginY={4}>
        <GuideCard title={i18n._('NVC Guide')} Content={Content} />
      </Box>
    </Container>
  );
}
