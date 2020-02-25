import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Container } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { importMDX } from 'mdx.macro';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { NoPeerReview } from './NoPeerReview';
import { PeerStartReviewPageQuery } from './__generated__/PeerStartReviewPageQuery.graphql';
import { StartReviewCard } from './StartReviewCard';

const Content = importMDX.sync('./PeerStartReviewContent.mdx');

const peerStartReviewPageQuery = graphql`
  query PeerStartReviewPageQuery {
    viewer {
      usersToReview {
        id
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function PeerStartReviewPage(props: Props) {
  const data = useLazyLoadQuery<PeerStartReviewPageQuery>(peerStartReviewPageQuery, {});

  const hasSomethingToReview = !!data.viewer.usersToReview.length;

  return (
    <Container maxWidth="md">
      <Box marginTop={15}>{hasSomethingToReview ? <StartReviewCard Content={Content} /> : <NoPeerReview />}</Box>
    </Container>
  );
}
