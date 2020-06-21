import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { CriteriaResult } from './CriteriaResult';
import { CriteriaResultPageQuery } from './__generated__/CriteriaResultPageQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const query = graphql`
  query CriteriaResultPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...CriteriaResult_reviews
        }
      }
    }
  }
`;

export default function CriteriaResultPage(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<CriteriaResultPageQuery>(query, { id: revieweeId });

  const reviews = data.viewer.user?.personReviews;
  if (!reviews) {
    return <Box padding={4}>no data</Box>;
  }
  return (
    <Box padding={4}>
      <CriteriaResult reviews={reviews} />
    </Box>
  );
}
