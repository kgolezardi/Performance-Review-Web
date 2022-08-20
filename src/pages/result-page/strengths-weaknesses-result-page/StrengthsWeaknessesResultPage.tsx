import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { StrengthsWeaknessesResult } from './StrengthsWeaknessesResult';
import { StrengthsWeaknessesResultPageQuery } from './__generated__/StrengthsWeaknessesResultPageQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const query = graphql`
  query StrengthsWeaknessesResultPageQuery($id: ID!) {
    viewer {
      activeRound {
        reviewersAreAnonymous
      }
      user(id: $id) {
        ...StrengthsWeaknessesOutput_user
        personReviews {
          id
        }
      }
    }
  }
`;

export default function StrengthsWeaknessesResultPage(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<StrengthsWeaknessesResultPageQuery>(query, { id: revieweeId });

  const reviews = data.viewer.user?.personReviews;
  const reviewee = data.viewer.user;

  if (!reviews || !reviewee) {
    return <Box padding={4}>no data</Box>;
  }
  return (
    <Box padding={4}>
      <StrengthsWeaknessesResult
        reviewersAreAnonymous={data.viewer.activeRound.reviewersAreAnonymous}
        reviewee={reviewee}
      />
    </Box>
  );
}
