import { Box } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessesResult } from './StrengthsWeaknessesResult';
import { StrengthsWeaknessesResultPageQuery } from './__generated__/StrengthsWeaknessesResultPageQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const query = graphql`
  query StrengthsWeaknessesResultPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...StrengthsWeaknessesResult_reviews
        }
      }
    }
  }
`;

export default function StrengthsWeaknessesResultPage(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<StrengthsWeaknessesResultPageQuery>(query, { id: revieweeId });

  const reviews = data.viewer.user?.personReviews;
  if (!reviews) {
    return <Box padding={4}>no data</Box>;
  }
  return (
    <Box padding={4}>
      <StrengthsWeaknessesResult reviews={reviews} />
    </Box>
  );
}
